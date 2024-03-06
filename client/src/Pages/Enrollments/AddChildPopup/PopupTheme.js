import { createTheme } from '@mui/material';

export const ChildTheme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  components: {
    MuiPopper: {
      styleOverrides: {
        root: {
          '@media (min-width: 960px)': {
            '&.MuiPickersPopper-root': {
              transform: 'none !important',
              left: '50% !important',
            },
          },
        },
      },
    },
  },

});
