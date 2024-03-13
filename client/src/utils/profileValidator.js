import validator from "validator"

const profileValidator = (body) => {

  if (!body.name) {
    return {
      type: 'error',
      message: 'Please provide your Name!',
    };
  }

  if (!body?.yearOfJoining) {
    return {
      type: 'error',
      message: 'Please provide your Year of Joining TLC!',
    };
  }

  if (!body.dob)
    return {
      type: 'error',
      message: 'Please Provide your Date of Birth',
    };

  if (!validator.isMobilePhone(body.phoneNumber)) {
    return {
      type: 'error',
      message: 'Please provide a valid mobile number',
    };
  }

  if (!body?.gender) {
    return {
      type: 'error',
      message: 'Please provide your gender',
    };
  }

  if (!body.location) {
    return {
      type: 'error',
      message: 'Please provide your address',
    };
  }
  if (!body.pincode) {
    return {
      type: 'error',
      message: 'Please provide your pincode',
    };
  }

  if (!body.city) {
    return {
      type: 'error',
      message: 'Please provide your city',
    };
  }

  if (!body.state) {
    return {
      type: 'error',
      message: 'Please provide your state',
    };
  }

  return true;
}

export default profileValidator