import { Box } from '@mui/material';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';

import { useStyles } from './Wrapper.styles';

const Wrapper = ({ children }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Navbar />
      <Box className={classes.body}>
        <Sidebar />
        <Box className={classes.main}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Wrapper;
