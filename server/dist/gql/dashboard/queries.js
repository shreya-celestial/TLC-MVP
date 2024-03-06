"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = void 0;
exports.getDashboardData = `
  query MyQuery($compareDate: date!) {
    users_aggregate(where: {isVerified: {_eq: true}}) {
      aggregate {
        count
      }
    }
    workshops_aggregate {
      aggregate {
        count
      }
    }
    enrollments_aggregate {
      aggregate {
        count
      }
    }
    meetings_aggregate {
      aggregate {
        count
      }
    }
    enrollments(where: {created_at: {_gte: $compareDate}}, order_by: {created_at: asc}) {
      created_at
      name
      mobile_number
    }
  }
`;
