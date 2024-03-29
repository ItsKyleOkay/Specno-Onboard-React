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
  const [badge, setBadge] = useState("1");
  const [choice, setChoice] = useState();
  const [CheckAns, setCheck] = useState(true);
  const [skip, setSkip] = useState(false);
  const [answerWrong, setAnswerWrong] = useState(false);
  const [answerRight, setAnswerRight] = useState(false);
  const [show, setShow] = useState(false);
  const [posts, setPosts] = useState([]);

  const [quizName, setName] = useState();

  const [quizinfo, setQuizInfo] = useState([]);
  const [isSelected, setSelected] = useState([false, false, false]);
  const [score, setScore] = useState(5);
  const [combo, setCombo] = useState(1);

  const { state } = useLocation();
  const currentCategory = state && state.name;

  var positionAns = 0;

  //const [isSkipped, setSkipped] = useState([]);
  var holder = "<";
  //it didnt like having < in jsx so we put it in a variable

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

  if (question === 0) {
    setQuestion(1);
  }

  if (badge !== "") {
    var combostring = combo.toString();
    if (badge.includes(combostring)) {
      var count = 1;
    } else {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users")
          .doc(user.uid)
          .update({
            FinalScore: 0,
            Badge: badge + "," + combo,
          });
      });
      //update here
    }
  }
  // const uniqueQuiz = isSkipped.filter((element) => {
  //   const isDuplicate = uniqueIds.includes(element);

  //   if (!isDuplicate) {
  //     uniqueIds.push(element);
  //     return true;
  //   }

  //   return false;
  // });

  //On this page the code uses states which store the answer and choices. Once a question is selected will
  //the answer and choice be added to the state
  //When the user presses check it will check the answer
  // I changed the code to make it that it will check if the question is either text or image and then depending on what it is it will display the options
  //Pictures are displayed in columns and text in rows
  // The code is quite confusing with way too many unnecessary UseStates

  useEffect(() => {
    const getPostsFromFirebase = [];

    const subscriber = db
      .collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")
      .doc(currentCategory)
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

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      const quizzesdone = db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            setBadge(doc.data().Badge);
          }
        });
      return () => quizzesdone();
    });
  });

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

  function increaseScore() {
    setScore(score + 5);
  }

  return (
    <div>
      <Navbar />
      {quizinfo.map((post2) =>
        (post2.Name === currentCategory) & (post2.Questions !== totalquestions)
          ? (setTotalQuestions(post2.Questions), setName(post2.Name))
          : null
      )}
      {posts.map((post) =>
        post.Number === question ? (
          <div className="quiz">
            <div className="quizdiv d-flex justify-content-center">
              <div className="w-50">
                <div className="processback">
                  <button
                    disabled={answerWrong}
                    className="back-arrow"
                    onClick={() => {
                      // question > 1 ? setQuestion(question - 1) : navigate(-1);
                      // setSelected([false, false, false]);
                      // setCheck(true);
                      // setSkip(false);
                      // setAnswerWrong(false);
                      // setAnswerRight(false);
                      // setShow(false);
                      // uniqueIds.splice(question - 1);
                      // remainingArr = uniqueIds;
                      navigate("/specno-quiz");
                    }}
                  >
                    {holder}
                  </button>

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
                  {post.Type === "Text" && post.Number === question ? (
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
                          onButtonSelected(1, post.Answer, post.Option2)
                        }
                      >
                        2. {post.Option2}
                      </button>
                      <button
                        className={
                          isSelected[2] ? "QuestionSelected" : "Questiontxt"
                        }
                        onClick={() =>
                          onButtonSelected(2, post.Answer, post.Option3)
                        }
                      >
                        3. {post.Option3}
                      </button>
                    </div>
                  ) : post.Type === "Image" && post.Number === question ? (
                    <div className="grid grid-cols-3 gap-6 mt-3 font-size 1.2rem">
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
                        src={post.Option2}
                        className={isSelected[1] ? "ImageSelected" : "quiz-img"}
                        alt="..."
                        value={post.Answer}
                        onClick={() =>
                          onButtonSelected(1, post.Answer, post.Option2)
                        }
                      />
                      <img
                        src={post.Option3}
                        className={isSelected[2] ? "ImageSelected" : "quiz-img"}
                        alt="..."
                        value={post.Answer}
                        onClick={() =>
                          onButtonSelected(2, post.Answer, post.Option3)
                        }
                      />
                    </div>
                  ) : null}
                </div>
                {show ? <br></br> : null}
                {!show ? (
                  <div className="containerbuttons">
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
                          increaseScore();
                          setCombo(combo + 1);
                          //increase point score
                          QuestionIncrease();
                          setAnswerWrong(false);
                          setSelected([false, false, false]);
                          setCheck(true);
                          setSkip(false);

                          if (question === totalquestions) {
                            increaseScore();
                            setCombo(combo + 1);
                            var valpercent = totalquestions * 5;
                            var scorepercent = (score * 100) / valpercent;
                            if (scorepercent > 49) {
                              navigate("/specno-quiz/data/complete", {
                                state: {
                                  id: 1,
                                  name: quizName,
                                  score: score,
                                  combo: combo,
                                  percent: scorepercent,
                                },
                              });
                            } else {
                              navigate("/specno-quiz/data/fail", {
                                state: {
                                  id: 1,
                                  name: quizName,
                                  score: score,
                                  combo: 0,
                                  percent: scorepercent,
                                },
                              });
                            }
                          }
                        } else if (answer !== choice) {
                          setShow((s) => !s);
                          setCombo(1);
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
                        <img
                          src={Incorrect}
                          alt=""
                          className="img-fluid incorrect-img"
                        />
                      </div>
                      <div
                        style={{
                          flex: "6",
                        }}
                      >
                        <div className="txt-wrong">Oops,Not quite </div>
                        {post.Type === "Text" && post.Number === question ? (
                          <div className="txt sub-wrong">
                            {" "}
                            Correct Answer is: {<br></br>} {post.Answer}
                          </div>
                        ) : (
                          <div className="txt sub-wrong">
                            {" "}
                            Correct Answer is image{" "}
                            {post.Answer === post.Option1
                              ? (positionAns = 1)
                              : post.Answer === post.Option2
                              ? (positionAns = 2)
                              : post.Answer === post.Option3
                              ? (positionAns = 3)
                              : null}
                          </div>
                        )}
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
                            QuestionIncrease();
                            setShow(!show);
                            if (question === totalquestions) {
                              var valpercent = totalquestions * 5;
                              var scorepercent = (score * 100) / valpercent;
                              if (scorepercent > 50) {
                                navigate("/specno-quiz/data/complete", {
                                  state: {
                                    id: 1,
                                    name: quizName,
                                    score: score,
                                    combo: combo,
                                    percent: scorepercent,
                                  },
                                });
                              } else {
                                navigate("/specno-quiz/data/fail", {
                                  state: {
                                    id: 1,
                                    name: quizName,
                                    score: score,
                                    combo: 0,
                                    percent: scorepercent,
                                  },
                                });
                              }
                            }
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
                )} 
                
                //This code was removed as the correct popup was taken out since its not needed.
                //It looks unprofessional
                */}
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
