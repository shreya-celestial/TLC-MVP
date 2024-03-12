import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {},
  main: {
    marginTop: '64px',
    width: 'calc(100% - 16%)',
    height: 'calc(100vh - 64px)',
    marginLeft: 'auto',
    overflowY: 'scroll',
    [theme.breakpoints.between('xs', 'md')]: {
      width: '100%',
    },
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }
}));
