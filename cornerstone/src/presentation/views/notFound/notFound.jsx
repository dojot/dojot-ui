import React from "react";
import { useStyles } from "./notFound.style";

const NotFound = () => {
  const classes = useStyles();

  return (
    <div className={classes.box}>
      <br />
      <b>Not Found</b>
    </div>
  );
};

export default NotFound;
