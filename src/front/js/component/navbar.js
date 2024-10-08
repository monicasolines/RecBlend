import React from "react";
import { Link } from "react-router-dom";
import img from "../../img/peelcompany-removebg-preview.png"

export const Navbar = () => {
	return (
		<nav className="navbar bg-warning">
  <div className="container-fluid">
    <a className="navbar-brand" href="#">
      <img src= {img} className = "w-25 h-25"/>
    </a>
  </div>
</nav>
	);
};
