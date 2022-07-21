import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import classes from "./SignIn.module.css";
import firebase from "firebase";
import { Route } from "react-router-dom";
import ProfilePage from "./ProfilePage";
import AdminProfile from "./AdminProfile";
import PasswordReset from "./PasswordReset";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  function routeUser() {
    posts.length > 0
      ? posts.map((post) =>
          (post.email === email) & (post.employee === true)
            ? navigate("/profile")
            : (post.email === email) & (post.employee === false)
            ? navigate("/admin-profile")
            : console.log(email)
        )
      : console.log("error101");
  }

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
    } else {
      // No user is signed in.
    }
  });
  useEffect(() => {
    const getPostsFromFirebase = [];
    const users = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
    return () => users();
  }, [loading]); // empty dependencies array => useEffect only called once

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => routeUser())
      .catch((error) => {
        setError(error.message);
        console.error("Error signing in with password and email", error);
      });
  };

  //Could make a popup error when the above console error occurs

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  return (
    <div className={classes.contentcontainer}>
      <div className={classes.row}>
        <div className={classes.leftpanel}>
          <h1 className={classes.welcome} data-testid="header">
            Hello! welcome to Specno's Onboarding platform
          </h1>
          <img
            src="https://uploads-ssl.webflow.com/5f479f688ac92ece1c89402b/5f74a4cc0b72d66c9c82bc99_Group%2029017.svg"
            loading="lazy"
            alt=""
            className={classes.rocket}
          ></img>
        </div>
        <div className={classes.rightpanel}>
          <h1 className={classes.headingspecno}> Specno </h1>
          <h2 className={classes.signinhead}>Sign In</h2>

          <form className="">
            <label htmlFor="userEmail" className={classes.headerdetails}>
              Email:
            </label>
            <input
              type="email"
              className={classes.useremail}
              name="userEmail"
              value={email}
              placeholder="E.g: name123@gmail.com"
              id="userEmail"
              onChange={(event) => onChangeHandler(event)}
            />
            <label htmlFor="password" className={classes.headerdetails}>
              Password:
            </label>
            <input
              type="password"
              className={classes.useremail}
              name="userPassword"
              value={password}
              placeholder="Your Password"
              id="userPassword"
              onChange={(event) => onChangeHandler(event)}
            />
            <button
              className={classes.buttonSignin}
              onClick={(event) => {
                signInWithEmailAndPasswordHandler(event, email, password);
              }}
            >
              Sign in
            </button>
          </form>
          <p className="text-left ">
            <br />
            <button
              onClick={() => navigate("/password-reset")}
              className={classes.forgotpassword}
            >
              Forgot Password?
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
