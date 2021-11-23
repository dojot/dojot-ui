import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import menuEn from "../../domain/menu/translations/en.menu.i18n.json";

import menuPtBr from "../../domain/menu/translations/pt_br.menu.i18n.json";

import userinfoEn from "../components/UserInfo/translations/en.userInfo.i18n.json";
import userinfoPtBr from "../components/UserInfo/translations/pt_br.userInfo.i18n.json";

import loginEn from "../views/login/translations/en.login.i18n.json";
import loginPtBr from "../views/login/translations/pt_br.login.i18n.json";

const resources = {
  en: {
    menu: menuEn,
    userinfo: userinfoEn,
    login: loginEn,
  },
  pt: {
    menu: menuPtBr,
    userinfo: userinfoPtBr,
    login: loginPtBr,
  },
};

const lng = navigator.language || navigator.userLanguage;

i18n.use(initReactI18next).init({
  ns: ["menu", "userinfo", "login"],
  defaultNS: "common",
  lng,
  resources,
  keySeparator: ".",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
