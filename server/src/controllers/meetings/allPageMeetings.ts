import { Request, Response } from "express";
import { capitaliseStr, formatDate } from "../../utils/global";
import getData from "../../utils/getData";
import { getPageMeetings } from "../../gql/meetings/queries";

const allPageMeetings = async (req: Request, res: Response) => {
  const { 
    page: reqPage, 
    no_of_records: reqRecords, 
    sort_by,
    order_of_sort,
    start_date,
    end_date,
    value,
    isNull 
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
    if(sort_by === 'workshop')
    {
      order = {
        workshop: {
          types: order_of_sort
        }
      }
    }
    if(sort_by === 'enrollments')
    {
      order = {
        meetings_enrollments_aggregate: {
          count: order_of_sort
        }
      }
    }
    if(sort_by === 'volunteers')
    {
      order = {
        meetings_volunteers_aggregate: {
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
    if(sort_by === 'workshop')
    {
      order = {
        workshop: {
          types: "asc"
        }
      }
    }
    if(sort_by === 'enrollments')
    {
      order = {
        meetings_enrollments_aggregate: {
          count: "asc"
        }
      }
    }
    if(sort_by === 'volunteers')
    {
      order = {
        meetings_volunteers_aggregate: {
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

  if(start_date && end_date)
  {
    let end: any = end_date
    let start: any = start_date
    filters = {
      date: {
        _lte: formatDate(end), 
        _gte: formatDate(start)
      }
    }
  }
  else if(start_date)
  {
    let start: any = start_date
    filters = {
      date: {
        _gte: formatDate(start)
      }
    }
  }
  else if(end_date)
  {
    let end: any = end_date
    filters = {
      date: {
        _lte: formatDate(end)
      }
    }
  }

  if(value)
  {
    let val: any = value;
    val = capitaliseStr(val)
    filters = {
      ...filters,
      _or: [
        {
          workshop: {
            types: {
              _like: `${val}%`
            }
          }
        }, 
        {
          venue_city: {
            _like: `${val}%`
          }
        }
      ]
    }
  }
  if(isNull)
  {
    filters = {
      ...filters,
      workshop_id: {
        _is_null: true
      }
    }
  }

  const variables = {
    offset: (page-1)*no_of_records,
    limit: no_of_records,
    where: filters,
    order_by: order
  }

  const data = await getData(getPageMeetings, variables)
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  const meetings = data?.data?.meetings?.map((meeting: any)=>{
    return {
      type: meeting?.type,
      venue: meeting?.venue,
      venue_city: meeting?.venue_city,
      date: meeting?.date,
      id: meeting?.id,
      workshop_type: meeting?.workshop?.types,
      volunteers: meeting?.meetings_volunteers_aggregate?.aggregate?.count,
      enrollments: meeting?.meetings_enrollments_aggregate?.aggregate?.count
    }
  })

  return res.status(200).json({
    status: "success",
    message: "Data fetched successfully!",
    data: {
      meetings,
      total_pages: Math.ceil(data?.data?.meetings_aggregate?.aggregate?.count/no_of_records),
      current_page: page
    }
  })
}

export default allPageMeetings