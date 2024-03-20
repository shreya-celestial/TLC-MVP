import moment from 'moment';
import validator from 'validator';

const profileValidator = (body) => {
  if (!body.name) {
    return {
      type: 'error',
      message: 'Please provide your Name!',
    };
  }

  if (body.name.length > 60) {
    return {
      type: 'error',
      message: 'Name must be less than 60 characters',
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

  if (moment(body.dob).format('MM/DD/YYYY') === 'Invalid date') {
    return {
      type: 'error',
      message: 'Please provide a valid date of birth',
    };
  }


  if (new Date(body.dob) > new Date())
    return {
      type: 'error',
      message: 'Date of birth must be in past',
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

  if (body.location.length > 100) {
    return {
      type: 'error',
      message: 'Address must be less than 100 characters',
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
};

export default profileValidator;
