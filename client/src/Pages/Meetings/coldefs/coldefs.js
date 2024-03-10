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
  { field: 'type', filter: false, editable: false },
  { field: 'workshop_type', filter: false, editable: false, width: 300 },
  { field: 'date', filter: false, editable: false, width: 150 },
  { field: 'venue', filter: false, editable: false, width: 150 },
  { field: 'venue_city', filter: false, editable: false, width: 150 },
  { field: 'volunteers', filter: false, editable: false, width: 150 },
];

export default colDefs;
