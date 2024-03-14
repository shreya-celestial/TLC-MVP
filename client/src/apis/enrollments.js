const BASE_URL = 'https://tlc-two.vercel.app/enrollments';

export const enrollments = async function ({ signal, queryKey }) {
  const [page, noOfRecords, filters] = queryKey;

  for (const key in filters) {
    if (filters[key] === 'all' || filters[key] === '') {
      delete filters[key];
    }
  }

  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let genderParam = filters.gender ? `&gender=${filters.gender}` : '';

  const res = await fetch(
    `${BASE_URL}/${pageParam}${noOfRecordsParam}${searchParam}${genderParam}`,
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

export const getEnrollment = async function ({ signal, queryKey }) {
  const [id] = queryKey;

  const res = await fetch(`${BASE_URL}/${id}/details`, signal);

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};

export const createEnrollment = async function (data) {
  const res = await fetch(`${BASE_URL}`, {
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

export const updateEnrollment = async function (data) {
  const res = await fetch(`${BASE_URL}/${data.id}/edit`, {
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

export const deleteEnrollments = async function (data) {
  const res = await fetch(`${BASE_URL}/`, {
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
