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