import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    '& .pageHeading': {
      fontSize: '18px',
      fontWeight: '600',
      textTransform: 'capitalize',
    },
  },
  breadCrumbs: {
    display: 'flex',
    alignItems: 'center',
    gap: '3px',
    fontSize: '12px',
    fontWeight: '500',
    '& .navigationLink': {
      textDecoration: 'none',
      color: '#005C8E',
      textTransform: 'capitalize',
    },
    '& svg': { fontSize: '20px', color: '#005C8E' },
    '& .currentPage': {
      fontSize: '12px',
      fontWeight: '500',
      color: '#6C6C6C',
      textTransform: 'capitalize',
    },
  },
}));
