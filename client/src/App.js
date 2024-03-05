import React from 'react';
import Main from './Components/Main/Main';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Theme } from './Theme';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <CssBaseline />
      <QueryClientProvider client={queryClient}>
        <Main />
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
