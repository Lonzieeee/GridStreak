import React, { useState } from "react";
import "./PartnerTypes.css";
import govIcon from "../../assets/gov-agency.png";

import utilityIcon from "../../assets/energy-utility.png";
import industryIcon from "../../assets/industry.png";
import ngoIcon from "../../assets/ngo-funding.png";
import researchIcon from "../../assets/research.png";

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
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleIndex = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="partner-types-section">
      <h2 className="partner-types-title">Partner Types</h2>
      <div className="partner-timeline">
        <div className="vertical-line" />
        {partnerTypes.map((partner, index) => (
          <div className="partner-node" key={index}>
            <div
              className="partner-svg-icon"
              onClick={() => toggleIndex(index)}
            >
              <img src={partner.icon} alt={partner.title} />
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
