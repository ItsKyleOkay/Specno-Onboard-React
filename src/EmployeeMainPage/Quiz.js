import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Quiz.module.css";
import firebase from "firebase";
import contentPic from "../Styles/img/content.jpg";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import Navbar from "../Navigation/Navbar.js";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [all, setAll] = useState();
  const navigate = useNavigate();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
    } else {
      // No user is signed in.
    }
  });

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("Quiz").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setPosts(getPostsFromFirebase);

      document.getElementById("btn").click();
    });
    return () => subscriber();
  }, []); // empty dependencies array => useEffect only called once

  useEffect(() => {
    const getPostsFromFirebase = [];
    const quizzes = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setUsers(getPostsFromFirebase);
    });
    return () => quizzes();
  }, []);

  //  useEffect(() => {
  //    users.map((post1) =>
  //      (post1.email === email) & (post1.employee === true)
  //        ? splice(post1.Done)
  //        : console.log("none")
  //    );
  //  });

  // function splice(done) {
  //   var nameArr = done.split(",");
  //   setDone(nameArr);
  //   // for (let i = 0; i < nameArr.length; i++) {
  //   //   setDone(nameArr[i]);
  //   // }
  // }
  return (
    <div>
      <Navbar />

      <div className="hero-section inner-page"></div>
      <section id="courses" className="courses">
        <div className="container" data-aos="fade-up">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="col-lg-12 d-flex tabs" id="tab">
              <button
                style={
                  all === "everything"
                    ? { fontWeight: "600" }
                    : { fontWeight: "400" }
                }
                id="btn"
                data-testid="header"
                className="filter-active"
                onClick={() => {
                  setAll("everything");
                }}
              >
                Specno
              </button>
              <button
                style={
                  all === "Team" ? { fontWeight: "700" } : { fontWeight: "400" }
                }
                onClick={() => {
                  setAll("Team");
                }}
              >
                Your Team
              </button>
              <button
                style={
                  all === "Tools"
                    ? { fontWeight: "600" }
                    : { fontWeight: "400" }
                }
                onClick={() => setAll("Tools")}
              >
                Your Tools
              </button>
              <button
                style={
                  all === "Processes"
                    ? { fontWeight: "600" }
                    : { fontWeight: "400" }
                }
                onClick={() => setAll("Processes")}
              >
                Your Processes
              </button>
              <button
                style={
                  all === "Other"
                    ? { fontWeight: "600" }
                    : { fontWeight: "400" }
                }
                onClick={() => setAll("Other")}
              >
                Other
              </button>
            </div>
          </div>
          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {posts.map((post) => {
              return all === post.Filter ? (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                  <div className="rounded course-item">
                    <img
                      src={contentPic}
                      className="img-fluid rounded-top"
                      alt="..."
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        /* 1. Navigate to the Details route with params */
                        navigate("/specno-quiz/data", {
                          state: { id: 1, name: post.Name },
                        });
                      }}
                    />

                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        {users.map((post1, index) => {
                          return (post1.email === email) &
                            (post1.employee === true) ? (
                            <div key={index}>
                              <h2>Task: {post1.Done}</h2>
                            </div>
                          ) : null;
                        })}
                        <h4 className="filtertab">{post.Filter}</h4>
                      </div>

                      <button
                        className="d-flex justify-content-between align-items-center mb-3 color Blue fw-bold"
                        onClick={() => {
                          /* 1. Navigate to the Details route with params */
                          navigate("/specno-quiz/data", {
                            state: { id: 1, name: post.Name },
                          });
                        }}
                      >
                        {post.Name}
                      </button>
                      <p>{post.Info}</p>
                    </div>
                  </div>
                </div>
              ) : all === "everything" ? (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                  <div className="rounded course-item">
                    <img
                      src={contentPic}
                      className="img-fluid rounded-top"
                      alt="..."
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        /* 1. Navigate to the Details route with params */
                        navigate("/specno-quiz/data", {
                          state: { id: 1, name: post.Name },
                        });
                      }}
                    />
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="filtertab">{post.Filter}</h4>
                        {users.map((post1, index) => {
                          return (post1.email === email) &
                            (post1.employee === true) ? (
                            <div key={index}>
                              {post1.Done.includes(post.Name) ? (
                                <h5 className="filtertabDone">Passed</h5>
                              ) : post1.failed.includes(post.Name) ? (
                                <h5 className="filtertabFailed">Try again</h5>
                              ) : null}
                            </div>
                          ) : null;
                        })}
                      </div>

                      <button
                        className="d-flex justify-content-between align-items-center mb-3 color Blue fw-bold"
                        onClick={() => {
                          /* 1. Navigate to the Details route with params */
                          navigate("/specno-quiz/data", {
                            state: { id: 1, name: post.Name },
                          });
                        }}
                      >
                        {post.Name}
                      </button>
                      <p>{post.Info}</p>
                    </div>
                  </div>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Quiz;
