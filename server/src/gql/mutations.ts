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
  mutation DeleteUser($email: String!) {
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

export const CheckAndUpdateToken =  `
  mutation CheckAndUpdateToken($email: String!, $isVerified: Boolean!, $token: String!, $isPassToBeReset: Boolean!, $isAdminVerified: Boolean!) {
    update_users(where: {email: {_eq: $email}, isVerified: {_eq: $isVerified}, isAdminVerified: {_eq: $isAdminVerified}}, _set: {token: $token, isPassToBeReset: $isPassToBeReset}) {
      returning {
        name
      }
      affected_rows
    }
  }
`;

export const VerifyAndUpdatePass = `
  mutation ResetPassword($token: String!, $_eq: Boolean = true, $password: String!, $tokenUpdated: String, $isPassToBeReset: Boolean!) {
    update_users(where: {token: {_eq: $token}, isPassToBeReset: {_eq: $_eq}}, _set: {password: $password, token: $tokenUpdated, isPassToBeReset: $isPassToBeReset}) {
      affected_rows
    }
  }
`;