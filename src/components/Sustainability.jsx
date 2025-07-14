import React from "react";
import "./Sustainability.css";
import { Link, useNavigate } from "react-router-dom";
import bgImage from "../assets/land.jpg";


import sdg3Icon from "../assets/sdg3-health.png";
import sdg7Icon from "../assets/sdg7-energy.png";
import sdg8Icon from "../assets/sdg8-work.png";
import sdg12Icon from "../assets/sdg12-recycle.png";
import sdg13Icon from "../assets/sdg13-climate.png";

const pillars = [
  { name: "Good Health and well-being", icon: sdg3Icon, sdgIndex: 2 },
  { name: "Affordable Clean Energy", icon: sdg7Icon, sdgIndex: 0 },
  { name: "Decent Work & Economic Growth", icon: sdg8Icon, sdgIndex: 3 },
  { name: "Responsible Consumption & Production", icon: sdg12Icon, sdgIndex: 4 },
  { name: "Climate Action", icon: sdg13Icon, sdgIndex: 1 },
];

function Sustainability() {
  const navigate = useNavigate();

  const handleClick = (index) => {
    navigate("/sustainability", { state: { expandSDGIndex: index } });
    setTimeout(() => {
      const cardSection = document.getElementById("sdg-section");
      if (cardSection) {
        cardSection.scrollIntoView({ behavior: "smooth" });
      }
    }, 100); 
  };

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
            Read More 
          </Link>
        </div>

        <div className="pillars-wrapper">
          <h5>Sustainable Development Goals</h5>
          <div className="pillars-grid">
            {pillars.map((pillar) => (
              <div
                className="pillar-card"
                key={pillar.name}
                onClick={() => handleClick(pillar.sdgIndex)}
                style={{ cursor: "pointer" }}
              >
                <img src={pillar.icon} alt={pillar.name} className="pillar-icon" />
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
