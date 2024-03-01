import { Request, Response } from "express"
import getData from "../../utils/getData"
import { DeleteVolunteerByEmail } from "../../gql/volunteers/mutations"

const deleteVolunteer = async (req: Request, res: Response) => {
  const { email } = req.body
  const data = await getData(DeleteVolunteerByEmail, {email})

  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.delete_users?.affected_rows)
  {
    return res.status(200).json({
      status: 'error',
      message: "User deleted successfully!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "User you are deleting is not found at the moment. Please try again later!"
  })

}

export default deleteVolunteer