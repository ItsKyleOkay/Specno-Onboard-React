import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "../EmployeeMainPage/Content.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

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

      <h1 className={classes.Heading}> {location.state.name}</h1>
      {posts.map((post) => (
        <div className="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
          <div className="course-item">
            {post.Name === location.state.name ? post.Background : <div> </div>}
          </div>
        </div>
      ))}
      <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default ContentAdminData;
