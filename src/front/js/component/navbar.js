import React from "react";
import { Link } from "react-router-dom";
import { DisplayOrNone } from "./conditional_renderers";
import { Context } from "../store/appContext";
import { useContext } from "react";


export const Navbar = () => {
  const {store} = useContext(Context)
  return (
    <div className="main-div">
      <h1>ThunderCats</h1>


      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Dark background */}

        <div className="container-fluid">
          {/* Left Side */}
          <div
            className="left-div"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <Link
              className="btn btn-secondary"
              to="/"
              style={{ marginRight: '15px', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
            >
              Home
            </Link>
            <div
              className="dropdown"
              style={{ marginRight: '15px' }}
            >

            </div>
            <Link
              className="btn btn-secondary"
              to="/favorites"
              style={{ marginRight: '15px', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
            >
              Favorites
            </Link>
          </div>

          {/* Right Side */}
          <div className="right-div" style={{ display: 'flex', alignItems: 'center' }}>
            <Link
              to="/signup"
              className="btn btn-secondary"
              style={{ marginRight: '15px', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
            >
              Sign Up
            </Link>
            <Link
              to="/Login" className="btn btn-secondary"
              style={{ backgroundColor: '#6c757d', borderColor: '#6c757d' }}>
              Login
            </Link>
          </div>
        </div>
      </nav >
    </div >

  );
};

