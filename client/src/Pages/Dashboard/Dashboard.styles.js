import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: '100vh',
    [theme.breakpoints.down('sm')]: {
      padding: '0px',
    },
  },
  nav: {
    backgroundColor: 'white',
    color: 'green',
    height: '70px',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
    zIndex: '100',
    // borderBottom: '1px solid gray',
  },
  body: {
    display: 'flex',
    height: 'calc(100vh - 70px)',
  },
  sidebar: {
    backgroundColor: 'white',
    width: '250px',
    // zIndex: '-1',
    boxShadow: 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px',
  },
  main: {
    width: '100%',
  },
  gridContainer: {
    margin: 'auto !important',
    width: 'auto !important',
    paddingRight: '16px',
  },
  bigCard: {
    backgroundColor: 'white',
    height: '390px',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 8px',
    padding: '20px 20px',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  workshopHeading: {
    marginBottom: '20px !important',
    fontWeight: 'bold',
  },
}));
