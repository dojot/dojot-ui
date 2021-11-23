import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getThemeSchema, THEME_TYPES } from "./presentation/themes";

import { history } from "./app-history";
import RoutesComponent from "./application/routing/RoutesComponent";
import { getTheme, setTheme } from "./adapters/localStorage/theme.localStorage";
import "./presentation/utils/i18n";

const App = () => {
  const [themeColor, setThemeColor] = useState(THEME_TYPES.LIGHT);

  // this could be a useLocalStorage hook.
  useEffect(() => {
    setTheme(THEME_TYPES.LIGHT);
    window.addEventListener("storage", (e) => {
      console.log("storage changed!", getTheme());
      setThemeColor(getTheme());
    });
  }, []);

  return (
    <ThemeContainer currentThemeSchema={getThemeSchema(themeColor)}>
      <BrowserRouter history={history}>
        <RoutesComponent />
      </BrowserRouter>
    </ThemeContainer>
  );
};

const ThemeContainer = ({ children, currentThemeSchema }) => (
  <ThemeProvider theme={currentThemeSchema}>
    <CssBaseline />
    {children}
  </ThemeProvider>
);

ThemeContainer.defaultProps = {
  children: React.createElement("div"),
};

ThemeContainer.propTypes = {
  currentThemeSchema: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
};

export default App;
