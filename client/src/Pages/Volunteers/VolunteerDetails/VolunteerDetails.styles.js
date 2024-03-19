import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    position: 'relative',
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
    boxShadow: '-4px 0px 5px 0px rgba(0, 0, 0, 0.25)',
    '& button': {
      height: '30px',
      minWidth: '75px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px',
    },
    '& .cancelBtn': {
      background: `${theme.palette.primaryGray} !important`,
      color: theme.palette.text.primary,
    },
    '& .saveBtn': {
      background: `${theme.palette.primaryGreen} !important`,
      color: '#FFFFFF',
    },
    '& .editBtn': {
      background: `${theme.palette.primaryBlue} !important`,
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
  },
  // history
  VolunteerHistory: {
    '& .historyHeading': {
      fontSize: '14px',
      fontWeight: '600',
      marginBottom: '20px',
    },
  },
  loader: {
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
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
