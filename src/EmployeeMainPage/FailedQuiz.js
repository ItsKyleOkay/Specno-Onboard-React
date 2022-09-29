import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar.js";
import { auth, db } from "../firebase";
import { useLocation } from "react-router-dom";
import contentPic from "../Styles/img/rocket.png";

const FinishedQuiz = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [users, setUsers] = useState([]);
  const [donequizzes, setDone] = useState();
  const [failedquizzes, setFailed] = useState();
  const [passedquizzes, setPassed] = useState();

  var final = 0;
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
    } else {
      // No user is signed in.
    }
  });

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
    const quizzes = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setUsers(getPostsFromFirebase);
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
            setDone({ Done: doc.data().Done });
          }
        });
      return () => quizzesdone();
    });
  });

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      const quizzesdone = db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            setFailed(doc.data().failed);
          }
        });
      return () => quizzesdone();
    });
  });

  var finalfail = "";
  var finalpass = "";
  var newFail;

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      const quizzesdone = db
        .collection("users")
        .doc(user.uid)
        .get()
        .then((doc) => {
          if (doc && doc.exists) {
            setPassed(doc.data().Done);
          }
        });
      return () => quizzesdone();
    });
  });

  function AddChanges(totalxp) {
    if (failedquizzes.includes(location.state.name)) {
      finalfail = failedquizzes;
    } else {
      finalfail = failedquizzes + " " + location.state.name;
    }

    navigate("/specno-quiz");
    if (totalxp >= 10) {
      final = totalxp - 10;
    } else {
      final = 0;
    }
    if (passedquizzes.includes(location.state.name)) {
      if ((totalxp) => 10) {
        firebase.auth().onAuthStateChanged(function (user) {
          db.collection("users").doc(user.uid).update({
            FinalScore: final,
          });
        });
      } else {
        firebase.auth().onAuthStateChanged(function (user) {
          db.collection("users").doc(user.uid).update({
            FinalScore: 0,
          });
        });
      }
      if (failedquizzes.includes(passedquizzes)) {
        newFail = failedquizzes.replaceAll(passedquizzes, "");
      }
    } else {
      if ((totalxp) => 6) {
        firebase.auth().onAuthStateChanged(function (user) {
          db.collection("users").doc(user.uid).update({
            FinalScore: final,
            failed: finalfail,
          });
        });
      } else {
        firebase.auth().onAuthStateChanged(function (user) {
          db.collection("users").doc(user.uid).update({
            FinalScore: 0,
            failed: finalfail,
          });
        });
      }
      if (failedquizzes.includes(passedquizzes)) {
        newFail = failedquizzes.replaceAll(passedquizzes, "");
      }
    }
  }

  //bug control
  return (
    <div>
      {users.map((post1, index) => {
        return (post1.email === email) & (post1.employee === true) ? (
          <div key={index}>
            <section id="courses" className="courses2">
              <div className="container" data-aos="fade-up">
                <div className="col-lg-12 d-flex justify-content-center">
                  <div className=" col-lg-4 col-md-6 mt-4 mt-md-0 rounded">
                    <img
                      src={contentPic}
                      className="img-fluid rounded"
                      style={{ cursor: "pointer" }}
                      alt="..."
                    />
                    <div className="Finished1">
                      {" "}
                      Score on quiz: {location.state.percent}%{" "}
                    </div>
                    <div className="Finished1">
                      {" "}
                      Your original score: {post1.FinalScore}{" "}
                    </div>
                    <div className="Lessonxp">Lesson incomplete -10XP</div>
                    <div className="Lessonxp">
                      Combo bonus! {location.state.combo} XP
                    </div>
                    {/* {Object.values(donequizzes).forEach((result) => {
                      if (location.state.name === result.Done) {
                        <div className="Finished1">
                          You have already passed this quiz before so your score
                          will stay {post1.FinalScore} XP
                        </div>;
                      }
                    })} */}
                    {post1.FinalScore >= 6 ? (
                      <div className="Finished1">
                        Your new score is {post1.FinalScore - 10} XP, please do
                        the quiz again
                      </div>
                    ) : (
                      <div className="Finished1">
                        Your new score is {0} XP, please do the quiz again
                      </div>
                    )}
                    <div className="Lessonxp2">
                      <button
                        className="quizbtnfinish"
                        onClick={() => {
                          AddChanges(post1.FinalScore);
                        }}
                      >
                        Finish
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        ) : null;
      })}
    </div>
  );
};

export default FinishedQuiz;
