import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  labelBox: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
    '& .label': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'end',
      fontSize: '12px',
      color: 'grey',
      gap: '5px',
    },
  },
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'row',
      gap: '20px',
    },
  },
  customLegend: {
    height: '13px',
    width: '13px',
    borderRadius: '50%',
  },
  chart: {
    [theme.breakpoints.down('sm')]: {
      width: '70%',
    },
    height: 'calc(100% - 15px)',
    width: '100%',
  },
}));
