export const InsertUserMutation = `
  mutation InsertUser($name: String!, $email: String!, $password: String!, $isVerified: Boolean!, $token: String!) {
    insert_users(objects: { name: $name, email: $email, password: $password, isVerified: $isVerified, token: $token}) {
      affected_rows
      returning {
        id
        name
        email
        password
        isVerified
        token
      }
    }
  }
`;

export const DeleteUserByEmail = `
  mutation MyMutation($email: String!) {
    delete_users(where: {email: {_eq: $email}}) {
      returning {
        email
        id
        isVerified
        name
        password
        token
      }
    }
  }
`;

export const VerifyTokenAndUpdate = `
  mutation VerifyTokenAndUpdate($token: String!, $updatedToken: String, $isVerified: Boolean!) {
    update_users(where: {token: {_eq: $token}}, _set: {token: $updatedToken, isVerified: $isVerified}) {
      returning {
        email
        id
        isVerified
        name
        password
        token
      }
    }
  }
`;