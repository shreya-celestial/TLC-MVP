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
}));
