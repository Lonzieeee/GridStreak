import React, { useState, useEffect } from "react";
import "./PartnerTypes.css";
const govIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gov-agency.png";
const utilityIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/energy-utility.png";
const industryIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/industry.png";
const ngoIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/ngo-funding.png";
const researchIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/research.png";

const partnerTypes = [
  {
    title: "Governments & Development Agencies",
    icon: govIcon,
    description:
      "Accelerate clean infrastructure in underserved areas, reduce grid instability, and improve public facilities such as schools and clinics.",
  },
  {
    title: "Energy Utilities & Grid Operators",
    icon: utilityIcon,
    description:
      "Support load balancing,frequency stabilization,and peak shaving through distributed thermal storage.",
  },
  {
    title: "Heavy Industrial Partners",
    icon: industryIcon,
    description:
      " Reduce energy costs and carbon footprints with high-temperature energy storage for manufacturing, food processing,and more.",
  },
  {
    title: "NGOs & Climate Funds",
    icon: ngoIcon,
    description:
      "Co-develop projects that advance SDGs,reduce plastic waste, and empower climate-affected communities.",
  },
  {
    title: " Universities & Research Institutions",
    icon: researchIcon,
    description:
      "Collaborate on material innovation,performance optimization, and deployment at scale.",
  },
];

const PartnerTypes = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % partnerTypes.length);
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="partner-types-section">
      <h2 className="partner-types-title">Partner Types</h2>
      <div className="partner-timeline">
        <div className="vertical-line" />
        {partnerTypes.map((partner, index) => (
          <div
            className={`partner-node ${
              activeIndex === index ? "active-node" : ""
            }`}
            key={index}
          >
            <div className="partner-svg-icon">
              <img src={partner.icon} alt={partner.title} />
              {activeIndex === index && <div className="fill-bar"></div>}
            </div>
            <div className="partner-content">
              <h3>{partner.title}</h3>
              {activeIndex === index && (
                <p className="partner-description">{partner.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnerTypes;
