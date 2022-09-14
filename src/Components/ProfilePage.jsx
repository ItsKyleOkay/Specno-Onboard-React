import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import Rocket from "../Styles/img/rocket.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import Navbar from "../Navigation/Navbar.js";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <section className="hero-section" id="hero">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-12 hero-text-image">
              <div className="row">
                <div className="col-lg-8 text-center text-lg-start">
                  <h1 data-aos="fade-right" data-testid="header">
                    Designing And Building World Class Digital Products
                  </h1>
                  <p
                    className="mb-5"
                    data-aos="fade-right"
                    data-aos-delay="100"
                  >
                    Specno Partners With You To Validate, Design And Develop
                    Industry Leading Solutions
                    <br />
                    <button
                  className="edit-profile"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Edit your profile 
                </button>
                  </p>

                </div>
                <div className="col-lg-8 iphone-wrap">
                  <img
                    src={Rocket}
                    alt="Image"
                    data-testid="rocketID"
                    className="phone-1"
                    data-aos="fade-right"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default ProfilePage;
