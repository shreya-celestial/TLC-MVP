export const InsertUserMutation = `
  mutation InsertUser($name: String!, $email: String!, $password: String!, $isVerified: Boolean!, $token: String!, $dob: date!, $gender: String!,
    $phoneNumber: String!,  $yearOfJoining: Int!, 
    $location: String!, $city: String!, $state: String!, $pincode: Int!, 
    $isAdmin: Boolean) {
    insert_users(objects: { name: $name, email: $email, password: $password, isVerified: $isVerified, token: $token, dob: $dob, gender: $gender, phoneNumber: $phoneNumber, yearOfJoining: $yearOfJoining, location: $location, city: $city, state: $state, pincode: $pincode}) {
      affected_rows
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

export const CheckAndUpdateToken = `
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
  mutation ResetPassword($token: String!, $_eq: Boolean = true, $password: String!, $tokenUpdated: String, $isPassToBeReset: Boolean!, $isLoggedIn: String) {
    update_users(where: {token: {_eq: $token}, isPassToBeReset: {_eq: $_eq}}, _set: {password: $password, token: $tokenUpdated, isPassToBeReset: $isPassToBeReset, isLoggedIn: $isLoggedIn}) {
      affected_rows
    }
  }
`;

export const updateStatus = `
  mutation MyMutation($isLoggedIn: String, $email: String!) {
    update_users(where: {email: {_eq: $email}}, _set: {isLoggedIn: $isLoggedIn}) {
      affected_rows
    }
  }
`;

export const verifyAndUpdateKey = `
  mutation MyMutation($email: String!, $key: String!, $isLoggedIn: String) {
    update_users(where: {email: {_eq: $email}, isLoggedIn: {_eq: $key}}, _set: {isLoggedIn: $isLoggedIn}) {
      affected_rows
      returning {
        id
        name
        isVerified
        isAdminVerified
        gender
        phoneNumber
        email
        yearOfJoining
        location
        city
        state
        pincode
        isAdmin
        dob
        pincode
      }
    }
  }
`;

export const updateUserByEmail = `
  mutation MyMutation($email: String!, $city: String!, $dob: date!, $gender: String!, $location: String!, $name: String!, $phoneNumber: String!, $pincode: Int!, $yearOfJoining: Int!, $state: String!) {
    update_users(where: {email: {_eq: $email}, isVerified: {_eq: true}, isAdminVerified: {_eq: true}}, _set: {city: $city, dob: $dob, gender: $gender, location: $location, name: $name, phoneNumber: $phoneNumber, pincode: $pincode, yearOfJoining: $yearOfJoining, state: $state}) {
      affected_rows
    }
  }
`;