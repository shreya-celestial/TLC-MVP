const dateFormatter = (params) => {
  const date = new Date(params?.value);
  const dateNumber =
    date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
  let monthNumber = +date.getMonth() + 1;
  monthNumber = monthNumber < 10 ? `0${monthNumber}` : monthNumber;
  const formattedDate =
    dateNumber + '-' + monthNumber + '-' + date.getFullYear();
  return formattedDate;
};

const colDefs = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    headerName: '',
    minWidth: 50,
    resizable: false,
  },
  {
    field: 'name',
    filter: false,
    editable: false,
    headerName: 'Name',
    minWidth: 200,
  },
  {
    field: 'gender',
    filter: false,
    editable: false,
    minWidth: 100,
    headerName: 'Gender',
  },
  {
    field: 'children',
    filter: false,
    editable: false,
    minWidth: 100,
    headerName: 'Children',
  },
  {
    field: 'email',
    filter: false,
    editable: false,
    minWidth: 250,
    headerName: 'Email ID',
    cellStyle: { textTransform: 'lowercase' },
  },
  {
    field: 'mobile_number',
    filter: false,
    editable: false,
    minWidth: 150,
    headerName: 'Phone Number',
  },
  {
    field: 'state',
    filter: false,
    editable: false,
    minWidth: 150,
    headerName: 'Location',
  },
  {
    field: 'enrollment_volunteer',
    filter: false,
    editable: false,
    minWidth: 230,
    valueGetter: (params) => params.data.enrollment_volunteer?.email || '-',
    cellStyle: { textTransform: 'lowercase' },
    headerName: 'Enrolled By',
  },
];

export const ChildrenColDef = [
  {
    field: 'name',
    headerName: 'Name',
    minWidth: 150,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    minWidth: 100,
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    minWidth: 120,
    cellRenderer: dateFormatter,
  },
];

export const enrollPageWorkshopColDEf = [
  { field: 'types', headerName: 'Workshop Name', minWidth: 200 },
  { field: 'venue', headerName: 'Venue', minWidth: 250 },
  {
    field: 'start_date',
    headerName: 'Start Date',
    minWidth: 120,
    cellRenderer: dateFormatter,
  },
  {
    field: 'end_date',
    headerName: 'End Date',
    minWidth: 120,
    cellRenderer: dateFormatter,
  },
];

export const ChildrenPopupColdef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'dob', headerName: 'Date of Birth', cellRenderer: dateFormatter },
];

export default colDefs;
