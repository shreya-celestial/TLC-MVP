import React, { useState } from 'react';
import { useStyles } from './ResetPassword.styles';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { resetPass } from '../../apis/user';
import { useNavigate, useLocation } from 'react-router-dom';
import logo from '../../assets/Icons/tlcLogo.png';
import validator from 'validator';
import AlertReact from '../../Components/Alert/AlertReact';

function ResetPassword() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('reset');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMatch, setIsMatch] = useState(true);
  const [alertType, setAlertType] = useState('');

  const nav = useNavigate();
  const classes = useStyles();
  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const pass1 = e.target.elements.password.value;
    const pass2 = e.target.elements.passwordConfirm.value;
    if (
      !validator.isStrongPassword(pass1, {
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
    if (pass1 === pass2) {
      const data = await resetPass({
        token,
        password: pass1,
      });
      if (data?.status === 'success') {
        nav('/');
        return;
      }
      setAlertType({
        type: 'error',
        message: 'Something went wrong, Please try again later!',
      });
      return;
    }
    setIsMatch(false);
    setAlertType({
      type: 'error',
      message: 'Password must Match',
    });
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
        <Typography className={classes.header}>Reset Your Password</Typography>

        <form className={classes.form} onSubmit={handleSubmit}>
          <Box className={classes.FormElementInBox}>
            <FormControl required className={classes.formControl}>
              <FormLabel htmlFor="newpasswordField">New Password</FormLabel>
              <TextField
                type={showNewPassword ? 'text' : 'password'}
                placeholder="Enter New Password"
                id="newpasswordField"
                name="password"
                required
                autoComplete="off"
                InputProps={{
                  autoComplete: 'new-password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disableRipple
                        onClick={() => setShowNewPassword(!showNewPassword)}
                      >
                        {showNewPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
            <FormControl required className={classes.formControl}>
              <FormLabel htmlFor="confirmPasswordField">Password</FormLabel>
              <TextField
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Enter Your Password"
                id="confirmPasswordField"
                name="passwordConfirm"
                required
                autoComplete="off"
                InputProps={{
                  autoComplete: 'new-password',
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        disableRipple
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? (
                          <VisibilityOutlinedIcon />
                        ) : (
                          <VisibilityOffOutlinedIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </FormControl>
          </Box>

          <Button type="submit" disableRipple className={classes.resetBtn}>
            Reset Password
          </Button>
        </form>
      </Box>
    </Box>
  );
}

export default ResetPassword;
