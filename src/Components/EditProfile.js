import React from "react";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import Navbar from "../Navigation/Navbar.js";

const EditProfile = () => {

  return (
    <div>
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
                            <div className="d-flex justify-content-center align-items-center rounded-circle" style={{ height: "140px", backgroundColor: "rgb(233, 236, 239)" }}>
                            </div>
                          </div>
                        </div>
                        <div className="align-items-center col d-flex flex-column flex-sm-row justify-content-between mb-3">
                          <div className=" text-sm-left mb-2 mb-sm-0">
                            <h2 className="pt-sm-2 pb-1 mb-0 text-nowrap fw-bold">Profile</h2>
                            <p className="mb-0">Update your avatar and personal details </p>
                            {/* Change photo button */}
                            {/* <div className="mt-2">
                              <button className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm" type="button">
                                <i className="fa fa-fw fa-camera"></i>
                                <span>Change Photo</span>
                              </button>
                            </div> */}
                          </div>
                          <div className="text-center text-sm-right">
                            <div className="text-muted"><small>Joined 09 Dec 2017</small></div>
                          </div>
                        </div>
                      </div>

                      <div className="tab-content pt-3">
                        <div className="tab-pane active">
                          <form className="form" novalidate="">
                            <div className="row">
                              <div className="col">
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Full Name</label>
                                      <input className="form-control" type="text" name="name" placeholder="James Erwin" value="James Erwin" />
                                    </div>
                                  </div>
                                  <div className="col">
                                    <div className="form-group">
                                      <label>Department</label>
                                      <input className="form-control" type="text" name="username" placeholder="Dev" value="Dev" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col">
                                    <div className="form-group pt-3">
                                      <label>Email</label>
                                      <input className="form-control" type="text" placeholder="user@example.com" />
                                    </div>
                                  </div>
                                </div>
                                <div className="row">
                                  <div className="col mb-3">
                                    <div className="form-group pt-3">
                                      <label>Bio</label>
                                      <textarea className="form-control" rows="5" style={{ height: "20%" }} placeholder="About Me"></textarea>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="row">
                              <div className="col d-flex justify-content-end">
                                <button className="btn-colour btn btn-block text-uppercase mb-2 rounded-pill shadow-sm" type="submit">Save Changes</button>
                              </div>
                            </div>
                          </form>

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
};

export default EditProfile;
