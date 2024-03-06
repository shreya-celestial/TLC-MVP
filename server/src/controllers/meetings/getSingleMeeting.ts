import { Request, Response } from "express";
import getData from "../../utils/getData";
import { getMeetingByPk } from "../../gql/meetings/queries";

const getSingleMeeting = async (req: Request, res: Response) => {
  const { id } = req?.params;
  const data = await getData(getMeetingByPk, {id})
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
    data: data?.data?.meetings_by_pk
  })
}

export default getSingleMeeting