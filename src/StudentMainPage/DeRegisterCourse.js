import React, { useState, useEffect } from "react";
import classes from "../StudentMainPage/RegisterCourse.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const DeRegisterCourse = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  let courses = ["Mathematics", "Science", "Accounting"];
  const [displayAnswer, setAnswer] = useState();
  const navigate = useNavigate();

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
      console.log(user.uid);
    } else {
      // No user is signed in.
      console.log("There is no logged in user");
    }
  });
  useEffect(() => {
    const getPostsFromFirebase = [];
    const userinfo = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
    return () => userinfo();
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>loading firebase data...</h1>;
  }
  return (
    <div>
      <span className={classes.header}>
        <div className={classes.logo}>Inspire Academy</div>
        <nav>
          <ul>
            <li>
              <a href="/de-register">Back</a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        <div className={classes.welcome}>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.key}>
                {(post.email === email) &
                (post.student === true) &
                (post.Course !== "") &
                (post.Course2 === "") &
                (post.Course3 === "") &
                (post.Course4 === "") ? (
                  <span className={classes.Course}>
                    <h1>
                      Please choose one subject you wish to register for. If you
                      wish to choose more then re-register{" "}
                    </h1>
                    <div className={classes.radio}>
                      <button className="bg-green-400 hover:bg-green-500 w-full py-2 text-white">
                        De-register for {post.Course}
                      </button>
                    </div>
                  </span>
                ) : (
                  <h1></h1>
                )}
              </div>
            ))
          ) : (
            <h1></h1>
          )}
          ;
        </div>
      </div>
    </div>
  );
};

export default DeRegisterCourse;
