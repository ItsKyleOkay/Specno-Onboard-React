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
  const [selected, setSelected] = useState(false);
  const [selected2, setSelected2] = useState(false);
  const [selected3, setSelected3] = useState(false);
  const [totalquestions, setTotalQuestions] = useState(2);
  const [question, setQuestion] = useState(1);
  const location = useLocation();

  const QuestionIncrease = () => {
    if (question > 0 && question < totalquestions) {
      setQuestion(question + 1);
    }
  };

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")
      .doc(location.state.name)
      .collection("Questions")

      .onSnapshot((querySnapshot) => {
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
  return (
    <div>
      <Navbar />
      {posts.map((post) =>
        post.Type === "Image" ? (
          <div className="quiz">
            <div className="quizdiv d-flex justify-content-center">
              <div className="w-75">
                <div className="processback">
                  <img
                    src={Back}
                    alt=""
                    className="img-fluid"
                    onClick={() => {
                      setQuestion(question - 1);
                    }}
                  />
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
                      {question}. {post.Question}
                    </div>
                    <div
                      style={{
                        flex: "1",
                      }}
                    >
                      {question}/{post.TotalQuestions}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <img
                      src={post.Answer}
                      className={classes.imgfluid}
                      alt="..."
                    />
                    <img
                      src={post.Option3}
                      className={classes.imgfluid}
                      alt="..."
                    />
                    <img
                      src={post.Option2}
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
            </div>
          </div>
        ) : post.Type === "Text" && post.Number === question ? (
          <div className="quiz">
            <div className="quizdiv d-flex justify-content-center">
              <div className="w-75">
                <div className="processback">
                  <img
                    src={Back}
                    alt=""
                    className="img-fluid"
                    onClick={() => {
                      setQuestion(question - 1);
                    }}
                  />
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
                      {question}. {post.Question}
                    </div>
                    <div
                      style={{
                        flex: "1",
                      }}
                    >
                      {question}/{post.TotalQuestions}
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <button
                      className="Questiontxt"
                      onClick={() => {
                        setSelected(true);
                        setSelected2(false);
                        setSelected3(false);
                      }}
                    >
                      {post.Answer}
                    </button>
                    <button
                      className="Questiontxt"
                      onClick={() => {
                        setSelected(false);
                        setSelected2(true);
                        setSelected3(false);
                      }}
                    >
                      {post.Option3}
                    </button>
                    <button
                      className="Questiontxt"
                      onClick={() => {
                        setSelected(false);
                        setSelected2(false);
                        setSelected3(true);
                      }}
                    >
                      {post.Option2}
                    </button>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-20 mt-6">
                  <button
                    className="quizbtn"
                    onClick={() => {
                      QuestionIncrease();
                    }}
                  >
                    Skip
                  </button>
                  <button className="quizbtn">Check</button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div> </div>
        ))};
      <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default QuizSection;
