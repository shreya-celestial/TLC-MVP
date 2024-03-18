import { Request, Response } from "express"
import { capitaliseStr } from "../../utils/global"
import getData from "../../utils/getData"
import { allEnrollments } from "../../gql/enrollments/queries"

const allPageEnrollments = async (req: Request, res: Response) => {
  const { 
    page: reqPage, 
    no_of_records: reqRecords, 
    sort_by,
    order_of_sort,
    gender,
    enrolled_is_null,
    value 
  } = req?.query

  let order: any = {
    id: "desc"
  }
  let filters: any = {}
  let page: number = 1; 
  let no_of_records: number = 20;

  if(sort_by && order_of_sort)
  {
    const sort = `${sort_by}`
    order = {};
    order[sort] = order_of_sort;
    if(sort_by === 'children')
    {
      order = {
        children_aggregate: {
          count: order_of_sort
        }
      }
    }
  }
  else if(sort_by)
  {
    const sort = `${sort_by}`
    order = {};
    order[sort] = "asc";
    if(sort_by === 'children')
    {
      order = {
        children_aggregate: {
          count: "asc"
        }
      }
    }
  }
  else if(order_of_sort)
  {
    order = { id: order_of_sort }
  }

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

  if(gender) {
    filters = {
      gender: {
        _eq: gender
      }
    }
  }
  if(value)
  {
    let phone: any = value;
    const email = phone.toLowerCase();
    const name = capitaliseStr(phone);
    filters = {
      ...filters,
      _or: [
        {
          email: {
            _like: `${email}%`
          }
        }, 
        {
          name: {
            _like: `${name}%`
          }
        }, 
        {
          mobile_number: {
            _like: `${phone}%`
          }
        },
        {
          state: {
            _like: `${name}%`
          }
        }, 
        {
          enrolled_by: {
            _like: `${email}%`
          }
        }
      ]
    }
  }

  if(enrolled_is_null)
  {
    filters = {
      ...filters,
      enrolled_by: {
        _is_null: enrolled_is_null === 'true' ? true : false
      }
    }
  }

  const variables = {
    offset: (page-1)*no_of_records,
    limit: no_of_records,
    where: filters,
    order_by: order
  }

  const data = await getData(allEnrollments, variables);
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }
  
  const enrollments = data?.data?.enrollments?.map((enrl: any)=>{
    return {
      address: enrl?.address,
      city: enrl?.city,
      dob: enrl?.dob,
      email: enrl?.email,
      gender: enrl?.gender,
      id: enrl?.id,
      mobile_number: enrl?.mobile_number,
      name: enrl?.name,
      pincode: enrl?.pincode,
      state: enrl?.state,
      children: enrl?.children_aggregate?.aggregate?.count,
      enrollment_volunteer: enrl?.enrollment_done_by
    }
  })

  return res.status(200).json({
    status: "success",
    message: "Data fetched successfully!",
    data: {
      enrollments,
      total_pages: Math.ceil(data?.data?.enrollments_aggregate?.aggregate?.count/no_of_records),
      current_page: page
    }
  })

}

export default allPageEnrollments