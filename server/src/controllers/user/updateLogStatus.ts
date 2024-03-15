import { Request, Response } from "express";
import CryptoJS from 'crypto-js';
import getData from "../../utils/getData";
import { verifyAndUpdateKey } from "../../gql/user/mutations";
import jwt from "jsonwebtoken";

const updateLogStatus = async (req: Request, res: Response) => {
  const {authorization} = req?.headers
  let token: any;
  if(!authorization)
  {
    return res.status(401).json({
      status: 'error',
      message: 'Please provide an authorization token!'
    })
  }
  let authToken: any = authorization.split('Bearer ');
  if(authToken?.length<=1)
  {
    return res.status(401).json({
      status: 'error',
      message: 'Please provide a valid authorization token!'
    })
  }

  authToken = authToken[1];
  try{
    token = jwt.verify(authToken, process.env.JWT_SECRET_KEY || '')
  }
  catch(err)
  {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired! Please login again.'
    })
  }
  
  let updatedToken: any;
  if((token?.exp - (new Date()).getSeconds()) > 30*1000)
  {
    updatedToken = authToken
  }
  else {
    const tokenObj = {
      email: token?.email,
      isAdmin: token?.isAdmin
    }
    updatedToken = jwt.sign(tokenObj, process.env.JWT_SECRET_KEY || '', {
      expiresIn: '24h'
    })
  }
  
  let isLoggedIn:any = updatedToken
  
  const { isLoggingOut } = req?.body
  if(isLoggingOut)
  {
    isLoggedIn = null;
  }

  const data = await getData(verifyAndUpdateKey, {
    email: token?.email, key: authToken, isLoggedIn
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
    key: updatedToken
  }

  return res.status(200).json({
    status: 'success',
    message: 'User still logged in!',
    user: userToSend
  })
}

export default updateLogStatus