import { Drawer, ListItemIcon, ListItemText, MenuItem, MenuList } from "@material-ui/core";
import { useTheme } from "@material-ui/core/styles";
import clsx from "clsx";
import PropTypes from "prop-types";
import { Link, useLocation } from "react-router-dom";

import { useStyles } from "./Drawer.style";

const DrawerComponent = ({ isMenuOpen, menuItems }) => {
  const theme = useTheme();
  const location = useLocation();
  const classes = useStyles();

  const isCurrentRoute = (path) => location.pathname.indexOf(path) > -1;

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: isMenuOpen,
        [classes.drawerClose]: !isMenuOpen,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: isMenuOpen,
          [classes.drawerClose]: !isMenuOpen,
          [classes.paperShadow]: true,
        }),
      }}>
      <div className={classes.toolbar}>
        <img
          className={isMenuOpen ? classes.logoBig : classes.logoSmall}
          draggable={false}
          alt="Dojot logo"
          src={theme.dojotLogo}
        />
      </div>

      <MenuList className={classes.menuList} disablePadding>
        {menuItems.map((item) => {
          if (!item.visible) return null;

          const isSelected = isCurrentRoute(item.path);

          return (
            <Link to={item.path} className={classes.menuLink} key={item.label}>
              <MenuItem
                selected={isSelected}
                classes={{
                  root: isMenuOpen ? classes.menuItem : classes.menuClosedItem,
                  selected: classes.selected,
                }}>
                <ListItemIcon>
                  <item.icon className={isSelected ? classes.iconSelected : classes.icon} />
                </ListItemIcon>
                <ListItemText className={classes.menuLabel} primary={item.label} />
              </MenuItem>
            </Link>
          );
        })}
      </MenuList>
    </Drawer>
  );
};

DrawerComponent.propTypes = {
  menuItems: PropTypes.array.isRequired,
  isMenuOpen: PropTypes.bool.isRequired,
};

export default DrawerComponent;
