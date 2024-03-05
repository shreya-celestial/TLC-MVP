export const addMeeting = `
  mutation MyMutation($date: date!, $type: String!, $venue: String!, $venue_city: String!, $workshop_id: Int, $meetings_enrollments: [meetings_enrollments_insert_input!] = [], $meetings_volunteers: [meetings_volunteers_insert_input!] = []) {
    insert_meetings(objects: {date: $date, type: $type, venue: $venue, venue_city: $venue_city, workshop_id: $workshop_id, meetings_enrollments: {data: $meetings_enrollments}, meetings_volunteers: {data: $meetings_volunteers}}) {
      affected_rows
    }
  }
`;