import React from "react";

import PropTypes from "prop-types";
import { useStyles } from "./containers.style";

const ContentContainer = ({ children }) => {
  const classes = useStyles();
  return <div className={classes.content}>{children}</div>;
};

ContentContainer.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

ContentContainer.defaultProps = {
  children: null,
};

export default ContentContainer;
