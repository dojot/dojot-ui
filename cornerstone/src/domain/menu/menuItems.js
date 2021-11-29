import DashboardIcon from "@mui/icons-material/Dashboard";
import DeviceHubIcon from "@mui/icons-material/DeviceHub";
import DevicesOtherIcon from "@mui/icons-material/DevicesOther";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import HomeIcon from "@mui/icons-material/Home";
import NotificationImportantIcon from "@mui/icons-material/NotificationImportant";
import PeopleIcon from "@mui/icons-material/People";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import VerifiedUserIcon from "@mui/icons-material/VerifiedUser";

const MENU_ITEMS_MAP = {
  flows: {
    visible: true,
    i18n: "flows",
    label: "Fluxos",
    path: "/flows",
    icon: DeviceHubIcon,
  },
  notifications: {
    visible: true,
    i18n: "notifications",
    label: "Notificações",
    path: "/notification",
    icon: NotificationImportantIcon,
  },
  users: {
    visible: true,
    i18n: "users",
    label: "Usuários",
    path: "/users",
    icon: PeopleIcon,
  },
  profiles: {
    visible: true,
    i18n: "profiles",
    label: "Perfis",
    path: "/profiles",
    icon: SupervisedUserCircleIcon,
  },
  home: {
    visible: true,
    i18n: "home",
    label: "home",
    path: "/home",
    icon: HomeIcon,
  },
  dashboard: {
    visible: true,
    i18n: "dashboard",
    label: "Dashboard",
    path: "/dashboard",
    icon: DashboardIcon,
  },
  devices: {
    visible: true,
    i18n: "devices",
    label: "Dispositivos",
    path: "/devices",
    icon: DevicesOtherIcon,
  },
  templates: {
    visible: true,
    i18n: "templates",
    label: "Modelos",
    path: "/templates",
    icon: FilterNoneIcon,
  },
  security: {
    visible: true,
    i18n: "security",
    label: "Segurança",
    path: "/certification-authorities",
    icon: VerifiedUserIcon,
  },
};

export { MENU_ITEMS_MAP };
