export const getUserByEmail = `
  query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      password
      isVerified
      isAdminVerified
    }
  }
`;

export const verifyResetQuery = `
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
