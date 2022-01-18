import React from "react";
import "./css/Navbar.css";
import M from "materialize-css";
import {useParams} from "react-router-dom";
const socket  = require('../connection/socket').socket;

const Navbar = () => {
  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <h3 style={{color:"white"}}> ShatRanj - Shay aur Maat </h3>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
