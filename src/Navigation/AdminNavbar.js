import React from "react";
import Logo from "../Styles/img/logo.png";
import Bell from "../Styles/img/bell.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <header id="header" className="fixed-top d-flex align-items-center;">
      <div className="container d-flex justify-content-between align-items-center w-full">
        <div className="logo">
          <a href="/profile">
            <img src={Logo} alt="" className="img-fluid" />
          </a>
          <h1>
            <a href="/admin-profile">Specno</a>
          </h1>
        </div>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <NavLink to="/admin-profile">Home</NavLink>
            </li>
            <li>
              <NavLink to="/employee-list">Employees</NavLink>
            </li>
            <li>
              <NavLink to="/content-admin">Content</NavLink>
            </li>
            <li>
              <NavLink to="/quiz-admin">Quizzes</NavLink>
            </li>
            <li>
              <NavLink to="/leaderboard-admin">Leaderboard</NavLink>
            </li>
            <li>
              <a href="#">
                <img src={Bell} alt="" className="img-fluid" />
              </a>
            </li>
            <li>
              <button
                className="logout"
                onClick={() => {
                  auth.signOut();
                  navigate("/login");
                }}
              >
                Sign out
              </button>
            </li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
      </div>
    </header>
  );
};
export default Navbar;
