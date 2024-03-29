import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import firebase from "firebase";
import { db } from "../firebase";
import Navbar from "../Navigation/Navbar.js";

import React, { useState, useEffect } from "react";

import classes from "./Onboard.module.css";
import { BrowserRouter } from "react-router-dom";

const Leaderboard = () => {
  const [email, setEmail] = useState();
  const [uid, setUid] = useState("");
  const [badges, setBadges] = useState([]);
  const [badge2, setBadge] = useState("1");
  const [posts, setPosts] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [prizes, setPrizes] = useState([]);

  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      setEmail(user.email); //this feature only calls the main fields of data and not other important user data
      // So I cant call levels, departments, etc
    } else {
      // No user is signed in.
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
    });
    return () => userinfo();
  }, []); // empty dependencies array => useEffect only called once

  useEffect(() => {
    const getPostsFromFirebase = [];
    const userinfo = db.collection("Prizes").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setPrizes(getPostsFromFirebase); //Adding the prizes the firebase has to the leaderboard
    });
    return () => userinfo();
  }, []); // empty dependencies array => useEffect only called once

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUid(user.uid);

        const quizzesdone = db
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            if (doc && doc.exists) {
              setBadge(doc.data().Badge);
            }
          });
        return () => quizzesdone();
      }
    });
  });

  useEffect(() => {
    const getPostsFromFirebase = [];
    const userinfo = db.collection("Badges").onSnapshot((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getPostsFromFirebase.push({
          ...doc.data(), //spread operator
          key: doc.id, // `id` given to us by Firebase
        });
      });
      setBadges(getPostsFromFirebase); //Adding the prizes the firebase has to the leaderboard
    });
    return () => userinfo();
  }, []); // empty dependencies array => useEffect only called once

  useEffect(() => {
    const getPostsFromFirebase = [];
    const userinfo = db
      .collection("Leaderboard")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          getPostsFromFirebase.push({
            ...doc.data(), //spread operator
            key: doc.id, // `id` given to us by Firebase
          });
        });
        setLeaderboard(getPostsFromFirebase); //Adding the prizes the firebase has to the leaderboard
      });
    return () => userinfo();
  }, []); // empty dependencies array => useEffect only called once

  // The table for the leaderboard with the best of specno and recent activity
  // The right nav bar of prizes, progress and badges is also included
  return (
    <div>
      <Navbar />

      <div className="hero-section inner-page"></div>
      <div className={classes.contentcontainer}>
        <div className={classes.row}>
          <div className={classes.leftpanel}>
            <div className={classes.leaderboard}>
              <h1 className={classes.firsthead}>Best of specno</h1>

              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ fontWeight: "bold" }}>
                        Player Name
                      </TableCell>
                      <TableCell align="right" style={{ fontWeight: "bold" }}>
                        Department
                      </TableCell>

                      <TableCell align="right" style={{ fontWeight: "bold" }}>
                        Final Score
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {posts.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {row.Department !== "Admin" ? (
                          <>
                            <TableCell component="th" scope="row">
                              {row.displayName}
                            </TableCell>

                            <TableCell align="right">
                              {row.Department}
                            </TableCell>
                            <TableCell align="right">
                              {row.FinalScore}
                            </TableCell>
                          </>
                        ) : null}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div>
              <div className={classes.leaderboard}>
                <h1 className={classes.firsthead}>Recent Activity</h1>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell
                          className="TextVoucher"
                          style={{ fontWeight: "bold" }}
                        >
                          Player Name
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          Date added
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          Difficulty
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          Department
                        </TableCell>
                        <TableCell align="right" style={{ fontWeight: "bold" }}>
                          Added Points
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {posts.map((row) => (
                        <TableRow
                          key={row.name}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          {row.Department !== "Admin" ? (
                            <>
                              <TableCell component="th" scope="row">
                                {row.displayName}
                              </TableCell>
                              <TableCell align="right">
                                {row.DateTime}
                              </TableCell>
                              <TableCell align="right">
                                {row.Difficulty}
                              </TableCell>
                              <TableCell align="right">
                                {row.Department}
                              </TableCell>
                              <TableCell align="right">
                                {row.RecentScore}
                              </TableCell>
                            </>
                          ) : null}
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </div>
          </div>
          <div className={classes.rightpanel}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(1, 3fr)",
                gridGap: 20,
              }}
            >
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(1, 4fr)",
                  gridGap: 20,
                }}
              >
                <div className={classes.boxstyle}>
                  <div className={classes.PrizeHead}>Top 3 Prizes</div>
                  <div id="prizes" className={classes.prizes}>
                    <div className="container" data-aos="fade-up">
                      <div
                        className="row"
                        data-aos="zoom-in"
                        data-aos-delay="100"
                      >
                        {prizes.map((prize) => (
                          <div className="col-lg-5 col-md-5 d-flex align-items-stretch mt-4 mt-md-0">
                            <div className="course-item">
                              <div className={classes.coursecontent}>
                                <img
                                  src={prize.src}
                                  className={classes.imgfluid}
                                  alt="..."
                                />
                                <div className="TextVoucher">{prize.Name} </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className={classes.box2style}>
                <div className={classes.PrizeHead} data-testid="header">
                  Your progress
                </div>
                {posts.map((post) => (
                  <div className="col-lg-5 col-md-5 d-flex align-items-stretch mt-4 mt-md-0">
                    <div className={classes.progresscontent}>
                      {email === post.email ? (
                        <div className="TextGlobal">
                          {" "}
                          Level {post.Level}
                          <br></br>
                          {post.FinalScore} XP
                        </div>
                      ) : (
                        <div> </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className={classes.box3style}>
                <div className={classes.PrizeHead}>Your badges</div>
                <div className="row" data-aos="zoom-in" data-aos-delay="100">
                  {badges.map((badge) =>
                    badge2.includes(badge.Name) ? (
                      <div className="col-lg-5 col-md-5 d-flex align-items-stretch mt-4 mt-md-0">
                        <div className={classes.progresscontent}>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "repeat(1, 3fr)",
                              gridGap: 10,
                            }}
                          >
                            <img
                              src={badge.src}
                              className={classes.imgfluid}
                              alt="..."
                            />
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
