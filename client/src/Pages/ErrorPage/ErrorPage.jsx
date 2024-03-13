import React from 'react';
import { ReactComponent as ErrorImg } from '../.././assets/Icons/error.svg';
import { Box, Button, Typography } from '@mui/material';
import { useStyles } from './ErrorPage.styles';
import { useNavigate } from "react-router-dom"

function ErrorPage({ children }) {
  const classes = useStyles();
  const nav = useNavigate()
  const handleClick = () => {
    nav('/')
  }

  if (!children) {
    return (
      <Box className={classes.root}>
        <ErrorImg />
        <Box className={classes.errorHeadingText}>
          <Typography className="errorHeading">PAGE NOT FOUND</Typography>
          <Typography className="errorText">
            The page you are looking for not available!
          </Typography>
        </Box>
        <Button className={classes.errorBtn} disableRipple onClick={handleClick}>
          Back to safety
        </Button>
      </Box>
    );
  }

  return (
    <Box className={classes.root}>
      <ErrorImg />
      <Box className={classes.errorHeadingText}>
        <Typography className="errorHeading">PAGE NOT FOUND</Typography>
        <Typography className="errorText">
          {children}
        </Typography>
      </Box>
      <Button className={classes.errorBtn} disableRipple>
        <a href='/' style={{
          textDecoration: 'none',
          color: 'white'
        }}>Back to safety</a>
      </Button>
    </Box>
  )
}

export default ErrorPage;
