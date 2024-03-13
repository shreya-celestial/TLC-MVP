const BASEURL = 'https://tlc-two.vercel.app/volunteers';

export const volunteers = async function ({ signal, queryKey }) {
  const [page, noOfRecords, filters] = queryKey;

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

export const inviteVolunteer = async function (data) {
  const res = await fetch(`${BASEURL}/invite`, {
    method: 'POST',
    body: JSON.stringify(data),
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

export const getVolunteer = async function ({ signal, queryKey }) {
  const [email] = queryKey;

  const res = await fetch(`${BASEURL}/${email}/details`, signal);

  if (!res.ok) {
    const error = new Error('An error occured while fetching the data');
    error.code = res.status;
    error.info = await res.json();
    throw error;
  }

  const resData = await res.json();
  return resData;
};

export const updateVolunteerRole = async function (data) {
  const res = await fetch(`${BASEURL}/updateRole`, {
    method: 'PUT',
    body: JSON.stringify(data),
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

export const deleteVolunteers = async function (data) {
  const res = await fetch(`${BASEURL}/`, {
    method: 'DELETE',
    body: JSON.stringify({ emails: data }),
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

export const verifyVolunteer = async function (data) {
  const res = await fetch(`${BASEURL}/adminVerified`, {
    method: 'PUT',
    body: JSON.stringify(data),
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
