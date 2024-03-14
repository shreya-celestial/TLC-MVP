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
      height: 'calc(100vh - 64px)',
      width: 'calc(100vw - 16%)',
      marginTop: '64px',
      marginLeft: '16%',
      backgroundColor: '#FFFFFF',
      '& svg': {
        color: '#259311',
      },
    },
  },
}));
