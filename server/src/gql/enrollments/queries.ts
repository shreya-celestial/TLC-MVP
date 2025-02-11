export const allEnrollments = `
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

export const enrollmentByPK = `
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

export const checkEnrollmentAvailability = `
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

export const verifyEnrollmentsInvite = `
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

export const verifyWithGeneratedLink = `
  query MyQuery($ticket_id: uuid!, $created_at: timestamptz!) {
    enrollment_link_tickets(where: {ticket_id: {_eq: $ticket_id}, created_at: {_eq: $created_at}}) {
      created_at
      id
      invited_by
      ticket_id
    }
  }
`;