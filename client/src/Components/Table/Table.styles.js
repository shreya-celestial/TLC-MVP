import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '14px !important',
  },
  verified: {
    color: theme.palette.primaryGreen,
    fontSize: '12px !important',
    width: '75px',
    textAlign: 'center',
    fontWeight: '500 !important',
  },
  pending: {
    '&.MuiButton-root': {
      textTransform: 'capitalize',
      fontSize: '12px',
      minWidth: '75px',
      borderRadius: '25px',
      padding: '0px',
      background: 'rgba(233,130,68,.2) !important',
      color: theme.palette.primaryOrange,
    },
  },
  tableSkeleton: {
    minHeight: '390px',
    backgroundColor: 'white',
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
  AgGridMain: {
    '& .ag-root-wrapper': {
      borderRadius: '0px',
      border: '0px',
      minHeight: '390px',
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
      textTransform: 'capitalize',
      border: '1px solid transparent !important',
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

    '& .ag-checkbox-input-wrapper': {
      boxShadow: 'none !important',
      '&.ag-checked::after': {
        color: theme.palette.primaryGreen,
      },
      '&::after': {
        color: 'rgba(108,108,108, .5)',
      },
    },
  },
  count: {
    color: '#4e73be',
    cursor: 'pointer',
  },

  errorMessage: {
    color: '#6C6C6C',
    fontSize: '12px',
    fontWeight: '500',
  },

  customHeaderText: {
    fontSize: '12px',
    color: '#2F2F2F',
    fontFamily: '"Inter", sans-serif',
  },
}));
