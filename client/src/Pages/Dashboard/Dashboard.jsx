import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Dashboard.styles';
import SmallCard from '../../Components/SmallCard/SmallCard';
import UpcomingWorkshop from '../../Components/UpcomingWorkshop/UpcomingWorkshop';

const Dashboard = () => {
  const classes = useStyles();

  return (
    <>
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
    </>
  );
};

export default Dashboard;
