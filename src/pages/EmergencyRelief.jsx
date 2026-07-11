import React from "react";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import "./EmergencyRelief.css";

const HERO_IMAGE =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gsBanner.jpg";

const EmergencyRelief = () => {
  return (
    <>
      <SEO
        title="Emergency Relief | GridStreak Solutions"
        description="Rapid-deploy thermal systems for disaster response, camps, and mobile operations — powered by GridStreak storage."
        canonical="https://gridstreak.com/solutions/emergency-relief"
      />
      <PageHero
        kicker="Emergency Relief"
        title="Clean heat and power when communities need it most."
        description="Mobile, rapid-deploy GridStreak units deliver cooking, sterilization, and water treatment in disaster zones and humanitarian camps."
        image={HERO_IMAGE}
        accent="#b91c1c"
        primaryCta={{ to: "/contact", label: "Partner With Us" }}
        secondaryCta={{ to: "/solutions", label: "All Solutions" }}
      />
      <section className="er-body">
        <div className="er-body__inner">
          <h2>Full solution page coming soon</h2>
          <p>
            Detailed emergency deployment playbooks and field specifications are
            on the way. Contact us to discuss humanitarian and disaster-response
            partnerships.
          </p>
        </div>
      </section>
    </>
  );
};

export default EmergencyRelief;
