/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  ArrowUpward,
  Facebook,
  Instagram,
  Twitter,
  YouTube,
} from "@mui/icons-material";
import React from "react";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="about-us">
          <h2>About Me</h2>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sapiente
            sit maxime, consectetur rerum modi repudiandae cupiditate non
            voluptatum sed nemo nisi omnis debitis, eum eligendi. Ad commodi
            totam beatae rem.
          </p>
        </div>

        <div className="follow">
          <h2>Follow Me</h2>
          <p>Let us be Social</p>

          <div>
            <a href="#">
              <Facebook />
            </a>
            <a href="#">
              <Twitter />
            </a>
            <a href="#">
              <Instagram />
            </a>
            <a href="#">
              <YouTube />
            </a>
          </div>
        </div>

        <div className="move-up" onClick={() => window.scroll(0, 0)}>
          <span>
            <ArrowUpward />
          </span>
        </div>
      </div>

      <div className="rights flex-row">
        <h4 className="text-rights">
          Copyright &copy; {new Date().getFullYear()} | All rights reserved{" "}
          <a href="#">Founder - Abishiek</a>
        </h4>
      </div>
    </footer>
  );
};

export default Footer;
