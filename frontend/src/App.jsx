import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import { Authenticate, Home, Activate, Login, Rooms } from "./pages";
import { Header } from "./components";

const isAuth = true;
const user = {
  isActivated: true,
};

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bgPrimary txtPrimary">
        <Header />
        <Routes>
          {/* GUEST ROUTES */}
          <Route path="" element={<GuestRoutes />}>
            <Route index element={<Home />} />
            <Route path="/authenticate" element={<Authenticate />} />
            <Route path="/login" element={<Login />} />
          </Route>
          {/* SEMI PROTECTED ROUTES */}
          <Route path="/activate" element={<SemiProtectedRoutes />}>
            <Route index element={<Activate />} />
          </Route>

          {/* PRTOECTED ROUTES */}
          <Route path="/rooms" element={<ProtectedRoutes />}>
            <Route index element={<Rooms />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;

/* PROTECTED ROUTES
  1- Guest Routes (Welcome, Authenticate)
  2- Semi Protected Routes (Activate)
  3- Protected Routes (Rooms,Room Detail, Profile)
*/

const GuestRoutes = () => {
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

const SemiProtectedRoutes = () => {
  return !isAuth ? (
    <Navigate to="/" />
  ) : user.isActivated ? (
    <Navigate to="/rooms" />
  ) : (
    <Outlet />
  );
};

const ProtectedRoutes = () => {
  return !isAuth ? (
    <Navigate to="/" />
  ) : !user.isActivated ? (
    <Navigate to="/activate" />
  ) : (
    <Outlet />
  );
};
