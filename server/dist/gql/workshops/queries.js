"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workshopDetails = exports.getPageWorkshops = void 0;
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
      }
    }
  }
`;
