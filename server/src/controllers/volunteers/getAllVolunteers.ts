import { Request, Response } from "express";
import getData from "../../utils/getData";
import { getVolunteers } from "../../gql/volunteers/queries";

const getAllVolunteers = async (req: Request, res: Response) => {
  const {page: reqPage, no_of_records: reqRecords} = req.query
  let page: number = 1; 
  let no_of_records: number = 20;

  if(reqPage && reqRecords)
  {
    page = +reqPage;
    no_of_records = +reqRecords;
  }
  else if(reqPage)
  {
    page = +reqPage;
  }
  else if(reqRecords)
  {
    no_of_records = +reqRecords;
  }

  const variables = {
    offset: (page-1)*no_of_records,
    limit: no_of_records
  }

  const data = await getData(getVolunteers, variables);
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  
  return res.status(200).json({
    status: 'success',
    message: 'Data fetched successfully!',
    data: {
      users: data?.data?.users,
      total_pages: Math.ceil(data?.data?.users_aggregate?.aggregate?.count/no_of_records),
      current_page: page
    }
  })
  
}

export default getAllVolunteers;