import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Students.module.css";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";

const SearchCourses = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const [displayAnswer, setAnswer] = useState();
  const navigate = useNavigate();
  let Courses = ["Accounting", "Science", "Mathematics", "ICT"];

  if (displayAnswer === "Accounting") {
    navigate("/search-course-accounting");
  }
  if (displayAnswer === "Science") {
    navigate("/search-course-science");
  }
  if (displayAnswer === "Mathematics") {
    navigate("/search-course-maths");
  }
  if (displayAnswer === "ICT") {
    navigate("/search-course-ict");
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
        <div className={classes.welcome}>
          {posts.length > 0 ? (
            <div className={classes.radio}>
              <h1>
                Please choose a course you wish to search for students from:
              </h1>
              {Courses.map((result) => (
                <>
                  <button
                    className="bg-blue-300 hover:bg-blue-600 w-full py-2 text-white"
                    onClick={(e) => setAnswer(result)}
                  >
                    {result}
                  </button>
                </>
              ))}
            </div>
          ) : (
            <h1></h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchCourses;
