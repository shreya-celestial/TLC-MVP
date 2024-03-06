import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  Dialog: {
    '& .MuiDialog-paper': {
      boxShadow: 'none',
      borderRadius: '5px',
      width: '440px !important',
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
    padding: '0px 20px !important',
    gap: '15px',
    '& button': {
      height: '30px',
      padding: '0 10px',
      borderRadius: '5px',
      textTransform: 'capitalize',
      fontSize: '12px !important',
      minWidth: 'auto !important',
      marginLeft: '0px !important',
      fontWeight: '500 !important',
    },
    '& .cancelBtn': {
      background: `${theme.palette.primaryGray} !important`,
      color: theme.palette.text.primary,
    },
    '& .deleteBtn': {
      background: `${theme.palette.primaryRed} !important`,
      color: '#FFFFFF',
    },
  },
  DiaogContent: {
    padding: '10px !important',
    minHeight: '140px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    background: '#F2F3F4',
    '& p': {
      textAlign: 'center',
      fontSize: '14px',
      fontWeight: '500',
      color: '#6C6C6C',
    },
  },
}));
