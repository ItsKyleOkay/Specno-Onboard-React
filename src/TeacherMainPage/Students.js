import React, { useState, useEffect } from "react";
import classes from "./Students.module.css";
import firebase from "firebase";
import { db } from "../firebase";

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  let centres = [
    "27 Rharhabe Road, Bisho Central, Bisho",
    "2533 Thulani, Dobsonville, Soweto",
    "25 Rharhabe Road, Bisho Central, Bisho",
    "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town",
  ];
  const [displayAnswer, setAnswer] = useState();

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
    const userinfo = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
    return () => userinfo();
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
        <h1>All the students who have an account at Inspire Academy:</h1>
        <div>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className={classes.table} key={post.key}>
                {post.student === true && (
                  <>
                    <div>{post.email}</div>
                    <div>{post.displayName}</div>
                    <div>{post.centre}</div>
                  </>
                )}
              </div>
            ))
          ) : (
            <h1>no answers yet :(</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default Students;
