import { createTheme } from "@material-ui/core/styles";
import red from "@material-ui/core/colors/red";

import dojotLogo from "../assets/images/dojotLogoLight.png";

const theme = createTheme({
  dojotLogo,
  drawerWidth: 215,
  typography: {
    fontFamily: "Raleway, sans-serif",
  },
  palette: {
    primary: {
      light: "#4788dc",
      main: "#4788dc",
      dark: "#4788dc",
    },
    secondary: {
      main: "#19857b",
      light: "#19857b",
      dark: "#19857b",
    },
    error: {
      main: red.A400,
      light: red.A400,
      dark: red.A400,
    },
    background: {
      default: "#FAFAFA",
      paper: "#FFF",
      login: "#dadde0",
    },
    table: {
      head: "#FFFFFF",
    },
  },

  overrides: {
    MuiButtonBase: {
      root: {
        verticalAlign: "top",
      },
    },
  },
});

export default theme;
