"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workshopsDD = exports.workshopDetails = exports.getPageWorkshops = void 0;
exports.getPageWorkshops = `
  query AllWorkshops($offset: Int!, $limit: Int!, $order_by: [workshops_order_by!], $where: workshops_bool_exp) {
    workshops(offset: $offset, limit: $limit, order_by: $order_by, where: $where) {
      concluding_date
      end_date
      id
      start_date
      types
      venue
      venue_city
      workshop_lead_volunteers_aggregate {
        aggregate {
          count
        }
      }
      workshop_volunteers_aggregate {
        aggregate {
          count
        }
      }
      workshop_participants_aggregate {
        aggregate {
          count
        }
      }
    }
    workshops_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
exports.workshopDetails = `
  query MyQuery($id: Int!) {
    workshops_by_pk(id: $id) {
      concluding_date
      end_date
      id
      start_date
      types
      venue
      venue_city
      meetings {
        date
        id
        type
        venue
        venue_city
      }
      workshop_lead_volunteers {
        user {
          city
          dob
          email
          gender
          isAdmin
          isAdminVerified
          location
          name
          phoneNumber
          pincode
          state
          yearOfJoining
        }
        responsibility
      }
      workshop_participants {
        enrollment {
          address
          city
          dob
          email
          gender
          id
          children {
            dob
            gender
            id
            name
          }
          mobile_number
          name
          pincode
          state
        }
      }
      workshop_volunteers {
        user {
          city
          dob
          email
          gender
          isAdmin
          isAdminVerified
          location
          name
          phoneNumber
          pincode
          state
          yearOfJoining
        }
        responsibility
      }
    }
  }
`;
exports.workshopsDD = `
  query MyQuery($limit: Int, $search: String = "%") {
    upcoming: workshops(where: {start_date: {_gte: "now()"}, types: {_like: $search}}, order_by: {start_date: asc}, limit: 20) {
      start_date
      types
      id
    }
    past: workshops(where: {start_date: {_lt: "now()"}, types: {_like: $search}}, order_by: {start_date: desc}, limit: $limit) {
      start_date
      types
      id
    }
  }
`;
