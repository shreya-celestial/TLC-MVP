"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetQuery = exports.getUserByEmail = void 0;
exports.getUserByEmail = `query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      password
      isVerified
      isAdminVerified
    }
  }
  `;
exports.verifyResetQuery = `
  query VerifyResetQuery($token: String = "") {
    users(where: {token: {_eq: $token}}, limit: 1) {
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
