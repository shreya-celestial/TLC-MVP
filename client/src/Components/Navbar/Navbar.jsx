import { Box, Divider } from '@mui/material';
import React from 'react';

import { useStyles } from './Navbar.styles';

const Navbar = () => {
  const classes = useStyles();

  return (
    <>
      <Box className={classes.nav}>hello there</Box>
      <Divider className={classes.divider} />
    </>
  );
};

export default Navbar;
