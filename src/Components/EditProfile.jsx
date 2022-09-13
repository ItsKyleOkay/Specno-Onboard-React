
import Navbar from "../Navigation/Navbar.js";
import React, { useContext, useState } from 'react';
import { UserContext } from "../providers/UserProvider";
import { db, storage } from "../firebase";
import firebase from "firebase";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

function EditProfile() {

  const [progress, setProgress] = useState(0);
  const formHandler = (e) => {
    e.preventDefault();
    const file = e.target[0].files[0];
    uploadFiles(file);
  };

  const user = useContext(UserContext);
  const [currentUser, setCurrentUser] = useState(user);
  const [displayName, setDisplayName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [bio, setBio] = useState(currentUser.Bio);
  const [uploadedPic, setUploadedPic] =  useState(currentUser.photoURL);
  const joinDate = user.DateTime

  const AddChanges = (displayName, email) => {
    db.collection("users").doc(currentUser.uid).update({
      displayName,
      email,
      Bio:bio
    })
      .then(() => {
        console.log("passed")
      }).catch((error) => {
        console.log(error)
      })
  };

  const uploadFiles = (file) => {
    const uploadTask = storage.ref(`Profile Picture/${currentUser.uid + file.name}`).put(file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        //
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
        console.log(progress)
      },
      (error) => console.log(error),
      () => {
        storage
          .ref("Profile Picture")
          .child(currentUser.uid + file.name)
          .getDownloadURL()
          .then((url) => {
            console.log(url);
            setUploadedPic(url)
            firebase.auth().onAuthStateChanged(function (user) {
              db.collection("users").doc(currentUser.uid).update({
                photoURL: url,
              })
            });
          });

      }
    );
  };

  return (
    <div className="App">
      <Navbar />
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
                              alt="https://professionals.tarkett.com/media/img/M/THH_24567080_24594080_24596080_24601080_24563080_24565080_24588080_001.jpg" 
                              className="d-flex justify-content-center align-items-center rounded-circle" 
                              style={{ height: "140px", backgroundColor: "rgb(233, 236, 239)" }}
                            >
                            </img>
                          </div>
                        </div>
                        <div className="align-items-center col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className=" text-sm-left mb-2 mb-sm-0">
                            <h2 className="pt-sm-2 pb-1 mb-0 text-nowrap fw-bold">Profile</h2>
                            <p className="mb-0">Update your avatar and personal details</p>
                            {/* Change photo button */}
                            <div className="mt-2">
                              <form onSubmit={formHandler}>
                                <input type="file" className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm" />
                                <button type="submit" className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm" >
                                  <i className="fa fa-fw fa-camera"></i>
                                  <span>Change Photo</span>
                                </button>
                              </form>
                            </div>
                          </div>
                          <div className="text-center text-sm-right">
                            <div className="text-muted"><small>Joined {joinDate}</small></div>
                          </div>
                        </div>
                      </div>
                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Full Name</label>
                                      <input
                                        className="form-control"
                                        type="text"
                                        name="name"
                                        placeholder="Full Name"
                                        defaultValue={currentUser.displayName}
                                        onChange={(e) => setDisplayName(e.target.value)}
                                      />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Department</label>
                                      <input className="form-control" type="text" name="username" placeholder="Dept" value={currentUser.Department} readOnly />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group pt-3">
                                      <label>Email</label>
                                      <input className="form-control" type="text" placeholder="email@gmail.com" defaultValue={currentUser.email} onChange={(e) => setEmail(e.target.value)} />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group pt-3">
                                      <label>Bio</label>
                                      <textarea className="form-control"  type="text" rows="5" style={{ height: "20%" }} placeholder="About Me" defaultValue={currentUser.Bio}
                                        onChange={(e) => setBio(e.target.value)}></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          <div className="row">
                            <div className="col d-flex justify-content-end">
                              <button
                                className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm"
                                onClick={() => AddChanges(displayName, email, bio)}
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
    </div>
  );
}
export default EditProfile;
