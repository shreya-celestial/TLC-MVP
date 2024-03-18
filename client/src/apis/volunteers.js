const BASEURL = 'https://tlc-two.vercel.app/volunteers';

export const volunteers = async function ({ signal, queryKey, user }) {
  let [page, noOfRecords, filters] = queryKey;

  for (const key in filters) {
    if (
      filters[key] === 'all' ||
      filters[key] === '' ||
      filters[key]?.orderBy === 'none'
    ) {
      delete filters[key];
    }
  }

  let pageParam = page ? `?page=${page}` : `?page=1`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters?.search ? `&value=${filters.search}` : '';
  let genderParam = filters?.gender ? `&gender=${filters.gender}` : '';
  let isAdminParam = filters?.role
    ? `&isAdmin=${filters?.role === 'admin' ? 'true' : 'false'}`
    : '';
  let isAdminVerifiedParam = filters?.status
    ? `&isAdminVerified=${filters.status === 'verified' ? 'true' : 'false'}`
    : '';
  let sortParam = filters?.sort
    ? `&sort_by=${filters.sort.sortBy}&order_of_sort=${filters.sort.orderBy}`
    : '';

  const res = await fetch(
    `${BASEURL}/searchAndFilter${pageParam}${noOfRecordsParam}${searchParam}${genderParam}${isAdminParam}${isAdminVerifiedParam}${sortParam}`,
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

export const inviteVolunteer = async function ({ data, key }) {
  const res = await fetch(`${BASEURL}/invite`, {
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

export const getVolunteer = async function ({ signal, queryKey, user }) {
  const [email] = queryKey;

  const res = await fetch(
    `${BASEURL}/${email}/details`,
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

export const updateVolunteerRole = async function ({ email, isAdmin, key }) {
  const res = await fetch(`${BASEURL}/updateRole`, {
    method: 'PUT',
    body: JSON.stringify({ email: email, isAdmin: isAdmin }),
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

export const deleteVolunteers = async function ({ key, data }) {
  const res = await fetch(`${BASEURL}/`, {
    method: 'DELETE',
    body: JSON.stringify({ emails: data }),
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

export const verifyVolunteer = async function ({ isAdmin, email, key }) {
  const res = await fetch(`${BASEURL}/adminVerified`, {
    method: 'PUT',
    body: JSON.stringify({ isAdmin, email }),
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
