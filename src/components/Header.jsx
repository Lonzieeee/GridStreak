import React, { useState } from "react";
import "./Header.css"; 
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isCompanyPage = location.pathname === "/company";

  return (
    <header className={`header ${isCompanyPage ? "white-header" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">GridStreak</Link>

        {/* Hamburger for phone */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#">Technology</a>
          <a href="#">Solutions</a>
          <Link to="/partners">Partners</Link> 
          <Link to="/sustainability">Sustainability</Link>
          <a href="#">Insights</a> 
        </nav>

        <Link to="/contact" className="get-in-touch">Get in Touch</Link>
      </div>
    </header>
  );
}

export default Header;
