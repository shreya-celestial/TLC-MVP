import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  loaderRoot: {
    '&.MuiBackdrop-root': {
      zIndex: '1500',
      '& svg': {
        color: '#2F2F2F',
      },
    },
  },
}));
