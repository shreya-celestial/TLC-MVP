"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAdminVerification = exports.DeleteVolunteerByEmail = exports.UpdateVolunteerRoleByEmail = void 0;
exports.UpdateVolunteerRoleByEmail = `
  mutation UpdateByEmail($email: String!, $isAdmin: Boolean!) {
    update_users(where: {email: {_eq: $email}, isAdminVerified: {_eq: true}, isVerified: {_eq: true}}, _set: {isAdmin: $isAdmin}) {
      affected_rows
    }
  }
`;
exports.DeleteVolunteerByEmail = `
  mutation DeleteByEmail($email: String!) {
    delete_users(where: {email: {_eq: $email}, isVerified: {_eq: true}}) {
      affected_rows
    }
  }
`;
exports.updateAdminVerification = `
  mutation UpdateAdminVerification($email: String!, $isVerified: Boolean = true, $isAdmin: Boolean!, $isAdminVerifiedUpdated: Boolean!, $isAdminVerified: Boolean = false) {
    update_users(where: {email: {_eq: $email}, isVerified: {_eq: $isVerified}, isAdminVerified: {_eq: $isAdminVerified}}, _set: {isAdmin: $isAdmin, isAdminVerified: $isAdminVerifiedUpdated}) {
      affected_rows
    }
  }
`;
