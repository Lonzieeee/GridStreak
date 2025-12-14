import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const location = useLocation();
  const navRef = useRef();
  const hamburgerRef = useRef();
  const solutionsRef = useRef();

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
      if (
        solutionsRef.current &&
        !solutionsRef.current.contains(event.target)
      ) {
        setIsSolutionsOpen(false);
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

  const handleSolutionsClick = (e) => {
    if (window.innerWidth < 768) {
      e.preventDefault();
      setIsSolutionsOpen(!isSolutionsOpen);
    }
  };

  const handleDropdownItemClick = () => {
    if (window.innerWidth < 768) {
      setIsSolutionsOpen(false);
      setIsOpen(false);
    }
  };

  return (
    <header className="header">
      <div className="container">
        <Link to="/" className="logo">
          <img
            src="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/navbar.png"
            alt="GridStreak"
          />
        </Link>

        <button
          className="hamburger"
          ref={hamburgerRef}
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

     
        <nav className={`nav-links ${isOpen ? "open" : ""}`} ref={navRef} role="navigation" aria-label="Main navigation">
          {/* close icon for mobile */}
          <button className="close-menu" onClick={() => setIsOpen(false)} aria-label="Close menu">&times;</button>
          <Link
            to="/#"
            onClick={handleNavClick}
            className={isActive("/technology") ? "active-link" : ""}
            title="GridStreak Technology - Thermal Brick Innovation"
          >
            Technology
          </Link>
          <div
            className="nav-dropdown"
            ref={solutionsRef}
            onMouseEnter={() => window.innerWidth >= 768 && setIsSolutionsOpen(true)}
            onMouseLeave={() => window.innerWidth >= 768 && setIsSolutionsOpen(false)}
          >
            <Link
              to="/solutions"
              onClick={handleSolutionsClick}
              className={isActive("/solutions") || 
                location.pathname.startsWith("/solutions/") ? "active-link" : ""}
              title="GridStreak Solutions - Clean Energy Storage Systems"
            >
              Solutions
            </Link>
            <div className={`dropdown-menu ${isSolutionsOpen ? "open" : ""}`}>
              <Link
                to="/solutions/clean-cooking"
                onClick={handleDropdownItemClick}
                className={isActive("/solutions/clean-cooking") ? "active-dropdown-item" : ""}
              >
                Clean Cooking
              </Link>
              <Link
                to="/solutions/hospitals-clinics"
                onClick={handleDropdownItemClick}
                className={isActive("/solutions/hospitals-clinics") ? "active-dropdown-item" : ""}
              >
                Hospitals & Clinics
              </Link>
              <Link
                to="/solutions/cold-storage"
                onClick={handleDropdownItemClick}
                className={isActive("/solutions/cold-storage") ? "active-dropdown-item" : ""}
              >
                Cold Storage
              </Link>
              <Link
                to="/solutions/water-purification"
                onClick={handleDropdownItemClick}
                className={isActive("/solutions/water-purification") ? "active-dropdown-item" : ""}
              >
                Water Purification
              </Link>
              <Link
                to="/solutions/waste-management"
                onClick={handleDropdownItemClick}
                className={isActive("/solutions/waste-management") ? "active-dropdown-item" : ""}
              >
                Waste Management
              </Link>
              <Link
                to="/solutions/emergency-relief"
                onClick={handleDropdownItemClick}
                className={isActive("/solutions/emergency-relief") ? "active-dropdown-item" : ""}
              >
                Emergency Relief
              </Link>
            </div>
          </div>
          <Link
            to="/partners"
            onClick={handleNavClick}
            className={isActive("/partners") ? "active-link" : ""}
            title="GridStreak Partners - Collaboration Opportunities"
          >
            Partners
          </Link>
          <Link
            to="/sustainability"
            onClick={handleNavClick}
            className={isActive("/sustainability") ? "active-link" : ""}
            title="GridStreak Sustainability - Environmental Impact"
          >
            Sustainability
          </Link>
          <Link
            to="#"
            onClick={handleNavClick}
            className={isActive("/insights") ? "active-link" : ""}
            title="GridStreak Insights - Industry News & Updates"
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
