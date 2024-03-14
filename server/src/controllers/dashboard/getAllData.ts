import { Request, Response } from "express";
import getData from "../../utils/getData";
import { getDashboardData } from "../../gql/dashboard/queries";

const getAllData = async (req: Request, res: Response) => {
  let date = new Date();
  date.setMonth(date.getMonth() - 7)
  const data = await getData(getDashboardData, {
    compareDate: date
  })
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  const dataToSend = {
    volunteers: data?.data?.users_aggregate?.aggregate?.count,
    workshops: data?.data?.workshops_aggregate?.aggregate?.count,
    meetings: data?.data?.meetings_aggregate?.aggregate?.count,
    enrollments: data?.data?.enrollments_aggregate?.aggregate?.count,
    past_six_months_enrollments: [...data?.data?.enrollments]
  }
  return res.status(200).json({
    status: "success",
    message: "Data fetched successfully!",
    data: dataToSend
  })
}

export default getAllData