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

const NewContentAdmin = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const [Name, setName] = useState("");
  const [Error, setError] = useState(false);
  const [Background, setBackground] = useState("");
  const [Date, setDate] = useState("");
  const [Filter, setFilter] = useState("");
  const [Info, setInfo] = useState("");
  const [YoutubeLink, setYoutubeLink] = useState("");

  function AddChanges(Name, Background, YoutubeLink, Info, Filter, Date) {
    if (Name !== "" && Background !== "" && Info !== "" && Date !== "") {
      db.collection("Content")
        .doc(Name)
        .set({
          Name: Name,
          Background: Background,
          YoutubeLink: YoutubeLink,
          Info: Info,
          Date: Date,
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
              New Content
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
                label="Backround"
                defaultValue="Quiz about specno"
                className="backgroundInput"
                onChange={(e) => setBackground(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Date"
                defaultValue="Current Date"
                className="backgroundInput"
                onChange={(e) => setDate(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Filter"
                defaultValue="Processes"
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
                defaultValue="Info about the content"
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
                defaultValue="Random Content 1"
                className="backgroundInput"
                onChange={(e) => setName(e.target.value)}
              />
              <br></br>
              <br></br>
              <TextField
                id="outlined-multiline-flexible"
                multiline
                maxRows={6}
                label="Youtube Links for content"
                defaultValue="www.youtube.com"
                className="backgroundInput"
                onChange={(e) => setYoutubeLink(e.target.value)}
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
                onClick={() =>
                  AddChanges(Name, Background, YoutubeLink, Info, Filter, Date)
                }
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

export default NewContentAdmin;
