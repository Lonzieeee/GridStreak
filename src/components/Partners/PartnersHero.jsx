import React from "react";
import "./PartnersHero.css";
import { Link } from "react-router-dom";
const partnersHeroBg = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/high-voltage-post-high-voltage-tower.jpg";

const PartnersHero = () => {
  return (
    <section
      className="partners-hero-section"
      style={{
        backgroundImage: `url(${partnersHeroBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      <div className="partners-hero-overlay">
        <div className="partners-hero-content">
          <h1 className="partners-title">
            Join us in powering a{" "}
            <span className="highlight-clean-future">New Clean Future</span>.
          </h1>
          <p className="partners-subtext desktop-copy">
            At GridStreak, we’re redefining energy access and grid reliability through sustainable thermal storage, uniting agencies, industries, partners, researchers, and innovators to drive meaningful change.
          </p>
          <p className="partners-subtext mobile-copy">
            GridStreak delivers reliable, zero-carbon thermal storage — partnering with agencies, industry, and innovators to expand clean energy access.
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
