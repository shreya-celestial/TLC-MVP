import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  Dialog: {


    '& .MuiDialog-paper': {
      boxShadow: 'none',
      borderRadius: '5px',
      width: '640px',
      maxWidth: '640px',
      [theme.breakpoints.down('sm')]: {
        margin: '0px 8px',
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
    '&.MuiIconButton-sizeMedium': {
      padding: '0px',
      '& svg': {
        color: '#2F2F2F',
      },
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
    '& button.cancelBtn': {
      background: `${theme.palette.primaryGray}`,
      color: theme.palette.text.primary,
    },
    '& button.doneBtn': {
      background: `${theme.palette.primaryBlue}`,
    },
  },
  DiaogContent: {
    padding: '20px !important',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#F2F3F4',
  },
  //elements

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

    '& label.MuiFormLabel-root': {
      fontWeight: '500',
      fontSize: '14px',
      color: '#2F2F2F',
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
    '&.MuiInputBase-formControl': {
      fontSize: '14px',
    },

    '& .MuiSelect-select': {
      paddingLeft: '10px',
    },
    '& svg': {
      color: '#2F2F2F',
      width: '20px',
      height: '20px',
    },
  },
  selectDropdownMenu: {
    '&.MuiMenu-paper': {
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
      borderRadius: '5px',
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
}));
