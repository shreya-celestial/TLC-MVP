"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetQuery = exports.getUserByEmail = void 0;
exports.getUserByEmail = `
  query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      password
      isVerified
      isAdminVerified
      gender
      phoneNumber
      yearOfJoining
      location
      city
      state
      pincode
      isAdmin
      dob
    }
  }
`;
exports.verifyResetQuery = `
  query VerifyResetQuery($token: String!, $_eq: Boolean = true) {
    users(where: {token: {_eq: $token}, isPassToBeReset: {_eq: $_eq}}, limit: 1) {
      email
      id
      isAdminVerified
      isPassToBeReset
      isVerified
      token
      name
    }
  }
`;
