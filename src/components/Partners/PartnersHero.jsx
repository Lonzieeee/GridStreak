import React from "react";
import "./PartnersHero.css";
import { Link } from "react-router-dom";
const auroraBg = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/aurora-background.webp";

const PartnersHero = () => {
  return (
    <section
      className="partners-hero-section"
      style={{
        backgroundImage: `url(${auroraBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="partners-hero-overlay">
        <div className="partners-hero-content">
          <h1 className="partners-title">Join us in powering a new clean future.</h1>
          <p className="partners-subtext">
            At GridStreak, we’re redefining energy access and grid reliability through sustainable thermal storage, uniting agencies, industries, partners, researchers, and innovators to drive meaningful change.
          </p>
          <Link to="/contact" className="partner-cta-btn">
            Become a Partner
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PartnersHero;
