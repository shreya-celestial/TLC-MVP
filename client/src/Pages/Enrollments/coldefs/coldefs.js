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
    minWidth: 200,
    headerName: 'Location',
  },
];

export const ChildrenColDef = [
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'gender',
    headerName: 'Gender',
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
  },
];

export const enrollPageWorkshopColDEf = [
  { field: 'types', headerName: 'Workshop Name' },
  { field: 'venue', headerName: 'Venue' },
  { field: 'start_date', headerName: 'Start Date' },
  { field: 'end_date', headerName: 'End Date' },
];

export default colDefs;
