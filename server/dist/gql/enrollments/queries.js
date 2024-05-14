"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyEnrollmentsInvite = exports.checkEnrollmentAvailability = exports.enrollmentByPK = exports.allEnrollments = void 0;
exports.allEnrollments = `
  query MyQuery($limit: Int!, $offset: Int!, $order_by: [enrollments_order_by!], $where: enrollments_bool_exp) {
    enrollments(where: $where, limit: $limit, offset: $offset, order_by: $order_by) {
      address
      city
      dob
      email
      gender
      id
      mobile_number
      name
      pincode
      state
      children_aggregate {
        aggregate {
          count
        }
      }
      enrollment_done_by {
        email
        name
        phoneNumber
      }
    }
    enrollments_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
exports.enrollmentByPK = `
  query MyQuery($id: Int!) {
    enrollments_by_pk(id: $id) {
      address
      city
      dob
      email
      gender
      id
      mobile_number
      name
      pincode
      state
      children {
        dob
        enrollment_id
        gender
        id
        name
      }
      meetings_enrollments {
        meeting {
          date
          id
          type
          venue
          venue_city
        }
      }
      workshop_participants {
        workshop {
          concluding_date
          end_date
          start_date
          types
          venue
          venue_city
          id
        }
      }
      enrollment_done_by {
        email
        name
        phoneNumber
      }
    }
  }
`;
exports.checkEnrollmentAvailability = `
  query Query($email: String!) {
    enrollments(where: {email: {_eq: $email}}) {
      email
      name
    }
    enrollment_invites(where: {email: {_eq: $email}}) {
      name
      email
      mobile_number
      created_at
    }
  }
`;
exports.verifyEnrollmentsInvite = `
  query Query($token: String!) {
    enrollment_invites(where: {token: {_eq: $token}}) {
      created_at
      email
      name
    	mobile_number
      invited_by
    }
  }
`;
