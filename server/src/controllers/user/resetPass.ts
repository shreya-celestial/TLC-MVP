import { Request, Response } from "express"
import { hash } from 'bcrypt';
import getData from "../../utils/getData";
import { VerifyAndUpdatePass } from "../../gql/user/mutations";

const resetPass = async (req: Request, res: Response) => {

  const encryptPass = await hash(req.body.password, 12)
  const variables = {
    token: req?.body?.token,
    password: encryptPass,
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