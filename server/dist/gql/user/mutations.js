"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VerifyAndUpdatePass = exports.CheckAndUpdateToken = exports.VerifyTokenAndUpdate = exports.DeleteUserByEmail = exports.InsertUserMutation = void 0;
exports.InsertUserMutation = `
  mutation InsertUser($name: String!, $email: String!, $password: String!, $isVerified: Boolean!, $token: String!, $dob: date!, $gender: String!,
    $phoneNumber: String!,  $yearOfJoining: Int!, 
    $location: String!, $city: String!, $state: String!, $pincode: Int!, 
    $isAdmin: Boolean) {
    insert_users(objects: { name: $name, email: $email, password: $password, isVerified: $isVerified, token: $token, dob: $dob, gender: $gender, phoneNumber: $phoneNumber, yearOfJoining: $yearOfJoining, location: $location, city: $city, state: $state, pincode: $pincode}) {
      affected_rows
      returning {
        id
        name
        email
        password
        isVerified
        token
        dob
        gender
        phoneNumber
        yearOfJoining
        location
        city
        state
        pincode
      }
    }
  }
`;
exports.DeleteUserByEmail = `
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
exports.VerifyTokenAndUpdate = `
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
exports.CheckAndUpdateToken = `
  mutation CheckAndUpdateToken($email: String!, $isVerified: Boolean!, $token: String!, $isPassToBeReset: Boolean!, $isAdminVerified: Boolean!) {
    update_users(where: {email: {_eq: $email}, isVerified: {_eq: $isVerified}, isAdminVerified: {_eq: $isAdminVerified}}, _set: {token: $token, isPassToBeReset: $isPassToBeReset}) {
      returning {
        name
      }
      affected_rows
    }
  }
`;
exports.VerifyAndUpdatePass = `
  mutation ResetPassword($token: String!, $_eq: Boolean = true, $password: String!, $tokenUpdated: String, $isPassToBeReset: Boolean!) {
    update_users(where: {token: {_eq: $token}, isPassToBeReset: {_eq: $_eq}}, _set: {password: $password, token: $tokenUpdated, isPassToBeReset: $isPassToBeReset}) {
      affected_rows
    }
  }
`;
