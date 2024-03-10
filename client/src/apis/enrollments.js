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
    `http://localhost:8080/enrollments/${pageParam}${noOfRecordsParam}${searchParam}${genderParam}`,
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
