import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  TextField,
  Typography,
} from '@mui/material';
import { useStyles } from './ForgetPassword.styles';
import { forgotPass } from '../../apis/user';
import logo from '../../assets/Icons/tlcLogo.png';
function ForgetPassword() {
  const classes = useStyles();
  const [isFound, setIsFound] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target.elements.email.value,
    };
    const data = await forgotPass(body);
    if (data?.status === 'error') {
      setIsFound(false);
    }
  };

  return (
    <Box className={classes.root}>
      <Box className={classes.mainWrapper}>
        <img className={classes.logo} src={logo} alt="The Last Center Logo" />
        <Typography className={classes.header}>Forgot Password</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Box className={classes.FormElementInBox}>
            <FormControl className={classes.formControl} required>
              <FormLabel htmlFor="emailField">Email Address</FormLabel>
              <TextField
                type="email"
                id="emailField"
                placeholder="Enter Your Email Address"
                required
                name="email"
              />
            </FormControl>
            {!isFound && (
              <Typography className="emailNotFound">
                We cannot find your email
              </Typography>
            )}
          </Box>

          <Box className={classes.FormElementInBox}>
            <Button type="submit" disableRipple className={classes.verifyBtn}>
              Verify
            </Button>

            <Link to={'/'} className="backToLogin">
              Back to Login
            </Link>
          </Box>
        </form>
      </Box>
    </Box>
  );
}

export default ForgetPassword;
