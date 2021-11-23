import React from "react";

import { Navigate, Route, Routes } from "react-router-dom";

import { isAuthenticated } from "../../adapters/localStorage/login.localStorage";

import { MainLayout } from "../../presentation/components/Layouts";

import routes from "./currentRoutes";

const LogIn = React.lazy(() => import("../../presentation/views/login/Login"));

function RequireAuth({ children }) {
  let isAuth = isAuthenticated();
  console.log("redirectTo");
  return isAuth ? children : <Navigate to="/login" />;
}

/* TIP: tem como passar attrs={props} para os
 containers do MFE. */
console.log("routes", routes);

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
