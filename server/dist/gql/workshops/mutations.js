"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteWorkshopById = exports.updateWorkshopById = exports.insertNewWorkshop = void 0;
exports.insertNewWorkshop = `
  mutation InsertWorkshop($concluding_date: date!, $end_date: date!, $start_date: date!, $types: String!, $venue: String!, $venue_city: String!, $vols: [workshop_volunteers_insert_input!] = [], $leads: [workshop_lead_volunteers_insert_input!] = []) {
    insert_workshops(objects: {concluding_date: $concluding_date, end_date: $end_date, start_date: $start_date, types: $types, venue: $venue, venue_city: $venue_city, workshop_volunteers: {data: $vols}, workshop_lead_volunteers: {data: $leads}}) {
      affected_rows
      returning {
        id
      }
    }
  }
`;
exports.updateWorkshopById = `
  mutation UpdateWorkshop($id: Int!, $concluding_date: date!, $end_date: date!, $start_date: date!, $types: String!, $venue: String!, $venue_city: String!, $leads: [workshop_lead_volunteers_insert_input!] = [], $vols: [workshop_volunteers_insert_input!] = []) {
    update_workshops(where: {id: {_eq: $id}}, _set: {concluding_date: $concluding_date, end_date: $end_date, start_date: $start_date, types: $types, venue: $venue, venue_city: $venue_city}) {
      affected_rows
    }
    delete_workshop_lead_volunteers(where: {workshop_id: {_eq: $id}}) {
      affected_rows
    }
    delete_workshop_volunteers(where: {workshop_id: {_eq: $id}}) {
      affected_rows
    }
    insert_workshop_lead_volunteers(objects: $leads) {
      affected_rows
    }
    insert_workshop_volunteers(objects: $vols) {
      affected_rows
    }
  }
`;
exports.deleteWorkshopById = `
  mutation MyMutation($deleteIds: [workshops_bool_exp!] = []) {
    delete_workshops(where: {_or: $deleteIds}) {
      affected_rows
    }
  }
`;
