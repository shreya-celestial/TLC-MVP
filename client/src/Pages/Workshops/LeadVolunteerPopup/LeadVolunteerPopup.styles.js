import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      borderRadius: '5px',
      width: '780px',
      maxWidth: '780px',
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
      minWidth: '75px',
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

  // radion button
  formControl: {
    width: '100%',
    gap: '5px',
    '& label.MuiFormLabel-root': {
      fontWeight: '500',
      fontSize: '14px',
      color: '#2F2F2F',
    },
  },
  radioGroup: {
    '&.MuiFormGroup-root': {
      flexDirection: 'row',
      gap: '20px',
    },
  },
  formControlLabel: {
    margin: '0px !important',
    gap: '5px',
    '& .radioBtn': {
      padding: '0px',
      '& svg': {
        fontSize: '16px',
        color: theme.palette.primaryGreen,
      },
    },
    '& .MuiFormControlLabel-label': {
      fontSize: '14px',

    },
  },

  //   autocomplete
  autocomplete: {
    '& .MuiAutocomplete-endAdornment button': {
      padding: '0px',
      fontSize: '20px',
      '&:hover': {
        background: 'transparent',
      },

      '& svg': {
        color: '#2F2F2F',
        fontSize: '20px',
      },
      '& span': {
        display: 'none',
      },
    },
  },
  autocompleteTextField: {
    '& .MuiInputBase-formControl': {
      border: '1px solid #C6C6C6',
      borderRadius: '5px',
      paddingRight: '10px',
      minHeight: '40px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '14px',
        padding: '6px 10px',
      },
      '& fieldset': {
        display: 'none',
      },
    },
    '& .MuiInputBase-root.MuiOutlinedInput-root': {
      paddingTop: '0px',
      paddingBottom: '0px',
    },
    '& .MuiChip-filled': {
      height: '30px',
      gap: '5px',
      '& span': {
        padding: '5px',
        fontSize: '12px',
      },
      '& svg': {
        fontSize: '20px',
      },
    },
    '& .MuiInputAdornment-outlined svg': {
      color: '#2F2F2F',
    },
  },
  //   autocomplete dropdown
  customAutocompleteDropdown: {
    '&.MuiPaper-rounded': {
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px ',
      maxHeight: '200px',
      borderRadius: '5px',
    },
    '& ul': {
      maxHeight: '200px',
      padding: '5px 0px',
    },
    '& li': {
      padding: '5px 10px',
      fontSize: '14px',
      '&.MuiAutocomplete-option[aria-selected="true"]': {
        background: '#F2F3F4 !important',
      },
    },
  },
  notFound: {
    color: '#2F2F2F',
    fontSize: '12px !important',
  },
}));
