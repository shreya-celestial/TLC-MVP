import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
    backgroundColor: '#F2F3F4',
  },

  HeaderMainContent: {
    padding: '20px',
    height: 'calc(100% - 45px )',
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '10px',
    },
  },
  actionBar: {
    background: '#FFFFFF',
    position: 'absolute',
    bottom: '0',
    height: '45px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 25px',
    gap: '15px',
    zIndex: '1250',

    boxShadow: '-4px 0px 5px 0px rgba(0, 0, 0, 0.25)',
    '& button': {
      height: '30px',
      minWidth: '75px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px',
    },
    '& button.cancelBtn': {
      background: `${theme.palette.primaryGray}`,
      color: theme.palette.text.primary,
    },
    '& button.saveBtn': {
      background: `${theme.palette.primaryGreen}`,
      color: '#FFFFFF',
    },
    '& button.editBtn': {
      background: `${theme.palette.primaryBlue}`,
      color: '#FFFFFF',
    },
  },
  // main content
  mainContent: {
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
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

  HeaderAndAccordionBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
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
  flex: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#F2F3F4',
    alignItems: 'center',
    '& svg': {
      color: theme.palette.primaryGreen,
    },
    '& .errorMessage': {
      color: '#6C6C6C',
      fontSize: '14px',
      fontWeight: '500',
    },
  },
}));
