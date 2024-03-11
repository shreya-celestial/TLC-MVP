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
  if (body.name.length < 6) {
    return {
      type: 'error',
      message: 'Name must be at least 6 char long',
    };
  }

  if (!body.dob)
    return {
      type: 'error',
      message: 'Please Provide Date of Birth',
    };

  if (!validator.isMobilePhone(body.mobile_number)) {
    return {
      type: 'error',
      message: 'Please provide valid mobile number',
    };
  }

  if (!validator.isEmail(body.email)) {
    return {
      type: 'error',
      message: 'Please provide valid email',
    };
  }

  if (body.address.length < 10) {
    return {
      type: 'error',
      message: 'Please provide valid address',
    };
  }
  if (!body.pincode) {
    return {
      type: 'error',
      message: 'Please provide a pincode',
    };
  }

  if (!body.city) {
    return {
      type: 'error',
      message: 'Please provide a city',
    };
  }

  if (!body.state) {
    return {
      type: 'error',
      message: 'Please provide a state',
    };
  }

  return true;
};

export const validateMeeting = function (body) {
  if (!body.date)
    return {
      type: 'error',
      message: 'Please Provide a Date.',
    };

  if (!body.venue_city)
    return {
      type: 'error',
      message: 'Please Provide a City.',
    };

  if (!body.venue) {
    return {
      type: 'error',
      message: 'Please provide a venue.',
    };
  }

  return true;
};

export const validateWorkshop = function (body) {
  if (body.types.length < 6)
    return {
      type: 'error',
      message: 'Workshop type must be at least 6 characters long.',
    };

  if (!body.venue)
    return {
      type: 'error',
      message: 'Please Provide a Venue.',
    };

  if (!body.venue_city)
    return {
      type: 'error',
      message: 'Please Provide a Venue city.',
    };

  if (!body.start_date)
    return {
      type: 'error',
      message: 'Please provide a start date.',
    };

  if (!body.end_date)
    return {
      type: 'error',
      message: 'Please provide an end date.',
    };

  if (!body.concluding_date)
    return {
      type: 'error',
      message: 'Please provide a concluding date.',
    };

  return true;
};

export const validateInvite = function (body) {
  if (body.name.length < 6)
    return {
      type: 'error',
      message: 'Name must be at least 6 characters long.',
    };

  if (!validator.isEmail(body.email))
    return {
      type: 'error',
      message: 'Please provide a valid email.',
    };

  return true;
};

export const validateSignup = function (data) {
  if (!data.dob.value) {
    return {
      type: 'error',
      message: 'Please enter your Date of birth',
    };
  }

  if (!validator.isMobilePhone(data.phone.value)) {
    return {
      type: 'error',
      message: 'please provide valid mobile number',
    };
  }

  if (!validator.isEmail(data.email.value)) {
    return {
      type: 'error',
      message: 'please provide valid email',
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
        'Password must be 8 characters long and contain alphanumeric values',
    };
  }

  if (data.password.value !== data.confirmPassword.value) {
    return {
      type: 'error',
      message: 'Passwords must match',
    };
  }

  return true;
};
