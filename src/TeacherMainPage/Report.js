import React, { useState, useEffect } from "react";
import classes from "./Students.module.css";
import firebase from "firebase";
import { db } from "../firebase";

const Students = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  let centres = [
    "27 Rharhabe Road, Bisho Central, Bisho",
    "2533 Thulani, Dobsonville, Soweto",
    "25 Rharhabe Road, Bisho Central, Bisho",
    "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town",
    "All",
  ];
  const [displayAnswer, setAnswer] = useState();

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
        <div className={classes.logo}>Inspire Academy</div>
        <nav>
          <ul>
            <li>
              <a href="/teacher-profile">Home</a>
            </li>
            <li>
              <a href="/students-list">Students</a>
            </li>
            <li>
              <a href="/search-students">Centres</a>
            </li>
            <li>
              <a href="/search-courses">Courses</a>
            </li>
            <li>
              <a href="/reports">Reports</a>
            </li>
            <li>
              <a href="/search">Search</a>
            </li>
          </ul>
        </nav>
      </span>
      <div>
        <div className={classes.welcome}>
          <h1> All reports of student marks:</h1>
          {posts.length > 0 ? (
            posts.map((post) => (
              <div key={post.key}>
                {(post.email === email) &
                (post.student === true) &
                (post.centre != "") ? (
                  <span className={classes.Course}>
                    <h1>
                      You are registered at the {post.centre} centre so please
                      de-register if you wish to change centres else choose
                      {post.centre} and select the course you wish to do
                    </h1>
                  </span>
                ) : (
                  <h1></h1>
                )}
              </div>
            ))
          ) : (
            <h1>Please choose a centre you wish to search for students from</h1>
          )}
          <div className={classes.radio}>
            <h1>
              Please choose a centre you wish to search for students from:
            </h1>
          </div>
          <div className={classes.radio}>
            {centres.map((result) => (
              <>
                <button
                  className="bg-blue-300 hover:bg-blue-600 w-full  py-2 text-white"
                  onClick={(e) => setAnswer(result)}
                >
                  {result}
                </button>
              </>
            ))}
          </div>
        </div>
        {posts.map((post) => (
          <div key={post.key}>
            <span>
              {(post.student === true) &
              (post.centre === "27 Rharhabe Road, Bisho Central, Bisho") &
              (displayAnswer === "27 Rharhabe Road, Bisho Central, Bisho") ? (
                "Email:" +
                "  " +
                post.email +
                ",  Name:     " +
                post.displayName +
                ", Centre:     " +
                post.centre +
                ", Maths Mark:     " +
                post.MathsMark +
                ", Science Mark:     " +
                post.ScienceMark +
                ", Accouting Mark:     " +
                post.AccountingMark +
                ", ICT Mark:     " +
                post.ICTMark
              ) : (post.centre ===
                  "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town") &
                (displayAnswer ===
                  "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town") &
                (post.student === true) ? (
                "Email:" +
                "  " +
                post.email +
                ",  Name:     " +
                post.displayName +
                ", Centre:     " +
                post.centre +
                ", Maths Mark:     " +
                post.MathsMark +
                ", Science Mark:     " +
                post.ScienceMark +
                ", Accouting Mark:     " +
                post.AccountingMark +
                ", ICT Mark:     " +
                post.ICTMark
              ) : (post.centre === "25 Rharhabe Road, Bisho Central, Bisho") &
                (displayAnswer === "25 Rharhabe Road, Bisho Central, Bisho") &
                (post.student === true) ? (
                "Email:" +
                "  " +
                post.email +
                ",  Name:     " +
                post.displayName +
                ", Centre:     " +
                post.centre +
                ", Maths Mark:     " +
                post.MathsMark +
                ", Science Mark:     " +
                post.ScienceMark +
                ", Accouting Mark:     " +
                post.AccountingMark +
                ", ICT Mark:     "
              ) : (post.centre === "2533 Thulani, Dobsonville, Soweto") &
                (displayAnswer === "2533 Thulani, Dobsonville, Soweto") &
                (post.student === true) ? (
                "Email:" +
                "  " +
                post.email +
                ",  Name:     " +
                post.displayName +
                ", Centre:     " +
                post.centre +
                ", Maths Mark:     " +
                post.MathsMark +
                ", Science Mark:     " +
                post.ScienceMark +
                ", Accouting Mark:     " +
                post.AccountingMark +
                ", ICT Mark:     " +
                post.ICTMark
              ) : (displayAnswer === "All") & (post.student === true) ? (
                "Email:" +
                "  " +
                post.email +
                ",  Name:     " +
                post.displayName +
                ", Centre:     " +
                post.centre +
                ", Maths Mark:     " +
                post.MathsMark +
                ", Science Mark:     " +
                post.ScienceMark +
                ", Accouting Mark:     " +
                post.AccountingMark +
                ", ICT Mark:     "
              ) : (
                <h1></h1>
              )}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Students;
