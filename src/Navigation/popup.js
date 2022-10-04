import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import styled, { keyframes } from "styled-components";
import { fadeInDown } from "react-animations";

const CardAnimation = styled.div`
  animation: 1.5s ${keyframes`${fadeInDown}`} 1;
`;

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
    <div className="background-grey2">
      <CardAnimation className="popup-box">
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
      </CardAnimation>
    </div>
  );
};

export default Popup;
