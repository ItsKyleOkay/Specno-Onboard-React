import React from "react";
import Logo from "../Styles/img/Logo2.svg";
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
        <NavLink to="/profile" className="logo">
          <img src={Logo} alt="" className="img-fluid specno-img" />
        </NavLink>
        <nav id="navbar" className="navbar">
          <ul>
            <li>
              <NavLink to="/admin-profile">Home</NavLink>
            </li>
            <li>
              <NavLink to="/employee-list">Employees</NavLink>
            </li>
            <li>
              <NavLink to="/content-admin">Resources</NavLink>
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
