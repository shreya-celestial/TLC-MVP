import { Request, Response } from "express"
import getData from "../../utils/getData"
import { updateAdminVerification } from "../../gql/volunteers/mutations"

const adminVerified = async (req: Request, res: Response) => {
  const { email, isAdmin } = req.body

  const variables = {
    email,
    isVerified: true,
    isAdminVerified: false,
    isAdmin,
    isAdminVerifiedUpdated: true
  }

  const data = await getData(updateAdminVerification,variables);
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.update_users?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'User verified successfully!'
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'User already verified!'
  })

}

export default adminVerified