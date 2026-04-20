import "./WaterPurification.css";

import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import TechBenefitsSlider from "../components/WaterPurification/TechBenefitsSlider";
import WaterProductsSection from "../components/WaterPurification/WaterProductsSection";
import ApplicationsCardStack from "../components/WaterPurification/ApplicationsCardStack";
import ImpactSection from "../components/WaterPurification/ImpactSection";
import CircularChamberSection from "../components/WaterPurification/CircularChamberSection";

const WaterPurification = () => {
  return (
    <>
      <SEO
        title="Water Resource Management Solutions | Solar Water Heating & Distillation – GridStreak"
        description="GridStreak provides solar-powered water heating and distillation systems. Clean drinking water and sustainable water solutions for communities and coastal regions."
        canonical="https://gridstreak.com/solutions/water-purification"
      />
      <div className="wp-container">
        {/* HERO SECTION */}
        <section className="wp-hero">
          <div className="wp-hero-content">
            <h1>Reliable, Clean Water Systems Powered by Thermal Energy</h1>
            <p>Access to clean, safe water remains one of the most urgent global challenges.</p>
            <ul className="wp-hero-list">
              <li>Over 2 billion people lack safely managed drinking water</li>
              <li>Many communities rely on contaminated or untreated sources</li>
              <li>Water systems depend on diesel and unreliable electricity</li>
              <li>Plastic waste continues to clog rivers, drainage systems, and coastal ecosystems</li>
            </ul>
            <div className="wp-buttons">
              <button
                type="button"
                className="primary-btn"
                onClick={() => {
                  const el = document.getElementById("wp-products-heading");
                  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
              >
                See Water Systems
              </button>
              <Link className="secondary-btn" to="/contact?solution=water-purification">
                Talk to Us
              </Link>
            </div>
          </div>
        </section>

        {/* TECHNOLOGY SECTION */}
        <TechBenefitsSlider />

        {/* PRODUCTS SECTION */}
        <WaterProductsSection />

        {/* CIRCULAR CHAMBER SECTION */}
        <CircularChamberSection />

        {/* APPLICATIONS SECTION */}
        <ApplicationsCardStack />

        {/* IMPACT SECTION */}
        <ImpactSection />

        {/* CTA SECTION */}
        <section className="wp-cta" id="deployment-plan">
          <div className="wp-cta__media" aria-hidden="true">
            <img
              src="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png"
              alt="Water system deployment"
              loading="lazy"
            />
          </div>
          <div className="wp-cta__content">
            <h2>Deploy GridStreak Water Solutions</h2>
            <p className="wp-cta__lead">
              Deliver clean water, reduce costs, and protect the environment.
            </p>
            <div className="wp-cta__actions">
              <Link className="primary-btn wp-cta__btn" to="/contact?solution=water-purification">
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default WaterPurification;

