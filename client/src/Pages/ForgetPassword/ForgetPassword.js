import React, { useEffect, useState } from 'react';
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
import validator from 'validator';
import AlertReact from '../../Components/Alert/AlertReact';
function ForgetPassword() {
  const classes = useStyles();

  const [alertType, setAlertType] = useState();
  const [isThrottle, setIsThrottle] = useState(false);
  const [disableBtn, setDisableBtn] = useState(false);
  const [status, setStatus] = useState(null);
  const [msg, setMsg] = useState('');

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    let intervalId;

    if (timer > 0 && disableBtn) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    if (timer === 0) {
      setDisableBtn(false);
      setIsThrottle(false);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [timer]);

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  function verifyEmail(e) {
    const verify = async (e) => {
      const body = {
        email: e.target.elements.email.value,
      };

      if (!validator.isEmail(body.email)) {
        return setAlertType({
          type: 'error',
          message: 'Please enter a valid email.',
        });
      }

      const data = await forgotPass(body);
      if (data?.status === 'error') {
        setAlertType({
          type: 'error',
          message: data.message,
        });
      }
      if (data?.status === 'success') {
        setAlertType({
          type: 'success',
          message: data.message,
        });
      }
    };
    verify(e);
  }
  function Throttle(e, fun, delay) {
    return () => {
      if (isThrottle) {
        return;
      }
      setIsThrottle(true);
      fun(e);
      setTimer(20);
      setDisableBtn(true);

      setTimeout(() => {
        setIsThrottle(false);
      }, delay);
    };
  }
  function verifySubmit(e) {
    e.preventDefault();
    Throttle(e, verifyEmail, 20000)();
  }

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
        <Typography className={classes.header}>Forgot Password</Typography>

        <form className={classes.form} onSubmit={verifySubmit}>
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
          </Box>

          <Box className={classes.FormElementInBox}>
            <Button
              type="submit"
              disableRipple
              className={classes.verifyBtn}
              disabled={disableBtn}
            >
              {disableBtn ? `Resend in ${timer} seconds` : 'Verify'}
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
