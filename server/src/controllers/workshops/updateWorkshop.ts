import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global"
import getData from "../../utils/getData"
import { updateWorkshopById, updateWorkshopMeetings } from "../../gql/workshops/mutations"

const updateWorkshop = async (req: Request, res: Response) => {
  if(req?.body?.meetings?.length === 0)
  {
    return res.status(400).json({
      status: 'error',
      message: 'Workshop meetings required!'
    })
  }
  const vols = req.body.vols.map((vol: string)=>{
    return {
      user_email: vol,
      workshop_id: req?.params?.id
    }
  })
  const leads = req.body.leads.map((lead: string)=>{
    return {
      user_email: lead,
      workshop_id: req?.params?.id
    }
  })
  const participants = req?.body?.participants?.map((part: any)=>{
    return {
      enrollment_id: part, 
      workshop_id: req?.params?.id
    }
  })
  const variables = {
    id: req.params.id,
    concluding_date: formatDate(req.body.concluding_date),
    end_date: formatDate(req.body.end_date),
    start_date: formatDate(req.body.start_date),
    venue: capitaliseStr(req.body.venue),
    types: capitaliseStr(req.body.types),
    venue_city: capitaliseStr(req.body.venue_city),
    vols,
    leads, 
    participants,
    workshop_id: null
  }
  const data = await getData(updateWorkshopById, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  const meeting = req?.body?.meetings?.map((meeting: any)=>{
    return {
      id: {
        _eq: meeting
      }
    }
  })
  const meetingData = await getData(updateWorkshopMeetings, {
    meeting, 
    id: req?.params?.id
  })
  if(meetingData?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: meetingData?.errors[0]?.message
    })
  }
  if(meetingData?.data?.update_meetings?.affected_rows)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Workshop updated successfully!'
    })
  }
  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })
}

export default updateWorkshop