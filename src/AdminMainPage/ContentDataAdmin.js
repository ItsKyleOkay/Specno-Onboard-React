import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import contentData from "../Styles/img/contentData.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

const ContentData = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

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
    });
    return () => subscriber();
  }, []); // empty dependencies array => useEffect only called once

  return (
    <div>
      <AdminNavbar />
      <div className="content-data-div">
        <img
          className="content-data-img d-flex justify-content-center"
          src={contentData}
        ></img>
        <div className="content-text-div">
          <div className="quizname2">
            <h1
              className="contentAddHeading"
              style={{
                flex: "8",
              }}
            >
              {" "}
              {location.state.name}
            </h1>
            <button
              className="contentAdd"
              style={{
                flex: "1",
              }}
              onClick={() => {
                /* 1. Navigate to the Details route with params */
                navigate("/specno-quiz-content/data/admin/edit", {
                  state: { id: 1, name: location.state.name },
                });
              }}
            >
              Edit
            </button>
          </div>
          <br />
          <hr />
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center mt-4 mt-md-0">
              <div className="course-item content-text mt-3">
                {posts.map((post) => (
                  <React.Fragment>
                    {post.Name === location.state.name ? post.Background : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <br />
          <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
          <script src="../Styles/main.js"></script>
        </div>
      </div>
    </div>
  );
};

export default ContentData;
