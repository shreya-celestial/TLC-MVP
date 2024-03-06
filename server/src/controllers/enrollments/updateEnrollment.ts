import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global";
import getData from "../../utils/getData";
import { editEnrollment } from "../../gql/enrollments/mutations";

const updateEnrollment = async (req: Request, res: Response) => {
  const {id} = req?.params;
  const children = req?.body?.children?.map((child: any)=>{
    return {
      dob: formatDate(child.dob), 
      gender: child.gender, 
      name: capitaliseStr(child.name),
      enrollment_id: id
    }
  })
  const variables = {
    ...req?.body,
    name: capitaliseStr(req?.body?.name),
    email: req?.body?.email?.toLowerCase(),
    children, 
    id
  }

  const data = await getData(editEnrollment, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(data?.data?.update_enrollments?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Enrollment updated successfully'
    })
  }
  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })
}

export default updateEnrollment