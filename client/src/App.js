import React from "react";
import Main from "./Components/Main/Main";
import { ThemeProvider } from "@mui/material";
import { Theme } from "./Theme";

function App() {
  return (
    <ThemeProvider theme={Theme}>
      <Main />
    </ThemeProvider>
  );
}

export default App;
