import { Request, Response } from "express"
import getData from "../../utils/getData"
import { checkEmailAvailability } from "../../gql/volunteers/queries"
import jwt from "jsonwebtoken"
import { deleteInvite, newInvite, resendInvite } from "../../gql/volunteers/mutations"
import { capitaliseStr } from "../../utils/global"
import generateEmail from "../../utils/generateMail"
import transporter from "../../utils/nodeMailer"

const inviteVolunteer = async (req: Request, res: Response) => {
  const { email, name, isAdmin } = req.body

  const isEmailAvailable = await getData(checkEmailAvailability, {email})

  if(isEmailAvailable?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: isEmailAvailable?.errors[0]?.message
    })
  }

  if(isEmailAvailable?.data?.users?.length)
  {
    return res.status(400).json({
      status: 'error',
      message: "Email already registered!"
    })
  }

  if(!isEmailAvailable?.data?.Invitations?.length)
  {
    const token = jwt.sign({tempKey: email}, process.env.JWT_SECRET_KEY || '')
    const variables = {
      name: capitaliseStr(name),
      email: email.toLowerCase(),
      token,
      isAdmin
    }

    const data = await getData(newInvite, variables);
    if(data?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: data?.errors[0]?.message
      })
    }

    if(data?.data?.insert_Invitations?.affected_rows)
    {
      const body = "TLC invites you to be a volunteer for TLC."
      const mailOptions = {
        from: 'infotech@thelastcentre.com',
        to: email,
        subject: 'TLC Invitation',
        text: '',
        html: generateEmail(`https://tlc-two.vercel.app/volunteers/verifyInvite/${token}`, name, 'Accept Invitation', body)
      };

      transporter.sendMail(mailOptions, async (err)=> {
        if(!err)
        {
          return res.status(200).json({
            status: 'success',
            message: 'Invitation sent successfully!'
          })
        }

        start_position: while(true) {
          const deleteSentInvite = await getData(deleteInvite, {email, token});
          if(deleteSentInvite?.errors)
          {
            continue start_position
          }
          break;
        }
        return res.status(400).json({
          status: 'error',
          message: "Something went wrong! Please try again!"
        })
        
      })
      return 
    }

    return res.status(400).json({
      status: 'error',
      message: "Something went wrong! Please try again!"
    })
  }

  const token = jwt.sign({tempKey: email}, process.env.JWT_SECRET_KEY || '')
  const variables = {
    email: email.toLowerCase(),
    token
  }
  const data = await getData(resendInvite, variables);
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(data?.data?.update_Invitations?.affected_rows)
  {
    const body = "TLC invites you to be a volunteer for TLC."
    const mailOptions = {
      from: 'infotech@thelastcentre.com',
      to: email,
      subject: 'TLC Invitation',
      text: '',
      html: generateEmail(`https://tlc-two.vercel.app/volunteers/verifyInvite/${token}`, name, 'Accept Invitation', body)
    };

    transporter.sendMail(mailOptions, async (err)=> {
      if(!err)
      {
        return res.status(200).json({
          status: 'success',
          message: 'Invitation re-sent successfully!'
        })
      }

      return res.status(400).json({
        status: 'error',
        message: "Something went wrong! Please try again!"
      })
      
    })
    return
  }

  return res.status(400).json({
    status: 'error',
    message: "Something went wrong! Please try again!"
  })

}

export default inviteVolunteer