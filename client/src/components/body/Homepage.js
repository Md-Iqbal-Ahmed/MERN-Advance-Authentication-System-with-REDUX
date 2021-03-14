import React from "react";
import "./Homepage.css";
const Homepage = () => {
  return (
    <div className="home_page">
      <h1 style={{ textAlign: "center", padding: "20px 10px" }}>
        Welcome Advance MERN Authentication System
      </h1>
      <div className="homepage_link">
        <a
          href="https://github.com/Md-Iqbal-Ahmed"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "#4078c0" }}
        >
          Github
        </a>

        <a
          href="https://iqbal-ahmed.web.app/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ background: "gray" }}
        >
          Personal Website
        </a>
      </div>
    </div>
  );
};

export default Homepage;
