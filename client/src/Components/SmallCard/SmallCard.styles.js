import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  smallCard: {
    backgroundColor: 'white',
    height: '100px',
    borderRadius: '5px',
    boxShadow: 'rgba(0, 0, 0, 0.24) 0px 1px 8px',
    padding: '10px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '15px',
  },
  iconContainer: {
    padding: '5px 20px',
    borderRight: '1px solid',
  },
  flex: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  handIcon: {
    fontSize: '30px !important',
  },
  volunteers: {
    color: '#7eaa55',
  },
  workshops: {
    color: '#597cc2',
  },
  enrollments: {
    color: '#df8244',
  },
  meetings: {
    color: '#9580c5',
  },
}));
