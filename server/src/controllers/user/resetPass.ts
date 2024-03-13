import { Request, Response } from "express"
import CryptoJS from "crypto-js";
import getData from "../../utils/getData";
import { VerifyAndUpdatePass } from "../../gql/user/mutations";

const resetPass = async (req: Request, res: Response) => {

  const password = CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_HASH_KEY || '')
  const variables = {
    token: req?.body?.token,
    password: password.toString(),
    tokenUpdated: null,
    isPassToBeReset: false
  }
  const data = await getData(VerifyAndUpdatePass, variables);

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message,
    });
  }
  if(!data?.data?.update_users?.affected_rows)
  {
    return res.status(404).json({
      status: 'error',
      message: 'User not found!',
    });
  }
  return res.status(200).json({
    status: 'success',
    message: 'Password reset successful!'
  })
} 

export default resetPass