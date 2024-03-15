const BASE_URL = 'https://tlc-two.vercel.app/meetings';

export const meetings = async function ({ signal, queryKey, user }) {
  const [page, noOfRecords, filters, mode] = queryKey;

  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let startDateParam = filters.startDate
    ? `&start_date=${new Date(filters.startDate).toLocaleDateString()}`
    : '';
  let endDateParam = filters.endDate
    ? `&end_date=${new Date(filters.endDate).toLocaleDateString()}`
    : '';
  let isNullParam = mode === 'Meetings' ? '&isNull=true' : '';

  const res = await fetch(
    `${BASE_URL}/${pageParam}${noOfRecordsParam}${searchParam}${startDateParam}${endDateParam}${isNullParam}`,
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

export const getMeeting = async function ({ signal, queryKey, user }) {
  const [id] = queryKey;

  const res = await fetch(
    `${BASE_URL}/${id}/details`,
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

export const createMeeting = async function ({ body, key }) {
  const res = await fetch(`${BASE_URL}`, {
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

export const updateMeeting = async function ({ body, id, key }) {
  const res = await fetch(`${BASE_URL}/${id}/edit`, {
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

export const deleteMeetings = async function ({ data, key }) {
  const res = await fetch(`${BASE_URL}/`, {
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
