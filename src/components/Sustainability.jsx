import React from "react";
import "./Sustainability.css";
import { Link } from "react-router-dom";
import bgImage from "../assets/land.jpg";

const pillars = [
  { name: "Clean Energy Access", icon: "⚡" },        
  { name: "Institutional Trust", icon: "🏛️" },       
  { name: "Economic Growth", icon: "📈" },       
  { name: "System Resilience", icon: "🛡️" },       
  { name: "Environmental Impact", icon: "🌍" },   
  { name: "Community Engagement", icon: "🤝" }   
];


function Sustainability() {
  return (
    <section
      className="sustainability-section"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="sustainability-overlay"></div>

      <div className="sustainability-inner">
        <div className="sustainability-content">
          <h4 className="sub-heading">Sustainability</h4>
          <h2 className="main-heading">Building prosperity & self-sufficiency</h2>
          <p>
            At GridStreak, our commitment to sustainability extends beyond regulatory compliance.
            We're focused on making meaningful contributions to communities and the environment—
            replacing fossil backup, supporting clean energy, and creating jobs with
            plastic-to-energy innovation.
          </p>
          <Link to="/sustainability" className="read-more-btn">
            Read More →
          </Link>
        </div>

        <div className="pillars-wrapper">
          <h5>7 Sustainability Pillars</h5>
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <div className="pillar-card" key={pillar.name}>
                <span className="pillar-icon">{pillar.icon}</span>
                <span className="pillar-name">{pillar.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Sustainability;
