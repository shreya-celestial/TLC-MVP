import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import getData from '../../utils/getData';
import { DeleteUserByEmail, InsertUserMutation } from '../../gql/user/mutations';
import generateEmail from '../../utils/generateMail';
import transporter from '../../utils/nodeMailer';
import { capitaliseStr, formatDate } from '../../utils/global';
import { hash } from 'bcrypt';

const signup = async (req: Request, res: Response) => {
  const mutation = InsertUserMutation;
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
        `https://tlc-two.vercel.app/user/verifyUser?token=${variables.token}`,
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
};

export default signup;
