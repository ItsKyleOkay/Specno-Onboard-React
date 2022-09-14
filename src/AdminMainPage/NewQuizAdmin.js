import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import firebase from "firebase";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../Navigation/AdminNavbar.js";
import contentData from "../Styles/img/contentData.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import { collection, addDoc } from "firebase/firestore";
import TextField from "@mui/material/TextField";

const NewQuizAdmin = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();
  const [Error, setError] = useState(false);

  const [Name, setName] = useState("");
  const [Time, setTime] = useState();
  const [Filter, setFilter] = useState("");
  const [Info, setInfo] = useState("");

  function AddChanges(Name, Time, Info, Filter) {
    if (Name !== "" && Time !== "" && Info !== "") {
      db.collection("quiz")
        .doc("Dev Team")
        .collection("Quizzes")
        .doc(Name)
        .set({
          Name: Name,
          Questions: 0,
          Info: Info,
          Time: Time,
          Filter: Filter,
        })
        .then(() => {
          setError(false);
          navigate(-1);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
          setError(true);
        });
    } else {
      setError(true);
    }

    // if (Background !== "") {
    //   firebase.auth().onAuthStateChanged(function (user) {
    //     db.collection("Content").update({
    //       Question: Question,
    //     });
    //   });
    // }
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
              New Quiz
            </h1>

            <br></br>
          </div>
          <br />
          <hr />

          <div>
            <div className="backgroundInput">
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Time limit"
                defaultValue=""
                className="backgroundInput"
                onChange={(e) => setTime(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Filter"
                defaultValue=""
                className="backgroundInput"
                onChange={(e) => setFilter(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Info"
                defaultValue=""
                className="backgroundInput"
                onChange={(e) => setInfo(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Name"
                defaultValue=""
                className="backgroundInput"
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <br></br>

              {Error === true ? (
                <div className="new-wrong-add">
                  {" "}
                  <div className="txt sub-wrong-add">
                    Please make sure every field has been edited{" "}
                  </div>
                </div>
              ) : null}

              <button className="contentAddSave" onClick={() => navigate(-1)}>
                Back
              </button>
              <button
                className="contentAddSave2"
                onClick={() => AddChanges(Name, Time, Info, Filter)}
              >
                Create Content
              </button>
            </div>

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
        </div>
        <br />
        <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
        <script src="../Styles/main.js"></script>
      </div>
    </div>
  );
};

export default NewQuizAdmin;
