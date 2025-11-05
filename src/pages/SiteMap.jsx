import React from "react";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";

const SiteMap = () => {
  const links = [
    { to: "/", label: "Home" },
    { to: "/solutions", label: "Solutions" },
    { to: "/partners", label: "Partners" },
    { to: "/sustainability", label: "Sustainability" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <div className="site-map-page" style={{ padding: "32px 16px" }}>
      <SEO
        title="Site Map | GridStreak"
        description="Browse all primary GridStreak pages including Solutions, Partners, Sustainability and Contact."
        canonical="https://gridstreak.com/site-map"
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "Site Map",
          "url": "https://gridstreak.com/site-map"
        }]}
      />
      <h1 style={{ marginBottom: 16 }}>Site Map</h1>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {links.map((l) => (
          <li key={l.to} style={{ marginBottom: 12 }}>
            <Link to={l.to}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SiteMap;


