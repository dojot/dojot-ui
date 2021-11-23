import React from "react";

import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

import MenuIcon from "@material-ui/icons/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";

import clsx from "clsx";
import PropTypes from "prop-types";
import { useTranslation } from "react-i18next";

import { useStyles } from "./AppHeader.style";

const AppHeader = ({ isMenuOpen, toggleMenu, title, children }) => {
  const { t } = useTranslation("menu");

  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: isMenuOpen,
      })}>
      <Toolbar>
        {!isMenuOpen && (
          <IconButton
            color="inherit"
            aria-label={t("close_menu")}
            onClick={() => toggleMenu(!isMenuOpen)}
            id="btnOpenMenu"
            className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
        )}
        {isMenuOpen && (
          <IconButton
            color="inherit"
            aria-label={t("open_menu")}
            onClick={() => toggleMenu(!isMenuOpen)}
            id="btnCloseMenu"
            className={classes.menuButton}>
            <MenuOpenIcon />
          </IconButton>
        )}

        <Typography variant="h6" noWrap>
          {title}
        </Typography>

        <div className={classes.childActions}>{children}</div>
      </Toolbar>
    </AppBar>
  );
};

AppHeader.defaultProps = {
  children: React.createElement("div"),
};

AppHeader.propTypes = {
  title: PropTypes.string.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

export default AppHeader;
