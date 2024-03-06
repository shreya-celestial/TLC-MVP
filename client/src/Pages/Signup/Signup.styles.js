import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0px',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  mainWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    gap: '20px',
    backgroundColor: '#FFFFFF',
    borderRadius: '5px',
    boxShadow: '0px 4px 10px rgba(109, 109, 109, 0.25)',
    [theme.breakpoints.between('sm', 'md')]: {
      width: '90%',
    },
    [theme.breakpoints.down('sm')]: {
      padding: '50px 8px',
      width: '100%',
    },
  },
  logo: {
    width: '115px',
    objectFit: 'contain',
  },
  header: {
    fontSize: '18px !important',
    fontWeight: '600 !important',
    textAlign: 'center',
  },
  signupWrapper: {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      padding: '0 8px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '90%',
    },
    [theme.breakpoints.up('md')]: { width: '738px' },
  },

  signUpBtn: {
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
  signUpBtn_loginLink: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },
  loginLink: {
    fontSize: '14px !important',
    fontWeight: '500 !important',
    textAlign: 'center',
    '& .login': { textDecoration: 'none', color: '#4E73BE' },
  },
}));
