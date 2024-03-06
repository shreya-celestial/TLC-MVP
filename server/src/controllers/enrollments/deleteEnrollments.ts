import { Request, Response } from "express";
import getData from "../../utils/getData";
import { deleteEnrollmentsById } from "../../gql/enrollments/mutations";

const deleteEnrollments = async (req: Request, res: Response) => {
  const ids = req?.body?.ids?.map((id: any)=>{
    return {
      id: {
        _eq: id
      }
    }
  })
  const data = await getData(deleteEnrollmentsById, {ids})
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(!data?.data?.delete_enrollments?.affected_rows)
  {
    return res.status(400).json({
      status: 'error',
      message: 'Enrollments not found at this moment. Please try again later.'
    })
  }
  return res.status(200).json({
    status: 'success',
    message: 'Enrollments deleted successfully!'
  })
}

export default deleteEnrollments