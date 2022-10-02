import React, { useContext } from "react";
import { UserContext } from "../providers/UserProvider";
import Rocket from "../Styles/img/rocket.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";
import Navbar from "../Navigation/Navbar.js";
import { BrowserRouter } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Profile from "../Styles/img/Kyle.png";

const ProfilePage = () => {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <section className="hero-section" id="hero">
        <div className="container mt-header">
          <div className="row align-items-center">


              <div className="col-lg-9 mb-lg-0 mb-4">
                <div className="vh-100  ">

                  <div className="card z-index-2 h-60 mb-2 ">
                    <div className="card-header pb-0 pt-3 bg-transparent">
                      <p className="text-capitalize  text-black">Hello</p>
                      <h6 className="text-black mb-2">Welcome back to your onboarding at Specno</h6>
                      
                    </div>
                    <div className="row d-flex justify-content-center mt-2">
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                          <div className="card">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">Quiz</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                          <div className="card">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                  <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">Quiz</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-4 col-sm-6 mb-xl-0 mb-4">
                          <div className="card">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                  <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">Quiz</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                  </div>

                  <div className="card z-index-2 background-grey h-25 mb-2">
                  <div className="card-header pb-0 p-3">
                    <div className="d-flex justify-content-between">
                      <h6 className="mb-2">Onboarding Bar</h6>
                    </div>
                    </div>
                  
                  <div className="mt-3"
                  // className="table-responsive"
                  >
                    <table className="table align-items-center ">
                      <div className="row">
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                          <div className="card background-white">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">PickUp Cost</p>
                                    <h5 className="font-weight-bolder">
                                      Circle with data
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                          <div className="card background-white">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">PickUp Cost</p>
                                    <h5 className="font-weight-bolder">
                                      Circle with data
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                          <div className="card background-white">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">PickUp Cost</p>
                                    <h5 className="font-weight-bolder">
                                      Circle with data
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-xl-3 col-sm-6 mb-xl-0 mb-4">
                          <div className="card background-white">
                            <div className="card-body p-3">
                              <div className="row">
                                <div className="col-12">
                                  <div>
                                    <p className="text-black text-sm mb-0 text-uppercase font-weight-bold">PickUp Cost</p>
                                    <h5 className="font-weight-bolder">
                                      Circle with data
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </table>

                  </div>
                  </div>
                </div>

              </div>
              <div className="col-lg-3 vh-100">
                <div className="card   h-81 p-0">
                  <div className="h-100">
                    <div className="border-radius-lg h-100">
                      <div className="h-100 " >
                        <img src={Profile} alt="rocket" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

          </div>
        </div>
      </section>

      <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
      <script src="../Styles/main.js"></script>
    </div>
  );
};

export default ProfilePage;
