import {
  Button,
  ClickAwayListener,
  Divider,
  Grow,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
} from "@material-ui/core";
import LockIcon from "@mui/icons-material/Lock";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { getUserInformation } from "../../../adapters/localStorage/login.localStorage";
import { logout } from "../../../adapters/services/authentication.service";
import { getTheme, setTheme } from "../../../adapters/localStorage/theme.localStorage";
import { THEME_TYPES } from "../../themes";

import { useStyles } from "./UserInfo.style";

const UserInfo = () => {
  const { t } = useTranslation("userinfo");
  const navigate = useNavigate();
  const classes = useStyles();

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [isDarkModeActivated, setIsDarkModeActivated] = useState(getTheme() === THEME_TYPES.DARK);

  const user = getUserInformation();

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChangePassword = () => {
    navigate("/change-password");
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleChangeDarkMode = () => {
    if (!isDarkModeActivated) {
      setTheme(THEME_TYPES.DARK);
      setIsDarkModeActivated(true);
    } else {
      setTheme(THEME_TYPES.LIGHT);
      setIsDarkModeActivated(false);
    }
  };

  const version = GUI_VERSION || t("notDefined");

  return (
    <div className={classes.root}>
      <>
        <Divider orientation="vertical" flexItem className={classes.divider} />

        <Button
          ref={anchorRef}
          className={classes.button}
          color="inherit"
          onClick={handleToggle}
          startIcon={<AccountCircleIcon />}
          endIcon={<ArrowDropDownIcon />}
          aria-haspopup="true"
          data-testid="menuButton"
          aria-controls={open ? "menu-list-grow" : undefined}>
          {user.userName}
        </Button>

        <Popper
          open={open}
          anchorEl={anchorRef.current}
          placement="bottom-end"
          transition
          disablePortal>
          {({ TransitionProps }) => (
            <Grow {...TransitionProps}>
              <Paper className={classes.paper}>
                <ClickAwayListener onClickAway={handleClose}>
                  <List className={classes.list}>
                    <ListItem data-testid="tenant">
                      <ListItemIcon className={classes.listItemIcon}></ListItemIcon>
                      <ListItemText>{t("tenant", { tenant: user.tenant })}</ListItemText>
                    </ListItem>

                    <ListItem data-testid="version" divider>
                      <ListItemIcon className={classes.listItemIcon}></ListItemIcon>
                      <ListItemText>{t("version", { version })}</ListItemText>
                    </ListItem>

                    {!isDarkModeActivated && (
                      <ListItem
                        data-testid="darkMode"
                        className={classes.clickableListItem}
                        onClick={handleChangeDarkMode}
                        divider>
                        <ListItemIcon className={classes.listItemIcon}>
                          <DarkModeIcon />
                        </ListItemIcon>
                        <ListItemText>{t("darkMode")}</ListItemText>
                      </ListItem>
                    )}

                    {isDarkModeActivated && (
                      <ListItem
                        data-testid="lightMode"
                        className={classes.clickableListItem}
                        onClick={handleChangeDarkMode}
                        divider>
                        <ListItemIcon className={classes.listItemIcon}>
                          <WbSunnyIcon />
                        </ListItemIcon>
                        <ListItemText>{t("lightMode")}</ListItemText>
                      </ListItem>
                    )}

                    <ListItem
                      data-testid="changePassword"
                      className={classes.clickableListItem}
                      onClick={handleChangePassword}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <LockIcon />
                      </ListItemIcon>
                      <ListItemText>{t("changePassword")}</ListItemText>
                    </ListItem>

                    <ListItem
                      data-testid="logout"
                      className={classes.clickableListItem}
                      onClick={handleLogout}>
                      <ListItemIcon className={classes.listItemIcon}>
                        <ExitToAppIcon />
                      </ListItemIcon>
                      <ListItemText>{t("logout")}</ListItemText>
                    </ListItem>
                  </List>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </>
    </div>
  );
};

export default UserInfo;
