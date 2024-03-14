import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
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
      width: '90%',
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
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    width: '100%',
  },
  FormElementInBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    '& .backToLogin': {
      fontSize: '12px',
      color: '#4E73BE',
      fontWeight: '500',
      textDecoration: 'none',
      textAlign: 'center',
    },
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
        padding: '10px',
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
  resetBtn: {
    height: '40px',
    borderRadius: '5px !important',
    textTransform: 'capitalize !important',
    backgroundColor: '#259311 !important',
    color: '#ffffff !important',
    fontWeight: '400 !important',

    '&:hover': {
      [theme.breakpoints.up('md')]: {
        opacity: '.9',
      },
    },
  },
}));
