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