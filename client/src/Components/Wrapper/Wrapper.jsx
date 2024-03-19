import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import { useStyles } from './Wrapper.styles';
import { useContext, useState } from 'react';
import UserContext from '../../store/userContext';
const Wrapper = ({ children }) => {
  const { user } = useContext(UserContext);
  const [open, setOpen] = useState(false);
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const classes = useStyles();
  const handleSidebarOpen = () => {
    setOpen(!open);
    setIsSideBarOpen(!isSidebarOpen);
  };

  return (
    <Box className={classes.root}>
      {user && (
        <Navbar
          handleSidebarOpen={handleSidebarOpen}
          isSidebarOpen={isSidebarOpen}
        />
      )}
      {user && <Sidebar open={open} handleSidebarOpen={handleSidebarOpen} />}
      {user && <Box className={classes.main}>{children}</Box>}
      {!user && <Box>{children}</Box>}
    </Box>
  );
};

export default Wrapper;
