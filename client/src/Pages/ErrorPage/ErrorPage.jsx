import React from 'react';
import { ReactComponent as ErrorImg } from '../.././assets/Icons/error.svg';
import { Box, Button, Typography } from '@mui/material';
import { useStyles } from './ErrorPage.styles';

function ErrorPage() {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <ErrorImg />
      <Box className={classes.errorHeadingText}>
        <Typography className="errorHeading">PAGE NOT FOUND</Typography>
        <Typography className="errorText">
          The page you are looking for not available!
        </Typography>
      </Box>
      <Button className={classes.errorBtn} disableRipple>
        Back to safety
      </Button>
    </Box>
  );
}

export default ErrorPage;
