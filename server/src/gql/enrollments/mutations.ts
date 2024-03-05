export const addEnrollment = `
  mutation AddEnrollment($address: String!, $city: String!, $dob: date!, $email: String!, $gender: String!, $mobile_number: String!, $name: String!, $pincode: Int!, $state: String!, $children: [children_insert_input!] = []) {
    insert_enrollments(objects: {address: $address, city: $city, dob: $dob, email: $email, gender: $gender, mobile_number: $mobile_number, name: $name, pincode: $pincode, state: $state, children: {data: $children}}) {
      affected_rows
    }
  }
`;