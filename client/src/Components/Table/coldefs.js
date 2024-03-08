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
    resizable: false,
  },
  { field: 'name', filter: false, editable: false, headerName: 'Name', minWidth:150 },
  {
    field: 'email',
    filter: false,
    editable: false,
    minWidth: 250,
    headerName: 'Email ID',
  },
  { field: 'phoneNumber', filter: false, editable: false, minWidth: 150 },
  {
    field: 'gender',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Gender',
  },
  {
    field: 'yearOfJoining',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Joining Year',
  },
  {
    field: 'location',
    filter: false,
    editable: false,
    cellRenderer: LocationComp,
    minWidth: 300,
    headerName: 'Location',
  },
  {
    field: 'isAdmin',
    filter: false,
    editable: false,
    cellRenderer: IsAdminComp,
    headerName: 'Role',
    minWidth: 120,
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
    flex:1
  },
];

export default colDefs;
