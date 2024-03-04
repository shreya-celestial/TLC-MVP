"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertNewWorkshop = void 0;
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
