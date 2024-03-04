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
