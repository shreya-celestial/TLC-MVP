import { Request, Response } from "express"
import getData from "../../utils/getData";
import { deleteWorkshopById } from "../../gql/workshops/mutations";

const deleteWorkshop = async (req: Request, res: Response) => {
  const { ids } = req?.body;
  const deleteIds = ids.map((id: number)=>{
    return {
      id: {
        _eq: id
      }
    }
  })
  const data = await getData(deleteWorkshopById, {deleteIds})
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  if(!data?.data?.delete_workshops?.affected_rows)
  {
    return res.status(400).json({
      status: 'error',
      message: 'Workshops not found at this moment. Please try again later.'
    })
  }
  return res.status(200).json({
    status: 'success',
    message: 'Workshops deleted successfully!'
  })
}

export default deleteWorkshop