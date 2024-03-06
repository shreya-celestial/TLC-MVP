import { Request, Response } from "express";
import { capitaliseStr, formatDate } from "../../utils/global";
import getData from "../../utils/getData";
import { updateMeeting } from "../../gql/meetings/mutations";

const editMeeting = async (req: Request, res: Response) => {
  const { id } = req?.params; 
  const enrollments = req?.body?.enrollments?.map((enrl: any)=>{
    return {
      enrollment_id: enrl,
      meeting_id: id
    }
  })
  const volunteers = req?.body?.volunteers?.map((vol: string)=>{
    return {
      volunteer_email: vol,
      meeting_id: id
    }
  })
  const variables = {
    date: formatDate(req?.body?.date),
    type: capitaliseStr(req?.body?.type),
    venue: capitaliseStr(req?.body?.venue),
    venue_city: capitaliseStr(req?.body?.venue_city),
    workshop_id: req?.body?.workshop_id || null,
    enrollments: enrollments,
    vols: volunteers,
    id
  }
  const data = await getData(updateMeeting, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.update_meetings?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Meeting updated successfully'
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })
}

export default editMeeting