import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="main-div">



      <nav className="navbar navbar-expand-lg navbar-dark bg-dark"> {/* Dark background */}

        <div className="container-fluid">
          {/* Left Side */}
          <div
            className="left-div"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <a
              className="btn btn-secondary"
              href="/"
              style={{
                marginRight: '15px', backgroundColor: 'inherit', borderColor: '#6c757d', padding: '10px 20px',
                fontSize: '2.25rem',
              }}
            >
              THUNDERCATS
            </a>
            <div
              className="dropdown"
              style={{ marginRight: '15px' }}
            >

            </div>
            <button
              className="btn btn-secondary"
              style={{ marginRight: '15px', backgroundColor: '#6c757d', borderColor: '#6c757d' }}
            >
              Favorites
            </button>
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

