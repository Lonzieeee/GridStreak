import React from "react";
import "./PartnershipOpportunities.css";

const projectDev = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/project-dev.png";
const research = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/research.png";
const investment = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/investment.png";
const csr = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/csr.png";

const opportunities = [
  {
    icon: projectDev,
    title: "Project Development",
    description: "Joint ventures for regional energy or cooking infrastructure rollouts.",
  },
  {
    icon: research,
    title: "Pilots & R&D",
    description: "Co-design and test new solutions in real environments.",
  },
  {
    icon: investment,
    title: "Funding & Impact Investment",
    description: "Scale solutions with aligned financing",
  },
  {
    icon: csr,
    title: "CSR Initiatives",
    description: "Corporate-led clean energy programs in schools or rural communities.",
  },
];

const PartnershipOpportunities = () => {
  return (
    <section className="partnership-alt-section">
      <h2 className="partnership-alt-title">Partnership Opportunities</h2>
      <div className="opportunity-card-grid">
        {opportunities.map((item, index) => (
          <div className="opportunity-card" key={index}>
            <div className="card-top">
              <img src={item.icon} alt={item.title} className="opportunity-svg" />
              <h3>{item.title}</h3>
            </div>
            <div className="card-description">
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PartnershipOpportunities;
