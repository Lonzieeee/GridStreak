import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageHero from "../components/PageHero";
import "./SiteMap.css";

const links = [
  { to: "/", label: "Home" },
  { to: "/solutions", label: "Solutions" },
  { to: "/solutions/clean-cooking", label: "Clean Cooking" },
  { to: "/solutions/hospitals-clinics", label: "Hospitals & Clinics" },
  { to: "/solutions/cold-storage", label: "Cold Storage" },
  { to: "/solutions/water-purification", label: "Water Purification" },
  { to: "/solutions/waste-management", label: "Waste Management" },
  { to: "/solutions/emergency-relief", label: "Emergency Relief" },
  { to: "/partners", label: "Partners" },
  { to: "/team", label: "About" },
  { to: "/sustainability", label: "Sustainability" },
  { to: "/contact", label: "Contact" },
];

const SiteMap = () => {
  return (
    <>
      <SEO
        title="Site Map | GridStreak"
        description="Browse all primary GridStreak pages including Solutions, Partners, Sustainability and Contact."
        canonical="https://gridstreak.com/site-map"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "CollectionPage",
            name: "Site Map",
            url: "https://gridstreak.com/site-map",
          },
        ]}
      />
      <PageHero
        kicker="Site Map"
        title="Find your way around GridStreak."
        description="Browse all primary pages across solutions, partnerships, and company information."
        accent="#b0f222"
        align="center"
      />
      <section className="sitemap-body">
        <ul className="sitemap-list">
          {links.map((link) => (
            <li key={link.to}>
              <Link to={link.to}>{link.label}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};

export default SiteMap;
