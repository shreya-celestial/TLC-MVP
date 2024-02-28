import { Response } from "express"
import CryptoJS from "crypto-js";
import getData from "../../utils/getData";
import { VerifyAndUpdatePass } from "../../gql/mutations";

const resetPass = async (req: any, res: Response) => {
  const cookieStr = req?.headers?.cookies;
  const cookies = cookieStr?.split('; ');
  let tokenCookie = cookies?.find((cookie: string)=> (cookie.split('token=').length>1))
  tokenCookie = tokenCookie?.split('token=')[1]

  const password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_HASH_KEY || '')
  
  const variables = {
    token: tokenCookie,
    password: password.toString(),
    tokenUpdated: null,
    isPassToBeReset: false
  }
  const data = await getData(VerifyAndUpdatePass, variables);

  if(data?.errors)
  {
    return res.clearCookie('token').status(400).json({
      status: 'error',
      message: data?.errors[0]?.message,
    });
  }
  if(!data?.data?.update_users?.affected_rows)
  {
    return res.clearCookie('token').status(400).json({
      status: 'error',
      message: 'User not found!',
    });
  }
  return res.clearCookie('token').status(200).json({
    status: 'success',
    message: 'Password reset successful!'
  })
} 

export default resetPass