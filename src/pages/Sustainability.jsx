import React, { useState, useEffect } from "react";
import "./Sustainability.css";
import SDGCards from "../components/SDGCards";
import EnergyIcon from "../assets/energy.png";
import ColdIcon from "../assets/cold.png";
import EmpowerIcon from "../assets/empower.png";

const ImpactCard = ({ iconSrc, title, description, bullets }) => {
  const [flipped, setFlipped] = useState(false);

  const handleMouseLeave = () => {
    if (flipped) setFlipped(false);
  };

  return (
    <div
      className={`impact-card-container ${flipped ? "flipped" : ""}`}
      onMouseLeave={handleMouseLeave}
    >
      <div className="impact-card-inner">
        <div className="impact-card-front">
          <div className="impact-icon">
            <img src={iconSrc} alt={title} width={60} height={60} />
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <button
            className="toggle-impact-btn"
            onClick={() => setFlipped(true)}
          >
            Our Impact
          </button>
        </div>
        <div className="impact-card-back">
          <h4>{title} Impact</h4>
          <ul>
            {bullets.map((point, i) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
          <p className="hover-info">(Hover away to return)</p>
        </div>
      </div>
    </div>
  );
};

const Sustainability = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  useEffect(() => {
    if (activeSlide !== 3) return;

    const lines = [
      "At GridStreak, impact is not just a byproduct;",
      "It's the foundation of everything we stand for.",
      "We solve real-world problems at the intersection of energy, environment, and society.",
      "From clean cooking in schools to cold storage for farmers,",
      "We are creating a scalable future in underserved societies in Kenya and the world at large.."
    ];

    const container = document.getElementById("typewriter-multi");
    if (!container) return;

    container.innerHTML = "";
    let currentLine = 0;
    let currentChar = 0;
    let typingLine;

    function typeLine() {
      if (currentLine >= lines.length) return;

      typingLine = document.createElement("p");
      typingLine.className = "typewriter-text active";
      container.appendChild(typingLine);

      currentChar = 0;
      typeCharacter();
    }

    function typeCharacter() {
      const text = lines[currentLine];

      if (currentChar < text.length) {
        typingLine.textContent += text.charAt(currentChar);
        currentChar++;
        setTimeout(typeCharacter, 40);
      } else {
        typingLine.classList.remove("active");
        currentLine++;
        if (currentLine < lines.length) {
          setTimeout(typeLine, 900);
        }
      }
    }

    typeLine();
  }, [activeSlide]);

  return (
    <>
      {/* hero */}
      <div className="hero-wrapper no-image-hero gradient-bg">
        <div
          className="hero-slide-track"
          style={{ transform: `translateX(-${(activeSlide - 1) * 100}%)` }}
        >
          <div className="hero-slide slide-1">
            <div className="hero-overlay">
              <h1 className="hero-text">The brighter side of the future!</h1>
            </div>
          </div>
          <div className="hero-slide slide-2">
            <div className="hero-overlay">
              <h1 className="hero-text">Powering a new clean future</h1>
            </div>
          </div>
          <div className="hero-slide slide-3">
            <div className="hero-overlay">
              <div className="typewriter-box" id="typewriter-multi"></div>
            </div>
          </div>
        </div>

        <div className="circle-nav">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className={`nav-dot ${activeSlide === n ? "active" : ""}`}
              onClick={() => setActiveSlide(n)}
            ></div>
          ))}
        </div>

        <svg className="bottom-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,266.7C96,245,192,203,288,165.3C384,128,480,96,576,117.3C672,139,768,213,864,229.3C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
          ></path>
        </svg>
      </div>


      <div className="impact-title-section">
        <h2 className="impact-title">Our Key Impact Areas</h2>
      </div>

      {/* IMPACT CARDS */}
      <div className="impact-pattern-bg">
        <div className="triangle-layout">
          <div className="top-row">
            <ImpactCard
              iconSrc={EnergyIcon}
              title="Clean Energy Access"
              description="Over 80% of Kenyan households and institutions still rely on biomass. This leads to deforestation, indoor pollution, and health issues especially for women and children."
              bullets={[
                "Eliminates firewood use in institutions.",
                "Provides safe thermal cooking for 500+ people per setup.",
                "Offsets up to 20 tons of CO₂ annually."
              ]}
            />
            <ImpactCard
              iconSrc={ColdIcon}
              title="Off-Grid Cold Storage"
              description="Up to 40% of harvest is lost post-harvest due to lack of cold storage. Farmers struggle to preserve perishables and reach larger markets."
              bullets={[
                "Uses thermal energy for cooling no electricity required.",
                "Preserves milk, fish, and vegetables for longer, increasing income.",
                "Improves food security, market access and rural economic development."
              ]}
            />
          </div>

          <div className="bottom-row">
            <ImpactCard
              iconSrc={EmpowerIcon}
              title="Grid Stabilization"
              description="Kenya faces high electricity imports and peak demand. Utilities often rely on costly diesel generators or power cuts during shortages."
              bullets={[
                "Stores surplus solar/geothermal energy during off-peak hours.",
                "Releases heat during peak demand to support the grid.",
                "Reduces reliance on diesel and cross-border power imports."
              ]}
            />
          </div>
        </div>
      </div>

      {/* SDG CARDS */}
      <SDGCards />
    </>
  );
};

export default Sustainability;
