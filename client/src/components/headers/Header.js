import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Header = () => {
  const auth = useSelector((state) => state.auth);
  const { user, isLogged } = auth;

  const handleLogout = async () => {
    try {
      await axios.get("/user/logout");
      localStorage.removeItem("firstLogin");
      window.location.href = "/login";
    } catch (err) {
      window.location.href = "/login";
    }
  };

  const userLink = () => {
    return (
      <li className="drop-nav">
        <Link to="#" className="avatar">
          <img src={user.avatar} alt="" /> {user.name}{" "}
          <i className="fas fa-caret-down"></i>
        </Link>
        <ul className="dropdown">
          <li>
            <Link to="/profile">Profile</Link>{" "}
          </li>
          <li>
            <Link to="/" onClick={handleLogout}>
              Logout
            </Link>{" "}
          </li>
        </ul>
      </li>
    );
  };
  const transForm = {
    transform: isLogged ? "translateY(-5px)" : 0,
  };

  return (
    <div className="header">
      <h1>
        <Link to="/">Logo</Link>
      </h1>
      <ul style={transForm}>
        <li>
          <Link to="/about">
            <i className="far fa-address-card"></i> About Us
          </Link>
        </li>

        {isLogged ? (
          userLink()
        ) : (
          <li>
            <Link to="/login">
              <i className="fas fa-user"></i> Sign In
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Header;
