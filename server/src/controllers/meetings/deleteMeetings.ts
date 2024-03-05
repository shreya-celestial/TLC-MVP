import { Request, Response } from "express";
import getData from "../../utils/getData";
import { deleteMeetingsByPKs } from "../../gql/meetings/mutations";

const deleteMeetings = async (req: Request, res: Response) => {
  const ids = req?.body?.ids?.map((id: any)=>{
    return {
      id: {
        _eq: id
      }
    }
  })
  const data = await getData(deleteMeetingsByPKs, {ids})
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(!data?.data?.delete_meetings?.affected_rows)
  {
    return res.status(400).json({
      status: 'error',
      message: 'Meetings not found at this moment. Please try again later.'
    })
  }
  return res.status(200).json({
    status: 'success',
    message: 'Meetings deleted successfully!'
  })
}

export default deleteMeetings