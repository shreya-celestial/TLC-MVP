"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByEmail = void 0;
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
