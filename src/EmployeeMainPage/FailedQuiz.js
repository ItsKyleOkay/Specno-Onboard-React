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
  const [Totalxp, setTotalXp] = useState(0);
  const [donequizzes, setDone] = useState();
  const [failedquizzes, setFailed] = useState();

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
            setFailed({ failed: doc.data().failed });
          }
        });
      return () => quizzesdone();
    });
  });

  function AddChanges(totalxp) {
    navigate("/specno-quiz");
    var final = totalxp - 10;
    if ((totalxp) => 6) {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
          FinalScore: final,
          failed: location.state.name,
        });
      });
    } else {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
          FinalScore: 0,
          failed: location.state.name,
        });
      });
    }
  }

  //bug control
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="hero-section inner-page"></div>
      {users.map((post1, index) => {
        return (post1.email === email) & (post1.employee === true) ? (
          <div key={index}>
            <section id="courses" className="courses">
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

                    <div className="Finished1">
                      Your new score is {post1.FinalScore - 10} XP, please do
                      the quiz again
                    </div>
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
