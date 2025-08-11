import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Import icons
import "./Navbar.css";

const Navbar = () => {
  const [click, setClick] = useState(false);
  const handleClick = () => setClick(!click);

  const closeMobileMenu = () => setClick(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
          HYDROMAP Project
        </Link>

        {/* Mobile Menu Icon */}
        <div className="menu-icon" onClick={handleClick}>
          {click ? <FaTimes /> : <FaBars />}
        </div>

        {/* Navbar Links */}
        <ul className={click ? "navbar-menu active" : "navbar-menu"}>
          <li className="navbar-item">
            <Link to="/" className="navbar-links" onClick={closeMobileMenu}>
              Home
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/about" className="navbar-links" onClick={closeMobileMenu}>
              About
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/heatmap" className="navbar-links" onClick={closeMobileMenu}>
              Heatmap
            </Link>
          </li>
          <li className="navbar-item">
            <Link to="/contact" className="navbar-links" onClick={closeMobileMenu}>
              Contact
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
