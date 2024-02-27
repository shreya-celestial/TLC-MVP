"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyResetQuery = void 0;
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
