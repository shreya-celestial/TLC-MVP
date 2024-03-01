import { Box } from '@mui/material';
import React from 'react';

import { useStyles } from './Sidebar.styles';
import { NavLink } from 'react-router-dom';

import GridViewIcon from '@mui/icons-material/GridView';
import BackHandIcon from '@mui/icons-material/BackHand';
import WorkspacesIcon from '@mui/icons-material/Workspaces';
import GroupsIcon from '@mui/icons-material/Groups';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';

const Sidebar = () => {
  const classes = useStyles();

  return (
    <Box className={classes.sidebar}>
      <NavLink to="/dashboard" className={classes.firstLink}>
        <GridViewIcon /> Dashboard
      </NavLink>
      <NavLink to="/volunteers">
        <BackHandIcon /> Volunteers
      </NavLink>
      <NavLink to="/workshops">
        <WorkspacesIcon /> Workshops
      </NavLink>
      <NavLink to="/meetings">
        <GroupsIcon /> Meetings
      </NavLink>
      <NavLink to="/enrollments">
        <SubscriptionsIcon /> Enrollments
      </NavLink>
    </Box>
  );
};

export default Sidebar;
