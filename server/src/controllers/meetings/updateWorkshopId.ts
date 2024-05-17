import { Request, Response } from "express";
import getData from "../../utils/getData";
import { updateMeetingWorkshopId } from "../../gql/meetings/mutations";

const updateWorkshopId = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { workshop_id } = req.body;

  if(!id)
  {
    return res.status(400).json({
      status: 'error',
      message: 'Something went wrong. Please try again later!'
    })
  }

  const data = await getData(updateMeetingWorkshopId, { id, workshop_id })
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  if(data?.data?.update_meetings_by_pk)
  {
    return res.status(200).json({
      status: 'success',
      message: 'Meeting updated successfully'
    })
  }

  return res.status(400).json({
    status: 'error',
    message: 'Please provide with a valid meetings Id!'
  })
  
}
 
export default updateWorkshopId;