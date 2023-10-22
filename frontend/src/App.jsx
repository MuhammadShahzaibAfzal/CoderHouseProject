import React from "react";
import { Home } from "./pages";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components";
import { useSelector } from "react-redux";
import Register from "./pages/Auth/Register";
import Login from "./pages/Auth/Login";

const App = () => {
  const { theme } = useSelector((state) => state.theme);
  return (
    <div className={theme}>
      <div className="bgPrimary txtPrimary">
        <Header />
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
