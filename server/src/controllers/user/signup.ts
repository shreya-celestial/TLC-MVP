import { Request, Response } from 'express';
import CryptoJS from 'crypto-js';
import jwt from 'jsonwebtoken';
import getData from '../../utils/getData';
import { DeleteUserByEmail, InsertUserMutation } from '../../gql/user/mutations';
import generateEmail from '../../utils/generateMail';
import transporter from '../../utils/nodeMailer';
import { capitaliseStr, formatDate } from '../../utils/global';

const signup = async (req: Request, res: Response) => {
  const mutation = InsertUserMutation;
  const encryptPass = CryptoJS.AES.encrypt(
    req.body.password,
    process.env.CRYPTO_HASH_KEY || ''
  );

  const variables = {
    ...req.body,
    name: capitaliseStr(req.body.name),
    state: capitaliseStr(req.body.state),
    location: capitaliseStr(req.body.location),
    city: capitaliseStr(req.body.city),
    email: (req.body.email).toLowerCase(),
    dob: formatDate(req.body.dob),
    password: encryptPass.toString(),
    isVerified: false,
    token: jwt.sign(
      { tempKey: encryptPass.toString() },
      process.env.JWT_SECRET_KEY || ''
    ),
  };

  const data = await getData(mutation, variables);
  if (!data.errors) {
    const mailOptions = {
      from: 'infotech@thelastcentre.com',
      to: req.body.email,
      subject: 'Verification of TLC Email',
      text: '',
      html: generateEmail(
        `https://tlc-two.vercel.app/user/verifyUser/${variables.token}`,
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
