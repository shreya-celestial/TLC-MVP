export const meetings = async function ({ signal, queryKey }) {
  const [page, noOfRecords, filters] = queryKey;

  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let startDateParam = filters.startDate
    ? `&start_date=${filters.startDate}`
    : '';
  let endDateParam = filters.endDate ? `&end_date=${filters.endDate}` : '';

  const res = await fetch(
    `http://localhost:8080/meetings/${pageParam}${noOfRecordsParam}${searchParam}${startDateParam}${endDateParam}`,
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
