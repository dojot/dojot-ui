import PropTypes from "prop-types";
import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { isAuthenticated } from "../../../adapters/localStorage/login.localStorage";

import { MainLayout } from "../../components/Layouts";

import routes from "../../../application/routing/currentRoutes";

const LogIn = React.lazy(() => import("../login/Login"));

const RequireAuth = ({ children }) => {
  const isAuth = isAuthenticated();
  return !isAuth ? children : <Navigate to="/login" />;
};

RequireAuth.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
};

RequireAuth.defaultProps = {
  children: null,
};

/* TIP: is possible to pass attrs={props} to containers from MFE. */
const RoutesComponent = () => (
  <React.Suspense fallback={<div>Loading...</div>}>
    <Routes>
      <Route path="/login" element={<LogIn />} />
      {routes.map((route) => (
        <Route
          key={route.path}
          path={route.path}
          element={
            // Using a method recommended by react-roucter-dom v6.
            // Now we do your composition here instead of wrapping <Route>.
            // This is really just inverting the wrapping, but it's a lot
            // more clear which components expect which props.
            <RequireAuth>
              <MainLayout headerTitle={route.label}>{route.component}</MainLayout>
            </RequireAuth>
          }
        />
      ))}
    </Routes>
  </React.Suspense>
);

export default RoutesComponent;
