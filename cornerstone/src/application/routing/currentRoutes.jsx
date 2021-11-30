import { lazy } from "react";

/* importing MFE Applications */
const Home = lazy(() =>
  import("dashboard/Home").catch((err) => {
    console.error(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const Dashboard = lazy(() =>
  import("dashboard/Dashboard").catch((err) => {
    console.error(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const Flows = lazy(() =>
  import("dashboard/App").catch((err) => {
    console.error(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const availableRoutes = [
  {
    path: "/",
    component: <Dashboard />,
    label: "Dashboard",
  },
  {
    path: "/dashboard",
    component: <Dashboard />,
    label: "Dashboard",
  },
  {
    path: "/flows",
    component: <Flows />,
    label: "flows",
  },
  {
    path: "/home",
    component: <Home />,
    label: "Home",
  },
];

export default availableRoutes;
