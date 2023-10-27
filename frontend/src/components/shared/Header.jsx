import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaMoon, FaSun } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";

import { toggleTheme } from "../../store/slices/themeSlice";
import { logout } from "../../http";
import { setAuth } from "../../store/slices/authSlice";
import logo from "../../assets/logo.png";

const Header = () => {
  const dispatch = useDispatch();
  const { isAuth, user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  async function handleLogout() {
    try {
      const { data } = await logout();
      dispatch(setAuth(data));
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <nav className="container">
      <Link to="/" className="logo txtPrimary">
        <img src={logo} alt="Logo" />
        <span>Coder House</span>
      </Link>
      <div className="right">
        {user?.isActivated && (
          <Link to="/rooms/profile" className="avatarLink">
            <h3 className="txtPrimary">{user?.name}</h3>
            <div className="avatarWrapper">
              <img src={`${process.env.REACT_APP_API_URL}${user?.avatar}`} />
            </div>
          </Link>
        )}
        <button
          className="btnIcon"
          onClick={() => {
            dispatch(toggleTheme());
          }}
        >
          {theme === "dark" ? <FaSun /> : <FaMoon />}
        </button>
        {isAuth && (
          <button className="btnIcon" onClick={handleLogout}>
            <FiLogOut />
          </button>
        )}
      </div>
    </nav>
  );
};

export default Header;
