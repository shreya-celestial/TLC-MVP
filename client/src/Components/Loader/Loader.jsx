import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useStyles } from './Loader.styles';

function Loader({ isDashboard = false }) {
  const classes = useStyles();
  return (
    <Backdrop open className={isDashboard ? classes.dashboardLoader : classes.loaderRoot}>
      <CircularProgress />
    </Backdrop>
  );
}

export default Loader;
