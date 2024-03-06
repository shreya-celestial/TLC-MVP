import { Request, Response } from "express"
import { capitaliseStr, formatDate } from "../../utils/global"
import getData from "../../utils/getData"
import { updateWorkshopById } from "../../gql/workshops/mutations"

const updateWorkshop = async (req: Request, res: Response) => {
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
  const variables = {
    ...req.body,
    id: req.params.id,
    concluding_date: formatDate(req.body.concluding_date),
    end_date: formatDate(req.body.end_date),
    start_date: formatDate(req.body.start_date),
    venue: capitaliseStr(req.body.venue),
    types: capitaliseStr(req.body.types),
    venue_city: capitaliseStr(req.body.venue_city),
    vols,
    leads
  }
  const data = await getData(updateWorkshopById, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  return res.status(200).json({
    status: 'success',
    message: 'Workshop updated successfully!'
  })
}

export default updateWorkshop