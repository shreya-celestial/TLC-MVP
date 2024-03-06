import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global"
import getData from "../../utils/getData"
import { addMeetingsToWorkshop, insertNewWorkshop } from "../../gql/workshops/mutations"

const newWorkshop = async (req: Request, res: Response) => {
  const vols = req.body.vols.map((vol: string)=>{
    return {
      user_email: vol
    }
  })
  const leads = req.body.leads.map((lead: string)=>{
    return {
      user_email: lead
    }
  })
  const variables = {
    concluding_date: formatDate(req.body.concluding_date),
    end_date: formatDate(req.body.end_date),
    start_date: formatDate(req.body.start_date),
    venue: capitaliseStr(req.body.venue),
    types: capitaliseStr(req.body.types),
    venue_city: capitaliseStr(req.body.venue_city),
    vols,
    leads
  }
  const data = await getData(insertNewWorkshop, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(data?.data?.insert_workshops?.affected_rows)
  {
    const participants = req?.body?.participants?.map((part: any)=>{
      return {
        enrollment_id: part, 
        workshop_id: data?.data?.insert_workshops?.returning[0]?.id
      }
    })
    const meetings = req?.body?.meetings?.map((meeting: any)=>{
      return {
        id: {
          _eq: meeting
        }
      }
    })
    const vars = {
      workshop_id: data?.data?.insert_workshops?.returning[0]?.id,
      participants,
      meetings
    }
    const participantsData = await getData(addMeetingsToWorkshop, vars)
    if(participantsData?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: participantsData?.errors[0]?.message
      })
    }
    if(participantsData?.data?.insert_workshop_participants?.affected_rows >=0 )
    {
      return res.status(200).json({
        status: 'success',
        message: "Workshop created successfully",
        workshop_id: data?.data?.insert_workshops?.returning[0]?.id
      })
    }
  }
  return res.status(400).json({
    status: 'error',
    message: 'Something went wrong. Please try again later!'
  })
}

export default newWorkshop