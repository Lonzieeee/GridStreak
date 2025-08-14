import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();
  const hamburgerRef = useRef();

  const isActive = (path) => location.pathname === path;

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
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">GridStreak</Link>

        <button
          className="hamburger"
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

     
        <nav className={`nav-links ${isOpen ? "open" : ""}`} ref={navRef}>
          {/* close icon for mobile */}
          <button className="close-menu" onClick={() => setIsOpen(false)} aria-label="Close menu">&times;</button>
          <Link
            to="/#"
            onClick={handleNavClick}
            className={isActive("/technology") ? "active-link" : ""}
          >
            Technology
          </Link>
          <Link
            to="/solutions"
            onClick={handleNavClick}
            className={isActive("/solutions") ? "active-link" : ""}
          >
            Solutions
          </Link>
          <Link
            to="/partners"
            onClick={handleNavClick}
            className={isActive("/partners") ? "active-link" : ""}
          >
            Partners
          </Link>
          <Link
            to="/sustainability"
            onClick={handleNavClick}
            className={isActive("/sustainability") ? "active-link" : ""}
          >
            Sustainability
          </Link>
          <Link
            to="#"
            onClick={handleNavClick}
            className={isActive("/insights") ? "active-link" : ""}
          >
            Insights
          </Link>
        </nav>

       <Link
  to="/contact"
  className={`get-in-touch ${isActive("/contact") ? "disabled-contact" : ""}`}
  onClick={(e) => {
    if (isActive("/contact")) {
      e.preventDefault(); 
    }
  }}
>
  Get in Touch
</Link>


      </div>
    </header>
  );
}

export default Header;
