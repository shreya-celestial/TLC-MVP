import { Request, Response } from "express";
import jwt from "jsonwebtoken"
import getData from "../../utils/getData";
import { CheckAndUpdateToken } from "../../gql/user/mutations";
import generateEmail from "../../utils/generateMail";
import transporter from "../../utils/nodeMailer";

const forgotPass = async (req: Request, res: Response) => {
  const {email} = req.body;
  const token = jwt.sign({tempKey: email}, process.env.JWT_SECRET_KEY || '')

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
      html: generateEmail(`http://localhost:8080/user/verifyReset/${token}`, name, 'Reset Password', body)
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