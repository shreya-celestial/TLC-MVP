export const meetings = async function ({ signal, queryKey }) {
  const [page, noOfRecords, filters, mode] = queryKey;

  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let startDateParam = filters.startDate
    ? `&start_date=${filters.startDate}`
    : '';
  let endDateParam = filters.endDate ? `&end_date=${filters.endDate}` : '';
  let isNullParam = mode === 'Meetings' ? '&isNull=true' : '';

  const res = await fetch(
    `http://localhost:8080/meetings/${pageParam}${noOfRecordsParam}${searchParam}${startDateParam}${endDateParam}${isNullParam}`,
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

export const getMeeting = async function ({ signal, queryKey }) {
  const [id] = queryKey;

  const res = await fetch(
    `http://localhost:8080/meetings/${id}/details`,
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

export const createMeeting = async function (data) {
  const res = await fetch(`https://tlc-two.vercel.app/meetings`, {
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

export const updateMeeting = async function (data) {
  const res = await fetch(
    `https://tlc-two.vercel.app/meetings/${data.id}/edit`,
    {
      method: 'PUT',
      body: JSON.stringify(data.body),
      headers: {
        'Content-Type': 'application/json',
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

export const deleteMeetings = async function (data) {
  console.log(JSON.stringify({ ids: data }));
  const res = await fetch(`http://localhost:8080/meetings/`, {
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
