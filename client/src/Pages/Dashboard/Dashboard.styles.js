import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  nav: {
    backgroundColor: 'white',
    color: 'green',
  },
}));
