import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";
import Logo from "../Styles/img/logo.png";
import Rocket from "../Styles/img/rocket.png";
import '../Styles/style.css';
import '../Styles/bootstrap/css/bootstrap.min.css';


const ProfilePage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const { displayName, email } = user;

  return (
    <div>
    <header id="header" className="fixed-top d-flex align-items-center">
      <div className="container d-flex justify-content-between align-items-center">
  
        <div className="logo">
          <a href="index.html"><img src={Logo} alt="" className="img-fluid" /></a>
          <h1><a href="index.html">Specno</a></h1>
        </div>
  
        <nav id="navbar" className="navbar">
          <ul>
            <li><a className="active " href="/profile">Home</a></li>
            <li><a href="/specno-quiz-content">Content</a></li>
            <li><a href="/specno-quiz">Quizzes</a></li>
            <li><a href="/leaderboard">Leaderboard</a></li>
          </ul>
          <i className="bi bi-list mobile-nav-toggle"></i>
        </nav>
  
      </div>
    </header>
  
    <section className="hero-section" id="hero">

  
      <div className="container">
        <div className="row align-items-center">
          <div className="col-12 hero-text-image">
            <div className="row">
              <div className="col-lg-8 text-center text-lg-start">
                <h1 data-aos="fade-right">Designing And Building World Class Digital Products</h1>
                <p className="mb-5" data-aos="fade-right" data-aos-delay="100">Specno Partners With You To Validate, Design And Develop Industry Leading Solutions</p>
              </div>
              <div className="col-lg-8 iphone-wrap">
                <img src={Rocket} alt="Image" className="phone-1" data-aos="fade-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
  
    </section>
      <div className="mx-auto w-11/12 md:w-2/4 py-8 px-4 md:px-8">
        <div className="flex border flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4">
          <div className="border border-blue-300"></div>
          <div className="md:pl-4">
            <h2 className="text-2xl font-semibold">{displayName}</h2>
            <h3 className="italic">{email}</h3>
          </div>
        </div>
        <button
          className="w-full py-3 bg-red-600 mt-4 text-white"
          onClick={() => {
            auth.signOut();
            navigate("/login");
          }}
        >
          Sign out
        </button>
      </div>
      <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default ProfilePage;
