/* eslint-disable */
import React from "react";

/* importing MFE Applications */
let Home = React.lazy(() =>
  import("guinx/Home").catch((err) => {
    console.log(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

let Dashboard = React.lazy(() =>
  import("guinx/App").catch((err) => {
    console.log(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

let Flows = React.lazy(() =>
  import("guinx/App").catch((err) => {
    console.log(err.message);
    return import("../../presentation/views/notFound/notFound");
  }),
);

const routes = [
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

export default routes;
