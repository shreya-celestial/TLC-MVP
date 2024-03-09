import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
    '& .ag-theme-quartz': {
      '--ag-active-color': theme.palette.primaryGreen,
    },
  },

  HeadingAndActionBtn: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      gap: '10px',
    },
    '& h1': {
      fontSize: '18px',
      fontWeight: '600',
    },
  },
  ActionBtn: {
    display: 'flex',
    gap: '15px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'flex-end',
    },
    '& button': {
      height: '30px',
      minWidth: '75px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px',
      color: '#FFFFFF',
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
    '& button.inviteBtn': {
      background: `${theme.palette.primaryGreen}`,
    },
  },
  headerTablePagination: {
    boxShadow: '0px 4px 10px 0px rgba(109, 109, 109, 0.25)',
    borderRadius: '5px',
    overflowX: 'hidden',
    height: 'calc(100vh - 150px)',
    [theme.breakpoints.down('sm')]: {
      height: 'calc(100vh - 180px)',
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
  // modal
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
      '& fieldset': {
        display: 'none',
      },
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
  filterIcon: {
    '&.MuiIconButton-root': {
      height: '100%',
      borderRadius: '5px',
      padding: '2px',
      height: '28px',
      border: '1px solid #6C6C6C',
    },
  },
}));
