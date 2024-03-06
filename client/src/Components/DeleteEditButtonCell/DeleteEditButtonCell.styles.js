import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  BtnWrapper: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
    height: '100%',
  },
  childActionBtn: {
    '&.MuiIconButton-root': {
      padding: '0px',
    },
    '& svg': {
      fontSize: '20px',
    },
    '&.childEditIcon': {
      color: theme.palette.primaryBlue,
    },
    '&.childDeleteIcon': {
      color: theme.palette.primaryRed,
    },
  },
}));
