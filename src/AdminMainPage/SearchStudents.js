import React, { useState, useEffect } from "react";
import classes from "./Employee.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [displayAnswer, setAnswer] = useState();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  let centres = [
    "27 Rharhabe Road, Bisho Central, Bisho",
    "2533 Thulani, Dobsonville, Soweto",
    "25 Rharhabe Road, Bisho Central, Bisho",
    "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town",
    "All",
  ];

  if (displayAnswer === "27 Rharhabe Road, Bisho Central, Bisho") {
    navigate("/search-students-bisho27");
    window.location.reload();
  }
  if (displayAnswer === "25 Rharhabe Road, Bisho Central, Bisho") {
    navigate("/search-students-bisho25");
    window.location.reload();
  }
  if (displayAnswer === "2533 Thulani, Dobsonville, Soweto") {
    navigate("/search-students-soweto");
    window.location.reload();
  }
  if (
    displayAnswer === "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town"
  ) {
    navigate("/search-students-kwt");
    window.location.reload();
  }
  if (displayAnswer === "All") {
    navigate("/search-students-all");
    window.location.reload();
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
                Please choose a centre you wish to search for students from:
              </h1>
              {centres.map((result) => (
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

export default Students;
