import React, { useState, useEffect } from "react";
import classes from "../EmployeeMainPage/Content.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar.js";
import contentPic from "../Styles/img/content.jpg";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";

const CardAnimation = styled.div`
  animation: 1.5s ${keyframes`${fadeIn}`} 1;
`;

const Content = () => {
  const [email, setEmail] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [all, setAll] = useState();

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("Content").onSnapshot((querySnapshot) => {
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
                data-testid="header"
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
            {posts.map((post) =>
              all === post.Filter ? (
                <CardAnimation className=" col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                  <div className="rounded course-item shadow">
                    <img
                      src={contentPic}
                      className="img-fluid rounded-top"
                      style={{ cursor: "pointer" }}
                      alt="..."
                      onClick={() => {
                        setContent(post.Name);
                        /* 1. Navigate to the Details route with params */
                        navigate("/specno-quiz-content/data", {
                          state: { id: 1, name: post.Name },
                        });
                      }}
                    />
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4 className="filtertab">{post.Filter}</h4>
                      </div>
                      <button
                        className="d-flex justify-content-between align-items-center mb-3 color Blue fw-bold"
                        onClick={() => {
                          setContent(post.Name);
                          /* 1. Navigate to the Details route with params */
                          navigate("/specno-quiz-content/data", {
                            state: { id: 1, name: post.Name },
                          });
                        }}
                      >
                        {post.Name}
                      </button>

                      <p>{post.Info}</p>
                    </div>
                  </div>
                </CardAnimation>
              ) : all === "everything" ? (
                <div className="col-lg-3 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                  <CardAnimation className="d-flex">
                    <div className="rounded course-item shadow">
                      <img
                        src={contentPic}
                        className="img-fluid rounded-top"
                        alt="..."
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setContent(post.Name);
                          /* 1. Navigate to the Details route with params */
                          navigate("/specno-quiz-content/data", {
                            state: { id: 1, name: post.Name },
                          });
                        }}
                      />
                      <div className="course-content">
                        <div className="d-flex justify-content-between align-items-center mb-3">
                          <h4 className="filtertab">{post.Filter}</h4>
                        </div>
                        <button
                          className="d-flex justify-content-between align-items-center mb-3 color Blue fw-bold"
                          onClick={() => {
                            setContent(post.Name);
                            /* 1. Navigate to the Details route with params */
                            navigate("/specno-quiz-content/data", {
                              state: { id: 1, name: post.Name },
                            });
                          }}
                        >
                          {post.Name}
                        </button>

                        <p>{post.Info}</p>
                      </div>
                    </div>
                  </CardAnimation>
                </div>
              ) : null
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
