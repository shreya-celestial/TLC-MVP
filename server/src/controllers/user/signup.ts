import { Request, Response } from "express";
import CryptoJS from "crypto-js";
import jwt from "jsonwebtoken";
import getData from "../../utils/getData";
import { DeleteUserByEmail, InsertUserMutation } from "../../gql/mutations";
import generateEmail from "../../utils/generateMail";
import transporter from "../../utils/nodeMailer";

const signup = async (req: Request, res: Response) => {
  const mutation = InsertUserMutation
  const encryptPass = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_HASH_KEY || '')

  const variables = {
    ...req.body,
    password: encryptPass.toString(),
    isVerified: false,
    token: jwt.sign({tempKey:encryptPass.toString()}, process.env.JWT_SECRET_KEY || '')
  }
  
  await getData(mutation, variables);
  const mailOptions = {
    from: 'infotech@thelastcentre.com',
    to: req.body.email,
    subject: 'Verification of TLC Email',
    text: '',
    html: generateEmail(`http://localhost:8080/user/verify/${variables.token}`, req.body.name)
  };

  transporter.sendMail(mailOptions, async (err)=>{
    if(!err)
    {
      return res.json({
        status: 'success',
        message: 'Mail sent successfully!'
      })  
    }

    await getData(DeleteUserByEmail, {
      email: req.body.email
    })
    return res.json({
      status: 'error',
      message: 'Something went wrong, Please try again!'
    })

  })  
}

export default signup