import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Onboard.module.css";
import firebase from "firebase";

const Onboard = () => {
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
        <div className={classes.logo}>Specno</div>
        <nav>
          <ul>
            <li>
              <a href="/profile">Home</a>
            </li>
            <li>
              <a href="/register">About Us</a>
            </li>
            <li>
              <a href="/de-register">Blog</a>
            </li>
            <li>
              <a className={classes.onboard} href="/onboard">
                Onboard
              </a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        <h1>Needs onboard code</h1>
      </div>
    </div>
  );
};

export default Onboard;