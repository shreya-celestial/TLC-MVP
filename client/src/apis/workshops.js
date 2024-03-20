import moment from "moment";

const BASEURL = 'https://tlc-two.vercel.app/workshops';

export const workshops = async function ({ signal, queryKey, user }) {
  const [page, noOfRecords, filters] = queryKey;

  for (const key in filters) {
    if (filters[key] === 'all' || filters[key] === '') {
      delete filters[key];
    }
  }

  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let pastOrUpcomingParam = filters.pastOrUpcoming
    ? `&pastOrUpcoming=${filters.pastOrUpcoming}${filters.pastOrUpcoming === 'upcoming'
      ? '&sort_by=start_date&order_of_sort=asc'
      : ''
    }`
    : '';

  let startDateParam = filters.startDate
    ? `&start=${moment(filters.startDate).format('MM/DD/YYYY')}`
    : '';
  let endDateParam = filters.endDate
    ? `&end=${moment(filters.endDate).format('MM/DD/YYYY')}`
    : '';

  const res = await fetch(
    `${BASEURL}/${pageParam}${noOfRecordsParam}${searchParam}${pastOrUpcomingParam}${startDateParam}${endDateParam}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.key}`,
      },
    },
    signal
  );

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};

export const getWorkshop = async function ({ signal, queryKey, user }) {
  const [id] = queryKey;
  const res = await fetch(
    `${BASEURL}/${id}/details`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.key}`,
      },
    },
    signal
  );

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};

export const deleteWorkshops = async function ({ data, key }) {
  const res = await fetch(`${BASEURL}`, {
    method: 'DELETE',
    body: JSON.stringify({ ids: data }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
  });

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }
  const resData = await res.json();

  return resData;
};

export const createWorkshop = async function ({ body, key }) {
  const res = await fetch(`${BASEURL}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
  });

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};

export const updateWorkshop = async function ({ body, id, key }) {
  const res = await fetch(`${BASEURL}/${id}/update`, {
    method: 'PUT',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${key}`,
    },
  });

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};
