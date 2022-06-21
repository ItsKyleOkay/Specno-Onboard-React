import React, { useState, useEffect } from "react";
import classes from "../Students.module.css";
import firebase from "firebase";
import { db } from "../../firebase";
import { useNavigate } from "react-router-dom";

const SearchScience = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();

  const [posts, setPosts] = useState([]);
  const [displayAnswer, setAnswer] = useState();
  const navigate = useNavigate();
  let Courses = ["Accounting", "Science", "Mathematics"];

  if (displayAnswer === "Science") {
  }
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
    const subscriber = db.collection("users").onSnapshot((querySnapshot) => {
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
      <span className={classes.header}>
        <div className={classes.logo}>Inspire Academy</div>
        <nav>
          <ul>
            <li>
              <a href="/teacher-profile">Home</a>
            </li>
            <li>
              <a href="/students-list">Students</a>
            </li>
            <li>
              <a href="/search-students">Centres</a>
            </li>
            <li>
              <a href="/search-courses">Courses</a>
            </li>
            <li>
              <a href="/reports">Reports</a>
            </li>
            <li>
              <a href="/search">Search</a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.key}>
              <span>
                {(post.student === true) & (post.Course === "Science") ? (
                  "Email:" +
                  "  " +
                  post.email +
                  ",  Name:     " +
                  post.displayName +
                  ", Centre:     " +
                  post.centre
                ) : post.Course2 === "Science" ? (
                  "Email:" +
                  "  " +
                  post.email +
                  ",  Name:     " +
                  post.displayName +
                  ", Centre:     " +
                  post.centre
                ) : post.Course3 === "Science" ? (
                  "Email:" +
                  "  " +
                  post.email +
                  ",  Name:     " +
                  post.displayName +
                  ", Centre:     " +
                  post.centre
                ) : post.Course4 === "Science" ? (
                  "Email:" +
                  "  " +
                  post.email +
                  ",  Name:     " +
                  post.displayName +
                  ", Centre:     " +
                  post.centre
                ) : (
                  <h1></h1>
                )}
              </span>
            </div>
          ))
        ) : (
          <h1>no answers yet :(</h1>
        )}
      </div>
    </div>
  );
};

export default SearchScience;
