import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },
  },

  body: {
    display: 'flex',
    height: 'calc(100vh - 72px)',
  },

  main: {
    width: '100%',
  },
}));
