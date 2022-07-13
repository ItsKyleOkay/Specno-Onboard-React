import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "../EmployeeMainPage/Quiz.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import Navbar from "../Navigation/Navbar.js";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const QuizSection = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("Quiz").onSnapshot((querySnapshot) => {
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

  // @ Rafeeq I tried to make it neat and also add date but it being an if statement I wasnt sure how
  return (
    <div>
      <Navbar />
      {posts.map((post) => (
        <div className="quiz">
          <div className={classes.quiz}>
            {post.Name === location.state.name ? (
              <div>
                <div className={classes.progressquiz}>
                  <ProgressBar now={10} />
                </div>

                <div className={classes.quizcontent}>
                  1. {post.Question1}
                  <br></br>
                  <img src={post.src} className={classes.imgfluid} alt="..." />
                </div>
                <button className="quizbtn2">Skip</button>
                <button className="quizbtn">Back</button>
                <button className="quizbtn">Check</button>
              </div>
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      ))}
      <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default QuizSection;
