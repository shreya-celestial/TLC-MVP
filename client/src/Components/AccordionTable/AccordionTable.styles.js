import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  accordion: {
    backgroundColor: '#EFEFEF',
    borderRadius: '5px !important',
    boxShadow: '0px 1px 4px 0px rgba(0, 0, 0, .15) !important',
    '&::before': {
      background: 'transparent !important',
    },

    '& .MuiCollapse-vertical': {
      maxHeight: '300px',
      overflowY: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },

    '& .accordianSummary': {
      minHeight: '40px !important',
      maxHeight: '40px !important ',
      padding: '0 10px !important',
      fontSize: '14px ',
      fontWeight: '500',
      textTransform: 'capitalize',
      '&.Mui-expanded': { borderBottom: '1px solid #C6C6C6' },

      '& svg': {
        color: '#2F2F2F',
        fontSize: '20px',
      },

      '& .MuiAccordionSummary-content': {
        margin: '0 ',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
    },
  },

  accordionDetails: {
    backgroundColor: '#fff',
    padding: '0px !important',
    '& .ag-center-cols-viewport': {
      minHeight: '60px !important',
    },
    '& .ag-theme-quartz': {
      '--ag-active-color': 'transparent !important',
    },
  },

  //   ag grid table
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
      textTransform: 'capitalize',
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
}));
