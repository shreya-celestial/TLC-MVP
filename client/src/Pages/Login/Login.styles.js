import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '20px',
    padding: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(109, 109, 109, 0.25)',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '80%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '50px 8px',
      width: '100%',
      minHeight: '100vh',
      justifyContent: 'flex-start',
    },
  },
  logo: {
    width: '115px',
    objectFit: 'contain',
  },
  header: {
    fontSize: '14px !important',
    fontWeight: '500 !important',

    '& span': {
      color: '#259311',
      fontWeight: '600',
    },
  },
  formWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },

  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '15px',
  },
  formControl: {
    [theme.breakpoints.down('md')]: { width: '100%' },
    width: '359px',
    display: 'flex',
    gap: '5px',
    '& label': {
      fontWeight: '500',
      fontSize: '14px',
      color: '#2F2F2F',
      '& .MuiFormLabel-asterisk': {
        color: theme.palette.primaryRed,
      },
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #C6C6C6',
      borderRadius: '5px',
      height: '40px',
      paddingRight: '10px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '14px',
        padding: ' 6px 10px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px white inset',
        },
      },
      '& fieldset': {
        display: 'none',
      },

      '& .MuiInputAdornment-root button': {
        padding: '0px',
        '& svg': {
          width: '20px',
          height: '20px',
          color: '#2F2F2F',
        },
      },
    },
  },

  FormElementInBox: {
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: { width: '100%' },
    width: '359px',
    gap: '10px',
    '& .forgotPassword , p': {
      fontSize: '12px',
      color: '#4E73BE',
      fontWeight: '500',
      textDecoration: 'none',
    },
    '& p': { color: '#2F2F2F' },
    '& .signup': {
      textDecoration: 'none',
      color: '#4E73BE',
    },
  },
  signInBtn: {
    height: '40px',
    width: '100%',
    borderRadius: '5px !important',
    textTransform: 'capitalize !important',
    backgroundColor: '#259311 !important',
    color: '#ffffff !important',
    fontWeight: '400 !important',
    '&.googleBtn': {
      color: '#4E73BE !important',
      backgroundColor: '#ffffff !important',
      border: '1.5px solid  #4E73BE !important',
      '&:hover': {
        [theme.breakpoints.up('md')]: {
          backgroundColor: '#4E73BE10 !important',
        },
      },
    },
    '&.continueBtn:hover': {
      [theme.breakpoints.up('md')]: {
        opacity: '.9',
      },
    },
  },
}));
