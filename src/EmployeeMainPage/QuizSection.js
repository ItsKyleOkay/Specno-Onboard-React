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
import { useNavigate } from "react-router-dom";
import Popup from "./popupAnswer";

const QuizSection = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [answer, setAnswer] = useState();
  const [CheckAns, setCheck] = useState(true);
  const [posts, setPosts] = useState([]);
  const [quizinfo, setQuizInfo] = useState([]);
  const [isSelected, setSelected] = useState([false, false, false]);
  const [totalquestions, setTotalQuestions] = useState(0);
  const [questionSelectedValue, setquestionSelectedValue] = useState(0);
  const [question, setQuestion] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();

  const QuestionIncrease = () => {
    if (question > 0 && question < totalquestions) {
      setQuestion(question + 1);
    }

    // if (questionSelectedValue === posts.answer) {
    //   setDisplayAnswer(false);
    // }
  };
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
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

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")

      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setQuizInfo(getPostsFromFirebase);
      });
    return () => subscriber();
  });

  const onButtonSelected = (position, value) => {
    setquestionSelectedValue(value);
    setAnswer(value);
    if (position === 0) {
      setSelected([true, false, false]);
      setCheck(false);
    } else if (position === 1) {
      setSelected([false, true, false]);
      setCheck(false);
    } else if (position === 2) {
      setSelected([false, false, true]);
      setCheck(false);
    }
  };
  //adding the selected in a array and then checking if the position is a number to change another array
  return (
    <div>
      <Navbar />
      {quizinfo.map((post2) =>
        (post2.Name === location.state.name) &
        (post2.Questions !== totalquestions)
          ? setTotalQuestions(post2.Questions)
          : null
      )}
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
                      question > 1 ? setQuestion(question - 1) : navigate(-1);
                      setSelected([false, false, false]);
                    }}
                  />
                  <div className="progressquiz">
                    <ProgressBar now={(100 / totalquestions) * question} />
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
                      className={isSelected[0] ? "ImageSelected" : "quiz-img"}
                      alt="..."
                      value={post.Answer}
                      onClick={() => onButtonSelected(0, post.answer)}
                    />
                    <img
                      src={post.Option3}
                      className={isSelected[1] ? "ImageSelected" : "quiz-img"}
                      alt="..."
                      value={post.Answer}
                      onClick={() => onButtonSelected(1, post.answer)}
                    />
                    <img
                      src={post.Option2}
                      className={isSelected[2] ? "ImageSelected" : "quiz-img"}
                      alt="..."
                      value={post.Answer}
                      onClick={() => onButtonSelected(2, post.answer)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-20 mt-6">
                  <button
                    className="quizbtn"
                    onClick={() => {
                      QuestionIncrease();
                      setSelected([false, false, false]);
                    }}
                  >
                    Skip
                  </button>
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
                  {/* {setAnswer(post.Answer)} */}
                  <img
                    src={Back}
                    alt=""
                    className="img-fluid"
                    onClick={() => {
                      question > 1 ? setQuestion(question - 1) : navigate(-1);
                      setSelected([false, false, false]);
                      setCheck(true);
                    }}
                  />
                  <div className="progressquiz">
                    <ProgressBar now={(100 / totalquestions) * question} />
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
                      className={
                        isSelected[0] ? "QuestionSelected" : "Questiontxt"
                      }
                      value={post.Answer}
                      onClick={() => onButtonSelected(0, post.answer)}
                    >
                      {post.Answer}
                    </button>
                    <button
                      // className="Questiontxt"
                      className={
                        isSelected[1] ? "QuestionSelected" : "Questiontxt"
                      }
                      onClick={() => onButtonSelected(1, post.answer)}
                    >
                      {post.Option3}
                    </button>
                    <button
                      className={
                        isSelected[2] ? "QuestionSelected" : "Questiontxt"
                      }
                      onClick={() => onButtonSelected(2, post.answer)}
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
                      setSelected([false, false, false]);
                      setCheck(true);
                    }}
                  >
                    Skip
                  </button>
                  <button
                    className="quizbtn"
                    disabled={CheckAns}
                    onClick={() => {
                      togglePopup();

                      //   if (answer === questionSelectedValue) {
                      //     navigate("/profile");
                      //   } else {
                      //     navigate("/admin-profile");
                      //   }
                    }}
                  >
                    Check
                  </button>
                </div>
              </div>
            </div>
            {isOpen && (
              <Popup
                content={
                  <>
                    <b>Notifications</b>
                    <p>Notifications that need your attention:</p>
                    <button>Test button</button>
                  </>
                }
                handleClose={togglePopup}
              />
            )}
          </div>
        ) : null
      )}
      ;<script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default QuizSection;
