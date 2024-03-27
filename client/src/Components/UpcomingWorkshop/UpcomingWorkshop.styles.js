import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  workshop: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    [theme.breakpoints.down("sm")]:{
     gap:"15px",
    },
  },

  card: {
    backgroundColor: '#7eaa55',
    minWidth: '60px',
    height: '60px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    borderRadius: '5px',
    '& p': {
      fontWeight: '500',
      lineHeight: 'normal',
    },
  },
  titleAndInfo: {
    [theme.breakpoints.down("sm")]:{
      width:"100%",
    },
    '& .workshopTitle': {
      fontSize: '14px',
      fontWeight: '500',
      marginBottom: '5px',
      lineHeight: '20px',
    },
  },
  Info: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.down("sm")]:{
      justifyContent:"space-between",
      gap:"0px"
    }
  },
  iconAndText: {
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    [theme.breakpoints.down("sm")]:{
      minWidth:"40%",
    },
    '& svg': {
      fontSize: '17px',
      color: '#6C6C6C',
    },
    '& .workshopText': {
      color: '#6C6C6C',
      fontSize: '12px',
      fontWeight: '500',
    },
  },
}));
