import {
  Drawer,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from '@mui/material';
import React from 'react';
import { useStyles } from './Sidebar.styles';
import { NavLink } from 'react-router-dom';
import { ReactComponent as DashboardIcon } from '../.././assets/Icons/dashboardIcon.svg';
import { ReactComponent as EnrollmentIcon } from '../.././assets/Icons/enrollmentIcon.svg';
import { ReactComponent as VolunteerIcon } from '../.././assets/Icons/volunteerIcon.svg';
import { ReactComponent as MeetingsIcon } from '../.././assets/Icons/meetingsIcon.svg';
import { ReactComponent as WorkshopIcon } from '../.././assets/Icons/workshopIcon.svg';

const Sidebar = ({ open }) => {
  const classes = useStyles();
  const isLargerScreen = useMediaQuery((theme) => theme.breakpoints.up('md'));
  const sideBarRoute = [
    { id: 0, path: 'dashboard', name: 'Dashboard', icon: <DashboardIcon /> },
    { id: 1, path: 'volunteers', name: 'Volunteers', icon: <VolunteerIcon /> },
    { id: 2, path: 'workshops', name: 'Workshops', icon: <WorkshopIcon /> },
    { id: 3, path: 'meetings', name: 'Meetings', icon: <MeetingsIcon /> },
    {
      id: 4,
      path: 'enrollments',
      name: 'Enrollments',
      icon: <EnrollmentIcon />,
    },
  ];

  return (
    <Drawer
      variant="persistent"
      open={isLargerScreen ? true : open}
      className={classes.root}
    >
      <Toolbar />
      {sideBarRoute.map((links) => (
        <ListItem key={links.id} className={classes.sideBarLinks}>
          <ListItemButton
            disableRipple
            LinkComponent={NavLink}
            to={links.path}
            className={classes.navlink}
          >
            <ListItemIcon className="sidebarIcon">{links.icon}</ListItemIcon>
            <ListItemText className="sidebarText" primary={links.name} />
          </ListItemButton>
        </ListItem>
      ))}
    </Drawer>
  );
};

export default Sidebar;
