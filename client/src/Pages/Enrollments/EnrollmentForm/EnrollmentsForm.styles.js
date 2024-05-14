import { makeStyles } from '@mui/styles';
export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '40px 0px',
    width: '100%',
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
      padding: '50px 0px',
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
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '40px',
  },
  formHeaderSection: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    '& .formIconAndHeader': {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
      '& p': {
        fontWeight: '500',
        fontSize: '16px',
        lineHeight: 'normal',
      },
      '& svg': {
        width: '20px',
        height: '20px',
        color: '#2F2F2F',
      },
    },
  },
  createEnrollmentWrapper: {
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

  mainContent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    marginBottom: '10px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      gap: '20px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: '100%',
    },
    '& p.heading': {
      fontSize: '14px',
      fontWeight: '600',
    },
  },
  HeadingAndElementBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
  },

  formElementBox: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '15px',
    },
  },
  formControl: {
    width: '100%',
    display: 'flex',
    gap: '5px',

    '& label.MuiFormLabel-root': {
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
      paddingRight: '10px',
      height: '40px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '14px',
        padding: '6px 10px',
        '&:-webkit-autofill': {
          '-webkit-box-shadow': '0 0 0 100px white inset',
        },
      },
      '& fieldset': {
        display: 'none',
      },

      '& .MuiInputAdornment-root button': {
        padding: '0px',
        margin: '0px',
        '& svg': {
          width: '20px',
          height: '20px',
          color: '#2F2F2F',
        },
        '& .MuiTouchRipple-root': {
          display: 'none',
        },
      },
      '&.Mui-disabled': {
        background: '#E0E0E0 !important',
        '& input.Mui-disabled': {
          '-webkit-text-fill-color': '#696969',
        },
        '& .MuiInputAdornment-root button svg': {
          color: '#696969',
        },
      },
    },
  },
  selectBox: {
    '&.MuiInputBase-root': {
      fontSize: '14px',
      '& .MuiSelect-select': {
        paddingLeft: '10px',
      },
    },
    '& svg': {
      color: '#2F2F2F',
      width: '20px',
      height: '20px',
      top: '25%',
    },
  },
  selectDropdownMenu: {
    '&.MuiPaper-root': {
      maxHeight: '200px ',
      borderRadius: '5px',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
    },
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(-6px) !important',
    },

    '& ul': {
      padding: '5px 0px',
      '& li': {
        padding: '5px 10px',
        fontSize: '14px',
        '&.MuiMenuItem-root.Mui-selected': {
          background: '#F2F3F4',
        },
        '& span': {
          display: 'none',
        },
      },
    },
  },

  HeaderAndAccordionBox: {
    marginTop: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  HeaderAndBtn: {
    height: '30px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    '& p': {
      fontSize: '14px ',
      fontWeight: '600',
    },
  },
  addBtn: {
    '&.MuiButtonBase-root': {
      minWidth: '75px',
      height: '30px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px',
      background: `${theme.palette.primaryGreen} !important`,
      color: '#ffffff',
    },
  },
  AccordionContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  workshopHistory: {
    '& .historyHeading': {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '20px',
    },
  },
  loader: {
    height: 'calc(100vh - 64px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F3F4',
    '& svg': {
      color: theme.palette.primaryGreen,
    },
    '& .errorMessage': {
      color: '#6C6C6C',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
  borderClass: {
    border: '1px solid #C6C6C6',
    height: '40px',
    fontSize: '14px',
    fontWeight: '400',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    borderRadius: '5px',
    background: '#E0E0E0',
    color: '#696969',
  },
}));
