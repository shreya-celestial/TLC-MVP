const colDefs = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    headerName: '',
    width: 50,
  },
  { field: 'name', filter: false, editable: false },
  { field: 'gender', filter: false, editable: false, width: 300 },
  { field: 'children', filter: false, editable: false, width: 150 },
  { field: 'email', filter: false, editable: false, width: 150 },
  { field: 'mobile_number', filter: false, editable: false, width: 150 },
  { field: 'state', filter: false, editable: false, width: 150 },
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

export const ChildrenPopupColdef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'dob', headerName: 'Date of Birth' },
];

export default colDefs;
