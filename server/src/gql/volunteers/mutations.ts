export const UpdateVolunteerByEmail = `
  mutation UpdateByEmail($email: String!, $isAdmin: Boolean!) {
    update_users(where: {email: {_eq: $email}, isAdminVerified: {_eq: true}, isVerified: {_eq: true}}, _set: {isAdmin: $isAdmin}) {
      affected_rows
    }
  }
`;

export const DeleteVolunteerByEmail = `
  mutation DeleteByEmail($email: String!) {
    delete_users(where: {email: {_eq: $email}, isVerified: {_eq: true}}) {
      affected_rows
    }
  }
`;