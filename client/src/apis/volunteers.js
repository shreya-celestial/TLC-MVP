export const volunteers = async function ({
  signal,
  page,
  noOfRecords,
  filters,
}) {
  let pageParam = page ? `?page=${page}` : `?page=${1}`;
  let noOfRecordsParam = noOfRecords ? `&no_of_records=${noOfRecords}` : '';
  let searchParam = filters.search ? `&value=${filters.search}` : '';
  let genderParam = filters.gender ? `&gender=${filters.gender}` : '';
  let isAdminParam = filters.role
    ? `&isAdmin=${filters.role === 'admin' ? 'true' : 'false'}`
    : '';
  let isAdminVerifiedParam = filters.status
    ? `&isAdminVerified=${filters.status === 'verified' ? 'true' : 'false'}`
    : '';

  // let filterStr;
  // if (filters) {
  //   filterStr = `&value=${filters.search}&gender=${filters.gender}&isAdmin=${
  //     filters.role === 'admin' ? 'true' : 'false'
  //   }&isAdminVerified=${filters.status === 'verified' ? 'true' : 'false'}`;
  // } else {
  //   filterStr = '';
  // }

  const res = await fetch(
    `http://localhost:8080/volunteers/searchAndFilter${pageParam}${noOfRecordsParam}${searchParam}${genderParam}${isAdminParam}${isAdminVerifiedParam}`,
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
