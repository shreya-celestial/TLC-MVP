export const verifyResetQuery = `
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