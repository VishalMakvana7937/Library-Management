import React from "react";
import { Link } from "react-router-dom";
import "../App.css";

function Navbar({ isLoggedIn, userType }) {
  return (
    <nav className="navbar">
      <ul className="nav-list">
        <li className="nav-item"></li>
        {!isLoggedIn && (
          <>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/register" className="nav-link">
                Register
              </Link>
            </li>
          </>
        )}
        {isLoggedIn && userType == "Admin" ? (
          <>
            <li className="nav-item">
              <Link to="/admin-dashboard" className="nav-link">
                Dashboard
              </Link>
            </li>
           
            
          </>
        ) : (
          isLoggedIn && (
            <>
              <li className="nav-item">
                <Link to="/userDetails" className="nav-link">
                  User Details
                </Link>
              </li>
              <li className="nav-item">
              <Link to="/booklisting" className="nav-link">
                List
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/addeditbook" className="nav-link">
                + Add Book
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/viewbook" className="nav-link">
                View and Edit
              </Link>
            </li>
            </>
          )
        )}

        <li className="nav-item">
          <Link to="/about" className="nav-link">
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
