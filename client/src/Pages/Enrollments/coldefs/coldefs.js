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
    minWidth:150
  },
  {
    field: 'gender',
    headerName: 'Gender',
    minWidth: 100
  },
  {
    field: 'dob',
    headerName: 'Date of Birth',
    minWidth: 120
  },
];

export const enrollPageWorkshopColDEf = [
  { field: 'types', headerName: 'Workshop Name',minWidth: 200 },
  { field: 'venue', headerName: 'Venue',minWidth: 250 },
  { field: 'start_date', headerName: 'Start Date',minWidth: 120 },
  { field: 'end_date', headerName: 'End Date',minWidth: 120 },
];

export const ChildrenPopupColdef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'dob', headerName: 'Date of Birth' },
];

export default colDefs;
