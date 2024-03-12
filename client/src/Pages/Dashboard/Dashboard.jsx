import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Dashboard.styles';

import { ReactComponent as EnrollmentColorIcon } from '../.././assets/Icons/enrollmentsColorIcon.svg';
import { ReactComponent as VolunteerColorIcon } from '../.././assets/Icons/volunteerColorIcon.svg';
import { ReactComponent as MeetingsColorIcon } from '../.././assets/Icons/meetingsColorIcon.svg';
import { ReactComponent as WorkshopColorIcon } from '../.././assets/Icons/workshopColorIcon.svg';
import UpcomingWorkshop from '../../Components/UpcomingWorkshop/UpcomingWorkshop';
import DoughnutChart from './Charts/DonutChart/DoughnutChart';
import { useReactQuery } from '../../hooks/useReactQuery';
import { dashboardDetails } from '../../apis/dashboard';
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
  const { data, isPending } = useReactQuery([(new Date()).getSeconds()], dashboardDetails)
  console.log(data)
  const classes = useStyles();
  const smallCardData = [
    {
      id: 0,
      title: 'Total volunteers',
      value: data?.data?.volunteers || 0,
      icon: <VolunteerColorIcon />,
      class: 'volunteer',
    },
    {
      id: 1,
      title: 'Total workshops',
      value: data?.data?.workshops || 0,
      icon: <WorkshopColorIcon />,
      class: 'workshop',
    },
    {
      id: 2,
      title: 'Total Enrollments',
      value: data?.data?.enrollments || 0,
      icon: <EnrollmentColorIcon />,
      class: 'enrollment',
    },
    {
      id: 3,
      title: 'Total Meetings',
      value: data?.data?.meetings || 0,
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
            <DoughnutChart data={data} />
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
