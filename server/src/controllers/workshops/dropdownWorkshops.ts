import { Request, Response } from "express";
import getData from "../../utils/getData";
import { workshopsDD } from "../../gql/workshops/queries";
import { capitaliseStr } from "../../utils/global";

const dropdownWorkshops = async (req: Request, res: Response) => {
  const { past, search } = req?.query
  let variables: {
    limit ?: number,
    search ?: string
  } = {};

  if(past && +past >= 0) 
  {
    variables = { 
      ...variables,
      limit: +past 
    }
  }
  else
  {
    return res.status(400).json({
      status: 'error',
      message: !past ? 'Please provide a value for past workshops' : 'Please provide a valid value for past workshops'
    })
  }
  
  if(search)
  {
    let val: any = search;
    val = capitaliseStr(val)
    variables = { 
      ...variables,
      search: `${val}%`
    }
  }

  const data = await getData(workshopsDD, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  let pastwkshps = [];
  if(data?.data?.past?.length)
  {
    while (data?.data?.past?.length) {
      pastwkshps.push(data?.data?.past?.pop());
    }
  }

  return res.status(200).json({
    status: "success",
    message: "Data fetched successfully!",
    data: {
      workshops: {
        past: pastwkshps,
        upcoming: data?.data?.upcoming
      }
    }
  })

}
 
export default dropdownWorkshops;