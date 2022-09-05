import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import contentData from "../Styles/img/contentData.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

import TextField from "@mui/material/TextField";

const ContentDataAdminEdit = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [background, setBackground] = useState("");
  const [info, setInfo] = useState("");
  const [youtube, setYoutube] = useState("");

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db.collection("Content").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setPosts(getPostsFromFirebase);
    });
    return () => subscriber();
  }, []); // empty dependencies array => useEffect only called once

  function AddChanges(background, info, youtube) {
    if (background !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Content").doc(location.state.name).update({
          Background: background,
        });
      });
    }
    if (info !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Content").doc(location.state.name).update({
          Info: info,
        });
      });
    }
    if (youtube !== "") {
      firebase.auth().onAuthStateChanged(function (user) {
        db.collection("Content").doc(location.state.name).update({
          YoutubeLink: youtube,
        });
      });
    }
  }

  return (
    <div>
      <AdminNavbar />
      <div className="content-data-div">
        <div className="content-text-div">
          <div className="quizname2">
            <h1
              className="contentAddHeading"
              style={{
                flex: "8",
              }}
            >
              {" "}
              {location.state.name}
            </h1>
            <button
              className="contentAdd"
              style={{
                flex: "1",
              }}
              onClick={() => AddChanges(background, info, youtube)}
            >
              Save
            </button>
          </div>
          <br />
          <hr />

          <div>
            {posts.map((post) => (
              <div key={post.key}>
                {post.Name === location.state.name ? (
                  <div className="backgroundInput">
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={6}
                      label="Background"
                      defaultValue={post.Background}
                      className="backgroundInput"
                      onChange={(e) => setBackground(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      multiline
                      maxRows={6}
                      label="Info"
                      defaultValue={post.Info}
                      className="backgroundInput"
                      onChange={(e) => setInfo(e.target.value)}
                    />
                    <br></br>
                    <br></br>
                    <TextField
                      id="outlined-multiline-flexible"
                      label="Youtube links"
                      multiline
                      maxRows={6}
                      defaultValue={post.YoutubeLink}
                      className="backgroundInput"
                      onChange={(e) => setYoutube(e.target.value)}
                    />
                    <br></br>
                  </div>
                ) : null}
                {/* //   <React.Fragment>
              //     {post.Name === location.state.name ? post.Background : null}
              //   </React.Fragment>
              //   <form>
              //     <label>
              //       Name:
              //       <input type="text" name="name" />
              //     </label>
              //     <input type="submit" value="Submit" />
              //   </form> */}
              </div>
            ))}
          </div>

          <br />
          <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
          <script src="../Styles/main.js"></script>
        </div>
      </div>
    </div>
  );
};

export default ContentDataAdminEdit;
