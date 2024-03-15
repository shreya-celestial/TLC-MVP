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
    field: 'type',
    filter: false,
    editable: false,
    headerName: 'Type',
    minWidth: 180,
  },
  {
    field: 'workshop_type',
    filter: false,
    editable: false,
    headerName: 'Workshop',
    minWidth: 250,
  },
  {
    field: 'date',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Date',
    cellRenderer: dateFormatter,
  },
  {
    field: 'venue',
    filter: false,
    editable: false,
    minWidth: 250,
    headerName: 'Venue',
  },
  {
    field: 'venue_city',
    filter: false,
    editable: false,
    minWidth: 150,
    headerName: 'City',
  },
  {
    field: 'volunteers',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Volunteers',
  },
  {
    field: 'enrollments',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Enrollments',
  },
];

export const MeetingPageVolunteersColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'phonenumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

export const MeetingPageEnrollmentsColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'children', headerName: 'Children' },
  { field: 'mobile_number', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

export const VolunteersPopupMeetingColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

const RenderChildren = (params) => {
  return <p>{params.data.children.length}</p>;
};

export const MeetingPopupEnrollmentsColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'children', headerName: 'Children', cellRenderer: RenderChildren },
  { field: 'mobile_number', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

export default colDefs;
