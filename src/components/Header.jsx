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
        <h1 className="logo">GridStreak</h1>

        {/* Hambuger for phon */}
        <button className="hamburger" onClick={() => setIsOpen(!isOpen)}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${isOpen ? "open" : ""}`}>
          <a href="#">Technology</a>
          <a href="#">Solutions</a>
          <a href="#">Manufacturing</a>
          <Link to="/company">Company</Link>
          <a href="#">Careers</a>
          <a href="#">Insights</a> 
        </nav>

        <Link to="/contact" className="get-in-touch">Get in Touch</Link>
      </div>
    </header>
  );
}

export default Header;
