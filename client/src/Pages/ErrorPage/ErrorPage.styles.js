import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '40px',
  },
  errorHeadingText: {
    textAlign: 'center',
    '& p': {
      lineHeight: 'normal',
      fontWeight: '500',
    },

    '& .errorHeading': {
      marginBottom: '10px',
      fontSize: '30px',
    },
    '& .errorText': {
      fontSize: '14px',
      fontWeight: '500',
      color: '#6C6C6C',
    },
  },
  errorBtn: {
    '&.MuiButton-root': {
      height: '30px',
      fontSize: '12px',
      textTransform: 'capitalize',
      background: '#259311 !important',
      color: '#FFFFFF',
      fontWeight: '400',
    },
  },
}));
