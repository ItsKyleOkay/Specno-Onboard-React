import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import firebase from "firebase";
import contentPic from "../Styles/img/content.jpg";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import { useNavigate } from "react-router-dom";

const QuizAdmin = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const [all, setAll] = useState();
  const navigate = useNavigate();
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
      setLoading(false);
      document.getElementById("btn").click();
    });
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once

  return (
    <div>
      <AdminNavbar />
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
                      </div>

                      <button
                        className="d-flex justify-content-between align-items-center mb-3 color Blue fw-bold"
                        onClick={() => {
                          /* 1. Navigate to the Details route with params */
                          navigate("/specno-quiz/data/admin/edit", {
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
              ) : null
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
export default QuizAdmin;
