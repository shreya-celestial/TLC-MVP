import validator from 'validator';

export function getCookie(name) {
  var cookies = document.cookie.split(';');

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i].trim();

    if (cookie.indexOf(name + '=') === 0) {
      return cookie.substring(name.length + 1);
    }
  }

  return null;
}

export function deleteCookie(name) {
  document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

export const compareTwoArrays = function (existingRows, newRows, by) {
  let isEvery = true;
  for (let i = 0; i < existingRows.length; i++) {
    for (let j = 0; j < newRows.length; j++) {
      if (existingRows[i][by] === newRows[j][by]) {
        isEvery = false;
        break;
      }
    }
  }
  return isEvery;
};

export const fetchRowDataMeeting = function (meeting) {
  const fetchVolunteers = meeting?.meetings_volunteers?.map((w) => w.user);
  const fetchEnrollments = meeting?.meetings_enrollments?.map(
    (w) => w.enrollment
  );

  return { fetchVolunteers, fetchEnrollments };
};

export const fetchRowDataWorkshop = function (workshop) {
  const fetchVolunteers = workshop?.workshop_volunteers?.map((w) => w.user);
  const fetchLeadVolunteers = workshop?.workshop_lead_volunteers?.map(
    (w) => w.user
  );
  const fetchParticipants = workshop?.workshop_participants?.map((w) => {
    const childrenNames = w.enrollment.children.map((child) => {
      return child.name;
    });
    return { ...w.enrollment, children: childrenNames.join(', ') };
  });

  const fetchMeetings = workshop?.meetings;

  return {
    fetchVolunteers,
    fetchLeadVolunteers,
    fetchParticipants,
    fetchMeetings,
  };
};

export const fetchRowDataEnrollment = function (enrollment) {
  const fetchWorkshops = enrollment?.workshop_participants?.map(
    (w) => w.workshop
  );

  return { fetchWorkshops };
};

export const validateEnrollment = function (body) {
  if (body.name.length < 3) {
    return {
      type: 'error',
      message: 'Name must be at least 3 characters long',
    };
  }

  if (body.name.length > 60) {
    return {
      type: 'error',
      message: 'Name must be less than 60 characters',
    };
  }

  if (!body.dob)
    return {
      type: 'error',
      message: 'Please provide your date of birth',
    };

  if (body.dob === 'Invalid Date')
    return {
      type: 'error',
      message: 'Please provide a valid date of birth',
    };

  if (new Date(body.dob) > new Date())
    return {
      type: 'error',
      message: 'Date of birth must be in past',
    };

  if (!validator.isMobilePhone(body.mobile_number)) {
    return {
      type: 'error',
      message: 'Please provide a valid mobile number',
    };
  }

  if (!validator.isEmail(body.email)) {
    return {
      type: 'error',
      message: 'Please provide a valid email',
    };
  }

  if (!body.address.length) {
    return {
      type: 'error',
      message: 'Please provide your address',
    };
  }

  if (body.name.length > 60) {
    return {
      type: 'error',
      message: 'Address must be less than 60 characters',
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

export const validateMeeting = function (body, isCreate = true) {
  if (!body.date || body.date === 'Invalid Date')
    return {
      type: 'error',
      message: 'Please provide a valid date',
    };

  if (new Date(body.date) < new Date() && isCreate)
    return {
      type: 'error',
      message: 'Date must be in future',
    };

  if (!body.venue_city)
    return {
      type: 'error',
      message: 'Please provide a city',
    };

  if (body.venue_city.length > 60)
    return {
      type: 'error',
      message: 'Venue city must be less than 60 characters',
    };

  if (!body.venue) {
    return {
      type: 'error',
      message: 'Please provide a venue',
    };
  }

  if (body.venue.length > 60)
    return {
      type: 'error',
      message: 'Venue must be less than 60 characters',
    };

  return true;
};

export const validateWorkshop = function (body, isCreate = true) {
  if (body.types.length < 6)
    return {
      type: 'error',
      message: 'Workshop type must be at least 6 characters long',
    };

  if (body.types.length > 60)
    return {
      type: 'error',
      message: 'Workshop type must be less than 60 characters',
    };

  if (!body.venue)
    return {
      type: 'error',
      message: 'Please provide a venue',
    };

  if (body.venue.length > 60)
    return {
      type: 'error',
      message: 'Venue must be less than 60 characters',
    };

  if (!body.venue_city)
    return {
      type: 'error',
      message: 'Please provide a venue city',
    };

  if (body.venue_city.length > 60)
    return {
      type: 'error',
      message: 'Venue city must be less than 60 characters',
    };

  if (!body.start_date || body.start_date === 'Invalid Date')
    return {
      type: 'error',
      message: 'Please provide a valid start date',
    };

  if (new Date(body.start_date) < new Date() && isCreate)
    return {
      type: 'error',
      message: 'Start date must be in future',
    };

  if (!body.end_date || body.end_date === 'Invalid Date')
    return {
      type: 'error',
      message: 'Please provide a valid end date',
    };

  if (new Date(body.end_date) < new Date(body.start_date))
    return {
      type: 'error',
      message: 'End date must be after start date',
    };

  if (!body.concluding_date || body.concluding_date === 'Invalid Date')
    return {
      type: 'error',
      message: 'Please provide a valid concluding date',
    };

  if (new Date(body.concluding_date) < new Date(body.end_date))
    return {
      type: 'error',
      message: 'Concluding date must be after end date',
    };

  return true;
};

export const validateInvite = function (body) {
  if (body.name.length < 3)
    return {
      type: 'error',
      message: 'Name must be at least 3 characters long',
    };

  if (!validator.isEmail(body.email))
    return {
      type: 'error',
      message: 'Please provide a valid email',
    };

  return true;
};

export const validateSignup = function (data) {
  if (data.name.value.length > 60) {
    return {
      type: 'error',
      message: 'Name must be less than 60 characters',
    };
  }

  if (!data.dob.value) {
    return {
      type: 'error',
      message: 'Please provide your date of birth',
    };
  }

  if (data.dob.value === 'Invalid Date') {
    return {
      type: 'error',
      message: 'Please provide valid date of birth',
    };
  }

  if (new Date(data.dob.value) > new Date())
    return {
      type: 'error',
      message: 'Date of birth must be in past',
    };

  if (!validator.isMobilePhone(data.phone.value)) {
    return {
      type: 'error',
      message: 'please provide a valid mobile number',
    };
  }

  if (
    !validator.isStrongPassword(data.password.value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    return {
      type: 'error',
      message:
        'Password must be at least 8 characters long and contain alphanumeric values',
    };
  }

  if (data.password.value !== data.confirmPassword.value) {
    return {
      type: 'error',
      message: 'Passwords must match',
    };
  }

  if (data.address.value.length > 100) {
    return {
      type: 'error',
      message: 'Address must be less than 100 characters',
    };
  }

  return true;
};
