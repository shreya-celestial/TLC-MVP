import { Request, Response } from "express"
import getData from "../../utils/getData"
import { checkEmailAvailability } from "../../gql/volunteers/queries"
import CryptoJS from "crypto-js"
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
    let token: any = CryptoJS.AES.encrypt(email, process.env.CRYPTO_TICKET || '')
    token = token.toString();
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
        html: generateEmail(`https://tlc-mvp-server.vercel.app/volunteers/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
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

  const created = new Date(isEmailAvailable?.data?.Invitations[0]?.created_at).toLocaleDateString();
  const today = new Date().toLocaleDateString();

  if(created === today)
  {
    return res.status(400).json({
      status: 'error',
      message: 'Invitation has already been sent today!'
    })
  }

  let token: any = CryptoJS.AES.encrypt(email, process.env.CRYPTO_TICKET || '')
  token = token.toString();
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
      html: generateEmail(`https://tlc-mvp-server.vercel.app/volunteers/verifyInvite?invite=${token}`, name, 'Accept Invitation', body)
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