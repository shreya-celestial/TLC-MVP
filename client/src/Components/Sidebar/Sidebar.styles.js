import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  firstLink: {
    marginTop: '15px !important',
  },

  sidebar: {
    backgroundColor: 'white',
    width: '270px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    display: 'block !important',

    '& a': {
      fontSize: '14px',
      color: '#464846',
      fontWeight: '500',
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      margin: '0px 20px 5px 13px',
      padding: '8px 10px',
      width: '195px',
      // backgroundColor: 'green',
    },
    '& .active': {
      backgroundColor: '#e9f4e7 ',
      // padding: '8px 20px 8px 5px',
      borderRadius: '8px',
    },
  },
}));
