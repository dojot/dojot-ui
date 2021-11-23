import {
  Dashboard,
  DeviceHub,
  DevicesOther,
  FilterNone,
  Home,
  NotificationImportant,
  People,
  SupervisedUserCircle,
  VerifiedUser,
} from "@material-ui/icons";

const MENU_ITEMS_MAP = {
  flows: {
    visible: true,
    i18n: "flows",
    label: "Fluxos",
    path: "/flows",
    icon: DeviceHub,
  },
  notifications: {
    visible: true,
    i18n: "notifications",
    label: "Notificações",
    path: "/notification",
    icon: NotificationImportant,
  },
  users: {
    visible: true,
    i18n: "users",
    label: "Usuários",
    path: "/users",
    icon: People,
  },
  profiles: {
    visible: true,
    i18n: "profiles",
    label: "Perfis",
    path: "/profiles",
    icon: SupervisedUserCircle,
  },
  home: {
    visible: true,
    i18n: "home",
    label: "home",
    path: "/home",
    icon: Home,
  },
  dashboard: {
    visible: true,
    i18n: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: Dashboard,
  },
  devices: {
    visible: true,
    i18n: "devices",
    label: "Dispositivos",
    path: "/devices",
    icon: DevicesOther,
  },
  templates: {
    visible: true,
    i18n: "templates",
    label: "Modelos",
    path: "/templates",
    icon: FilterNone,
  },
  security: {
    visible: true,
    i18n: "security",
    label: "Segurança",
    path: "/certification-authorities",
    icon: VerifiedUser,
  },
};

export { MENU_ITEMS_MAP };
