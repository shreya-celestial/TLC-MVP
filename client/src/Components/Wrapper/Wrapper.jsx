import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useStyles } from './Wrapper.styles';
import { useContext, useState } from 'react';
import UserContext from '../../store/userContext';
const Wrapper = ({ children }) => {
  const { user } = useContext(UserContext)
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const handleSidebarOpen = () => {
    setOpen(!open);
  };

  return (
    <Box className={classes.root}>
      {user && <Navbar handleSidebarOpen={handleSidebarOpen} />}
      {user && <Sidebar open={open} />}
      {user && <Box className={classes.main}>{children}</Box>}
      {!user && <Box className={classes.notUser}>{children}</Box>}
    </Box>
  );
};

export default Wrapper;
