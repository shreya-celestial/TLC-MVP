const BASE_URL = 'https://tlc-two.vercel.app/enrollments';

export const enrollments = async function ({ signal, queryKey, user }) {
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
  let enrolledParam =
    filters.enrolledBy === 'self'
      ? `&enrolled_is_null=true`
      : filters.enrolledBy === 'others'
      ? `&enrolled_is_null=false`
      : ``;

  const res = await fetch(
    `${BASE_URL}/${pageParam}${noOfRecordsParam}${searchParam}${genderParam}${enrolledParam}`,
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

export const getEnrollment = async function ({ signal, queryKey, user }) {
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

export const createEnrollment = async function ({ body, key }) {
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

export const updateEnrollment = async function ({ body, id, key }) {
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

export const deleteEnrollments = async function ({ data, key }) {
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
