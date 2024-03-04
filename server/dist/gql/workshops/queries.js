"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPageWorkshops = void 0;
exports.getPageWorkshops = `
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
