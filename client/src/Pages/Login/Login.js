import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useStyles } from './Login.styles';
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import { ReactComponent as GoogleIcon } from '../../assets/Icons/google.svg';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { login } from '../../apis/user';
import { useMutation } from '@tanstack/react-query';
import AlertReact from '../../Components/Alert/AlertReact';
import logo from '../../assets/Icons/tlcLogo.png';
import { useNavigate } from 'react-router-dom';
import UserContext from '../../store/userContext';

function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState(false);
  const [alertType, setAlertType] = useState();
  const { setUser } = useContext(UserContext)

  const removeAlertType = function () {
    setAlertType(undefined);
  };

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      if (data.status === 'error' || data?.message === 'Please provide email and password!') {
        setAlertType({
          type: data.status || 'error',
          message: data.message,
        });
      } else {
        setUser(data?.user)
        const keys = {
          id: data?.user?.email,
          key: data?.user?.key
        }
        localStorage.setItem('keys', JSON.stringify(keys))
        navigate('/dashboard');
      }
    },
    onError: (error) => {
      setAlertType({
        type: 'error',
        message: error?.info?.message || 'Something Went Wrong',
      });
    },
  });

  const handleSignInSubmit = async (e) => {
    e.preventDefault();
    const body = {
      email: e.target.elements.email.value,
      password: e.target.elements.password.value,
    };
    mutate({ ...body });
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
        <Typography className={classes.header}>
          Login into <span>The Last Center</span> to continue
        </Typography>
        <Box className={classes.formWrapper}>
          <form className={classes.form} onSubmit={handleSignInSubmit}>
            <FormControl required className={classes.formControl}>
              <FormLabel htmlFor="emailField">Email Address</FormLabel>
              <TextField
                type="email"
                id="emailField"
                placeholder="Enter Your Email Address"
                name="email"
                required
              />
            </FormControl>
            <Box className={classes.FormElementInBox}>
              <FormControl required className={classes.formControl}>
                <FormLabel htmlFor="passwordField">Password</FormLabel>
                <TextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter Your Password"
                  id="passwordField"
                  name="password"
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          disableRipple
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
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
              <Link to={'/forgotPass'} className="forgotPassword">
                Forgot Password?
              </Link>
            </Box>
            <Box className={classes.FormElementInBox}>
              <Button
                type="submit"
                disableRipple
                className={`${classes.signInBtn} continueBtn`}
              >
                {isPending ? 'loading...' : 'Continue'}
              </Button>
              <Typography>
                Don't have an account?{' '}
                <Link to={'/signup'} className="signup">
                  Sign up
                </Link>
              </Typography>
            </Box>
          </form>

          {/* <Divider sx={{ fontSize: '12px' }}>OR</Divider>
          <Button
            startIcon={<GoogleIcon />}
            disableRipple
            className={`${classes.signInBtn} googleBtn`}
            onClick={() => alert('login with google')}
          >
            Continue with Google
          </Button> */}
        </Box>
      </Box>
    </Box>
  );
}

export default Login;
