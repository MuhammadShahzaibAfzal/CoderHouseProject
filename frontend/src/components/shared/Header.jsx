import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { FaMoon } from "react-icons/fa";
import { FaSun } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../../store/slices/themeSlice";

const Header = () => {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);

  return (
    <nav className="container">
      <Link to="/" className="logo txtPrimary">
        <img src={logo} alt="Logo" />
        <span>Coder House</span>
      </Link>
      <div className="right">
        <button
          className="btnIcon"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
