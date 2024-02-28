import React from 'react';
import Main from './Components/Main/Main';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Theme } from './Theme';

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <Main />
    </ThemeProvider>
  );
}

export default App;
