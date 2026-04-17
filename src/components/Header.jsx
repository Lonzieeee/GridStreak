import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaFire,
  FaHospital,
  FaSnowflake,
  FaTint,
  FaRecycle,
  FaAmbulance,
} from "react-icons/fa";
import "./Header.css";

const solutionDropdownItems = [
  {
    to: "/solutions/clean-cooking",
    label: "Clean Cooking",
    Icon: FaFire,
    iconColor: "#eb6a00",
    description:
      "Institutional clean cooking for schools, hospitals, and communities using thermal storage.",
  },
  {
    to: "/solutions/hospitals-clinics",
    label: "Hospitals & Clinics",
    Icon: FaHospital,
    iconColor: "#dc2626",
    description:
      "Reliable heat, steam, and hot water for critical healthcare facilities.",
  },
  {
    to: "/solutions/cold-storage",
    label: "Cold Storage",
    Icon: FaSnowflake,
    iconColor: "#0ea5e9",
    description:
      "Off-grid and grid-tied cold rooms that keep harvests fresh and reduce food loss.",
  },
  {
    to: "/solutions/water-purification",
    label: "Water Purification",
    Icon: FaTint,
    iconColor: "#0284c7",
    description:
      "Thermally powered water treatment for safe drinking water in remote areas.",
  },
  {
    to: "/solutions/waste-management",
    label: "Waste Management",
    Icon: FaRecycle,
    iconColor: "#16a34a",
    description:
      "Circular waste-heat and waste-to-value systems for institutions and industry.",
  },
  {
    to: "/solutions/emergency-relief",
    label: "Emergency Relief",
    Icon: FaAmbulance,
    iconColor: "#b91c1c",
    description:
      "Rapid-deploy thermal systems for disaster response, camps, and mobile operations.",
  },
];

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
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
  };

  const handleSolutionsClick = (e) => {
   
    setIsSolutionsOpen((open) => (window.innerWidth < 768 ? !open : true));
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "auto",
    });
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
              aria-haspopup="menu"
              aria-expanded={isSolutionsOpen}
              aria-controls="solutions-submenu"
              className={isActive("/solutions") || 
                location.pathname.startsWith("/solutions/") ? "active-link" : ""}
              title="GridStreak Solutions - Clean Energy Storage Systems"
            >
              Solutions
            </Link>
            <div
              id="solutions-submenu"
              className={`dropdown-menu ${isSolutionsOpen ? "open" : ""}`}
            >
              {solutionDropdownItems.map(({ to, label, Icon, iconColor, description }) => (
                <Link
                  key={to}
                  to={to}
                  onClick={handleDropdownItemClick}
                  className={isActive(to) ? "active-dropdown-item" : ""}
                >
                  <span className="dropdown-item-head">
                    <span
                      className="dropdown-item-icon"
                      style={{ "--icon-color": iconColor }}
                      aria-hidden="true"
                    >
                      <Icon />
                    </span>
                    <span className="dropdown-item-label">{label}</span>
                  </span>
                  <span className="dropdown-item-desc">{description}</span>
                </Link>
              ))}
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
