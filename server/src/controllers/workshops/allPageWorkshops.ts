import { Request, Response } from "express"
import getData from "../../utils/getData";
import { getPageWorkshops } from "../../gql/workshops/queries";
import { capitaliseStr, formatDate } from "../../utils/global";

const allPageWorkshops = async (req: Request, res: Response) => {
  const { 
    page: reqPage, 
    no_of_records: reqRecords,
    sort_by,
    order_of_sort,
    pastOrUpcoming,
    start,
    end,
    type,
    venue,
    city,
    value
  } = req.query
  let page: number = 1; 
  let no_of_records: number = 20;
  let filters = {}
  let order: any = {
    start_date: "desc"
  }

  if(pastOrUpcoming === 'upcoming')
  {
    filters = {
      start_date: {
        _gte: "now()"
      }
    }
  }
  else if(pastOrUpcoming === 'past')
  {
    filters = {
      start_date: {
        _lte: "now()"
      }
    }
  }

  if(start && end)
  {
    let strtDte: any = start
    let starting = formatDate(strtDte)
    let endDte: any = end
    let ending = formatDate(endDte)
    filters = {
      start_date: {
        _gte: starting
      },
      end_date: {
        _lte: ending
      }
    }
  }
  else if(start)
  {
    let strtDte: any = start
    let starting = formatDate(strtDte)
    filters = {
      start_date: {
        _gte: starting
      }
    }
  }
  else if(end)
  {
    let endDte: any = end
    let ending = formatDate(endDte)
    filters = {
      end_date: {
        _lte: ending
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
          types: {
            _like: `${val}%`
          }
        }, 
        {
          venue_city: {
            _like: `${val}%`
          }
        },
        {
          venue: {
            _like: `${val}%`
          }
        },
      ]
    }
  }

  if(type)
  {
    let types: any = type;
    types = capitaliseStr(types)
    filters = {
      ...filters,
      types: {
        _like: `${types}%`
      }
    }
  }
  if(venue)
  {
    let venues: any = venue;
    venues = capitaliseStr(venues)
    filters = {
      ...filters,
      venue: {
        _like: `${venues}%`
      }
    }
  }
  if(city)
  {
    let venue_city: any = city;
    venue_city = capitaliseStr(venue_city)
    filters = {
      ...filters,
      venue_city: {
        _like: `${venue_city}%`
      }
    }
  }

  if(sort_by && order_of_sort)
  {
    const sort = `${sort_by}`
    order = {};
    order[sort] = order_of_sort;
    if(sort_by === 'participants')
    {
      order = {
        workshop_participants_aggregate: {
          count: order_of_sort
        }
      }
    }
    if(sort_by === 'leads')
    {
      order = {
        workshop_lead_volunteers_aggregate: {
          count: order_of_sort
        }
      }
    }
    if(sort_by === 'volunteers')
    {
      order = {
        workshop_volunteers_aggregate: {
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
    if(sort_by === 'participants')
    {
      order = {
        workshop_participants_aggregate: {
          count: "asc"
        }
      }
    }
    if(sort_by === 'leads')
    {
      order = {
        workshop_lead_volunteers_aggregate: {
          count: "asc"
        }
      }
    }
    if(sort_by === 'volunteers')
    {
      order = {
        workshop_volunteers_aggregate: {
          count: "asc"
        }
      }
    }
  }
  else if(order_of_sort)
  {
    order = { start_date: order_of_sort }
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

  const variables = {
    offset: (page-1)*no_of_records,
    limit: no_of_records,
    where: filters,
    order_by: order
  }
  
  const data = await getData(getPageWorkshops, variables);
  if(data?.errors)
  {
    return res.status(400).json({
      status: 'error',
      message: data?.errors[0]?.message
    })
  }

  const workshops = data?.data?.workshops.map((workshop: any)=>{
    return {
      concluding_date: workshop?.concluding_date,
      end_date: workshop?.end_date,
      start_date: workshop?.start_date,
      id: workshop?.id,
      types: workshop?.types,
      venue: workshop?.venue,
      venue_city: workshop?.venue_city,
      lead_volunteers_count: workshop?.workshop_lead_volunteers_aggregate?.aggregate?.count,
      volunteers_count: workshop?.workshop_volunteers_aggregate?.aggregate?.count,
      participants_count: workshop?.workshop_participants_aggregate?.aggregate?.count,
    }
  })
  
  return res.status(200).json({
    status: "success",
    message: "Data fetched successfully!",
    data: {
      workshops,
      total_pages: Math.ceil(data?.data?.workshops_aggregate?.aggregate?.count/no_of_records),
      current_page: page
    }
  })

}

export default allPageWorkshops