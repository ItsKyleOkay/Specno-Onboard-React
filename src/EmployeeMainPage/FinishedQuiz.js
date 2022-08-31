import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navigation/Navbar.js";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
import contentPic from "../Styles/img/rocket.png";

const FinishedQuiz = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
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

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="hero-section inner-page"></div>
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
              <div className="Finished1">You have earned 52 XP today</div>
              <div className="Lessonxp">Lesson Complete! +10 XP</div>
              <div className="Lessonxp">Combo bonus! +4 XP</div>
              <div className="Lessonxp2">
                <button
                  className="quizbtnfinish"
                  onClick={() => {
                    navigate("/specno-quiz");
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
  );
};

export default FinishedQuiz;
