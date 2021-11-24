import React from "react";

/* importing MFE Applications */
const Home = React.lazy(() =>
  import("guinx/Home").catch((err) => {
    console.error(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const Dashboard = React.lazy(() =>
  import("remote/Dashboard").catch((err) => {
    console.error(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const Flows = React.lazy(() =>
  import("guinx/App").catch((err) => {
    console.error(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const routes = [
  {
    path: "/",
    component: <Dashboard app={{ name: "Dashboard" }} />,
    label: "Dashboard",
  },
  {
    path: "/dashboard",
    component: <Dashboard app={{ name: "Dashboard" }} />,
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

export default routes;
