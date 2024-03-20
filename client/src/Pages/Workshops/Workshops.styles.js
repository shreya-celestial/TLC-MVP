import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    height: '100%',
    backgroundColor: '#F2F3F4',
    [theme.breakpoints.down('sm')]: {
      padding: '13px 8px',
    },
    '& .ag-theme-quartz': {
      '--ag-active-color': theme.palette.primaryGreen,
      height: '100%',
    },
  },

  HeadingAndActionBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    '& h1': {
      fontSize: '18px',
      fontWeight: '600',
      height: '30px',
    },
  },
  ActionBtn: {
    display: 'flex',
    gap: '15px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
      gap: '6px',
    },
    '& button': {
      height: '30px',
      minWidth: '75px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px',
      color: '#FFFFFF',
      [theme.breakpoints.down('sm')]: {
        minWidth: '70px',
      },
    },
    '& button.viewBtn': {
      background: `${theme.palette.primaryOrange}`,
    },
    '& button.deleteBtn': {
      background: `${theme.palette.primaryRed}`,
    },
    '& button.editBtn': {
      background: `${theme.palette.primaryBlue}`,
    },
    '& button.createWorkshopBtn': {
      background: `${theme.palette.primaryGreen}`,
    },
  },

  headerTablePagination: {
    boxShadow: '0px 4px 10px 0px rgba(109, 109, 109, 0.25)',
    borderRadius: '5px',
    overflowX: 'hidden',
    height: '100%',
    [theme.breakpoints.down('sm')]: {
      height: '100vh',
    },
  },
  tableContainer: {
    height: 'calc(100% - 80px)',
    overflow: 'auto',
    background: '#FFFFFF',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  },
  tableHeader: {
    borderBottom: `1px solid ${theme.palette.primaryGreen}`,
    background: '#FFFFFF',
    padding: '0 20px',
    height: '40px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: '10px',

    '& .MuiIconButton-root': {
      padding: '0px',
    },
  },
  // search bar
  searchbar: {
    '& .MuiInputBase-formControl': {
      border: '1px solid #6C6C6C',
      borderRadius: '5px',
      paddingRight: '10px',
      height: '28px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '12px',
        padding: '6px 10px',
      },
      '& fieldset': {
        display: 'none',
      },
    },
  },
  filterIcon: {
    '&.MuiIconButton-root': {
      height: '100%',
      borderRadius: '5px',
      padding: '2px',
      height: '28px',
      border: '1px solid #6C6C6C',
    },
  },
  // filter selectbox
  selectBox: {
    fontSize: '12px !important',
    '& .MuiSelect-select': {
      paddingLeft: '10px !important',
    },
    '& svg': {
      color: '#2F2F2F',
      fontSize: '16px',
    },
  },
  selectDropdownMenu: {
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
    borderRadius: '5px !important',

    '& ul': {
      padding: '5px 0px',
      '& li': {
        padding: '5px 10px',
        fontSize: '12px',
        '&.Mui-selected': {
          background: '#F2F3F4 !important',
        },
        '& span': {
          display: 'none',
        },
      },
    },
  },

  formControl: {
    width: '100%',
    display: 'flex',
    gap: '5px',

    '& label': {
      fontWeight: '500',
      fontSize: '12px',
      color: '#2F2F2F !important',
    },
    '& .MuiInputBase-formControl': {
      border: '1px solid #C6C6C6',
      borderRadius: '5px',
      paddingRight: '10px',
      height: '30px',
      backgroundColor: '#ffffff',
      '& input': {
        fontSize: '12px',
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
          fontSize: '16px',
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
  filterRoot: {
    '& .MuiPaper-root': {
      padding: '0 8px',
      width: '200px',
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
      borderRadius: '5px',
    },
  },
  filterContent: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    background: '#FFFFFF',
    gap: '10px',
    borderRadius: '5px',
    '&:focus': {
      outline: 'none',
    },
    '& p': {
      fontSize: '12px',
      fontWeight: '600',
    },
  },
  resetFilterBtn: {
    '&.MuiButton-root': {
      textTransform: 'capitalize',
      fontSize: '12px',
      height: '30px',
      background: `${theme.palette.primaryBlue} !important`,
      color: '#FFFFFF',
    },
  },
}));
