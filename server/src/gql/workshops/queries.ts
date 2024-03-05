export const getPageWorkshops = `
  query AllWorkshops($offset: Int!, $limit: Int!) {
    workshops(offset: $offset, limit: $limit) {
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
    }
    workshops_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export const workshopDetails = `
  query SingleWorkshop($id: Int!) {
    workshops(where: {id: {_eq: $id}}) {
      concluding_date
      end_date
      id
      start_date
      types
      venue
      venue_city
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
        }
      }
    }
  }
`;

