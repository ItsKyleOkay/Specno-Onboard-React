import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import contentData from "../Styles/img/contentData.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

import TextField from "@mui/material/TextField";

const ContentDataAdminEdit = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [Option1, setOption1] = useState("");
  const [Option2, setOption2] = useState("");
  const [Option3, setOption3] = useState("");
  const [Answer, setAnswer] = useState("");
  const [Time, setTime] = useState(1);
  const [Type, setType] = useState("");
  const [Number, setNumber] = useState(1);
  const [Number2, setNumber2] = useState(1);
  const [TotalQuestions, setTotalQuestions] = useState(1);
  const [TotalQuestions3, setTotalQuestions3] = useState(1);
  const [TotalQuestions2, setTotalQuestions2] = useState();
  const [Question, setQuestion] = useState("");
  const [quizinfo, setQuizInfo] = useState([]);

  const [QuestionFilter, setQuestionFilter] = useState("Question1");
  const [QuestionFilterNum, setQuestionFilterNum] = useState(1);

  console.log(TotalQuestions);
  console.log(QuestionFilterNum);
  const QuestionIncrease = () => {
    if (QuestionFilterNum < TotalQuestions) {
      setQuestionFilterNum(QuestionFilterNum + 1);
      return QuestionFilterNum;
    }
  };
  useEffect(() => {
    const getPostsFromFirebase = [];
    const quizzes = db
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
    return () => quizzes();
  }, []); // empty dependencies array => useEffect only called once

  if (TotalQuestions2 === 0) {
    db.collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")
      .doc(location.state.name)
      .collection("Questions")
      .doc("Question1")
      .set({
        Answer: "",
        Number: 1,
        Option1: "",
        Option2: "",
        Option3: "",
        Points: 1,
        Question: "",
        Time: 0,
        TotalQuestions: 1,
        Type: "Text",
      })
      .then(() => {
        console.error("Added new question ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("quiz")
        .doc("Dev Team")
        .collection("Quizzes")
        .doc(location.state.name)
        .collection("Questions")
        .update({
          Questions: 1,
        });
    });
  }
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

  function addQuestion(QuestionNum) {
    db.collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")
      .doc(location.state.name)
      .collection("Questions")
      .doc(QuestionNum)
      .set({
        Answer: "",
        Number: TotalQuestions3,
        Option1: "",
        Option2: "",
        Option3: "",
        Points: 1,
        Question: "",
        Time: 0,
        TotalQuestions: TotalQuestions3,
        Type: "Text",
      })
      .then(() => {
        console.error("Added new question ");
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
    db.collection("quiz")
      .doc("Dev Team")
      .collection("Quizzes")
      .doc(location.state.name)
      .update({
        Questions: TotalQuestions3,
      })
      .then(() => {
        console.error("Updated question total");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Error adding document: ", error);
      });
  }

  console.log(QuestionFilter);
  function AddChanges(
    Option1,
    Option2,
    Option3,
    Answer,
    Time,
    Type,
    Number,
    TotalQuestions,
    Question
  ) {
    navigate(-1);
    if (Option1 !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Option1: Option1,
          });
      });
    }
    if (Option2 !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Option2: Option2,
          });
      });
    }
    if (Option3 !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Option3: Option3,
          });
      });
    }
    if (Answer !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Answer: Answer,
          });
      });
    }
    if (Time !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Time: parseInt(Time),
          });
      });
    }
    if (Type !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Type: Type,
          });
      });
    }
    if (Number !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Number: parseInt(Number),
          });
      });
    }
    if (TotalQuestions !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            TotalQuestions: parseInt(TotalQuestions),
          });
      });
    }

    if (Question !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("quiz")
          .doc("Dev Team")
          .collection("Quizzes")
          .doc(location.state.name)
          .collection("Questions")
          .doc(QuestionFilter)
          .update({
            Question: Question,
          });
      });
    }
  }

  return (
    <div>
      <AdminNavbar />
      {quizinfo.map((post2) =>
        (post2.Name === location.state.name) &
        (post2.Questions !== TotalQuestions)
          ? (setTotalQuestions(post2.Questions),
            setName(post2.Name),
            setTotalQuestions2(post2.Questions),
            setTotalQuestions3(post2.Questions + 1))
          : null
      )}
      <div className="content-data-div">
        <div className="content-text-div">
          <div className="quizname2">
            <h1
              className="contentAddHeading"
              style={{
                flex: "8",
              }}
            >
              {" "}
              {location.state.name}
            </h1>

            <br></br>
            <button
              className="contentAddSave"
              style={{
                flex: "1",
              }}
              onClick={() => addQuestion("Question" + TotalQuestions3)}
            >
              Add Question
            </button>
            <button
              className="contentAddSave2"
              style={{
                flex: "1",
              }}
              onClick={() => setQuestionFilter("Question" + QuestionIncrease())}
            >
              Next Question
            </button>
          </div>
          <br />
          <hr />

          <div>
            {posts.map((post) => (
              <div key={post.key}>
                {post.Number === QuestionFilterNum ? (
                  <div className="backgroundInput">
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={1}
                      label="Question Number"
                      defaultValue={post.Number}
                      className="backgroundInput"
                      onChange={(e) => setNumber(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={2}
                      label="Question"
                      defaultValue={post.Question}
                      className="backgroundInput"
                      onChange={(e) => setQuestion(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={2}
                      label="Option 1"
                      defaultValue={post.Option1}
                      className="backgroundInput"
                      onChange={(e) => setOption1(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={2}
                      label="Option 2"
                      defaultValue={post.Option2}
                      className="backgroundInput"
                      onChange={(e) => setOption2(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={2}
                      label="Option 3"
                      defaultValue={post.Option3}
                      className="backgroundInput"
                      onChange={(e) => setOption3(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={6}
                      label="Answer"
                      defaultValue={post.Answer}
                      className="backgroundInput"
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={1}
                      label="Total Questions"
                      defaultValue={post.TotalQuestions}
                      className="backgroundInput"
                      onChange={(e) => setTotalQuestions(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={1}
                      label="Time limit"
                      defaultValue={post.Time}
                      className="backgroundInput"
                      onChange={(e) => setTime(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={1}
                      label="Type, Text or Image"
                      defaultValue={post.Type}
                      className="backgroundInput"
                      onChange={(e) => setType(e.target.value)}
                    />
                    <br></br>
                    <br></br>

                    <button
                      className="contentAddSave"
                      onClick={() => navigate(-1)}
                    >
                      Back
                    </button>
                    <button
                      className="contentAddSave2"
                      onClick={() =>
                        AddChanges(
                          Option1,
                          Option2,
                          Option3,
                          Answer,
                          Time,
                          Type,
                          Number,
                          TotalQuestions,
                          Question
                        )
                      }
                    >
                      Save changes
                    </button>
                  </div>
                ) : null}
                {/* //   <React.Fragment>
              //     {post.Name === location.state.name ? post.Background : null}
              //   </React.Fragment>
              //   <form>
              //     <label>
              //       Name:
              //       <input type="text" name="name" />
              //     </label>
              //     <input type="submit" value="Submit" />
              //   </form> */}
              </div>
            ))}
          </div>

          <br />
          <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
          <script src="../Styles/main.js"></script>
        </div>
      </div>
    </div>
  );
};

export default ContentDataAdminEdit;
