export const UpdateVolunteerRoleByEmail = `
  mutation UpdateByEmail($email: String!, $isAdmin: Boolean!) {
    update_users(where: {email: {_eq: $email}, isAdminVerified: {_eq: true}, isVerified: {_eq: true}}, _set: {isAdmin: $isAdmin}) {
      affected_rows
    }
  }
`;

export const DeleteVolunteersByEmail = `
  mutation DeleteMultipleVolunteers($where: users_bool_exp!, $where1: Invitations_bool_exp!) {
    delete_users(where: $where) {
      affected_rows
    }
    delete_Invitations(where: $where1) {
      affected_rows
    }
  }
`;

export const updateAdminVerification = `
  mutation UpdateAdminVerification($email: String!, $isVerified: Boolean = true, $isAdmin: Boolean!, $isAdminVerifiedUpdated: Boolean!, $isAdminVerified: Boolean = false) {
    update_users(where: {email: {_eq: $email}, isVerified: {_eq: $isVerified}, isAdminVerified: {_eq: $isAdminVerified}}, _set: {isAdmin: $isAdmin, isAdminVerified: $isAdminVerifiedUpdated}) {
      affected_rows
    }
  }
`;

export const newInvite = `
  mutation NewInvite($isAccepted: Boolean = false, $isAdmin: Boolean = false, $name: String!, $token: String!, $email: String!, $created_at: timestamptz = "now()") {
    insert_Invitations(objects: {isAccepted: $isAccepted, isAdmin: $isAdmin, name: $name, token: $token, email: $email, created_at: $created_at}) {
      affected_rows
    }
  }
`;

export const deleteInvite = `
  mutation DeleteInvitation($email: String!, $token: String!) {
    delete_Invitations(where: {email: {_eq: $email}, token: {_eq: $token}}) {
      affected_rows
    }
  }
`;

export const resendInvite = `
  mutation ResendInvite($email: String!, $created_at: timestamptz = "now()", $token: String!) {
    update_Invitations(where: {email: {_eq: $email}, isAccepted: {_eq: false}}, _set: {created_at: $created_at, token: $token}) {
      affected_rows
    }
  }
`;

export const signupInvitation = `
  mutation SignupInvitation($email: String!, $token: String, $isAccepted: Boolean!, $city: String!, $dob: date!, $gender: String!, $isAdmin: Boolean!, $isAdminVerified: Boolean!, $isVerified: Boolean!, $location: String!, $name: String!, $password: String!, $phoneNumber: String!, $pincode: Int!, $state: String!, $yearOfJoining: Int!) {
    update_Invitations(where: {email: {_eq: $email}}, _set: {token: $token, isAccepted: $isAccepted}) {
      affected_rows
    }
    insert_users(objects: {city: $city, dob: $dob, email: $email, gender: $gender, isAdmin: $isAdmin, isAdminVerified: $isAdminVerified, isVerified: $isVerified, location: $location, name: $name, password: $password, phoneNumber: $phoneNumber, pincode: $pincode, state: $state, token: $token, yearOfJoining: $yearOfJoining}) {
      affected_rows
    }
  }
`;

export const createNewLinkId = `
  mutation MyMutation($ticket_id: uuid!) {
    insert_link_tickets_one(object: {ticket_id: $ticket_id}) {
      created_at
      ticket_id
    }
  }
`;

export const signupFromLink = `
  mutation InsertUser($name: String!, $email: String!, $password: String!, $isVerified: Boolean!, $token: String!, $dob: date!, $gender: String!, $phoneNumber: String!, $yearOfJoining: Int!, $location: String!, $city: String!, $state: String!, $pincode: Int!, $isAdmin: Boolean!, $isAdminVerified: Boolean!, $created_at: timestamptz!, $ticket_id: uuid!) {
    insert_users(objects: {name: $name, email: $email, password: $password, isVerified: $isVerified, token: $token, dob: $dob, gender: $gender, phoneNumber: $phoneNumber, yearOfJoining: $yearOfJoining, location: $location, city: $city, state: $state, pincode: $pincode, isAdmin: $isAdmin, isAdminVerified: $isAdminVerified}) {
      affected_rows
    }
    delete_link_tickets(where: {created_at: {_eq: $created_at}, ticket_id: {_eq: $ticket_id}}) {
      affected_rows
    }
  }
`;