import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    marginTop: '64px',
    width: 'calc(100% - 16%)',
    height: 'calc(100vh - 64px)',
    marginLeft: 'auto',
    overflowY: 'auto',
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100%',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  notUser: {
    minHeight: '100vh',
    background: '#F2F3F4',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('sm')]: {
      minHeight: 'auto',
      display: 'block',
    },
  },
}));
