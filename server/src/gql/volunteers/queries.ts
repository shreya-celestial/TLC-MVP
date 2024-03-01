export const getVolunteers = `
  query Volunteers($offset: Int!, $limit: Int!) {
    users(offset: $offset, limit: $limit, where: {isVerified: {_eq: true}}, order_by: {id: desc}) {
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
    }
    users_aggregate(where: {isVerified: {_eq: true}}) {
      aggregate {
        count
      }
    }
  }
`;

export const filterVolunteersQuery = `
  query MyQuery($where: users_bool_exp = {}, $offset: Int!, $limit: Int!, $order_by: [users_order_by!]) {
    users(where: $where, offset: $offset, limit: $limit, order_by: $order_by){
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;

export const searchAndFilterVolunteers = `
  query SearchAndFilter($where: users_bool_exp = {}, $offset: Int!, $limit: Int!, $order_by: [users_order_by!]) {
    users(where: $where, offset: $offset, limit: $limit, order_by: $order_by) {
      gender
      email
      dob
      city
      isAdmin
      isAdminVerified
      location
      name
      phoneNumber
      pincode
      state
      yearOfJoining
    }
    users_aggregate(where: $where) {
      aggregate {
        count
      }
    }
  }
`;
