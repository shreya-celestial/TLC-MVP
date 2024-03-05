import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
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
  formElementBox: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  formControl: {
    width: '100%',
    display: 'flex',
    gap: '5px',

    '& label': {
      fontWeight: '500',
      fontSize: '14px',
      color: '#2F2F2F !important',
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
      },
    },
  },
  selectBox: {
    fontSize: '14px !important',
    '& .MuiSelect-select': {
      paddingLeft: '10px !important',
    },
    '& svg': {
      color: '#2F2F2F',
      width: '20px',
      height: '20px',
    },
  },
  selectDropdownMenu: {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
    maxHeight: '200px !important',
    borderRadius: '5px !important',
    [theme.breakpoints.down('sm')]: {
      transform: 'translateX(-8px) !important',
    },

    '& ul': {
      padding: '5px 0px',
      '& li': {
        padding: '5px 10px',
        fontSize: '14px',
        '&.Mui-selected': {
          background: '#F2F3F4 !important',
        },
        '& span': {
          display: 'none',
        },
      },
    },
    datepicker: {
      display: 'none !important',
    },
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
  disabled: {
    // backgroundColor: 'gray',
    // color: 'black',
  },
}));
