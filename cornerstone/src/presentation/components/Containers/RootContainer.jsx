import React from "react";

import PropTypes from "prop-types";
import { useStyles } from "./containers.style";

const RootContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.root}>{children}</div>;
};

RootContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

RootContainer.defaultProps = {
  children: null,
};

export default RootContainer;
