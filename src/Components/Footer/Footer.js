import React from "react";

import classes from "./Footer.css";

import "./Footer.css";

const Footer = () => {
  return (
    <div className={classes.mainfooter}>
      <div className="container">
        <div className="row">
          <div className="col">
            <h2>Get in touch</h2>
            <ui className="list-unstyled">
              <li
                href="/drafts/sign-up"
                data-w-id="32299cad-ec7b-e603-fb21-35deddf3465b"
                class="styled-footer-link"
              >
                Subscribe to our newsletter
              </li>
              <li>Info@specno.com</li>
              <li>084 036 8826</li>
              <li>Cape Town Western Cape</li>
            </ui>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">
            &copy;{new Date().getFullYear()} Copyright 2020 Specno | All rights
            reserved | Terms Of Service | Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
