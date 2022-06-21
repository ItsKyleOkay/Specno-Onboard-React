import classes from "../StudentMainPage/DeRegister.module.css";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";

const DeRegister = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const [displayAnswer, setAnswer] = useState();
  const navigate = useNavigate();

  function DeRegisterInfo(
    postsCentre,
    userCourse,
    postsCourse2,
    postsCourse3,
    postsCourse4
  ) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (displayAnswer === postsCentre) {
        db.collection("users").doc(user.uid).update({
          centre: "",
          Course: "",
          Course2: "",
          Course3: "",
          Course4: "",
        });
      } else if (displayAnswer === userCourse) {
        db.collection("users").doc(user.uid).update({
          Course: postsCourse2,
          Course2: postsCourse3,
          Course3: postsCourse4,
          Course4: "",
        });
      } else if (displayAnswer === postsCourse2) {
        db.collection("users").doc(user.uid).update({
          Course2: postsCourse3,
          Course3: postsCourse4,
          Course4: "",
        });
      } else if (displayAnswer === postsCourse3) {
        db.collection("users").doc(user.uid).update({
          Course3: postsCourse4,
          Course4: "",
        });
      } else if (displayAnswer === postsCourse4) {
        db.collection("users").doc(user.uid).update({
          Course4: "",
        });
      }
    });
    navigate("/profile");
  }
  console.log(posts.Centre);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
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
        <div className={classes.logo}>Specno</div>
        <nav>
          <ul>
            <li>
              <a href="/profile">Home</a>
            </li>
            <li>
              <a href="/register">About Us</a>
            </li>
            <li>
              <a href="/de-register">Blog</a>
            </li>
            <li>
              <a className={classes.onboard} href="/onboard">
                Onboard
              </a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.key}>
              {(post.email === email) &
              (post.student === true) &
              (post.centre !== "") ? (
                <span>
                  <h1>You are registered at {post.centre} centre</h1>
                  <h2>
                    The registed courses involve {post.Course} {post.Course2}{" "}
                    {post.Course3}
                  </h2>
                  <h1></h1>
                  <label className={classes.radiobtn}>
                    <input
                      type="radio"
                      value={post.centre}
                      name="RadioValues"
                      onChange={(e) => setAnswer(e.target.value)}
                    />
                    {post.centre}
                  </label>
                  {(post.Course !== "") &
                  (post.Course2 === "") &
                  (post.Course3 === "") &
                  (post.Course4 === "") ? (
                    <div className={classes.radio}>
                      <>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course}
                        </label>
                      </>
                    </div>
                  ) : (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 === "") &
                    (post.Course4 === "") ? (
                    <div className={classes.radio}>
                      <>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course}
                        </label>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course2}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course2}
                        </label>
                      </>
                    </div>
                  ) : (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 !== "") &
                    (post.Course4 === "") ? (
                    <div className={classes.radio}>
                      <>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course}
                        </label>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course2}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course2}
                        </label>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course3}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course3}
                        </label>
                      </>
                    </div>
                  ) : (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 !== "") &
                    (post.Course4 !== "") ? (
                    <div className={classes.radio}>
                      <>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course}
                        </label>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course2}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course2}
                        </label>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course3}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course3}
                        </label>
                        <label className={classes.radiobtn}>
                          <input
                            type="radio"
                            value={post.Course4}
                            name="RadioValues"
                            onChange={(e) => setAnswer(e.target.value)}
                          />
                          {post.Course4}
                        </label>
                      </>
                    </div>
                  ) : (
                    <h1></h1>
                  )}
                  <button
                    onClick={() =>
                      DeRegisterInfo(
                        post.centre,
                        post.Course,
                        post.Course2,
                        post.Course3,
                        post.Course4
                      )
                    }
                    className="bg-blue-300 hover:bg-blue-500 w-30 py-2 text-white"
                  >
                    Deregister
                  </button>
                </span>
              ) : (post.centre === "") & (post.email === email) ? (
                <h1>
                  You are not registered at any centre. Please click on
                  "Register" to register at a centre and then choose a course
                </h1>
              ) : (
                <h1></h1>
              )}
            </div>
          ))
        ) : (
          <h1>no answers yet :(</h1>
        )}
      </div>
    </div>
  );
};

export default DeRegister;
