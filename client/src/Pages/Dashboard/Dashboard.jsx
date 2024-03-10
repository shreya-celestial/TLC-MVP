import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Dashboard.styles';

import { ReactComponent as EnrollmentColorIcon } from '../.././assets/Icons/enrollmentsColorIcon.svg';
import { ReactComponent as VolunteerColorIcon } from '../.././assets/Icons/volunteerColorIcon.svg';
import { ReactComponent as MeetingsColorIcon } from '../.././assets/Icons/meetingsColorIcon.svg';
import { ReactComponent as WorkshopColorIcon } from '../.././assets/Icons/workshopColorIcon.svg';
import UpcomingWorkshop from '../../Components/UpcomingWorkshop/UpcomingWorkshop';
import DoughnutChart from './Charts/DonutChart/DoughnutChart';
const upcominWorkshops = [
  {
    title: 'Confidence, Power and Excellence',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    location: 'Pune',
  },
  {
    title: 'Confidence, Power and Excellence',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    location: 'Pune',
  },
  {
    title: 'Confidence, Power and Excellence',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    location: 'Pune',
  },
  {
    title: 'Confidence, Power and Excellence',
    startDate: '2024-03-10',
    endDate: '2024-03-20',
    location: 'Pune',
  },
];

const Dashboard = () => {
  const classes = useStyles();
  const smallCardData = [
    {
      id: 0,
      title: 'Total volunteers',
      value: 50,
      icon: <VolunteerColorIcon />,
      class: 'volunteer',
    },
    {
      id: 1,
      title: 'Total workshops',
      value: 20,
      icon: <WorkshopColorIcon />,
      class: 'workshop',
    },
    {
      id: 2,
      title: 'Total Enrollments',
      value: 1100,
      icon: <EnrollmentColorIcon />,
      class: 'enrollment',
    },
    {
      id: 3,
      title: 'Total Meetings',
      value: 40,
      icon: <MeetingsColorIcon />,
      class: 'meeting',
    },
  ];

  return (
    <Box className={classes.root}>
      <Box className={classes.smallCardContainer}>
        {smallCardData.map((item) => (
          <Stack
            key={item.id}
            className={`${classes.smallCard} ${item.class}`}
            divider={<Divider orientation="vertical" flexItem />}
            direction={'row'}
          >
            {item.icon}
            <Box className={classes.titleAndValue}>
              <Typography className="cardValue">
                {item.value.toLocaleString()}
              </Typography>
              <Typography className="cardTitle">{item.title}</Typography>
            </Box>
          </Stack>
        ))}
      </Box>
      <Box className={classes.bigCardContainer}>
        <Box className={classes.bigCard}>
          <Typography className="bigCardHeading">
            Last 6 Months Enrollments
          </Typography>
          <Box className={classes.chartMain}>
            <DoughnutChart />
          </Box>
        </Box>
        <Box className={classes.bigCard}>
          <Typography className="bigCardHeading">Upcoming Workshops</Typography>
          <Box className={classes.upcominWorkshops}>
            {upcominWorkshops.map((workshop, index) => (
              <UpcomingWorkshop
                key={index}
                title={workshop.title}
                startDate={workshop.startDate}
                endDate={workshop.endDate}
                location={workshop.location}
              />
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
