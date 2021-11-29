import PropTypes from "prop-types";

import { AppHeader } from "../Header";
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

export default ViewContainer;
