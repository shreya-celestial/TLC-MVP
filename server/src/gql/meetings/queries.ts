export const getPageMeetings = `
  query MyQuery($limit: Int!, $offset: Int!, $order_by: [meetings_order_by!], $where: meetings_bool_exp ) {
    meetings(limit: $limit, offset: $offset, order_by: $order_by, where: $where) {
      type
      venue
      venue_city
      date
      id
      workshop {
        types
      }
      meetings_volunteers_aggregate {
        aggregate {
          count
        }
      }
      meetings_enrollments_aggregate {
        aggregate {
          count
        }
      }
    }
    meetings_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const getMeetingByPk = `
  query MyQuery($id: Int!) {
    meetings_by_pk(id: $id) {
      date
      id
      type
      venue
      venue_city
      workshop {
        concluding_date
        end_date
        id
        start_date
        types
        venue
        venue_city
      }
      meetings_enrollments {
        enrollment {
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
            gender
            id
            name
          }
        }
      }
      meetings_volunteers {
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