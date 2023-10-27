import React from "react";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import { Toaster } from "react-hot-toast";

import { Authenticate, Home, Activate, Rooms, Room } from "./pages";
import { Header } from "./components";
import useLoadingWithRefresh from "./hooks/useLoadingWithRefresh";
import Loader from "./components/shared/Loader";

const App = () => {
  const { loading } = useLoadingWithRefresh();
  const { theme } = useSelector((state) => state.theme);
  if (loading) {
    return (
      <div className={theme}>
        <div className={`bgPrimary loaderWrapper`}>
          <Loader message="Loading, please wait...." />
        </div>
      </div>
    );
  }
  return (
    <div className={theme}>
      <div className="bgPrimary txtPrimary">
        <Header />
        <Routes>
          {/* GUEST ROUTES */}
          <Route path="" element={<GuestRoutes />}>
            <Route index element={<Home />} />
            <Route path="/authenticate" element={<Authenticate />} />
          </Route>
          {/* SEMI PROTECTED ROUTES */}
          <Route path="/activate" element={<SemiProtectedRoutes />}>
            <Route index element={<Activate />} />
          </Route>

          {/* PRTOECTED ROUTES */}
          <Route path="/rooms" element={<ProtectedRoutes />}>
            <Route index element={<Rooms />} />
            <Route path=":_id" element={<Room />} />
          </Route>
        </Routes>
        <Toaster />
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
  const { isAuth } = useSelector((state) => state.auth);
  return isAuth ? <Navigate to="/rooms" /> : <Outlet />;
};

const SemiProtectedRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : user.isActivated ? (
    <Navigate to="/rooms" />
  ) : (
    <Outlet />
  );
};

const ProtectedRoutes = () => {
  const { isAuth, user } = useSelector((state) => state.auth);
  return !isAuth ? (
    <Navigate to="/" />
  ) : !user.isActivated ? (
    <Navigate to="/activate" />
  ) : (
    <Outlet />
  );
};
