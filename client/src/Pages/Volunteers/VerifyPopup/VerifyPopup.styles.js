import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      borderRadius: '5px',
      width: '640px !important',
      maxWidth: '640px',
      [theme.breakpoints.down('sm')]: {
        margin: '0px 8px !important',
      },
    },
  },
  TitleAndClose: {
    height: '45px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '0 20px !important',
    borderBottom: '1px solid #C6C6C6',
    '& p': {
      fontSize: '14px',
      fontWeight: '600',
    },
  },
  CloseIcon: {
    padding: '0px !important',
    '& svg': {
      color: '#2F2F2F',
    },
  },
  DialogActions: {
    height: '45px',
    borderTop: '1px solid #C6C6C6',
    padding: '0 20px !important',
    gap: '15px',
    '& button': {
      height: '30px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px',
      minWidth: '75px !important',
      marginLeft: '0px !important',
      color: '#FFFFFF',
    },
    '& .cancelBtn': {
      background: `${theme.palette.primaryGray} !important`,
      color: theme.palette.text.primary,
    },
    '& .verifyBtn': {
      background: `${theme.palette.primaryGreen} !important`,
    },
    '& .rejectBtn': {
      background: `${theme.palette.primaryRed} !important`,
    },
  },
  DiaogContent: {
    padding: '20px !important',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#F2F3F4',
  },
  //elemnts

  formElementBox: {
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
      },
      '& fieldset': {
        display: 'none',
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
}));
