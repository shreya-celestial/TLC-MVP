import { Request, Response } from "express";
import getData from "../../utils/getData";
import { workshopDetails } from "../../gql/workshops/queries";

const singleWorkshop = async (req: Request, res: Response) => {
  const { id } = req.params;
  
  const data = await getData(workshopDetails,{id})
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(data?.data?.workshops_by_pk)
  {
    return res.status(200).json({
      status: 'success',
      message: "Data fetched successfully!",
      data: {
        workshop: {
          ...data?.data?.workshops_by_pk,
          lead_volunteers_count: data?.data?.workshops_by_pk?.workshop_lead_volunteers?.length,
          volunteers_count: data?.data?.workshops_by_pk?.workshop_volunteers?.length
        }
      }
    })
  }
  return res.status(400).json({
    status: 'error',
    message: 'No workshop exists for the given id'
  })
}

export default singleWorkshop