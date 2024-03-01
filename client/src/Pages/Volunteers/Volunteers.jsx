import { Box, Grid } from '@mui/material';
import { useStyles } from './Volunteers.styles';
import SmallCard from '../../Components/SmallCard/SmallCard';
import Table from '../../Components/Table/Table';

const Volunteers = () => {
  const classes = useStyles();
  return (
    <Box className={classes.tableContainer}>
      <Table />
    </Box>
  );
};

export default Volunteers;
