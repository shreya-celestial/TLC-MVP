import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  workshop: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
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
  },
  iconAndText: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
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
