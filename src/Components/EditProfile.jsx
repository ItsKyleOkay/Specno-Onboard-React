import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import Rocket from "../Styles/img/rocket.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import Navbar from "../Navigation/Navbar.js";
import { BrowserRouter } from "react-router-dom";

const EditProfile = () => {
  const user = useContext(UserContext);

  return (
    <div>
      <Navbar />
    </div>
  );
};

export default EditProfile;
