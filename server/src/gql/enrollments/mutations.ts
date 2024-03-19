export const addEnrollment = `
  mutation AddEnrollment($address: String!, $city: String!, $dob: date!, $email: String!, $gender: String!, $mobile_number: String!, $name: String!, $pincode: Int!, $state: String!, $children: [children_insert_input!] = [], $enrolled_by: String) {
    insert_enrollments(objects: {address: $address, city: $city, dob: $dob, email: $email, gender: $gender, mobile_number: $mobile_number, name: $name, pincode: $pincode, state: $state, children: {data: $children}, enrolled_by: $enrolled_by}) {
      affected_rows
    }
  }
`;

export const editEnrollment = `
  mutation MyMutation($id: Int!, $address: String!, $city: String!, $dob: date!, $email: String!, $gender: String!, $mobile_number: String!, $name: String!, $pincode: Int!, $state: String!, $children: [children_insert_input!] = []) {
    update_enrollments(where: {id: {_eq: $id}}, _set: {address: $address, city: $city, dob: $dob, email: $email, gender: $gender, mobile_number: $mobile_number, name: $name, pincode: $pincode, state: $state}) {
      affected_rows
    }
    delete_children(where: {enrollment_id: {_eq: $id}}) {
      affected_rows
    }
    insert_children(objects: $children) {
      affected_rows
    }
  }
`;

export const deleteEnrollmentsById = `
  mutation MyMutation($ids: [enrollments_bool_exp!] = []) {
    delete_enrollments(where: {_or: $ids}) {
      affected_rows
    }
  }
`;