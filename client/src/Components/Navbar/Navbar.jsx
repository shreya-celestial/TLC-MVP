import {
  AppBar,
  Avatar,
  Box,
  IconButton,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Toolbar,
  Typography,
  useMediaQuery
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React, { useContext, useState } from 'react';
import { useStyles } from './Navbar.styles';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import logo from '../../assets/Icons/tlcLogo.png';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link, useNavigate } from 'react-router-dom';
import UserContext from '../../store/userContext';
import { logStatus } from '../../apis/user';
const Navbar = ({ handleSidebarOpen }) => {
  const { user, setUser } = useContext(UserContext)
  const nav = useNavigate()
  const isLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const [isSidebarOpen, setIsSideBarOpen] = useState(false);
  const [profileAnchorEL, setProfileAnchorEl] = useState(null);
  const classes = useStyles();
  const handleSidebar = () => {
    handleSidebarOpen();
    setIsSideBarOpen(!isSidebarOpen);
  };

  const handleLogout = async (e) => {
    e.preventDefault()
    setProfileAnchorEl(null)
    const body = {
      email: user?.email,
      key: user?.key,
      isLoggingOut: true
    }
    await logStatus(body)
    setUser(null)
    localStorage.clear();
    nav('/')
  }

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
          <img src={logo} loading="lazy" alt="The Last Center" />
        </Box>
        <Box className={classes.profile}>
          <Avatar>{user?.name?.substring(0, 1)}</Avatar>
          <Box className={classes.userNameAndUserRole}>
            <Typography className="userName" sx={{ color: 'black' }}>
              {user?.name}
            </Typography>
            <Typography className="userRole" sx={{ color: 'black' }}>
              {user?.isAdmin ? 'Admin' : 'Volunteer'}
            </Typography>
          </Box>
          <IconButton
            className={classes.arrowProfileIcon}
            onClick={(e) => setProfileAnchorEl(e.currentTarget)}
          >
            <ExpandMoreIcon />
          </IconButton>
          {/* profile dropdown */}
          <Menu
            open={Boolean(profileAnchorEL)}
            anchorEl={profileAnchorEL}
            onClose={() => setProfileAnchorEl(null)}
            className={classes.profileDropdown}
          >
            <ListItem>
              <ListItemButton
                LinkComponent={Link}
                to={'/'}
                onClick={handleLogout}
              >
                <ListItemIcon>
                  <LogoutOutlinedIcon />
                </ListItemIcon>
                <ListItemText>Logout</ListItemText>
              </ListItemButton>
            </ListItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
