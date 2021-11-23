import React, { useState, useEffect } from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import { HashRouter } from "react-router-dom";
import PropTypes from "prop-types";
import CssBaseline from "@material-ui/core/CssBaseline";
import { getThemeSchema, THEME_TYPES } from "./presentation/themes";

import { history } from "./app-history";
import { RoutesComponent } from "./presentation/views/routing";
import { getTheme, setTheme } from "./adapters/localStorage/theme.localStorage";
import "./presentation/utils/i18n";

const App = () => {
  const [themeColor, setThemeColor] = useState(getTheme());

  // this could be a useLocalStorage hook.
  useEffect(() => {
    setTheme(THEME_TYPES.LIGHT);
    const listener = () => {
      setThemeColor(getTheme());
    };
    window.addEventListener("storage", listener);

    return window.removeEventListener("storage", listener, true);
  }, []);

  return (
    <ThemeContainer currentThemeSchema={getThemeSchema(themeColor)}>
      <HashRouter history={history}>
        <RoutesComponent />
      </HashRouter>
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
