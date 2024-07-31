import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import getData from '../../utils/getData';
import { DeleteUserByEmail } from '../../gql/user/mutations';
import generateEmail from '../../utils/generateMail';
import transporter from '../../utils/nodeMailer';
import { capitaliseStr, formatDate, mailing_url } from '../../utils/global';
import { hash } from 'bcrypt';
import { verifyRequestedLink } from '../../gql/volunteers/queries';
import { signupFromLink } from '../../gql/volunteers/mutations';

const linkSignup = async (req: Request, res: Response) => {
  const { verify } = req.body;
  try {
    const ticket = verify.replaceAll(' ', '+');
    delete req?.body?.verify;
    let ticketData: any = CryptoJS.AES.decrypt((ticket), process.env.CRYPTO_TICKET || '').toString(CryptoJS.enc.Utf8);
    if(!ticketData) {
      return res.status(400).json({
        status: 'error',
        message: 'Ticket sent is not valid. Please request admin for another link!',
      });
    }
    ticketData = JSON.parse(ticketData);
    const verifyData = await getData(verifyRequestedLink, ticketData);
    if(verifyData?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: verifyData?.errors[0]?.message,
      });
    }
    if(!verifyData?.data?.link_tickets?.length)
    {
      return res.status(404).json({
        status: 'error',
        message: 'Ticket sent does not exist. Please request admin for another link!',
      });
    }
    const created = new Date(verifyData?.data?.link_tickets[0]?.created_at)
    const now = new Date()
    const diffTime = now.getTime() - created.getTime()
    const diffDays = Math.round(diffTime/(24*3600*1000))
    if(diffDays>=1)
    {
      return res.status(400).json({
        status: 'error',
        message: 'Ticket sent is expired. Please request admin for another link!',
      });
    }

    const mutation = signupFromLink;
    const encryptPass = await hash(req.body.password, 12)
    let token: any = CryptoJS.AES.encrypt(req?.body?.email, process.env.CRYPTO_TICKET || '')
    token = token.toString();
    const variables = {
      ...req.body,
      name: capitaliseStr(req.body.name),
      state: capitaliseStr(req.body.state),
      location: capitaliseStr(req.body.location),
      city: capitaliseStr(req.body.city),
      email: (req.body.email).toLowerCase(),
      dob: formatDate(req.body.dob),
      password: encryptPass,
      isVerified: false,
      isAdminVerified: true,
      isAdmin: false,
      token,
    };
  
    const data = await getData(mutation, variables);
    if (!data.errors) {
      const mailOptions = {
        from: 'infotech@thelastcentre.com',
        to: req.body.email,
        subject: 'Verification of TLC Email',
        text: '',
        html: generateEmail(
          `${mailing_url}/user/verifyUser?token=${variables.token}`,
          capitaliseStr(req.body.name)
        ),
      };
  
      transporter.sendMail(mailOptions, async (err) => {
        if (!err) {
          return res.status(200).json({
            status: 'success',
            message: 'Mail sent successfully!',
          });
        }
  
        await getData(DeleteUserByEmail, {
          email: req.body.email,
        });
  
        return res.status(400).json({
          status: 'error',
          message: 'Something went wrong, Please try again!',
        });
      });
      return;
    }
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message,
    });
  }
  catch(err) {
    return res.status(400).json({
      status: 'error',
      message: 'Ticket sent might not be valid. Please request admin for another link or try again later!'
    })
  }
}
 
export default linkSignup;