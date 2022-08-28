import React, { useState, useEffect } from "react";
import firebase from "firebase";
import Navbar from "../Navigation/Navbar.js";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";

const FinishedQuiz = () => {
  const location = useLocation();
  const [posts, setPosts] = useState([]);
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
      <div className="finishedquiz">
        You finished the quiz... wow.... hip hip hooray...
      </div>
    </div>
  );
};

export default FinishedQuiz;
