import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useState } from 'react';
import { useStyles } from './Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/Icons/tlcLogo.png'
const Navbar = ({ handleSidebarOpen }) => {
  const isLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const classes = useStyles();
  const handleSidebar = () => {
    handleSidebarOpen();
    setIsSideBarOpen(!isSidebarOpen);
  };
  console.log(logo)
  return (
    <AppBar className={classes.root}>
      <Toolbar className="toolbar">
        <Box className={classes.logoAndHamburger}>
          {!isLargerScreen && (
            <IconButton
              className="hamIconBtn"
              disableRipple
              onClick={handleSidebar}
            >
              {!isSidebarOpen ? <MenuIcon /> : <CloseIcon />}
            </IconButton>
          )}
          <img
            src={logo}
            loading="lazy"
            alt="The Last Center"
          />
        </Box>
        <Box className={classes.profile}>
          <Avatar>J D</Avatar>
          <Box className={classes.userNameAndUserRole}>
            <Typography className="userName" sx={{ color: 'black' }}>
              John Doe
            </Typography>
            <Typography className="userRole" sx={{ color: 'black' }}>
              Admin
            </Typography>
          </Box>
          <IconButton className={classes.arrowProfileIcon}>
            <ExpandMoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
