import React, { useState, useEffect } from "react";
import Logo from "../Styles/img/logo.png";
import Bell from "../Styles/img/bell.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import { auth } from "../firebase";
import { BrowserRouter, useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";
import Popup from "./popup";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  return (
    <header id="header" className="fixed-top d-flex align-items-center;">
      <div className="container d-flex justify-content-between align-items-center w-full">
        <div className="logo">
          <a href="/profile">
            <img src={Logo} alt="" className="img-fluid specno-img" />
          </a>
          <h1>
            <a href="/profile">Specno</a>
          </h1>
        </div>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <NavLink to="/profile">Home</NavLink>
            </li>
            <li>
              <NavLink to="/specno-quiz-content">Resources</NavLink>
            </li>
            <li>
              <NavLink to="/specno-quiz">Quizzes</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard">Leaderboard</NavLink>
            </li>
            <li>
              <div className="NotificationImg">
                <img
                  src={Bell}
                  alt=""
                  className="img-fluid"
                  onClick={togglePopup}
                />
              </div>
            </li>
            <li>
              <Link to={"/login"}>
                <button
                  className="logout"
                  onClick={() => {
                    auth.signOut();
                  }}
                >
                  Sign out
                </button>
              </Link>

              {/* <button
                className="logout"
                onClick={() => {
                  auth.signOut();
                  navigate("/login");
                }}
              >
                Sign out
              </button> */}
            </li>
            {isOpen && <Popup handleClose={togglePopup} />}
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
