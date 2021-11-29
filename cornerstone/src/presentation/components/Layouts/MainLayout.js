import PropTypes from "prop-types";
import { useMemo,useState } from "react";
import { useTranslation } from "react-i18next";

import { MENU_ITEMS,MENU_ITEMS_MAP } from "../../../domain/menu";
import { ContentContainer, RootContainer, ViewContainer } from "../Containers";
import { Drawer } from "../Drawer";

const MainLayout = ({ headerTitle, children }) => {
  const { t } = useTranslation("menu");
  const [isMenuOpen, setIsMenuOpen] = useState(true);

  const translatedMenuItems = useMemo(
    () =>
      MENU_ITEMS.map((item) => ({
        ...MENU_ITEMS_MAP[item],
        label: t(MENU_ITEMS_MAP[item].i18n),
      })),
    [t],
  );

  return (
    <RootContainer>
      <Drawer isMenuOpen={isMenuOpen} menuItems={translatedMenuItems} />
      <ViewContainer
        isMenuOpen={isMenuOpen}
        headerTitle={headerTitle}
        setIsMenuOpen={setIsMenuOpen}></ViewContainer>
      <ContentContainer>{children}</ContentContainer>
    </RootContainer>
  );
};

MainLayout.propTypes = {
  headerTitle: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

MainLayout.defaultProps = {
  headerTitle: "",
  children: null,
};

export default MainLayout;
