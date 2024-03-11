import { Request, Response } from "express"
import getData from "../../utils/getData"
import { DeleteVolunteersByEmail } from "../../gql/volunteers/mutations"

const deleteVolunteer = async (req: Request, res: Response) => {
  const { emails } = req.body

  const volunteers = emails.map((email: string)=>{
    return {
      email: {
        _eq: email
      }
    }
  })

  const variables = {
    where: {
      _or: [...volunteers], 
      isVerified: {
        _eq: true
      }
    },
    where1: {
      _or: [...volunteers]
    }
  }

  const data = await getData(DeleteVolunteersByEmail, variables)

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
      status: 'success',
      message: "Users deleted successfully!"
    })
  }

  return res.status(400).json({
    status: 'error',
    message: "Users you are deleting is not found at the moment. Please try again later!"
  })

}

export default deleteVolunteer