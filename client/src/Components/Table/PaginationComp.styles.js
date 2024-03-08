import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    justifyContent: 'flex-end',
    height: '40px',
    background: '#FFFFFF',
    padding: '0 20px',
    borderTop: `1px solid ${theme.palette.primaryGreen}`,
    '& .pageInfo': {
      fontSize: '12px',
      fontWeight: '500',
      [theme.breakpoints.down('sm')]: {
        fontSize: '13px',
      },
    },
  },
  pageBtn: {
    '&.MuiIconButton-root': {
      padding: '0px',
      '& svg': {
        fontSize: '20px',
        [theme.breakpoints.down('sm')]: {
          fontSize: '22px',
        },
      },
    },
  },
}));
