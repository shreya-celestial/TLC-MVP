import { createTheme } from "@mui/material";

export const Theme = createTheme({
  typography: {
    fontFamily: ["Inter", "sans-serif"].join(","),
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: "#F2F3F4",
        },
      },
    },
  },
  palette: {
    text: {
      primary: "#2F2F2F",
    },
  },
});
