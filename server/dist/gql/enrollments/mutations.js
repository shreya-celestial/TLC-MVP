"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resendEnrollmentInvite = exports.deleteEnrollmentInvite = exports.newEnrollmentInvite = exports.deleteEnrollmentsById = exports.editEnrollment = exports.addEnrollment = void 0;
exports.addEnrollment = `
  mutation AddEnrollment($address: String!, $city: String!, $dob: date!, $email: String!, $gender: String!, $mobile_number: String!, $name: String!, $pincode: Int!, $state: String!, $children: [children_insert_input!] = [], $enrolled_by: String, $token: String!) {
    insert_enrollments(objects: {address: $address, city: $city, dob: $dob, email: $email, gender: $gender, mobile_number: $mobile_number, name: $name, pincode: $pincode, state: $state, children: {data: $children}, enrolled_by: $enrolled_by}) {
      affected_rows
    }
    delete_enrollment_invites(where: {email: {_eq: $email}, token: {_eq: $token}}) {
      affected_rows
    }
  }
`;
exports.editEnrollment = `
  mutation MyMutation($id: Int!, $address: String!, $city: String!, $dob: date!, $email: String!, $gender: String!, $mobile_number: String!, $name: String!, $pincode: Int!, $state: String!, $children: [children_insert_input!] = []) {
    update_enrollments(where: {id: {_eq: $id}}, _set: {address: $address, city: $city, dob: $dob, email: $email, gender: $gender, mobile_number: $mobile_number, name: $name, pincode: $pincode, state: $state}) {
      affected_rows
    }
    delete_children(where: {enrollment_id: {_eq: $id}}) {
      affected_rows
    }
    insert_children(objects: $children) {
      affected_rows
    }
  }
`;
exports.deleteEnrollmentsById = `
  mutation MyMutation($ids: [enrollments_bool_exp!] = []) {
    delete_enrollments(where: {_or: $ids}) {
      affected_rows
    }
  }
`;
exports.newEnrollmentInvite = `
  mutation Mutation($name: String!, $token: String!, $email: String!, $created_at: timestamptz = "now()", $mobile: String!, $invited_by: String) {
    insert_enrollment_invites(objects: {name: $name, token: $token, created_at: $created_at, mobile_number: $mobile, email: $email, invited_by: $invited_by}) {
      affected_rows
    }
  }
`;
exports.deleteEnrollmentInvite = `
  mutation Mutation($email: String!, $token: String!) {
    delete_enrollment_invites(where: {email: {_eq: $email}, token: {_eq: $token}}) {
      affected_rows
    }
  }
`;
exports.resendEnrollmentInvite = `
  mutation Mutation($email: String!, $created_at: timestamptz = "now()", $token: String!) {
    update_enrollment_invites(where: {email: {_eq: $email}}, _set: {created_at: $created_at, token: $token}) {
      affected_rows
    }
  }
`;
