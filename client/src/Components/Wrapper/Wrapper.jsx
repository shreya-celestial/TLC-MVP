import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useStyles } from './Wrapper.styles';
import { useState } from 'react';
const Wrapper = ({ children }) => {
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleSidebarOpen = () => {
    setOpen(!open);
  };

  return (
    <Box className={classes.root}>
      <Navbar handleSidebarOpen={handleSidebarOpen} />
      <Sidebar open={open} />
      <Box className={classes.main}>{children}</Box>
    </Box>
  );
};

export default Wrapper;
