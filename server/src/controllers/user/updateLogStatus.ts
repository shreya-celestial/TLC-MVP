import { Request, Response } from "express";
import CryptoJS from 'crypto-js';
import getData from "../../utils/getData";
import { verifyAndUpdateKey } from "../../gql/user/mutations";

const updateLogStatus = async (req: Request, res: Response) => {
  const {email, key, isLoggingOut} = req?.body

  if(!key || key === 'null' || key === 'NULL')
  {
    return res.status(400).json({
      status: 'error',
      message: 'Provide a valid key!'
    })
  }
  
  const newKey = CryptoJS.AES.encrypt(email, process.env.LOGIN_KEY || '')
  let isLoggedIn: string | null = newKey.toString();

  if(isLoggingOut)
  {
    isLoggedIn = null;
  }

  const data = await getData(verifyAndUpdateKey, {
    email, key, isLoggedIn
  })

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(!data?.data?.update_users?.affected_rows)
  {
    return res.status(404).json({
      status: 'error',
      message: 'User not found at this moment. Please try logging in again!'
    })
  }

  if(isLoggingOut)
  {
    return res.status(200).json({
      status: 'success',
      message: 'User successfully logged out!'
    })
  }

  let userToSend = {
    ...data?.data?.update_users?.returning[0],
    key: newKey.toString()
  }

  return res.status(200).json({
    status: 'success',
    message: 'User still logged in!',
    user: userToSend
  })
}

export default updateLogStatus