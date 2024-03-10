import { makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme) => ({
  root: {
    background: '#FFFFFF !important',
    boxShadow: '4px 0px 5px 0px rgba(0, 0, 0, 0.25) !important',
    zIndex: '1300 !important',
    height: '64px !important',
    justifyContent: 'center',
    '& .toolbar': {
      padding: '0px 25px',
      justifyContent: 'space-between',
    },
  },

  logoAndHamburger: {
    display: 'flex',
    alignItems: 'center',
    gap: '20px',
    '& img': {
      width: '100px',
      height: '47px',
      objectFit: 'contain',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
    '& .hamIconBtn': {
      padding: '0px',
    },
    '& svg': {
      color: '#2F2F2F',
    },
  },
  profile: {
    display: 'flex',
    gap: '5px',
    alignItems: 'center',
    '& .MuiAvatar-circular': {
      height: '30px',
      width: '30px',
      background: '#6C6C6C',
      fontSize: '12px',
      fontWeight: '600',
      [theme.breakpoints.down('sm')]: {
        display: 'none',
      },
    },
  },
  userNameAndUserRole: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',

    '& .userName, .userRole': {
      lineHeight: '12px',
      fontSize: '12px',
      fontWeight: '600',
    },
    '& .userRole': {
      color: '#6C6C6C',
    },
  },
  arrowProfileIcon: {
    height: '20px',
    width: '20px',
    '& svg': { color: '#2F2F2F', height: '20px', width: '20px' },
    '& span': {
      display: 'none',
    },
    '&:hover': {
      background: 'none !important',
    },
  },
  // profile dropdown
  profileDropdown: {
    '& .MuiPaper-root': {
      boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px !important',
      borderRadius: '2px',
      width: '124px',
      transform: 'translate(0px, 13px) !important',

      '& .MuiList-root': {
        padding: '5px 0px',
        '& li': {
          padding: '0px',
        },
        '& a': {
          gap: '8px',
          padding: '4px 10px',
          '& .MuiListItemIcon-root': {
            minWidth: 'max-content',
          },
          '& .MuiListItemText-root': {
            margin: '0px',
            '& span': {
              fontSize: '13px',
              fontWeight: '500',
            },
          },
          '& svg': {
            fontSize: '18px',
            color: '#2F2F2F',
          },
        },
      },
    },
  },
}));
