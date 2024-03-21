import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useStyles } from './Dashboard.styles';
import { useNavigate } from 'react-router-dom'
import { ReactComponent as EnrollmentColorIcon } from '../.././assets/Icons/enrollmentsColorIcon.svg';
import { ReactComponent as VolunteerColorIcon } from '../.././assets/Icons/volunteerColorIcon.svg';
import { ReactComponent as MeetingsColorIcon } from '../.././assets/Icons/meetingsColorIcon.svg';
import { ReactComponent as WorkshopColorIcon } from '../.././assets/Icons/workshopColorIcon.svg';
import UpcomingWorkshop from '../../Components/UpcomingWorkshop/UpcomingWorkshop';
import DoughnutChart from './Charts/DonutChart/DoughnutChart';
import { useReactQuery } from '../../hooks/useReactQuery';
import { dashboardDetails, dashboardWorkshops } from '../../apis/dashboard';
import Loader from '../../Components/Loader/Loader';

const Dashboard = () => {
  const nav = useNavigate()
  const { data, isPending } = useReactQuery(
    ['dashboard'],
    dashboardDetails
  );
  const { data: wkshps, isPending: isLoading } = useReactQuery(
    ['wkshps'],
    dashboardWorkshops
  );

  const classes = useStyles();

  if (isPending || isLoading) {
    return <Loader isDashboard={true} />
  }

  const smallCardData = [
    {
      id: 0,
      title: 'Total volunteers',
      value: data?.data?.volunteers || 0,
      icon: <VolunteerColorIcon />,
      class: 'volunteer',
      click: () => nav('/volunteers'),
    },
    {
      id: 1,
      title: 'Total workshops',
      value: data?.data?.workshops || 0,
      icon: <WorkshopColorIcon />,
      class: 'workshop',
      click: () => nav('/workshops'),
    },
    {
      id: 2,
      title: 'Total Enrollments',
      value: data?.data?.enrollments || 0,
      icon: <EnrollmentColorIcon />,
      class: 'enrollment',
      click: () => nav('/enrollments'),
    },
    {
      id: 3,
      title: 'Total Meetings',
      value: data?.data?.meetings || 0,
      icon: <MeetingsColorIcon />,
      class: 'meeting',
      click: () => nav('/meetings'),
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
            sx={{
              cursor: 'pointer'
            }}
            onClick={item?.click}
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
          <Typography className="bigCardHeading">
            Upcoming Workshops
          </Typography>
          <Box className={classes.upcominWorkshops}>
            {wkshps?.data?.workshops?.length > 0 ? (
              wkshps?.data?.workshops?.map((workshop) => (
                <UpcomingWorkshop
                  key={workshop?.id}
                  title={workshop?.types}
                  startDate={workshop?.start_date}
                  endDate={workshop?.end_date}
                  location={workshop?.venue_city}
                />
              ))
            ) : (
              <Typography className="noWorkshop">
                No Upcoming workshops!
              </Typography>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
