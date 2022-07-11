import React, { useState, useEffect } from "react";
import classes from "../EmployeeMainPage/Content.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar.js";
import contentPic from "../Styles/img/content.jpg";

const Content = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [content, setContent] = useState();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
    } else {
      // No user is signed in.
      console.log("There is no logged in user");
    }
  });
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

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }
  return (
    <div>
      <Navbar />
      <section id="courses" className="courses">
        <div className="container" data-aos="fade-up">
          <div className="row" data-aos="zoom-in" data-aos-delay="100">
            {posts.map((post) => (
              <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
                <div className="course-item">
                  <img src={contentPic} className="img-fluid" alt="..." />
                  <div className="course-content">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <h4>Web Development</h4>
                    </div>
                    <button
                      className="d-flex justify-content-between align-items-center mb-3 color Blue"
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
