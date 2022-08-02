import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Onboard.module.css";
import firebase from "firebase";
import Navbar from "../Navigation/Navbar.js";

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
    });
    return () => subscriber();
  }, []); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }
  return (
    <div>
      <Navbar />
      <h1>Needs onboard code</h1>
    </div>
  );
};

export default Onboard;
