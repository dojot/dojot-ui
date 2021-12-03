import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles((theme) => ({
  box: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    overflow: "hidden",
  },
}));
