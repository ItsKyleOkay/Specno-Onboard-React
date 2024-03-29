import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { auth } from "../firebase";
import classes from "./SignIn.module.css";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import signIn from "../Styles/img/sign_in.png";
import Incorrect from "../Styles/img/thumbs-down.png";
import styled, { keyframes } from "styled-components";
import { fadeIn, zoomInUp } from "react-animations";

const CardAnimation0 = styled.div`
  animation: 2s ${keyframes`${fadeIn}`} 1;
`;
const CardAnimation1 = styled.div`
  animation: 2.75s ${keyframes`${fadeIn}`} 1;
`;
const CardAnimation2 = styled.div`
  animation: 3.5s ${keyframes`${fadeIn}`} 1;
`;
const CardAnimation3 = styled.div`
  animation: 4.25s ${keyframes`${fadeIn}`} 1;
`;
const Shake = styled.div`
  animation: 4s ${keyframes`${zoomInUp}`} 1;
`;

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [issueAlert, setAlert] = useState(false);
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
        setAlert(true);
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
      <div className="container-fluid">
        <div className="row no-gutter">
          <div className={classes.leftpanel}>
            <div className="d-flex justify-content-center">
              <h1 className={classes.headingspecno}> Specno </h1>
            </div>
            <div className="d-flex justify-content-center">
              <Shake>
                <img
                  src={signIn}
                  loading="lazy"
                  alt=""
                  className={classes.rocket}
                ></img>
              </Shake>
            </div>
            <div className="d-flex justify-content-center">
              <h1 className={classes.welcome}>
                Welcome to Specno's Onboarding platform
              </h1>
            </div>
            <div className="social-menu d-flex justify-content-center">
              <ul className="social-menu d-flex justify-content-center">
                <li>
                  <CardAnimation0>
                  <a
                    href="https://za.linkedin.com/company/specno"
                    target="blank"
                  >
                    <img src="https://uploads-ssl.webflow.com/5f479f688ac92ece1c89402b/5f74a475783567589bee3e35_Group%2029012.svg" />
                  </a>
                  </CardAnimation0>
                </li>
                <li>
                <CardAnimation1>
                  <a
                    href="https://www.facebook.com/appsbyspecno/"
                    target="blank"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5f479f688ac92ece1c89402b/5f74a49d3d4f0d81a8e996c4_Group%2029014.svg"
                      alt=""
                    />
                  </a>
                  </CardAnimation1>
                </li>
                <li>
                <CardAnimation2>
                  <a
                    href="https://www.instagram.com/appsbyspecno/"
                    target="blank"
                  >
                    <img
                      src="https://uploads-ssl.webflow.com/5f479f688ac92ece1c89402b/5f74a49df2351d68ba885266_Group%2029015.svg"
                      alt=""
                    />
                  </a>
                  </CardAnimation2>
                </li>
                <li>
                <CardAnimation3>
                  <a href="https://twitter.com/appsbyspecno">
                    <img
                      src="https://uploads-ssl.webflow.com/5f479f688ac92ece1c89402b/5f74a49e7f04f6feb227f666_Group%2029016.svg"
                      alt=""
                    />
                  </a>
                  </CardAnimation3>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-6 bg-light">
            <div className="login d-flex align-items-center py-5">
              <div className="container">
                <div className="row">
                  <div className="col-lg-10 mx-auto">
                    <h3 className="light-black display-4 mb-3">Sign In</h3>
                    <p className="lighter-black h5 mb-4">
                      Please enter your details.
                    </p>
                    <form className="">
                      <div className="form-group mb-3">
                        <input
                          id="userEmail"
                          name="userEmail"
                          value={email}
                          type="email"
                          placeholder="Email address"
                          required=""
                          autofocus=""
                          className="form-control rounded-pill border-0 shadow-sm px-4"
                          onChange={(event) => onChangeHandler(event)}
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          id="inputPassword"
                          name="userPassword"
                          value={password}
                          type="password"
                          placeholder="Password"
                          required=""
                          className="form-control rounded-pill border-0 shadow-sm px-4 text-primary"
                          onChange={(event) => onChangeHandler(event)}
                        />
                      </div>
                      {issueAlert === true ? (
                        <div className="wrong-pass">
                          <div className="txt-wrong-pass">
                            Oops, Your password or email is incorrect please try
                            again.{" "}
                          </div>

                          <div
                            style={{
                              flex: "2",
                            }}
                          ></div>
                        </div>
                      ) : null}
                      <button
                        type="submit"
                        className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                        onClick={(event) => {
                          signInWithEmailAndPasswordHandler(
                            event,
                            email,
                            password
                          );
                          setAlert(false);
                        }}
                      >
                        Sign in
                      </button>
                      <p className="text-left ">
                        <br />
                        <Link
                          className={classes.forgotpassword}
                          to="/password-reset"
                        >
                          Forgot Password?
                        </Link>
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;

