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
    minWidth: 50,
    resizable: false,
  },
  {
    field: 'name',
    filter: false,
    editable: false,
    minWidth: 160,
    headerName: 'Name',
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
  },
];

export default colDefs;
