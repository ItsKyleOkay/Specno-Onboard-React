import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useLocation } from "react-router-dom";
import Incorrect from "../Styles/img/incorrect-pic.png";

function PopupWrong(props) {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const QuestionNum = props.name;

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
  }, []);
  return (
    <div className="popup-box">
      <div className="boxWrong">
        <div className="display">
          <div className="cont">
            {posts.map((post) =>
              QuestionNum === post.Number ? (
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
                      flex: "8",
                    }}
                  >
                    <div className="txt">Correct solution: </div>
                    <div class="txt sub">{post.Answer}</div>

                    <button className="Continuebtn" onClick={props.handleClose}>
                      Continue
                    </button>
                  </div>
                </div>
              ) : (
                <div></div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupWrong;
