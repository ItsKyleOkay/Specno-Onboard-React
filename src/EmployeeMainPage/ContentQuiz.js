import React, { useState, useEffect } from "react";
import classes from "../EmployeeMainPage/Content.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar.js";
import contentPic from "../Styles/img/content.jpg";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

const Content = () => {
  const [loading, setLoading] = useState(true);
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
      setLoading(false);
      document.getElementById("btn").click();
      console.log(posts)
    });
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once
  console.log(all);
  return (
    <div>
      <Navbar />
      <div className="hero-section inner-page"></div>
      <section id="courses" className="courses">
        <div className="container" data-aos="fade-up">
          <div className="col-lg-12 d-flex justify-content-center">
            <div className="col-lg-12 d-flex tabs" id="tab">
              <button id="btn" className="filter-active" onClick={() => setAll("everything")} >Specno</button>
              <button onClick={() => setAll("Team")}>Your Team</button>
              <button onClick={() => setAll("Tools")}>Your Tools</button>
              <button onClick={() => setAll("Processes")}>Your Processes</button>
              <button onClick={() => setAll("Other")}>Other</button>
            </div>
          </div>
          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {posts.map((post) =>
              all === post.Filter ? (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                  <div className="rounded course-item ">
                    <img
                      src={contentPic}
                      className="img-fluid rounded-top"
                      alt="..."
                    />
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>{post.Filter}</h4>
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
                </div>
              ) : all === "everything" ? (
                <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                  <div className="rounded course-item ">
                    <img
                      src={contentPic}
                      className="img-fluid rounded-top"
                      alt="..."
                    />
                    <div className="course-content">
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <h4>{post.Filter}</h4>
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
                </div>
              ) : (<div>
              </div>)
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
