import React from "react";

import PropTypes from "prop-types";
import { AppHeader } from "../Header";
// import { connect } from "react-redux";
// import { actions as layoutActions } from "Redux/base";
// import { menuSelector } from "Selectors/baseSelector";

import { UserInfo } from "../UserInfo";

const ViewContainer = ({ headerTitle, headerContent, setIsMenuOpen, isMenuOpen }) => (
  <>
    <AppHeader isMenuOpen={isMenuOpen} toggleMenu={setIsMenuOpen} title={headerTitle}>
      {headerContent && headerContent()}
      <UserInfo />
    </AppHeader>
  </>
);

ViewContainer.propTypes = {
  headerTitle: PropTypes.string,
  headerContent: PropTypes.func,
  setIsMenuOpen: PropTypes.func.isRequired,
  isMenuOpen: PropTypes.bool,
};

ViewContainer.defaultProps = {
  headerContent: () => null,
  children: null,
  headerTitle: "",
  isMenuOpen: true,
};

// const mapStateToProps = (state) => ({
//   ...menuSelector(state),
// });

// const mapDispatchToProps = {
//   ...layoutActions,
// };

// export default connect(mapStateToProps, mapDispatchToProps)(ViewContainer);

export default ViewContainer;
