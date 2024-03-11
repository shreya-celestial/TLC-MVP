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

export default colDefs;
