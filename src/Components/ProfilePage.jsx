import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../providers/UserProvider";
import Rocket from "../Styles/img/rocket.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import Navbar from "../Navigation/Navbar.js";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Profile from "../Styles/img/Kyle.png";
import firebase from "firebase";
import { db } from "../firebase";
import contentPic from "../Styles/img/content.jpg";
import ProgressBar from "react-bootstrap/ProgressBar";

import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [currentUser, setCurrentUser] = useState(user);
  const [uploadedPic, setUploadedPic] = useState(currentUser.photoURL);
  const [done, setDone] = useState();
  const [failed, setFailed] = useState();
  const [email, setEmail] = useState();
  const [quizinfo, setQuizInfo] = useState([]);

  const CardAnimation = styled.div`
    animation: 1.5s ${keyframes`${fadeIn}`} 1;
  `;
  useEffect(() => {
    const getPostsFromFirebase = [];

    const subscriber = db
      .collection("users")

      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setPosts(getPostsFromFirebase);
      });
    return () => subscriber();
  }, []);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const quizzes = db
      .collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")

      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setQuizInfo(getPostsFromFirebase);
      });
    return () => quizzes();
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const quizfailed = db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              setFailed(doc.data().failed);
            }
          });
        return () => quizfailed();
      }
    });
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const quizzesdone = db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              setDone(doc.data().Done);
            }
          });
        return () => quizzesdone();
      }
    });
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        const emaildone = db
          .collection("users")
          .doc(user.uid)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              setEmail(doc.data().email);
            }
          });
        return () => emaildone();
      }
    });
  });

  var count = 0;
  return (
    <div>
      <Navbar />

      {posts.map((post) =>
        post.email === email ? (
          <section className="hero-section" id="hero">
            <div className="container mt-header">
              <div className="row align-items-center">
                <div className="col-lg-9 mb-lg-0 mb-4">
                  <div className="vh-100  ">
                    <div className="card z-index-2 h-60 mb-2 ">
                      <div className="card-header pb-0 pt-3 bg-transparent">
                        <div className="profileHeader2">
                          Hello {post.displayName}
                        </div>
                        <h6 className="textglobalsub">
                          Welcome back to your onboarding at Specno
                        </h6>
                      </div>
                      <div className="quizHead">
                        Quizzes that you still need to do:
                      </div>
                      <div className="row d-flex justify-content-center mt-2">
                        {quizinfo.map((post2) =>
                          done.includes(post2.Name) ? null : (
                            <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                              <div className="rounded course-item shadow">
                                <div className="card">
                                  <div className="row">
                                    <div className="col-12">
                                      <div>
                                        <img
                                          src={contentPic}
                                          className="imagestyle"
                                          alt="..."
                                          style={{ cursor: "pointer" }}
                                          onClick={() => {
                                            /* 1. Navigate to the Details route with params */
                                            navigate("/specno-quiz/data", {
                                              state: {
                                                id: 1,
                                                name: post2.Name,
                                              },
                                            });
                                          }}
                                        />
                                        <div className="course-content">
                                          <button
                                            className="filtertab3"
                                            onClick={() => {
                                              /* 1. Navigate to the Details route with params */
                                              navigate("/specno-quiz/data", {
                                                state: {
                                                  id: 1,
                                                  name: post2.Name,
                                                },
                                              });
                                            }}
                                          >
                                            {post2.Name}
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className="card z-index-2 background-grey h-30 mb-2">
                      <div className="card-header pb-0 p-3">
                        <div className="d-flex justify-content-between">
                          <div className="textglobalsub2">
                            Your onboarding process
                          </div>
                        </div>

                        <div className="progressquiz2">
                          <ProgressBar
                            now={(100 / 50) * post.FinalScore}
                            variant="progress-quiz"
                          />
                        </div>
                      </div>

                      <div
                        className="mt-3"
                        // className="table-responsive"
                      >
                        <table className="table align-items-center ">
                          <div className="row">
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4 ml-20">
                              <div className="card background-white">
                                <div className="card-body p-3">
                                  <div className="row">
                                    <div className="col-12">
                                      <div>
                                        <div className="profileHeader2">
                                          Current Score
                                        </div>
                                        <div
                                          style={{ width: 55, height: 55 }}
                                          className=" align-items-center ml-12 mt-2"
                                        >
                                          <CircularProgressbar
                                            value={post.FinalScore}
                                            text={post.FinalScore}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                              <div className="card background-white">
                                <div className="card-body p-3">
                                  <div className="row">
                                    <div className="col-12">
                                      <div>
                                        <div className="profileHeader2">
                                          Most recent score
                                        </div>

                                        <div
                                          style={{ width: 55, height: 55 }}
                                          className=" align-items-center ml-12 mt-2"
                                        >
                                          <CircularProgressbar
                                            value={post.RecentScore}
                                            text={post.RecentScore}
                                          />
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                              <div className="card background-white">
                                <div className="card-body p-3">
                                  <div className="row">
                                    <div className="col-12">
                                      <div
                                        className="profileHeader2"
                                        data-testid="header"
                                      >
                                        Score till prize
                                      </div>

                                      <div
                                        style={{ width: 55, height: 55 }}
                                        className=" align-items-center ml-12 mt-2"
                                      >
                                        <CircularProgressbar
                                          value={(100 / 80) * post.FinalScore}
                                          text={(100 / 80) * post.FinalScore}
                                        />
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 vh-100">
                  <div className="card h-81 p-0">
                    <div className="h-100">
                      <div className="border-radius-lg h-100">
                        <div className="h-100 ">
                          <div className="quizname2">
                            <div
                              style={{
                                flex: "5",
                              }}
                            >
                              <div className="profileHeader">My Profile</div>
                            </div>
                            <div
                              style={{
                                flex: "1",
                              }}
                            >
                              <img
                                src="https://static.thenounproject.com/png/1416596-200.png"
                                alt="rocket"
                                className="pointersetting"
                                style={{ cursor: "pointer" }}
                                onClick={() => {
                                  navigate("/edit-profile");
                                }}
                              />
                            </div>
                          </div>
                          <div className="d-flex justify-content-center align-items-center ">
                            {post.photoURL !== null ? (
                              <img
                                src={post.photoURL}
                                alt="avatar"
                                className="d-flex justify-content-center align-items-center rounded-circle"
                                style={{
                                  height: "140px",
                                  backgroundColor: "rgb(233, 236, 239)",
                                }}
                              ></img>
                            ) : (
                              firebase
                                .auth()
                                .onAuthStateChanged(function (user) {
                                  db.collection("users").doc(user.uid).update({
                                    photoURL:
                                      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpotoCGLaCq7upiGsJ8ovSCS8H8W9Dzapqyg&usqp=CAU",
                                  });
                                })
                            )}
                          </div>
                          <div className="d-flex justify-content-center align-items-center mt-10  ">
                            {post.displayName}
                          </div>
                          <div className="d-flex justify-content-center align-items-center mt-2  ">
                            {post.Department}
                          </div>

                          <div className="bioStyle">{post.Bio}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : null
      )}
    </div>
  );
};

export default ProfilePage;
