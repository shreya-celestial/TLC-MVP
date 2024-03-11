import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      borderRadius: '5px',
      width: '886px',
      maxWidth: '886px',
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
      marginLeft: '0px',
      color: '#FFFFFF',
    },
    '& button.cancelBtn': {
      background: `${theme.palette.primaryGray}`,
      color: theme.palette.text.primary,
    },
  },
  DiaogContent: {
    padding: '0px !important',
    maxHeight: '300px',
    '& .ag-theme-quartz': {
      '--ag-active-color': 'transparent !important',

      '& .ag-center-cols-viewport': {
        minHeight: '90px',
      },
    },
  },
  AgGridMain: {
    '& .ag-root-wrapper': {
      borderRadius: '0px',
      border: '0px',
    },
    '& .ag-header': {
      backgroundColor: '#FFFFFF',
      borderColor: theme.palette.primaryGreen,
      '& .ag-header-cell-text': {
        fontSize: '12px',
        color: '#2F2F2F',
        fontFamily: '"Inter", sans-serif',
      },
    },
    '& .ag-header-cell-resize': {
      right: '10px',
      '&::after': {
        background: '#C6C6C6',
        width: '1.5px',
      },
    },
    '& .ag-row': {
      borderColor: '#C6C6C6',
    },

    '& .ag-cell': {
      fontSize: '12px',
      color: '#6C6C6C',
      fontWeight: '500',
      fontFamily: '"Inter", sans-serif',
    },
    '& .ag-cell-focus': {
      borderColor: 'transparent',
    },

    '& .ag-overlay-wrapper': {
      paddingTop: '30px !important',
      fontSize: '12px',
      color: '#6C6C6C',
      fontWeight: '500',
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
  },
}));
