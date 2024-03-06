import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global";
import CryptoJS from 'crypto-js';
import getData from "../../utils/getData";
import { verifyVolunteerInvite } from "../../gql/volunteers/queries";
import { signupInvitation } from "../../gql/volunteers/mutations";

const inviteSignup = async (req: Request, res: Response) => {
  
  if(req.body.token && req.body.token !== 'null' && req.body.token !== 'NULL')
  {
    const verifyEmail = await getData(verifyVolunteerInvite, {token: req.body.token})
    if(verifyEmail?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: verifyEmail?.errors[0]?.message
      })
    }
    if(!verifyEmail?.data?.Invitations?.length)
    {
      return res.status(404).json({
        status: 'error',
        message: "Invitation doesn't exist."
      })
    }
    if(verifyEmail?.data?.Invitations[0]?.email !== (req.body.email.replace('%40', '@')).toLowerCase())
    {
      return res.status(404).json({
        status: 'error',
        message: "Invitation doesn't exist for the given email."
      })
    }
  
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
      email: (req.body.email.replace('%40', '@')).toLowerCase(),
      dob: formatDate(req.body.dob),
      password: encryptPass.toString(),
      isAdminVerified: true,
      isVerified: true,
      token: null,
      isAccepted: true
    };

    const data = await getData(signupInvitation, variables)
    if(data?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: data?.errors[0]?.message
      })
    }
    if(data?.data?.update_Invitations?.affected_rows && data?.data?.insert_users?.affected_rows)
    {
      return res.status(200).json({
        status: 'success',
        message: "User registered successffully!"
      })
    }
    return res.status(400).json({
      status: 'error',
      message: "Something went wrong. Please try again later!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "Invalid Invitation!"
  })

}

export default inviteSignup