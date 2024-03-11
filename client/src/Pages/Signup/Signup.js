import React, { useState } from 'react';

import { useStyles } from './Signup.styles';
import { Link, useLocation } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import VolunteerForm from '../../Components/VolunteerForm/VolunteerForm';

import { signup, signupInvite } from '../../apis/user';
import AlertReact from '../../Components/Alert/AlertReact';
import { getCookie, deleteCookie, validateSignup } from '../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import validator from 'validator';
import logo from '../../assets/Icons/tlcLogo.png';

function Signup() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const classes = useStyles();
  const [alertType, setAlertType] = useState();
  const [signupType, setSignupType] = useState('normal');

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signupType === 'normal' ? signup : signupInvite,
    onSuccess: (data) => {
      // deleteCookie('email');
      // deleteCookie('token');
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

    const isValid = validateSignup(e.target.elements);
    if (isValid.type) return setAlertType(isValid);

    const token = queryParams.get('token');
    const email = queryParams.get('for');
    console.log(queryParams);
    // const token = getCookie('token');
    // const email = getCookie('email');

    const body = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
      name: e.target.elements.name.value,
      dob: (new Date(e.target.elements.dob.value)).toLocaleDateString(),
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
      mutate({ ...body, token, email });
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
        <img className={classes.logo} src={logo} alt="The Last Center Logo" />
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
