import { Request, Response } from "express"
import getData from "../../utils/getData"
import { DeleteVolunteersByEmail } from "../../gql/volunteers/mutations"
import jwt from "jsonwebtoken";

const deleteVolunteer = async (req: Request, res: Response) => {
  const { authorization } = req?.headers
  const { emails } = req.body

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

  const emailsToDel = emails.filter((email: string)=>token?.email!==email);
  if(emailsToDel?.length === 0)
  {
    return res.status(403).json({
      status: 'error',
      message: 'You cannot delete yourself!'
    })
  }

  const volunteers = emailsToDel.map((email: string)=>{
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