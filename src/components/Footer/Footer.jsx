import { Toolbar } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className="footer">
      <Toolbar
        style={{
          position: "static",
          backgroundColor: "#000000",
          height: "8vh",
          color: "white",
        }}
      >
        <ul>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/">XXXXX</Link>
          </li>
        </ul>
      </Toolbar>
    </div>
  );
};

export default Footer;
