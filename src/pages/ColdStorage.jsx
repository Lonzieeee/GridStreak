import React from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import "./ColdStorage.css";

const HERO_IMAGE =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cleanWaterSystem.jpg";

const ColdStorage = () => {
  return (
    <>
      <SEO
        title="Cold Storage | GridStreak Solutions"
        description="Off-grid and grid-tied cold rooms powered by GridStreak thermal storage — keeping harvests fresh and reducing food loss."
        canonical="https://gridstreak.com/solutions/cold-storage"
      />
      <PageHero
        kicker="Cold Storage"
        title="Keep harvests fresh with reliable off-grid cold rooms."
        description="GridStreak thermal storage delivers consistent cooling for agriculture, healthcare, and community cold chains — even where the grid is unreliable."
        image={HERO_IMAGE}
        accent="#0ea5e9"
        primaryCta={{ to: "/contact", label: "Request a Pilot" }}
        secondaryCta={{ to: "/solutions", label: "All Solutions" }}
      />
      <section className="cs-body">
        <div className="cs-body__inner">
          <h2>Full solution page coming soon</h2>
          <p>
            We are building out detailed cold storage deployment guides, product
            specs, and case studies. In the meantime, reach out to discuss your
            cold chain needs.
          </p>
        </div>
      </section>
    </>
  );
};

export default ColdStorage;
