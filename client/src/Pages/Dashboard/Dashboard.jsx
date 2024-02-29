import { Box, Divider, Grid, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Dashboard.styles';
import SmallCard from '../../Components/SmallCard/SmallCard';
import UpcomingWorkshop from '../../Components/UpcomingWorkshop/UpcomingWorkshop';
const Dashboard = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Box className={classes.nav}>hello there</Box>
      <Divider />
      <Box className={classes.body}>
        <Box className={classes.sidebar}>sidebar</Box>
        <Box className={classes.main}>
          <Grid className={classes.gridContainer} container spacing={2}>
            <Grid item xs={6} md={3}>
              <SmallCard
                data={{
                  count: 50,
                  title: 'Total Volunteers',
                  type: 'volunteers',
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <SmallCard
                data={{
                  count: 50,
                  title: 'Total Workshops',
                  type: 'workshops',
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <SmallCard
                data={{
                  count: 50,
                  title: 'Total Enrollments',
                  type: 'enrollments',
                }}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <SmallCard
                data={{
                  count: 50,
                  title: 'Total Meetings',
                  type: 'meetings',
                }}
              />
            </Grid>
          </Grid>

          <Grid className={classes.gridContainer} container spacing={2}>
            <Grid item xs={6} md={6}>
              <Box className={classes.bigCard}>Volunteer</Box>
            </Grid>
            <Grid item xs={6} md={6}>
              <Box className={classes.bigCard}>
                <Typography className={classes.workshopHeading} component="h1">
                  Upcoming Workshops
                </Typography>
                <UpcomingWorkshop />
                <UpcomingWorkshop />
                <UpcomingWorkshop />
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
