"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMeetingsByPKs = exports.updateMeeting = exports.addMeeting = void 0;
exports.addMeeting = `
  mutation MyMutation($date: date!, $type: String!, $venue: String!, $venue_city: String!, $workshop_id: Int, $meetings_enrollments: [meetings_enrollments_insert_input!] = [], $meetings_volunteers: [meetings_volunteers_insert_input!] = []) {
    insert_meetings(objects: {date: $date, type: $type, venue: $venue, venue_city: $venue_city, workshop_id: $workshop_id, meetings_enrollments: {data: $meetings_enrollments}, meetings_volunteers: {data: $meetings_volunteers}}) {
      affected_rows
    }
  }
`;
exports.updateMeeting = `
  mutation MyMutation($id: Int!, $date: date, $type: String, $venue: String, $venue_city: String, $workshop_id: Int, $enrollments: [meetings_enrollments_insert_input!] = [], $vols: [meetings_volunteers_insert_input!] = []) {
    update_meetings(where: {id: {_eq: $id}}, _set: {date: $date, type: $type, venue: $venue, venue_city: $venue_city, workshop_id: $workshop_id}) {
      affected_rows
    }
    delete_meetings_enrollments(where: {meeting_id: {_eq: $id}}) {
      affected_rows
    }
    delete_meetings_volunteers(where: {meeting_id: {_eq: $id}}) {
      affected_rows
    }
    insert_meetings_enrollments(objects: $enrollments) {
      affected_rows
    }
    insert_meetings_volunteers(objects: $vols) {
      affected_rows
    }
  }
`;
exports.deleteMeetingsByPKs = `
  mutation MyMutation($ids: [meetings_bool_exp!] = []) {
    delete_meetings(where: {_or: $ids}) {
      affected_rows
    }
  }
`;
