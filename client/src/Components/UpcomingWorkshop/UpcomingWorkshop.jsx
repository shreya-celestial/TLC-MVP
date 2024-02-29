import { Box, Typography } from '@mui/material';
import { useStyles } from './UpcomingWorkshop.styles';
import classNames from 'classnames';

const UpcomingWorkshop = () => {
  const classes = useStyles();

  return (
    <Box className={classes.workshop}>
      <Box className={classNames(classes.date)}>
        <span>24</span>
        <span>Jan</span>
      </Box>
      <Box>
        <Typography>Confidence, Power and Excellence</Typography>
        <Box> 24 Jan - 26 Jan Pune</Box>
      </Box>
    </Box>
  );
};

export default UpcomingWorkshop;
