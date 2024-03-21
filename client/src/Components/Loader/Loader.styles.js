import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  loaderRoot: {
    '&.MuiBackdrop-root': {
      zIndex: '1500',
      backgroundColor: '#FFFFFF',
      '& svg': {
        color: '#259311',
      },
    },
  },
  dashboardLoader: {
    '&.MuiBackdrop-root': {
      height: '100vh',
      width: 'calc(100vw - 16%)',
      marginLeft: '16%',
      backgroundColor: '#F2F3F4',
      '& svg': {
        color: '#259311',
      },
      [theme.breakpoints.down('md')]: {
        width: '100%',
        marginLeft: '0px',
      },
    },
  },
}));
