import React, { useState, useEffect } from "react";
import classes from "../Students.module.css";
import firebase from "firebase";
import { db } from "../../firebase";

const SearchStudentsBisho25 = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [displayAnswer, setAnswer] = useState();
  const [posts, setPosts] = useState([]);
  let Courses = ["Accounting", "Science", "Mathematics", "ICT"];

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
        <div className={classes.welcome}>
          <h1> Searching for student information:</h1>
          {posts.length > 0 ? (
            <div className={classes.radio}>
              <h1>
                Please choose a course you wish to search for students from:
              </h1>
              {Courses.map((result) => (
                <>
                  <label className={classes.radiobtn}>{result}</label>
                  <input
                    type="radio"
                    value={result}
                    name="RadioValues"
                    onChange={(e) => setAnswer(e.target.value)}
                  />
                </>
              ))}
            </div>
          ) : (
            <h1></h1>
          )}
          {displayAnswer === "Accounting" ? (
            posts.map((post) => (
              <div key={post.key}>
                <span>
                  {(post.student === true) &
                  (post.Course === "Accounting") &
                  (post.centre === "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : // setCount(count++)
                  (post.Course2 === "Accounting") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course3 === "Accounting") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course4 === "Accounting") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
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
            <h1></h1>
          )}
          {displayAnswer === "Mathematics" ? (
            posts.map((post) => (
              <div key={post.key}>
                <span>
                  {(post.student === true) &
                  (post.Course === "Mathematics") &
                  (post.centre === "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : // setCount(count++)
                  (post.Course2 === "Mathematics") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course3 === "Mathematics") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course4 === "Mathematics") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
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
            <h1></h1>
          )}
          {displayAnswer === "Science" ? (
            posts.map((post) => (
              <div key={post.key}>
                <span>
                  {(post.student === true) &
                  (post.Course === "Science") &
                  (post.centre === "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : // setCount(count++)
                  (post.Course2 === "Science") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course3 === "Science") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course4 === "Science") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
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
            <h1></h1>
          )}
          {displayAnswer === "ICT" ? (
            posts.map((post) => (
              <div key={post.key}>
                <span>
                  {(post.student === true) &
                  (post.Course === "ICT") &
                  (post.centre === "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : // setCount(count++)
                  (post.Course2 === "ICT") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course3 === "ICT") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
                    "Email:" +
                    "  " +
                    post.email +
                    ",  Name:     " +
                    post.displayName +
                    ", Centre:     " +
                    post.centre
                  ) : (post.Course4 === "ICT") &
                    (post.centre ===
                      "25 Rharhabe Road, Bisho Central, Bisho") ? (
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
            <h1></h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchStudentsBisho25;
