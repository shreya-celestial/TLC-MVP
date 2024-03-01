export const UpdateVolunteerRoleByEmail = `
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

export const updateAdminVerification = `
  mutation UpdateAdminVerification($email: String!, $isVerified: Boolean = true, $isAdmin: Boolean!, $isAdminVerifiedUpdated: Boolean!, $isAdminVerified: Boolean = false) {
    update_users(where: {email: {_eq: $email}, isVerified: {_eq: $isVerified}, isAdminVerified: {_eq: $isAdminVerified}}, _set: {isAdmin: $isAdmin, isAdminVerified: $isAdminVerifiedUpdated}) {
      affected_rows
    }
  }
`