import { Request, Response } from "express";
import { capitaliseStr, formatDate } from "../../utils/global";
import getData from "../../utils/getData";
import { updateUserByEmail } from "../../gql/user/mutations";
import jwt from "jsonwebtoken";

const updateUser = async (req: Request, res: Response) => {
  const {authorization} = req?.headers
  let token: any;
  try{
    let authToken: any = authorization
    authToken = authToken.split('Bearer ');
    authToken = authToken[1];
    token = jwt.verify(authToken, process.env.JWT_SECRET_KEY || '')
  }
  catch(err)
  {
    return res.status(401).json({
      status: 'error',
      message: 'Token expired! Please login again.'
    })
  }

  const { email } = req?.params

  if(token?.email !== email)
  {
    return res.status(403).json({
      status: 'error',
      message: 'You are not allowed to update user details!'
    })
  }

  const variables = {
    ...req?.body,
    name: capitaliseStr(req.body.name),
    state: capitaliseStr(req.body.state),
    location: capitaliseStr(req.body.location),
    city: capitaliseStr(req.body.city),
    email: email.toLowerCase(),
    dob: formatDate(req.body.dob),
  }

  const data = await getData(updateUserByEmail, variables)

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
    message: 'User updated successfully!'
  })
  
}

export default updateUser