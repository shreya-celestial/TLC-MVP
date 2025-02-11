import { BASEURL } from "./global";
const BASE_URL = `${BASEURL}/enrollments`

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

export const createVolunteerEnrollment = async function ({ body, key }) {
  const res = await fetch(`${BASE_URL}/volunteerbased`, {
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

export const createEnrollment = async function ({ body }) {
  const res = await fetch(`${BASE_URL}`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
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

export const inviteEnrollment = async function ({ data, key }) {
  const res = await fetch(`${BASE_URL}/invite`, {
    method: 'POST',
    body: JSON.stringify(data),
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


export const getLinkForEnrollInvite = async function ({ user }) {
  const res = await fetch(
    `${BASE_URL}/newEnrolLink?linkBy=${user.email}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${user.key}`,
      },
    }
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