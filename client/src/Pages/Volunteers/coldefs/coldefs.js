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

const CustomHeaderComponent = (params) => {
  return <p>{params.displayName}</p>;
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
    minWidth: 160,
    headerName: 'Name',
    headerComponent: CustomHeaderComponent,
    // sortable: false,
  },
  {
    field: 'email',
    filter: false,
    editable: false,
    minWidth: 250,
    headerName: 'Email ID',
  },
  {
    field: 'phoneNumber',
    filter: false,
    editable: false,
    minWidth: 150,
    headerName: 'Phone Number',
  },
  {
    field: 'gender',
    filter: false,
    editable: false,
    minWidth: 100,
    headerName: 'Gender',
  },
  {
    field: 'location',
    filter: false,
    editable: false,
    cellRenderer: LocationComp,
    minWidth: 280,
  },
  {
    field: 'yearOfJoining',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Joining Year',
  },

  {
    field: 'isAdmin',
    filter: false,
    editable: false,
    cellRenderer: IsAdminComp,
    headerName: 'Role',
    minWidth: 100,
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
    minWidth: 120,
    pinned: 'right',
  },
];

export const workShopColDef = [
  { field: 'types', headerName: 'Workshop Name' },
  { field: 'role', headerName: 'Role' },
  { field: 'start_date', headerName: 'Start Date' },
  { field: 'end_date', headerName: 'End Date' },
];

export const workshopColDefVolunteersPage = [
  { field: 'types', headerName: 'Workshop Name' },
  { field: 'role', headerName: 'Role' },
  { field: 'start_date', headerName: 'Start Date' },
  { field: 'end_date', headerName: 'End Date' },
];

export const meetingsColDefVolunteersPage = [
  { field: 'type', headerName: 'Meeting Type' },
  { field: 'date', headerName: 'Date' },
  { field: 'venue', headerName: 'Venue' },
  { field: 'venue_city', headerName: 'Venue City' },
];

export const meetingColDef = [
  { field: 'meeting', headerName: 'Meeting Type' },
  { field: 'workshop', headerName: 'Workshop' },
  { field: 'date', headerName: 'Date' },
  { field: 'volunteers', headerName: 'Volunteers' },
  { field: 'enrollments', headerName: 'Enrollments' },
];

export default colDefs;
