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

export const workshopsColDef = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    headerName: '',
    width: 50,
  },
  {
    field: 'types',
    filter: false,
    editable: false,
    headerName: 'Workshop Type',
  },
  { field: 'start_date', filter: false, editable: false, width: 300 },
  { field: 'end_date', filter: false, editable: false, width: 150 },
  {
    field: 'concluding_date',
    filter: false,
    editable: false,
    width: 150,
  },
  { field: 'venue', filter: false, editable: false, width: 150 },
  { field: 'venue_city', filter: false, editable: false, width: 150 },

  {
    field: 'lead_volunteers_count',
    filter: false,
    editable: false,
    width: 150,
  },
  {
    field: 'volunteers_count',
    filter: false,
    editable: false,
    width: 150,
  },
  {
    field: 'participants_count',
    filter: false,
    editable: false,
    cellStyle: {
      display: 'flex',
      alignItems: 'center',
    },
    width: 150,
  },
];

export const VolunteersColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

export const LeadVolunteersColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

export const ParticipantColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'children', headerName: 'Children' },
  { field: 'mobile_number', headerName: 'Phone Number' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'city', headerName: 'City' },
];

export const MeetingColDef = [
  { field: 'type', headerName: 'Type' },
  { field: 'workshop', headerName: 'Workshop' },
  { field: 'date', headerName: 'Date' },
  { field: 'volunteers', headerName: 'Volunteers' },
  { field: 'venue', headerName: 'Venue' },
  { field: 'venuCity', headerName: 'Venue City' },
];
