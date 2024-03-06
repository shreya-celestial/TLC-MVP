
import React, { useState } from 'react';

import { useStyles } from './Signup.styles';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import VolunteerForm from '../../Components/VolunteerForm/VolunteerForm';

import { signup, signupInvite } from '../../apis/user';
import AlertReact from '../../Components/Alert/AlertReact';
import { getCookie, deleteCookie } from '../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import validator from 'validator';


function Signup() {
  const classes = useStyles();
  const [alertType, setAlertType] = useState();
  const [signupType, setSignupType] = useState('normal');

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signupType === 'normal' ? signup : signupInvite,
    onSuccess: (data) => {
      deleteCookie('email');
      deleteCookie('isAdmin');
      deleteCookie('token');
      setAlertType({
        type: data.status,
        message: data.message,
      });
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error.info.message,
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.elements.dob.value) {

      setAlertType({
        type: 'error',
        message: 'Please enter your Date of birth',
      });

    }

    if (!validator.isMobilePhone(e.target.elements.phone.value)) {
      return setAlertType({
        type: 'error',
        message: 'please provide valid mobile number',
      });
    }

    if (!validator.isEmail(e.target.elements.email.value)) {
      return setAlertType({
        type: 'error',
        message: 'please provide valid email',
      });
    }

    if (
      !validator.isStrongPassword(e.target.elements.password.value, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      return setAlertType({
        type: 'error',
        message:
          'Password must be 8 characters long and contain alphanumeric values',
      });
    }

    const token = getCookie('token');
    const isAdmin = getCookie('isAdmin');
    const email = getCookie('email');

    const body = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      name: e.target.elements.name.value,
      dob: e.target.elements.dob.value,
      gender: e.target.elements.gender.value,
      phoneNumber: e.target.elements.phone.value,
      yearOfJoining: +e.target.elements.yearOfJoining.value,
      location: e.target.elements.address.value,
      city: e.target.elements.city.value,
      state: e.target.elements.state.value,
      pincode: +e.target.elements.pincode.value,
    };


    if (token) {
      setSignupType('invite');
      mutate({ ...body, token, isAdmin, email });
    } else {
      setSignupType('normal');
      mutate({ body });
    }

  };

  return (
    <Box className={classes.root}>
      {alertType && (
        <AlertReact
          removeAlertType={removeAlertType}
          type={alertType.type}
          message={alertType.message}
        />
      )}
      <Box className={classes.mainWrapper}>
        <img
          className={classes.logo}
          src="images/tlc_logo.png"
          alt="The Last Center Logo"
        />
        <Typography className={classes.header}>Create an account</Typography>
        <Box className={classes.signupWrapper}>
          <VolunteerForm submit={handleSubmit} isPending={isPending} />
          <Box className={classes.signUpBtn_loginLink}>
            <Typography className={classes.loginLink}>
              Already have an account?{' '}
              <Link to={'/'} className="login">
                Log in
              </Link>
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Signup;
