import { Box, Typography } from '@mui/material';
import { useStyles } from './UpcomingWorkshop.styles';
import classNames from 'classnames';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';

const UpcomingWorkshop = ({ title, startDate, endDate, location }) => {
  var months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const classes = useStyles();
  const startingDate = new Date(startDate).getDate();
  const startingMonth = new Date(startDate).getMonth();
  const endingDate = new Date(endDate).getDate();
  const endingMonth = new Date(endDate).getMonth();

  return (
    <Box className={classes.workshop}>
      <Box className={classNames(classes.card)}>
        <Typography>{startingDate}</Typography>
        <Typography>{months[startingMonth]}</Typography>
      </Box>
      <Box className={classes.titleAndInfo}>
        <Typography className="workshopTitle">{title}</Typography>
        <Box className={classes.Info}>
          <Box className={classes.iconAndText}>
            <CalendarTodayOutlinedIcon />
            <span className="workshopText">
              {`${startingDate} ${months[startingMonth]}`} -{' '}
              {`${endingDate} ${months[endingMonth]}`}
            </span>
          </Box>
          <Box className={classes.iconAndText}>
            <FmdGoodOutlinedIcon />
            <span className="workshopText">{location}</span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default UpcomingWorkshop;
