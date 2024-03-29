import Navbar from "../Navigation/Navbar.js";
import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from "../providers/UserProvider";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";
import ProgressBar from "react-bootstrap/ProgressBar";

function EditProfile() {
  const [progress, setProgress] = useState(0);
  const navigate = useNavigate();
  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.Bio);
  const [uploadedPic, setUploadedPic] = useState(currentUser.photoURL);
  const [nickname, setNickname] = useState(currentUser.Nickname);
  const [posts, setPosts] = useState([]);

  //Blocks other files from being uploaded to profile
  const picUpload = (e) => {
    var fileName = document.getElementById("fileName").value;
    console.log(fileName);
    var idxDot = fileName.lastIndexOf(".") + 1;
    console.log(idxDot);
    var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
    console.log(extFile);
    if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "gif") {
      e.preventDefault();
      const file = e.target[0].files[0];
      uploadFiles(file);
    } else {
      alert("Only jpg/jpeg and png files are allowed!");
    }
  };

  useEffect(() => {
    const getPostsFromFirebase = [];
    const subscriber = db
      .collection("users")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setPosts(getPostsFromFirebase);
      });
    return () => subscriber();
  }, []);

  //Update user nickname & bio on firebase
  const AddChanges = (nickname, bio) => {
    db.collection("users").doc(currentUser.uid).update({
      Nickname: nickname,
      Bio: bio
    })
      .then(() => {
        console.log("passed")
        window.location = "/profile";
      }).catch((error) => {
        console.log(error)
      })
  };

  //Upload & set profile picture on firebase
  const uploadFiles = (file) => {
    console.log(progress);
    const uploadTask = storage.ref(currentUser.uid + ".jpg").put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //Sets progress of upload
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes)
        );
        setProgress(prog);
        console.log(progress)
      },
      (error) => console.log(error),
      () => {
        storage
          //uploads picure with UID to prevent multiple saves
          .ref(currentUser.uid + ".jpg")
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUploadedPic(url)
            firebase.auth().onAuthStateChanged(function (user) {
              db.collection("users")
                .doc(currentUser.uid)
                .update({
                  photoURL: url,
                })
            });
          });
        setProgress(0);
        console.log(progress);
      }
    );
  };

  return (
    <div className="App">
      <Navbar />
      {posts.map((post) =>
        post.email === email ? (
          <div className="container">
            <div className="row">
              <div className="hero-section inner-page"></div>
              <section id="courses" className="courses">
                <div className="col">
                  <div className="row">
                    <div className="col mb-3">
                      <div className="card-body">
                        <div className="e-profile">
                          <div className="row">
                            <div className="col-12 col-sm-auto mb-3">
                              <div className="mx-auto " style={{ width: "140px" }}>
                                <img src={uploadedPic}
                                  alt="avatar"
                                  className="d-flex justify-content-center align-items-center rounded-circle"
                                  style={{ height: "140px", backgroundColor: "rgb(233, 236, 239)" }}
                                >
                                </img>
                              </div>
                            </div>
                            <div className="align-items-center col d-flex flex-column flex-sm-row justify-content-between mb-3">
                              <div className=" text-sm-left mb-2 mb-sm-0">
                                <h2 className="pt-sm-2 pb-1 mb-0 text-nowrap fw-bold">{post.displayName}</h2>
                                <p className="mb-0">Update your avatar and personal details</p>
                                <div className="mt-2">
                                  <form onSubmit={picUpload}>
                                    <input type="file"
                                      accept="image/*"
                                      id="fileName"
                                      className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                    />
                                    <button
                                      type="submit"
                                      className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm" >
                                      <i className="fa fa-fw fa-camera"></i>
                                      <span>Change Photo</span>
                                    </button>
                                  </form>
                                </div>
                              </div>
                              <div className="text-center text-sm-right">
                              </div>
                            </div>
                          </div>
                          <ProgressBar
                            now={(100 / progress)}
                            variant="progress-quiz"
                          />
                          <div className="tab-content pt-3">
                            <div className="tab-pane active">
                              <div className="row">
                                <div className="col">
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Username</label>
                                        <input
                                          className="form-control"
                                          type="text"
                                          name="name"
                                          placeholder="Username"
                                          defaultValue={post.Nickname}
                                          onChange={(e) => setNickname(e.target.value)}
                                        />
                                      </div>
                                    </div>
                                    <div className="col">
                                      <div className="form-group">
                                        <label>Department</label>
                                        <input
                                          className="form-control"
                                          type="text" name="username"
                                          placeholder="Dept"
                                          value={post.Department}
                                          readOnly />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col">
                                      <div className="form-group pt-3">
                                        <label>Email</label>
                                        <input className="form-control"
                                          type="text"
                                          placeholder="email@gmail.com"
                                          defaultValue={post.email}
                                          readOnly />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="row">
                                    <div className="col mb-3">
                                      <div className="form-group pt-3">
                                        <label>Bio</label>
                                        <textarea
                                          className="form-control"
                                          type="text" rows="5"
                                          style={{ height: "20%" }}
                                          placeholder="About Me"
                                          defaultValue={post.Bio}
                                          onChange={(e) => setBio(e.target.value)}>
                                        </textarea>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="row">
                                <div className="col d-flex justify-content-end">
                                  <button
                                    className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                    onClick={() => {
                                      AddChanges(nickname, bio);
                                    }}
                                  >
                                    Save Changes
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        ) : null
      )}
    </div>
  );
}
export default EditProfile;



