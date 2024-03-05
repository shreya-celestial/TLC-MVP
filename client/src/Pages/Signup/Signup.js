import React, { useState } from 'react';
import { useStyles } from './Signup.styles';
import { Link } from 'react-router-dom';
import { Box, Typography } from '@mui/material';
import VolunteerForm from '../../Components/VolunteerForm/VolunteerForm';
import { signup, signupInvite } from '../../apis/user';

import AlertReact from '../../Components/Alert/AlertReact';
import { getCookie, deleteCookie } from '../../utils/utils';

function Signup() {
  const classes = useStyles();
  const [alertType, setAlertType] = useState();

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!e.target.elements.dob.value) {
      setAlertType({
        type: 'success',
        message: 'Please enter your Date of birth',
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

    let data;
    if (token) {
      data = await signupInvite({ ...body, token, isAdmin, email });
      if (data?.status === 'success') {
        deleteCookie('token');
        deleteCookie('isAdmin');
        deleteCookie('email');
        setAlertType({ type: 'success', message: data.message });
        return;
      }
    } else {
      data = await signup(body);
      if (data?.status === 'success') {
        setAlertType({ type: 'success', message: data.message });
        return;
      }
    }
    setAlertType({ type: 'error', message: data.message });
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
          <VolunteerForm submit={handleSubmit} />
          <Box className={classes.signUpBtn_loginLink}>
            <Typography className={classes.loginLink}>
              Already have an account?
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
