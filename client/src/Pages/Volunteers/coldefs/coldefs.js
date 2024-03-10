import { useStyles } from '../../../Components/Table/Table.styles';

const IsAdminComp = (params) => {
  if (!params.data.isAdminVerified) return `-`;
  return `${params.value ? 'Admin' : 'Volunteer'}`;
};

const LocationComp = (params) => {
  return (
    <p>
      {params.data.city}, {params.data.state}
    </p>
  );
};

const colDefs = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    headerName: '',
    width: 50,
  },
  { field: 'name', filter: false, editable: false },
  { field: 'email', filter: false, editable: false, width: 300 },
  { field: 'phoneNumber', filter: false, editable: false, width: 150 },
  { field: 'gender', filter: false, editable: false, width: 150 },
  { field: 'yearOfJoining', filter: false, editable: false, width: 150 },
  { field: 'dob', filter: false, editable: false, width: 150 },
  {
    field: 'location',
    filter: false,
    editable: false,
    cellRenderer: LocationComp,
    width: 300,
  },
  { field: 'pincode', filter: false, editable: false, width: 150 },
  {
    field: 'isAdmin',
    filter: false,
    editable: false,
    cellRenderer: IsAdminComp,
    headerName: 'Role',
    width: 150,
  },
  {
    field: 'isAdminVerified',
    filter: false,
    editable: false,
    headerName: 'Status',
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    width: 150,
  },
];

export const workShopColDef = [
  { field: 'workshop', headerName: 'Workshop Name' },
  { field: 'role', headerName: 'Role' },
  { field: 'startDate', headerName: 'Start Date' },
  { field: 'endDate', headerName: 'End Date' },
];

export const meetingColDef = [
  { field: 'meeting', headerName: 'Meeting Type' },
  { field: 'workshop', headerName: 'Workshop' },
  { field: 'date', headerName: 'Date' },
  { field: 'volunteers', headerName: 'Volunteers' },
  { field: 'enrollments', headerName: 'Enrollments' },
];

export default colDefs;
