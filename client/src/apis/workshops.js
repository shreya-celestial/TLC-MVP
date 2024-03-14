const BASEURL = 'https://tlc-two.vercel.app/workshops';

export const workshops = async function ({ signal, queryKey }) {
  const [page, noOfRecords, filters] = queryKey;
  console.log(filters);

  for (const key in filters) {
    if (filters[key] === 'all' || filters[key] === '') {
      delete filters[key];
    }
  }

  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let pastOrUpcomingParam = filters.pastOrUpcoming
    ? `&pastOrUpcoming=${filters.pastOrUpcoming}${
        filters.pastOrUpcoming === 'upcoming'
          ? '&sort_by=start_date&order_of_sort=asc'
          : ''
      }`
    : '';

  let startDateParam = filters.startDate
    ? `&start_date=${(new Date(filters.startDate)).toLocaleDateString()}`
    : '';
  let endDateParam = filters.endDate
    ? `&end_date=${(new Date(filters.endDate)).toLocaleDateString()}`
    : '';

  const res = await fetch(
    `${BASEURL}/${pageParam}${noOfRecordsParam}${searchParam}${pastOrUpcomingParam}${startDateParam}${endDateParam}`,
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

export const getWorkshop = async function ({ signal, queryKey }) {
  const [id] = queryKey;
  const res = await fetch(`${BASEURL}/${id}/details`, signal);

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};

export const deleteWorkshops = async function (data) {
  const res = await fetch(`${BASEURL}`, {
    method: 'DELETE',
    body: JSON.stringify({ ids: data }),
    headers: {
      'Content-Type': 'application/json',
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

export const createWorkshop = async function (data) {
  const res = await fetch(`${BASEURL}`, {
    method: 'POST',
    body: JSON.stringify(data.body),
    headers: {
      'Content-Type': 'application/json',
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

export const updateWorkshop = async function (data) {
  console.log(data);
  const res = await fetch(`${BASEURL}/${data.id}/update`, {
    method: 'PUT',
    body: JSON.stringify(data.body),
    headers: {
      'Content-Type': 'application/json',
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
