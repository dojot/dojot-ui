import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 215;

export const useStyles = makeStyles((theme) => ({
  drawer: {
    flexShrink: 0,
    width: drawerWidth,
    whiteSpace: "nowrap",
    zIndex: theme.zIndex.drawer + 1,
    overflowX: "hidden",
  },
  drawerOpen: {
    width: drawerWidth,
    willChange: "transition",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    width: theme.spacing(8) + 1,
    willChange: "transition",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  paperShadow: {
    boxShadow: "0px 9px 18px rgb(0 0 0 / 18%), 0px 5.5px 5px rgb(0 0 0 / 24%)",
    borderRight: "none",
    overflow: "hidden",
  },
  menuList: {
    overflowY: "auto",
  },
  menuLink: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
  },
  menuLabel: {
    "&>span": {
      lineHeight: "2.0",
    },
  },
  menuItem: {
    borderRadius: "0 100px 100px 0",
    lineHeight: "2.0",
    paddingLeft: "25px",
  },
  menuClosedItem: {
    borderRadius: "100%",
    height: "43px",
    minHeight: "43px",
    width: "43px",
    minWidth: "43px",
    margin: "auto",
    padding: "0 10.5px",
  },
  selected: {
    backgroundColor: `${theme.palette.primary.main} !important`,
    color: "white",
  },
  icon: {
    color: theme.palette.text.secondary,
  },
  iconSelected: {
    color: "white",
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    overflow: "hidden",
    ...theme.mixins.toolbar,
  },
  logoBig: {
    width: "90px",
    userSelect: "none",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  logoSmall: {
    width: "50px",
    userSelect: "none",
    transition: theme.transitions.create(["width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
}));
