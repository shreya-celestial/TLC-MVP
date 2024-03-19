import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    background: '#F2F3F4',
    [theme.breakpoints.down('sm')]: {
      padding: '8px',
    },
  },
  smallCardContainer: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.between('sm', 'md')]: {
      flexWrap: 'wrap',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  smallCard: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: '#FFFFFF',
    width: 'calc(100% / 4)',
    height: '100px',
    borderRadius: '5px',
    gap: '20px',
    boxShadow: 'rgba(109, 109, 109, 0.25) 0px 4px 10px',
    textTransform: 'capitalize',

    '&.volunteer': {
      color: '#7EAA55',
    },
    '&.enrollment': {
      color: '#DF8244',
    },
    '&.meeting': {
      color: '#9580C5',
    },
    '&.workshop': {
      color: '#4E73BE',
    },
    '& hr': {
      alignSelf: 'center',
      height: '35px',
      borderColor: '#6C6C6C',
      borderWidth: '1px',
    },
    [theme.breakpoints.between('sm', 'md')]: {
      width: 'calc(50% - 10px)',
    },
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  titleAndValue: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '5px',
    '& .cardValue': {
      fontSize: '20px',
      fontWeight: '600',
      lineHeight: 'normal',
    },
    '& .cardTitle': {
      fontSize: '12px',
      fontWeight: '500',
      color: '#6C6C6C',
      lineHeight: 'normal',
    },
  },
  // big cards
  bigCardContainer: {
    display: 'flex',
    gap: '20px',
    [theme.breakpoints.up('md')]: {
      height: 'calc(100vh - 224px)',
    },
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  bigCard: {
    width: '50%',
    background: '#FFFFFF',
    boxShadow: 'rgba(109, 109, 109, 0.25) 0px 4px 10px',
    borderRadius: '5px',
    height: '100%',
    padding: '20px',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '400px',
    },
    '& p.bigCardHeading': {
      fontWeight: '600',
      height: '30px',
    },
  },

  upcominWorkshops: {
    height: 'calc(100% - 30px)',
    overflow: 'auto',
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '10px',
    gap: '15px',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    '& .noWorkshop, .upcomingLoading': {
      fontSize: '12px',
      fontWeight: '500',
    },
  },

  chartMain: {
    height: 'calc(100% - 30px)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}));
