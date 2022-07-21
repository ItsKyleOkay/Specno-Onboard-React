import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Employee.module.css";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";

const SoftSearch = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [search, setSearch] = useState();
  const [posts, setPosts] = useState([]);
  const [displayAnswer, setAnswer] = useState();
  const navigate = useNavigate();

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
  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;
    setSearch(value);
  };
  console.log(search);
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
          <div className={classes.radio}>
            <h1>Please enter a students email you wish to search for:</h1>
            <input
              type="text"
              className="mt-1 mb-3 p-1 w-full"
              name="userSearch"
              placeholder="Enter email here"
              id="userSearch"
              onChange={(event) => onChangeHandler(event)}
            />

            {posts.length > 0 &&
              posts.map((post) => (
                <div key={post.key}>
                  {post.email.includes(search) & (post.student === true) ? (
                    <span className={classes.Course}>
                      <div>{post.displayName}</div>
                      <div>{post.centre}</div>
                      <div>{post.email}</div>
                      <div>{post.Course}</div>
                      <div>{post.Course2}</div>
                      <div>{post.Course3}</div>
                      <div>{post.Course4}</div>
                      <h1>---------------------------------------------</h1>
                    </span>
                  ) : null}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoftSearch;
