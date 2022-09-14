import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "../EmployeeMainPage/Content.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import contentData from "../Styles/img/contentData.png";

const ContentAdminData = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const location = useLocation();

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
      <AdminNavbar />
      <div className="content-data-div">
        <img
          className="content-data-img d-flex justify-content-center"
          src={contentData}
        ></img>
        <div className="content-text-div">
          <h1 className="d-flex content-data-heading">
            {" "}
            {location.state.name}
          </h1>
          <br />
          <hr />
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center mt-4 mt-md-0">
              <div className="course-item content-text mt-3">
                {posts.map((post) => (
                  <React.Fragment>
                    {post.Name === location.state.name ? post.Background : null}
                    <br></br>
                    <br></br>
                    {post.Name === location.state.name
                      ? post.YoutubeLink
                      : null}
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

export default ContentAdminData;
