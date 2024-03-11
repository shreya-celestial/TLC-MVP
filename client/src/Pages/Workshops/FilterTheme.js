import { createTheme } from '@mui/material';

export const FilterTheme = createTheme({
  typography: {
    fontFamily: ['Inter', 'sans-serif'].join(','),
  },
  components: {
    MuiPopper: {
      styleOverrides: {
        root: {
          '&.MuiPickersPopper-root': {
            width: '250px',
          },

          '& .MuiDateCalendar-root': { width: '250px', height: '250px' },
          '& .MuiPickersCalendarHeader-root': {
            margin: '0px',
            padding: '0 10px',
            '& .MuiPickersCalendarHeader-label': {
              fontSize: '14px',
            },
            '& svg': {
              fontSize: '18px',
            },
          },
          '& .MuiDayCalendar-header': {
            '& span': {
              height: '20px',
            },
          },
          '& .MuiDayCalendar-weekContainer': {
            '& .MuiPickersDay-root': {
              height: '30px',
              width: '30px',
            },
          },
          '& .MuiYearCalendar-root': {
            width: '250px',
            '& .MuiPickersYear-root button': {
              fontSize: '12px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '20px',
              width: '50px',
            },
          },
        },
      },
    },
  },
});
