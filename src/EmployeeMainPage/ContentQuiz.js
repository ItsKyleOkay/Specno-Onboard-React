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
    });
    return () => subscriber();
  }, [loading]); // empty dependencies array => useEffect only called once

  return (
    <div>
      <Navbar />
      <div className="hero-section inner-page"></div>
      <section id="courses" className="courses">
        <div className="container" data-aos="fade-up">
        <div className="col-lg-12 d-flex justify-content-center">
            <div className="col-lg-12 d-flex tabs" id="tab" >
              <button className="filter-active">Specno</button>
              <button>Your Team</button>
              <button>Your Tools</button>
              <button>Your Processes</button>
              <button>Other</button>
            </div>
          </div>
          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {posts.map((post) => (
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0 rounded">
                <div className="rounded course-item ">
                  <img
                    src={contentPic}
                    className="img-fluid rounded-top"
                    alt="..."
                  />
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>Web Development</h4>
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
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Content;
