import { Request, Response } from "express";
import getData from "../../utils/getData";
import { filterVolunteersQuery } from "../../gql/volunteers/queries";
import { capitaliseStr } from "../../utils/global";


const getFilteredVolunteers = async (req: Request, res: Response) => {
  const { 
    gender, 
    isAdminVerified, 
    isAdmin, 
    yoj, 
    email, 
    name, 
    state, 
    phone,
    page: reqPage,
    no_of_records: reqRecords,
    sort_by,
    order_of_sort
  } = req.query;

  let order: any = {
    id: "desc"
  }
  let filters: any = {
    isVerified: {
      _eq: true
    }
  }
  let page: number = 1; 
  let no_of_records: number = 20;

  if(sort_by && order_of_sort)
  {
    const sort = `${sort_by}`
    order = {};
    order[sort] = order_of_sort;
  }
  else if(sort_by)
  {
    const sort = `${sort_by}`
    order = {};
    order[sort] = "asc";
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

  if(gender)
  {
    filters = {
      ...filters,
      gender: {
        _eq: gender
      }
    }
  }
  if(isAdminVerified)
  {
    filters = {
      ...filters,
      isAdminVerified: {
        _eq: isAdminVerified === 'true' ? true : false 
      }
    }
  }
  if(isAdmin)
  {
    filters = {
      ...filters,
      isAdmin: {
        _eq: isAdmin === 'null' ? null : ( isAdmin === 'true' ? true : false)
      }
    }
  }
  if(yoj)
  {
    filters = {
      ...filters,
      yearOfJoining: {
        _eq: +yoj
      }
    }
  }
  if(email)
  {
    let mail: any = email
    mail = mail.toLowerCase()
    filters = {
      ...filters,
      email: {
        _like: `${mail}%`
      }
    }
  }
  if(name)
  {
    let nme: any = name
    nme = capitaliseStr(nme)
    filters = {
      ...filters,
      name: {
        _like: `${nme}%`
      }
    }
  }
  if(state)
  {
    let nme: any = state
    nme = capitaliseStr(nme)
    filters = {
      ...filters,
      state: {
        _like: `${nme}%`
      }
    }
  }
  if(phone)
  {
    filters = {
      ...filters,
      phoneNumber: {
        _like: `${phone}%`
      }
    }
  }
  
  const variables = {
    offset: (page-1)*no_of_records,
    limit: no_of_records,
    where: filters,
    order_by: order
  }

  const data = await getData(filterVolunteersQuery,variables);
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

export default getFilteredVolunteers;