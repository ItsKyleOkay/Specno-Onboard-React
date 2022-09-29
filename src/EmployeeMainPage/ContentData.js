import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { db } from "../firebase";
import Navbar from "../Navigation/Navbar.js";
import contentData from "../Styles/img/contentData.png";
import "../Styles/style.css";
import "../Styles/bootstrap/css/bootstrap.min.css";

const ContentData = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();

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

  return (
    <div>
      <Navbar />
      <div className="content-data-div">
        <img
          className="content-data-img d-flex justify-content-center"
          src={contentData}
        ></img>
        <div className="content-text-div">
          <h1 className="d-flex content-data-heading">
            {" "}
            {location.state.name}
          </h1>

          <hr />
          <div className="d-flex justify-content-center">
            <div className="d-flex justify-content-center mt-2 mt-md-0">
              <div className="course-item content-text mt-3">
                {posts.map((post) => (
                  <React.Fragment>
                    {post.Name === location.state.name ? post.Background : null}

                    {post.Name === location.state.name ? (
                      <div>{post.YoutubeLink} </div>
                    ) : null}
                    {post.Name === location.state.name ? (
                      <div className="embed-responsive embed-responsive-16by9">
                        <iframe
                          class="embed-responsive-item"
                          src={post.YoutubeLink}
                          allowfullscreen
                          width="560"
                          height="315"
                        ></iframe>
                      </div>
                    ) : null}
                  </React.Fragment>
                ))}
              </div>
            </div>
          </div>
          <br />
          <script src="../Styles/bootstrap/js/bootstrap.bundle.min.jss"></script>
          <script src="../Styles/main.js"></script>
        </div>
      </div>
    </div>
  );
};

export default ContentData;
