import { Request, Response } from "express";
import CryptoJS from "crypto-js"
import getData from "../../utils/getData";
import { CheckAndUpdateToken } from "../../gql/user/mutations";
import generateEmail from "../../utils/generateMail";
import transporter from "../../utils/nodeMailer";

const forgotPass = async (req: Request, res: Response) => {
  const {email} = req.body;
  let token: any = CryptoJS.AES.encrypt(email, process.env.CRYPTO_TICKET || '')
  token = token.toString();

  const data = await getData(CheckAndUpdateToken, {
    email: email,
    isVerified: true,
    token: token,
    isPassToBeReset: true,
    isAdminVerified: true
  })

  if(data?.data?.update_users?.affected_rows)
  {
    const name = data?.data?.update_users?.returning[0]?.name
    const body = "Please click on this link below to reset your password."
    const mailOptions = {
      from: 'infotech@thelastcentre.com',
      to: email,
      subject: 'Reset Password Link',
      text: '',
      html: generateEmail(`https://tlc-two.vercel.app/user/verifyReset?token=${token}`, name, 'Reset Password', body)
    };

    transporter.sendMail(mailOptions, (err) => {
      if(!err)
      {
        return res.status(200).json({
          status: 'success',
          message: 'Mail sent successfully!'
        }) 
      }
      
      return res.status(400).json({
        status: 'error',
        message: 'Something went wrong, Please try again!'
      })
    })

    return
  }

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  return res.status(404).json({
    status: 'error',
    message: 'User does not exists!'
  })

}

export default forgotPass;