import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles(() => ({
  DeletBtn: {
    '&.MuiIconButton-root': {
      padding: '0px',
      marginTop: '-5px',
    },
    '& svg': {
      fontSize: '20px',
      color: '#C1423F',
    },
  },
}));
