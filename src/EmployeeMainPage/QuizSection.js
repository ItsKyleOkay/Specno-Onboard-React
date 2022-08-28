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
import Incorrect from "../Styles/img/thumbs-down.png";

const QuizSection = () => {
  const [answer, setAnswer] = useState();
  const [choice, setChoice] = useState();
  const [CheckAns, setCheck] = useState(true);
  const [skip, setSkip] = useState(false);
  const [answerWrong, setAnswerWrong] = useState(false);
  const [answerRight, setAnswerRight] = useState(false);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);
  const [quizinfo, setQuizInfo] = useState([]);
  const [isSelected, setSelected] = useState([false, false, false]);
  const [totalquestions, setTotalQuestions] = useState(0);
  const [question, setQuestion] = useState(1);
  const location = useLocation();
  const navigate = useNavigate();
  const QuestionIncrease = () => {
    if (question > 0 && question < totalquestions) {
      setQuestion(question + 1);
      setSelected([false, false, false]);
    }
  };
  const [isOpen, setIsOpen] = useState(false);
  const togglePopup = () => {
    setIsOpen(!isOpen);
  };
  if (question === 0) {
    setQuestion(1);
  }

  // if (question === totalquestions + 1) {
  //   setQuestion(totalquestions);
  // }
  //code above creates a loop, I will change it at a later stage to make it display the end results
  // if (
  //   isSelected[0] === false &&
  //   isSelected[1] === false &&
  //   isSelected[2] === false
  // ) {
  //   console.log("There is nothing selected");
  //   setCheckAct(false);
  // } else {
  //   console.log("Selected");
  //   setCheckAct(true);
  // }
  //On this page the code uses states which store the answer and choices. Once a question is selected will
  //the answer and choice be added to the state
  //When the user presses check it will check the answer

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
      });
    return () => subscriber();
  }, []); //Used to make sure it doesnt repeat the useeffect everytime cause multiple reads

  useEffect(() => {
    const getPostsFromFirebase = [];
    const quizzes = db
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
    return () => quizzes();
  }, []);

  const onButtonSelected = (position, value, option) => {
    setAnswer(value);
    setChoice(option);
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
                    <ProgressBar
                      now={(100 / totalquestions) * question}
                      variant="progress-quiz"
                    />
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
                      src={post.Option1}
                      className={isSelected[0] ? "ImageSelected" : "quiz-img"}
                      alt="..."
                      value={post.Answer}
                      onClick={() =>
                        onButtonSelected(0, post.Answer, post.Option1)
                      }
                    />
                    <img
                      src={post.Option3}
                      className={isSelected[1] ? "ImageSelected" : "quiz-img"}
                      alt="..."
                      value={post.Answer}
                      onClick={() =>
                        onButtonSelected(1, post.Answer, post.Option3)
                      }
                    />
                    <img
                      src={post.Option2}
                      className={isSelected[2] ? "ImageSelected" : "quiz-img"}
                      alt="..."
                      value={post.Answer}
                      onClick={() =>
                        onButtonSelected(2, post.Answer, post.Option2)
                      }
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
              <div className="w-50">
                <div className="processback">
                  <img
                    src={Back}
                    alt=""
                    className="img-fluid"
                    onClick={() => {
                      question > 1 ? setQuestion(question - 1) : navigate(-1);
                      setSelected([false, false, false]);
                      setCheck(true);
                      setSkip(false);
                      setAnswerWrong(false);
                      setAnswerRight(false);
                      setShow(false);
                    }}
                  />
                  <div className="progressquiz">
                    <ProgressBar
                      now={(100 / totalquestions) * question}
                      variant="progress-quiz"
                    />
                  </div>
                </div>
                <div className="quizcontent">
                  <div className="questionnumber">
                    Question {question}/{totalquestions}
                  </div>
                  <div className="quizname">
                    <div
                      style={{
                        flex: "9",
                      }}
                    >
                      {post.Question}
                    </div>
                    <div
                      style={{
                        flex: "1",
                      }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-0 row-3 gap-6 mt-3 font-size 1.2rem">
                    <button
                      className={
                        isSelected[0] ? "QuestionSelected" : "Questiontxt"
                      }
                      onClick={() =>
                        onButtonSelected(0, post.Answer, post.Option1)
                      }
                    >
                      1. {post.Option1}
                    </button>
                    <button
                      // className="Questiontxt"
                      className={
                        isSelected[1] ? "QuestionSelected" : "Questiontxt"
                      }
                      onClick={() =>
                        onButtonSelected(1, post.Answer, post.Option3)
                      }
                    >
                      2. {post.Option3}
                    </button>
                    <button
                      className={
                        isSelected[2] ? "QuestionSelected" : "Questiontxt"
                      }
                      onClick={() =>
                        onButtonSelected(2, post.Answer, post.Option2)
                      }
                    >
                      3. {post.Option2}
                    </button>
                  </div>
                </div>
                {show ? <br></br> : null}
                {!show ? (
                  <div className="containerbuttons">
                    <div className="grid grid-cols-2 ">
                      <button
                        className="quizbtnskip"
                        disabled={skip}
                        onClick={() => {
                          QuestionIncrease();
                          setSelected([false, false, false]);
                          setCheck(true);
                          setSkip(false);
                          setAnswerWrong(false);
                          setAnswerRight(false);
                        }}
                      >
                        Skip
                      </button>

                      <button
                        style={{
                          color: CheckAns ? "#489DDA" : "#489DDA",
                          textDecorationLine: CheckAns ? "none" : "underline",
                        }}
                        className="quizbtn"
                        data-testid="header"
                        disabled={CheckAns}
                        onClick={() => {
                          if (answer === choice) {
                            QuestionIncrease();
                            setAnswerWrong(false);
                            setSelected([false, false, false]);
                            setCheck(true);
                            setSkip(false);
                            if (question === totalquestions) {
                              navigate("/specno-quiz/data/complete", {
                                state: { id: 1, name: post.Name },
                              });
                            }
                          } else if (answer !== choice) {
                            setShow((s) => !s);
                            setAnswerWrong(true);
                            setAnswerRight(false);
                            setSelected([false, false, false]);
                            setCheck(true);
                            setSkip(true);
                          }
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                ) : null}
                {answerWrong && (
                  <form action="">
                    <div className="new-wrong">
                      <div
                        style={{
                          flex: "2",
                        }}
                        className="logo"
                      >
                        <img src={Incorrect} alt="" className="img-fluid" />
                      </div>
                      <div
                        style={{
                          flex: "6",
                        }}
                      >
                        <div className="txt-wrong">Oops,Not quite </div>
                        <div class="txt sub-wrong">
                          {" "}
                          Correct Answer is: {<br></br>} {post.Answer}
                        </div>
                      </div>
                      <div
                        style={{
                          flex: "2",
                        }}
                      >
                        <button
                          className="Continuebtn"
                          onClick={() => {
                            setSkip(false);
                            setAnswerWrong(false);
                            setAnswerRight(false);
                            setQuestion(question + 1);
                            setShow(!show);
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                )}
                {/* {answerRight && (
                  <form action="">
                    <div className="new-right">
                      <div
                        style={{
                          flex: "2",
                        }}
                        className="logo"
                      >
                        <img src={correct} alt="" className="img-fluid" />
                      </div>
                      <div
                        style={{
                          flex: "8",
                        }}
                      >
                        <div className="txt-right">Well done! </div>
                        <div class="txt sub-right">{post.Answer}</div>
                        <button
                          className="Continuebtnright"
                          onClick={() => {
                            setQuestion(question + 1);
                            if (question === totalquestions) {
                              navigate("/specno-quiz/data/complete", {
                                state: { id: 1, name: post.Name },
                              });
                            }
                            setAnswerWrong(false);
                            setAnswerRight(false);
                            setSkip(false);
                          }}
                        >
                          Continue
                        </button>
                      </div>
                    </div>
                  </form>
                )} */}
              </div>
            </div>
          </div>
        ) : null
      )}
      ;<script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default QuizSection;
