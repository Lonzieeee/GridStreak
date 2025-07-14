import React, { useState, useEffect, useRef } from "react";
import "./Header.css";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const isCompanyPage = location.pathname === "/company";

  const navRef = useRef();
  const hamburgerRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        navRef.current &&
        !navRef.current.contains(event.target) &&
        !hamburgerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleNavClick = () => {
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <header className={`header ${isCompanyPage ? "white-header" : ""}`}>
      <div className="container">
        {/* Logo */}
        <Link to="/" className="logo">GridStreak</Link>

        {/* Hamburger for mobile */}
        <button
          className="hamburger"
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Navigation */}
        <nav className={`nav-links ${isOpen ? "open" : ""}`} ref={navRef}>
          <a href="#" onClick={handleNavClick}>Technology</a>
          <a href="#" onClick={handleNavClick}>Solutions</a>
          <Link to="/partners" onClick={handleNavClick}>Partners</Link>
          <Link to="/sustainability" onClick={handleNavClick}>Sustainability</Link>
          <a href="#" onClick={handleNavClick}>Insights</a>
        </nav>

        {/* CTA  */}
        <Link to="/contact" className="get-in-touch">Get in Touch</Link>
      </div>
    </header>
  );
}

export default Header;
