export const getUserByEmail = `query MyQuery($email: String!) {
    users(where: { email: { _eq: $email } }) {
      id
      name
      password
      isVerified
      isAdminVerified
    }
  }
  `;
