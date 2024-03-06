import { Request, Response } from "express";
import { capitaliseStr, formatDate } from "../../utils/global";
import getData from "../../utils/getData";
import { addMeeting } from "../../gql/meetings/mutations";

const newMeeting = async (req: Request, res: Response) => {
  const enrollments = req?.body?.enrollments?.map((enrl: any)=>{
    return {
      enrollment_id: enrl
    }
  })
  const volunteers = req?.body?.volunteers?.map((vol: string)=>{
    return {
      volunteer_email: vol
    }
  })
  const variables = {
    date: formatDate(req?.body?.date),
    type: capitaliseStr(req?.body?.type),
    venue: capitaliseStr(req?.body?.venue),
    venue_city: capitaliseStr(req?.body?.venue_city),
    workshop_id: req?.body?.workshop_id || null,
    meetings_enrollments: enrollments,
    meetings_volunteers: volunteers
  }
  const data = await getData(addMeeting, variables);
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.insert_meetings?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Meeting created successfully'
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })
}

export default newMeeting