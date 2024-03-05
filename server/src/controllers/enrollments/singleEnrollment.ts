import { Request, Response } from "express";
import getData from "../../utils/getData";
import { enrollmentByPK } from "../../gql/enrollments/queries";

const singleEnrollment = async (req: Request, res: Response) => {
  const { id } = req?.params;
  const data = await getData(enrollmentByPK, {id})
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  return res.status(200).json({
    status: 'success',
    message: 'Data fetched successfully!',
    data: data?.data?.enrollments_by_pk
  })
  res.json(data)
}

export default singleEnrollment