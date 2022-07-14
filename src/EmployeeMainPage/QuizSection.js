import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import classes from "../EmployeeMainPage/Quiz.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import Navbar from "../Navigation/Navbar.js";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import Back from "../Styles/img/back.png";

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
          <div className="quizdiv d-flex justify-content-center">
            {post.Name === location.state.name ? (
              <div>
              <div className="processback">
                <img src={Back} alt="" className="img-fluid" />
                <div className="progressquiz">
                  <ProgressBar now={10} />
                </div>
              </div>
                <div className="quizcontent">
                  <div className="quizname">
                    <div
                      style={{
                        flex: "9",
                      }}
                    >
                      1. {post.Question1}
                    </div>
                    <div
                      style={{
                        flex: "1",
                      }}
                    >
                      1/{post.TotalQuestions}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <img
                      src={post.src}
                      className={classes.imgfluid}
                      alt="..."
                    />
                    <img
                      src={post.src}
                      className={classes.imgfluid}
                      alt="..."
                    />
                    <img
                      src={post.src}
                      className={classes.imgfluid}
                      alt="..."
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-20 mt-6">
                  <button className="quizbtn">Skip</button>
                  <button className="quizbtn">Check</button>
                </div>
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
