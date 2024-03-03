"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.signupInvitation = exports.resendInvite = exports.deleteInvite = exports.newInvite = exports.updateAdminVerification = exports.DeleteVolunteersByEmail = exports.UpdateVolunteerRoleByEmail = void 0;
exports.UpdateVolunteerRoleByEmail = `
  mutation UpdateByEmail($email: String!, $isAdmin: Boolean!) {
    update_users(where: {email: {_eq: $email}, isAdminVerified: {_eq: true}, isVerified: {_eq: true}}, _set: {isAdmin: $isAdmin}) {
      affected_rows
    }
  }
`;
exports.DeleteVolunteersByEmail = `
  mutation DeleteMultipleVolunteers($where: users_bool_exp!) {
    delete_users(where: $where) {
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
exports.newInvite = `
  mutation NewInvite($isAccepted: Boolean = false, $isAdmin: Boolean = false, $name: String!, $token: String!, $email: String!, $created_at: timestamptz = "now()") {
    insert_Invitations(objects: {isAccepted: $isAccepted, isAdmin: $isAdmin, name: $name, token: $token, email: $email, created_at: $created_at}) {
      affected_rows
    }
  }
`;
exports.deleteInvite = `
  mutation DeleteInvitation($email: String!, $token: String!) {
    delete_Invitations(where: {email: {_eq: $email}, token: {_eq: $token}}) {
      affected_rows
    }
  }
`;
exports.resendInvite = `
  mutation ResendInvite($email: String!, $created_at: timestamptz = "now()", $token: String!) {
    update_Invitations(where: {email: {_eq: $email}, isAccepted: {_eq: false}}, _set: {created_at: $created_at, token: $token}) {
      affected_rows
    }
  }
`;
exports.signupInvitation = `
  mutation SignupInvitation($email: String!, $token: String, $isAccepted: Boolean!, $city: String!, $dob: date!, $gender: String!, $isAdmin: Boolean!, $isAdminVerified: Boolean!, $isVerified: Boolean!, $location: String!, $name: String!, $password: String!, $phoneNumber: String!, $pincode: Int!, $state: String!, $yearOfJoining: Int!) {
    update_Invitations(where: {email: {_eq: $email}}, _set: {token: $token, isAccepted: $isAccepted}) {
      affected_rows
    }
    insert_users(objects: {city: $city, dob: $dob, email: $email, gender: $gender, isAdmin: $isAdmin, isAdminVerified: $isAdminVerified, isVerified: $isVerified, location: $location, name: $name, password: $password, phoneNumber: $phoneNumber, pincode: $pincode, state: $state, token: $token, yearOfJoining: $yearOfJoining}) {
      affected_rows
    }
  }
`;
