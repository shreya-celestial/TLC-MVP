import React, { useState } from 'react';
import { useStyles } from './Signup.styles';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import VolunteerForm from '../../Components/VolunteerForm/VolunteerForm';

import { signup, signupInvite } from '../../apis/user';
import AlertReact from '../../Components/Alert/AlertReact';
import { validateSignup } from '../../utils/utils';
import { useMutation } from '@tanstack/react-query';
import logo from '../../assets/Icons/tlcLogo.png';
import validator from 'validator';

function Signup() {
  const location = useLocation();
  const nav = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const email = queryParams.get('for');
  const classes = useStyles();
  const [alertType, setAlertType] = useState();
  const [signupType, setSignupType] = useState('normal');

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const [alertKey, setAlertKey] = useState(true);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: signupType === 'normal' ? signup : signupInvite,
    onSuccess: (data) => {
      setAlertType({
        type: data.status,
        message: data.message,
      });
      if (email) {
        nav('/');
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAlertKey((prev) => !prev);

    const token = queryParams.get('token');
    const email = queryParams.get('for');

    const isValid = validateSignup(e.target.elements);
    if (isValid.type) return setAlertType(isValid);

    if (email) {
      if (!validator.isEmail(email)) {
        return setAlertType({
          type: 'error',
          message: 'please provide valid email',
        });
      }
    } else {
      if (!validator.isEmail(e.target.elements.email.value)) {
        return setAlertType({
          type: 'error',
          message: 'please provide valid email',
        });
      }
    }

    const body = {
      email: email || e.target.elements.email.value,
      password: e.target.elements.password.value,
      name: e.target.elements.name.value,
      dob: new Date(e.target.elements.dob.value).toLocaleDateString(),
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
          alertKey={alertKey}
        />
      )}
      <Box className={classes.mainWrapper}>
        <img className={classes.logo} src={logo} alt="The Last Center Logo" />
        <Typography className={classes.header}>Create an account</Typography>
        <Box className={classes.signupWrapper}>
          <VolunteerForm
            submit={handleSubmit}
            isPending={isPending}
            isEmail={email}
          />
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
