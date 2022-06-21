import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";
import firebase from "firebase";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();
  function routeUser() {
    posts.length > 0
      ? posts.map((post) =>
          (post.email === email) & (post.student === true)
            ? navigate("/profile")
            : (post.email === email) & (post.student === false)
            ? navigate("/teacher-profile")
            : console.log("nobody of importance")
        )
      : console.log("error101");
  }

  //eatttting
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email);
      console.log(email);
    } else {
      // No user is signed in.
      console.log("There is no logged in user");
    }
  });
  useEffect(() => {
    const getPostsFromFirebase = [];
    const users = db.collection("users").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(),
          key: doc.id,
        });
      });
      setPosts(getPostsFromFirebase);
      setLoading(false);
    });
    return () => users();
  }, [loading]); // empty dependencies array => useEffect only called once

  if (loading) {
    return <h1>Checking information...</h1>;
  }
  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth
      .signInWithEmailAndPassword(email, password)
      .then(() => routeUser())
      .catch((error) => {
        setError(error.message);
        console.error("Error signing in with password and email", error);
      });
    // ill add what here?
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };
  return (
    <div className="mt-8rm -rf .git ">
      <h1 className="text-5xl text-blue-500 mb-2 text-center font-bold">
        {" "}
        Specno{" "}
      </h1>
      <h2 className="text-3xl mb-2 text-center font-bold">Sign In</h2>
      <div className="border border-blue-400 mx-auto w-11/12 md:w-2/4 rounded py-8 px-4 md:px-8">
        {error !== null && (
          <div className="py-4 bg-red-600 w-full text-white text-center mb-3">
            {error}
          </div>
        )}
        <form className="">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
          <input
            type="email"
            className="my-1 p-1 w-full"
            name="userEmail"
            value={email}
            placeholder="E.g: name123@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword" className="block">
            Password:
          </label>
          <input
            type="password"
            className="mt-1 mb-3 p-1 w-full"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            className="bg-green-400 hover:bg-green-500 w-full py-2 text-white"
            onClick={(event) => {
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p className="text-center my-3">
          Don't have an account?
          <button
            onClick={() => navigate("/sign-up")}
            className="text-blue-500 hover:text-blue-600"
          >
            Sign up here
          </button>
          <br />
          <button
            onClick={() => navigate("/password-reset")}
            className="text-blue-500 hover:text-blue-600"
          >
            Forgot Password?
          </button>
        </p>
        <img
          src="https://uploads-ssl.webflow.com/5f479f688ac92ece1c89402b/5f74a4cc0b72d66c9c82bc99_Group%2029017.svg"
          loading="lazy"
          alt=""
          class="image-155 rocket-footer"
        ></img>
      </div>
    </div>
  );
};

export default SignIn;
