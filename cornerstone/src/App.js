import CssBaseline from "@material-ui/core/CssBaseline";
import { ThemeProvider } from "@material-ui/core/styles";
import { createHashHistory } from "history";
import PropTypes from "prop-types";
import { createElement, useEffect, useState } from "react";
import { HashRouter } from "react-router-dom";

import { getTheme, setTheme } from "./adapters/localStorage/theme.localStorage";
import { getThemeSchema, THEME_TYPES } from "./presentation/themes";
import { RoutesComponent } from "./presentation/views/routing";

import "./presentation/utils/i18n";
// Exposing history for deep integration needs
// For example, saga and utilities
const history = createHashHistory();

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
  children: createElement("div"),
};

ThemeContainer.propTypes = {
  currentThemeSchema: PropTypes.shape({}).isRequired,
  children: PropTypes.node,
};

export default App;
