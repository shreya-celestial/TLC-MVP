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
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Icons/tlcLogo.png';
function ResetPassword() {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isMatch, setIsMatch] = useState(true);
  const nav = useNavigate();
  const classes = useStyles();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cookies = document.cookie;
    const pass1 = e.target.elements.password.value;
    const pass2 = e.target.elements.passwordConfirm.value;
    if (pass1 === pass2) {
      const data = await resetPass({ password: pass1 }, cookies);
      if (data?.status === 'success') {
        document.cookie =
          'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
        nav('/');
        return;
      }
      alert('Something went wrong, Please try again later!');
      return;
    }
    setIsMatch(false);
  };

  return (
    <Box className={classes.root}>
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
                InputProps={{
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
                InputProps={{
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
            {!isMatch && (
              <Typography className="passwordNotMatch">
                Password do not match
              </Typography>
            )}
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
