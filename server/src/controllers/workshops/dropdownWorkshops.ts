import { Request, Response } from "express";
import getData from "../../utils/getData";
import { workshopsDD } from "../../gql/workshops/queries";

const dropdownWorkshops = async (req: Request, res: Response) => {
  const { past } = req?.query

  if(past && +past >= 0) 
  {
    const data = await getData(workshopsDD, { limit: +past })
    if(data?.errors)
    {
      return res.status(400).json({
        status: 'error',
        message: data?.errors[0]?.message
      })
    }

    return res.status(200).json({
      status: "success",
      message: "Data fetched successfully!",
      data: {
        workshops: {
          past: data?.data?.past?.toReversed(),
          upcoming: data?.data?.upcoming
        }
      }
    })
  }

  return res.status(400).json({
    status: 'error',
    message: !past ? 'Please provide a value for past workshops' : 'Please provide a valid value for past workshops'
  })

}
 
export default dropdownWorkshops;