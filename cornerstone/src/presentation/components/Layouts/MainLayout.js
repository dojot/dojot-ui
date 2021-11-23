import React, { useState, useMemo } from "react";

import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

import { Drawer } from "../Drawer";
import { ContentContainer, RootContainer, ViewContainer } from "../Containers";

import { MENU_ITEMS_MAP, MENU_ITEMS } from "../../../domain/menu";

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
