import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  pagination: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
    fontSize: '13px',
    color: 'black',

    '& svg': {
      cursor: 'pointer',
      fontSize: '20px',
    },
  },
  label: {
    marginRight: '13px',
  },
  selectBox: {
    padding: '0px',
    outline: 'none',
    borderRadius: '5px',
    height: '30px',
    width: '65px',
    fontSize: '15px !important',
  },
  rowSelect: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',

    '& p': { fontSize: '14px !important' },
  },
}));
