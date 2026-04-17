import React from "react";
import SEO from "../components/SEO";
import SolutionsHero from "../components/Solutions/SolutionsHero";
import SolutionsGrid from "../components/Solutions/SolutionsGrid";

import SolutionsShowcase from "../components/Solutions/SolutionsShowcase";

const Solutions = () => {
  return (
    <>
      <SEO
        title="Thermal Energy Storage Solutions for Healthcare, Agriculture, Industry and Communities | GridStreak"
        description="Explore GridStreak thermal energy storage solutions for clean cooking, healthcare operations, agriculture, industrial heat, water systems, and emergency response."
        canonical="https://www.gridstreak.com/solutions"
        jsonLd={[{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          "name": "GridStreak Solutions",
          "url": "https://www.gridstreak.com/solutions",
          "breadcrumb": {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {"@type":"ListItem","position":1,"name":"Home","item":"https://www.gridstreak.com/"},
              {"@type":"ListItem","position":2,"name":"Solutions","item":"https://www.gridstreak.com/solutions"}
            ]
          }
        }]} 
      />
      <SolutionsHero />
      <SolutionsGrid />
      <SolutionsShowcase />
    </>
  );
};

export default Solutions;
