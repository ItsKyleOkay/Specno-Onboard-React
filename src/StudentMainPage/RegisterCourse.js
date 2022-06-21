import React, { useState, useEffect } from "react";
import classes from "../StudentMainPage/RegisterCourse.module.css";
import firebase from "firebase";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import MyPDF from "../Components/InspireAcademyParentAgreement.pdf";
import storage from "../firebase";

const Register = () => {
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState();
  const [posts, setPosts] = useState([]);
  const [pdf, setpdf] = useState();
  let centres = [
    "27 Rharhabe Road, Bisho Central, Bisho",
    "2533 Thulani, Dobsonville, Soweto",
    "25 Rharhabe Road, Bisho Central, Bisho",
    "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town",
  ];
  const [displayAnswer, setAnswer] = useState();
  const navigate = useNavigate();
  const [image, setImage] = useState("");
  console.log(pdf);
  const upload = () => {
    if (image == null) return;
    storage
      .ref(`/parentalconfirmation/${image.name}`)
      .put(image)
      .on("state_changed", alert("success"), alert);
    setpdf(true);
    navigate("/register");
  };
  if (pdf === true) {
    firebase.auth().onAuthStateChanged(function (user) {
      db.collection("users").doc(user.uid).update({
        parentpdf: true,
      });
    });
  }
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
    } else {
      // No user is signed in.
      console.log("There is no logged in user");
    }
  });
  if (
    displayAnswer === "Rudolf Ginsberg, Kaffrarein Heights, King Williams Town"
  ) {
    navigate("/register-course-kwt");
  } else if (displayAnswer === "27 Rharhabe Road, Bisho Central, Bisho") {
    navigate("/register-course-bisho27");
  } else if (displayAnswer === "2533 Thulani, Dobsonville, Soweto") {
    navigate("/register-course-soweto");
  } else if (displayAnswer === "25 Rharhabe Road, Bisho Central, Bisho") {
    navigate("/register-course-bisho25");
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
              <a href="/profile">Home</a>
            </li>
            <li>
              <a href="/register">Register</a>
            </li>
            <li>
              <a href="/de-register">De-register</a>
            </li>
            <li>
              <a href="/marks">Marks</a>
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
                  (post.centre !== "") ? (
                    <span className={classes.Course}>
                      <h1>
                        You are registered at the {post.centre} centre so please
                        de-register if you wish to change centres.
                        <div className={classes.radio}>
                          <>
                            <label className={classes.radiobtn}>
                              {post.centre}
                            </label>
                            <input
                              type="radio"
                              value={post.centre}
                              name="RadioValues"
                              onChange={(e) => setAnswer(e.target.value)}
                            />
                          </>
                        </div>
                      </h1>
                    </span>
                  ) : (
                    <>
                      {(post.email === email) &
                      (post.student === true) &
                      (post.parentpdf === true) &
                      (post.centre === "") ? (
                        <>
                          <h1>
                            Please choose which centre you wish to register:
                          </h1>
                          <div className={classes.radio}>
                            {centres.map((result) => (
                              <>
                                <label className={classes.radiobtn}>
                                  {result}
                                </label>
                                <input
                                  type="radio"
                                  value={result}
                                  name="RadioValues"
                                  onChange={(e) => setAnswer(e.target.value)}
                                />
                              </>
                            ))}
                          </div>
                        </>
                      ) : (post.email === email) &
                        (post.student === true) &
                        (post.parentpdf === false) &
                        (post.centre === "") ? (
                        <>
                          <div className={classes.pdfblock}>
                            <h1>
                              Please download the parent confirmation pdf
                              provided to prove parental agreement.
                            </h1>
                            <a
                              className={classes.pdf}
                              href={MyPDF}
                              download="ParentAgreement.pdf"
                            >
                              {" "}
                              Download Here{" "}
                            </a>
                          </div>
                          <div className={classes.App}>
                            <h1>
                              Please save the file in the format of
                              NameSurname.pdf
                              {""}
                            </h1>
                            <center>
                              <input
                                type="file"
                                onChange={(e) => {
                                  setImage(e.target.files[0]);
                                }}
                              />
                              <button
                                onClick={upload}
                                className="bg-blue-300 hover:bg-blue-600 py-2 text-white rounded py-2 px-4 "
                              >
                                Upload
                              </button>
                            </center>
                          </div>
                        </>
                      ) : (
                        <h1></h1>
                      )}
                    </>
                  )}
                </div>
              ))
            : console.log("ERROR301")}
        </div>
      </div>
    </div>
  );
};

export default Register;
