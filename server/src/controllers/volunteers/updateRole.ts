import { Request, Response } from "express"
import getData from "../../utils/getData"
import { UpdateVolunteerByEmail } from "../../gql/volunteers/mutations"

const updateRole = async (req: Request, res: Response) => {
  const { email, isAdmin } = req.body
  const variables = {email,isAdmin}
  const data = await getData(UpdateVolunteerByEmail, variables)

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
      status: 'error',
      message: "User updated successfully!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "User you are updating is not found at the moment. Please try again later!"
  })

}

export default updateRole