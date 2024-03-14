const colDefs = [
  {
    headerCheckboxSelection: true,
    checkboxSelection: true,
    minWidth: 50,
    resizable: false,
  },
  {
    field: 'types',
    filter: false,
    editable: false,
    headerName: 'Workshop Type',
    minWidth: 250,
  },
  {
    field: 'start_date',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Start Date',
  },
  {
    field: 'end_date',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'End Date',
  },
  {
    field: 'concluding_date',
    filter: false,
    editable: false,
    minWidth: 200,
    headerName: 'Concluding Session Date',
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
    field: 'lead_volunteers_count',
    filter: false,
    editable: false,
    minWidth: 150,
    headerName: 'Lead Volunteers',
  },
  {
    field: 'volunteers_count',
    filter: false,
    editable: false,
    minWidth: 120,
    headerName: 'Volunteers',
  },
  {
    field: 'participants_count',
    filter: false,
    editable: false,
    headerName: 'Participants',
    minWidth: 120,
  },
];

export const VolunteersColDef = [
  { field: 'name', headerName: 'Name', minWidth: 150 },
  { field: 'gender', headerName: 'Gender', minWidth: 100 },
  { field: 'phoneNumber', headerName: 'Phone Number', minWidth: 150 },
  { field: 'email', headerName: 'Email ID', minWidth: 250 },
  { field: 'city', headerName: 'City', minWidth: 150 },
];

export const LeadVolunteersColDef = [
  { field: 'name', headerName: 'Name', minWidth: 150 },
  { field: 'gender', headerName: 'Gender', minWidth: 100 },
  { field: 'email', headerName: 'Email ID', minWidth: 250 },
  { field: 'phoneNumber', headerName: 'Phone Number', minWidth: 150 },
  { field: 'city', headerName: 'City', minWidth: 150 },
];

export const ParticipantColDef = [
  { field: 'name', headerName: 'Name', minWidth: 150 },
  { field: 'gender', headerName: 'Gender', minWidth: 100 },
  { field: 'children', headerName: 'Children', minWidth: 100 },
  { field: 'mobile_number', headerName: 'Phone Number', minWidth: 150 },
  { field: 'email', headerName: 'Email ID', minWidth: 250 },
  { field: 'city', headerName: 'City', minWidth: 150 },
];

export const MeetingColDef = [
  { field: 'type', headerName: 'Type' },
  { field: 'date', headerName: 'Date' },
  { field: 'venue', headerName: 'Venue' },
  { field: 'venue_city', headerName: 'Venue City' },
];

export const LeadVolunteersPopupColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'city', headerName: 'City' },
];

export const ParticipantsPopupColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'mobile_number', headerName: 'Phone Number' },
  { field: 'city', headerName: 'City' },
];

export const VolunteersPopupColDef = [
  { field: 'name', headerName: 'Name' },
  { field: 'gender', headerName: 'Gender' },
  { field: 'email', headerName: 'Email ID' },
  { field: 'phoneNumber', headerName: 'Phone Number' },
  { field: 'city', headerName: 'City' },
];

export default colDefs;
