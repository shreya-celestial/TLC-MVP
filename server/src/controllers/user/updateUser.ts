import { Request, Response } from "express";
import { capitaliseStr, formatDate } from "../../utils/global";
import getData from "../../utils/getData";
import { updateUserByEmail } from "../../gql/user/mutations";

const updateUser = async (req: Request, res: Response) => {
  const { email } = req?.params

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