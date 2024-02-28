import { Box } from '@mui/material';
import React from 'react';
import { useStyles } from './Dashboard.styles';

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.nav}>hello there</Box>
    </Box>
  );
};

export default Dashboard;
