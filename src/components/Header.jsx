import React, { useState, useEffect, useCallback } from "react";
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

const LOGO_SRC =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/outLine-Green_3x-removebg-preview.png";

const NAV_LINKS = [
  { to: "/", label: "Home", title: "GridStreak Home" },
  { to: "/partners", label: "Partners", title: "GridStreak Partners" },
  {
    to: "/sustainability",
    label: "Sustainability",
    title: "GridStreak Sustainability",
  },
];

const SOLUTION_ITEMS = [
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
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.innerWidth >= 768,
  );
  const location = useLocation();

  const isActive = (path) => location.pathname === path;
  const isSolutionsActive =
    isActive("/solutions") || location.pathname.startsWith("/solutions/");
  const isContactActive = isActive("/contact");

  const closeMenu = useCallback(() => {
    setMenuOpen(false);
    setSolutionsOpen(false);
  }, []);

  useEffect(() => {
    const sentinel = document.getElementById("navbar-scroll-sentinel");
    if (!sentinel) return undefined;

    const syncScrollState = () => {
      setIsScrolled(window.scrollY > 8);
    };

    setIsScrolled(false);

    const observer = new IntersectionObserver(
      ([entry]) => setIsScrolled(!entry.isIntersecting),
      { threshold: 0 },
    );

    observer.observe(sentinel);
    const syncId = window.setTimeout(syncScrollState, 0);
    window.addEventListener("scroll", syncScrollState, { passive: true });

    return () => {
      window.clearTimeout(syncId);
      observer.disconnect();
      window.removeEventListener("scroll", syncScrollState);
    };
  }, [location.pathname]);

  useEffect(() => {
    const onResize = () => {
      const desktop = window.innerWidth >= 768;
      setIsDesktop(desktop);
      if (desktop) closeMenu();
    };

    window.addEventListener("resize", onResize, { passive: true });
    return () => window.removeEventListener("resize", onResize);
  }, [closeMenu]);

  useEffect(() => {
    closeMenu();
  }, [location.pathname, closeMenu]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return undefined;

    const onKeyDown = (event) => {
      if (event.key === "Escape") closeMenu();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen, closeMenu]);

  const linkClass = (path) =>
    `navbar__link${isActive(path) ? " navbar__link--active" : ""}`;

  return (
    <header
      className={`navbar${isScrolled ? " navbar--scrolled" : ""}${menuOpen ? " navbar--menu-open" : ""}`}
    >
      <div className="navbar__inner">
        <Link to="/" className="navbar__logo" aria-label="GridStreak home">
          <img src={LOGO_SRC} alt="" width={40} height={48} aria-hidden="true" />
          <span className="navbar__logo-text">ridstreak</span>
        </Link>

        <button
          type="button"
          className={`navbar__toggle${menuOpen ? " navbar__toggle--open" : ""}`}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="navbar-menu"
        >
          <span className="navbar__toggle-bar" aria-hidden="true" />
          <span className="navbar__toggle-bar" aria-hidden="true" />
          <span className="navbar__toggle-bar" aria-hidden="true" />
        </button>

        <button
          type="button"
          className={`navbar__backdrop${menuOpen ? " navbar__backdrop--visible" : ""}`}
          aria-label="Close menu"
          tabIndex={menuOpen ? 0 : -1}
          onClick={closeMenu}
        />

        <nav
          id="navbar-menu"
          className={`navbar__nav${menuOpen ? " navbar__nav--open" : ""}`}
          aria-label="Main navigation"
          aria-hidden={!isDesktop && !menuOpen ? true : undefined}
        >
          <Link to="/" className={linkClass("/")} onClick={closeMenu}>
            Home
          </Link>

          <div
            className="navbar__dropdown"
            onMouseEnter={() => isDesktop && setSolutionsOpen(true)}
            onMouseLeave={() => isDesktop && setSolutionsOpen(false)}
          >
            <Link
              to="/solutions"
              className={`navbar__link navbar__link--has-menu${isSolutionsActive ? " navbar__link--active" : ""}`}
              aria-haspopup="menu"
              aria-expanded={solutionsOpen}
              aria-controls="navbar-solutions-menu"
              onClick={(e) => {
                if (!isDesktop) {
                  e.preventDefault();
                  setSolutionsOpen((open) => !open);
                } else {
                  closeMenu();
                }
              }}
            >
              Solutions
            </Link>

            <div
              id="navbar-solutions-menu"
              role="menu"
              className={`navbar__mega${solutionsOpen ? " navbar__mega--open" : ""}`}
            >
              {SOLUTION_ITEMS.map(({ to, label, Icon, iconColor, description }) => (
                <Link
                  key={to}
                  to={to}
                  role="menuitem"
                  className={`navbar__mega-item${isActive(to) ? " navbar__mega-item--active" : ""}`}
                  onClick={closeMenu}
                >
                  <span className="navbar__mega-head">
                    <span
                      className="navbar__mega-icon"
                      style={{ "--icon-color": iconColor }}
                      aria-hidden="true"
                    >
                      <Icon />
                    </span>
                    <span className="navbar__mega-label">{label}</span>
                  </span>
                  <span className="navbar__mega-desc">{description}</span>
                </Link>
              ))}
            </div>
          </div>

          {NAV_LINKS.slice(1).map(({ to, label }) => (
            <Link key={to} to={to} className={linkClass(to)} onClick={closeMenu}>
              {label}
            </Link>
          ))}

          <span className="navbar__link navbar__link--disabled" aria-disabled="true" title="Coming soon">
            Industries
          </span>
          <span className="navbar__link navbar__link--disabled" aria-disabled="true" title="Coming soon">
            Shop
          </span>

          <Link
            to="/contact"
            className={`navbar__cta navbar__cta--mobile${isContactActive ? " navbar__cta--disabled" : ""}`}
            aria-current={isContactActive ? "page" : undefined}
            onClick={(e) => {
              if (isContactActive) e.preventDefault();
              else closeMenu();
            }}
          >
            Get in Touch
          </Link>
        </nav>

        <Link
          to="/contact"
          className={`navbar__cta navbar__cta--desktop${isContactActive ? " navbar__cta--disabled" : ""}`}
          aria-current={isContactActive ? "page" : undefined}
          onClick={(e) => isContactActive && e.preventDefault()}
        >
          Get in Touch
        </Link>
      </div>
    </header>
  );
}

export default Header;
