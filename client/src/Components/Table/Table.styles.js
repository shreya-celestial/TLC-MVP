import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  row: {
    fontSize: '14px !important',
  },
  verified: {
    color: '#259311',
    textAlign: 'center',
    width: '80px',
    height: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pending: {
    backgroundColor: '#f9e6da',
    color: '#df8244',
    textAlign: 'center',
    width: '80px',
    height: '25px',
    borderRadius: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tableSkeleton: {
    height: '400px',
    backgroundColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
