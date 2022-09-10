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

  function AddChanges(finalxp, totalxp) {
    navigate("/specno-quiz");
    var final = finalxp + totalxp;
    if (finalxp !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("users").doc(user.uid).update({
          FinalScore: final,
          RecentScore: finalxp,
        });
      });
    }
  }

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

                    <div className="Lessonxp">
                      Lesson Complete! {location.state.score} XP
                    </div>
                    <div className="Lessonxp">
                      Combo bonus! {location.state.combo} XP
                    </div>
                    <div className="Finished1">
                      Your new score is{" "}
                      {location.state.score +
                        location.state.combo +
                        post1.FinalScore}{" "}
                      XP today
                    </div>
                    <div className="Lessonxp2">
                      <button
                        className="quizbtnfinish"
                        onClick={() => {
                          AddChanges(
                            location.state.score + location.state.combo,
                            post1.FinalScore
                          );
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
