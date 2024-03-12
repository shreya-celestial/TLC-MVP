import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useStyles } from './Loader.styles';

function Loader() {
  const classes = useStyles();
  return (
    <Backdrop open className={classes.loaderRoot}>
      <CircularProgress />
    </Backdrop>
  );
}

export default Loader;
