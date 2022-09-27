import React, { useState, useEffect } from "react";
import { db } from "../firebase";

const Popup = (props) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPostsFromFirebase = [];
    const quizzes = db
      .collection("Notifications")
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
  }, []);
  return (
    <div className="popup-box">
      <div className="box blue-back">
        <span className="close-icon" onClick={props.handleClose}>
          x
        </span>
        <div className="display">
          <div className="cont">
            {posts.map((post) => (
              <div className="sec new">
                <div className="txt-white">{post.Notification}</div>
                <div classname="txt-white sub">{post.Time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popup;
