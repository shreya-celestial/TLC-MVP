export const insertNewWorkshop = `
  mutation InsertWorkshop($concluding_date: date!, $end_date: date!, $start_date: date!, $types: String!, $venue: String!, $venue_city: String!, $vols: [workshop_volunteers_insert_input!] = [], $leads: [workshop_lead_volunteers_insert_input!] = []) {
    insert_workshops(objects: {concluding_date: $concluding_date, end_date: $end_date, start_date: $start_date, types: $types, venue: $venue, venue_city: $venue_city, workshop_volunteers: {data: $vols}, workshop_lead_volunteers: {data: $leads}}) {
      affected_rows
      returning {
        id
      }
    }
  }
`;

export const addMeetingsToWorkshop = `
  mutation MyMutation($participants: [workshop_participants_insert_input!] = [], $meetings: [meetings_bool_exp!] = [], $workshop_id: Int!) {
    insert_workshop_participants(objects: $participants) {
      affected_rows
    }
    update_meetings(where: {_or: $meetings}, _set: {workshop_id: $workshop_id}) {
      affected_rows
    }
  }
`;

export const updateWorkshopById = `
  mutation UpdateWorkshop($id: Int!, $concluding_date: date!, $end_date: date!, $start_date: date!, $types: String!, $venue: String!, $venue_city: String!, $leads: [workshop_lead_volunteers_insert_input!] = [], $vols: [workshop_volunteers_insert_input!] = [], $participants: [workshop_participants_insert_input!] = [], $workshop_id: Int) {
    update_workshops(where: {id: {_eq: $id}}, _set: {concluding_date: $concluding_date, end_date: $end_date, start_date: $start_date, types: $types, venue: $venue, venue_city: $venue_city}) {
      affected_rows
    }
    delete_workshop_lead_volunteers(where: {workshop_id: {_eq: $id}}) {
      affected_rows
    }
    delete_workshop_volunteers(where: {workshop_id: {_eq: $id}}) {
      affected_rows
    }
    delete_workshop_participants(where: {workshop_id: {_eq: $id}}) {
      affected_rows
    }
    insert_workshop_lead_volunteers(objects: $leads) {
      affected_rows
    }
    insert_workshop_volunteers(objects: $vols) {
      affected_rows
    }
    insert_workshop_participants(objects: $participants) {
      affected_rows
    }
    update_meetings(where: {workshop_id: {_eq: $id}}, _set: {workshop_id: $workshop_id}) {
      affected_rows
    }
  }
`;

export const updateWorkshopMeetings = `
  mutation MyMutation($meeting: [meetings_bool_exp!] = [], $id: Int!) {
    update_meetings(where: {_or: $meeting}, _set: {workshop_id: $id}) {
      affected_rows
    }
  }
`;

export const deleteWorkshopById = `
  mutation MyMutation($deleteIds: [workshops_bool_exp!] = []) {
    delete_workshops(where: {_or: $deleteIds}) {
      affected_rows
    }
  }
`;
