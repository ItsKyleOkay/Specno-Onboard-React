import React, { useState, useEffect } from "react";
import classes from "../StudentMainPage/RegisterCourse.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const RegisterCourse = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  let courses = ["Mathematics", "Science", "Accounting", "ICT"];
  let juniorcourses = ["Mathematics", "ICT"];
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

  function RegisterNew() {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        centre: "25 Rharhabe Road, Bisho Central, Bisho",
        Course: displayAnswer,
      });
    });
    navigate("/register");
  }

  function RegisterSecond() {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        Course2: displayAnswer,
      });
    });
    navigate("/register");
  }
  function RegisterThird() {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        Course3: displayAnswer,
      });
    });
    navigate("/register");
  }
  function RegisterFourth() {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        Course4: displayAnswer,
      });
    });
    navigate("/register");
  }
  function RegisterJunior() {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        centre: "25 Rharhabe Road, Bisho Central, Bisho",
        Course: displayAnswer,
      });
    });
    navigate("/register");
  }
  function RegisterJunior2() {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        Course2: displayAnswer,
      });
    });
    navigate("/register");
  }
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
              <a href="/register">Back</a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        <div className={classes.welcome}>
          {posts.length > 0
            ? posts.map((post) => (
                <div key={post.key}>
                  {(post.email === email) &
                  (post.student === true) &
                  (post.Course === "") &
                  (post.Grade >= 8) ? (
                    <span className={classes.Course}>
                      <h1>
                        The Inspire Academy in 25 Rharhabe Road, Bisho Central
                        offers Mathematics, Science and Accounting{" "}
                      </h1>
                      <h1>
                        Please choose one subject you wish to register for. If
                        you wish to choose more then re-register{" "}
                      </h1>
                      <div className={classes.radio}>
                        {courses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) => setAnswer(e.target.value)}
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterNew}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </span>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 === "") &
                    (post.Grade >= 8) ? (
                    <>
                      <h1>You are currently registered for {post.Course}</h1>
                      <div className={classes.radio}>
                        {courses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) =>
                                post.Course === e.target.value
                                  ? setAnswer("")
                                  : setAnswer(e.target.value)
                              }
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterSecond}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 === "") &
                    (post.Grade >= 8) ? (
                    <>
                      <h1>
                        You are currently registered for {post.Course} and{" "}
                        {post.Course2}
                      </h1>
                      <div className={classes.radio}>
                        {courses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) =>
                                (post.Course === e.target.value) |
                                (post.Course2 === e.target.value)
                                  ? setAnswer("")
                                  : setAnswer(e.target.value)
                              }
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterThird}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 === "") &
                    (post.Grade >= 8) ? (
                    <>
                      <h1>
                        You are currently registered for {post.Course} and{" "}
                        {post.Course2}
                      </h1>
                      <div className={classes.radio}>
                        {courses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) =>
                                (post.Course === e.target.value) |
                                (post.Course2 === e.target.value)
                                  ? setAnswer("")
                                  : setAnswer(e.target.value)
                              }
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterThird}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 !== "") &
                    (post.Course4 === "") &
                    (post.Grade >= 8) ? (
                    <>
                      <h1>
                        You are currently registered for {post.Course},{" "}
                        {post.Course2} and {post.Course3}
                      </h1>
                      <div className={classes.radio}>
                        {courses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) =>
                                (post.Course === e.target.value) |
                                (post.Course2 === e.target.value) |
                                (post.Course3 === e.target.value)
                                  ? setAnswer("")
                                  : setAnswer(e.target.value)
                              }
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterFourth}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Course3 !== "") &
                    (post.Grade >= 8) ? (
                    <>
                      <h1>
                        You are currently registered for {post.Course},{" "}
                        {post.Course2}, {post.Course3} and {post.Course4} so you
                        cant register for any more subjects
                      </h1>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Grade < 8) &
                    (post.Course === "") ? (
                    <>
                      <h1>
                        Juniors can only register for ICT and Mathematics{" "}
                      </h1>
                      <div className={classes.radio}>
                        {juniorcourses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) =>
                                (post.Course === e.target.value) |
                                (post.Course2 === e.target.value)
                                  ? setAnswer("")
                                  : setAnswer(e.target.value)
                              }
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterJunior}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Grade < 8) &
                    (post.Course !== "") &
                    (post.Course2 === "") ? (
                    <>
                      <h1>Your are currently registered for {post.Course}</h1>
                      <div className={classes.radio}>
                        {juniorcourses.map((result) => (
                          <>
                            <label className={classes.radiobtn}>{result}</label>
                            <input
                              type="radio"
                              value={result}
                              name="RadioValues"
                              onChange={(e) =>
                                (post.Course === e.target.value) |
                                (post.Course2 === e.target.value)
                                  ? setAnswer("")
                                  : setAnswer(e.target.value)
                              }
                            />
                          </>
                        ))}
                        <button
                          className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
                          onClick={RegisterJunior2}
                        >
                          Register for {displayAnswer}
                        </button>
                      </div>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Grade < 8) ? (
                    <>
                      <h1>
                        You are currently registered for {post.Course} and{" "}
                        {post.Course2} so you cant register for any more
                        subjects
                      </h1>
                    </>
                  ) : (post.email === email) &
                    (post.student === true) &
                    (post.Course !== "") &
                    (post.Course2 !== "") &
                    (post.Grade < 8) ? (
                    <>
                      <h1>
                        You are currently registered for {post.Course} and{" "}
                        {post.Course2} so you cant register for any more
                        subjects
                      </h1>
                    </>
                  ) : (
                    <h1></h1>
                  )}
                </div>
              ))
            : console.log("ERROR301")}
        </div>
      </div>
    </div>
  );
};

export default RegisterCourse;
