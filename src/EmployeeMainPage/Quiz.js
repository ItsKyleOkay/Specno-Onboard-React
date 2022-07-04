import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import classes from "./Quiz.module.css";
import firebase from "firebase";

import { Card, CardGroup, Button } from "react-bootstrap";

const Quiz = () => {
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
              <a href="/specno-quiz-content">Content</a>
            </li>
            <li>
              <a href="/specno-quiz">Quizzes</a>
            </li>
            <li>
              <a href="/specno-blog">Blog</a>
            </li>
            <li>
              <a href="/leaderboard">Leaderboard</a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        <CardGroup>
          {posts.map((post) => (
            <Card className={"card-grid"} key={post}>
              <Card.Body>
                <Card.Title>
                  <strong>{post.Name}</strong>
                </Card.Title>
                <Card.Text>
                  <p>
                    Level: {post.Level} Department:
                    {post.Department} Time: {post.Time}
                  </p>
                </Card.Text>
                <Button
                  className={"btn"}
                  href="www.google.com"
                  rel={"noopener noreferrer"}
                >
                  Learn More
                </Button>
              </Card.Body>
            </Card>
          ))}
        </CardGroup>
      </div>
    </div>
  );
};

export default Quiz;
