import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global"
import getData from "../../utils/getData"
import { addEnrollment } from "../../gql/enrollments/mutations"

const newEnrollment = async (req: Request, res: Response) => {
  const children = req?.body?.children?.map((child: any)=>{
    return {
      dob: formatDate(child.dob), 
      gender: child.gender, 
      name: capitaliseStr(child.name)
    }
  })

  const variables = {
    ...req?.body,
    name: capitaliseStr(req?.body?.name),
    email: req?.body?.email?.toLowerCase(),
    children
  }

  const data = await getData(addEnrollment, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.insert_enrollments?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Enrollment inserted successfully'
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })

}

export default newEnrollment