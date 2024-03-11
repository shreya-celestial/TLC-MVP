import { createTheme } from '@mui/material';

export const Theme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: '#F2F3F4',
          '&::-webkit-scrollbar': {
            display: 'none',
          },

          '& .MuiPickersPopper-paper': {
            boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px',
          },
        },
      },
    },
  },
  palette: {
    text: {
      primary: '#2F2F2F',
    },
    primaryGreen: '#259311',
    primaryRed: '#C1423F',
    primaryBlue: '#005C8E',
    primaryOrange: '#DF6D10',
    primaryGray: '#E6E6E6',
  },
});
