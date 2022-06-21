import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Marks.module.css";
import firebase from "firebase";

const Marks = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
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
              <a href="/profile">Home</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/de-register">De-register</a>
            </li>
            <li>
              <a href="/marks">Marks</a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        <h1>Marks</h1>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.key}>
              {(post.email === email) & (post.student === true) ? (
                <span className={classes.Course}>
                  <h1>{post.email}</h1>{" "}
                  <h2>
                    {post.Course} - {post.AccountingMark}
                  </h2>
                  <h2>
                    {post.Course2} - {post.MathsMark}
                  </h2>
                  <h2>
                    {post.Course3} - {post.ScienceMark}
                  </h2>
                  <h2>
                    {post.Course4} - {post.ICTMark}
                  </h2>
                  <h2>Comments - {post.Comments}</h2>
                </span>
              ) : (
                <h1></h1>
              )}
            </div>
          ))
        ) : (
          <h1>no answers yet :(</h1>
        )}
      </div>
    </div>
  );
};

export default Marks;
