import React, { useState, useEffect } from "react";
import SEO from "../components/SEO";
import "./Sustainability.css";
import SDGCards from "../components/SDGCards";
const EnergyIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/energy.png";
const ColdIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cold.png";
const EmpowerIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/empower.png";

const slideTexts = [
  <>The <span className="highlight-orange">brighter</span> side of the future!</>,
  <>Powering a <span className="highlight-orange">new clean</span> future</>,
  <>We solve <span className="highlight-orange">real-world problems</span> at the intersection of energy, environment, and society.</>,
];

const ImpactCard = ({ iconSrc, title, description, bullets }) => {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className={`impact-card-container ${flipped ? "flipped" : ""}`}
      onMouseLeave={() => flipped && setFlipped(false)}
    >
      <div className="impact-card-inner">
        <div className="impact-card-front">
          <div className="impact-icon">
            <img src={iconSrc} alt={title} width={60} height={60} />
          </div>
          <h3>{title}</h3>
          <p>{description}</p>
          <button className="toggle-impact-btn" onClick={() => setFlipped(true)}>
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
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeIntersection, setActiveIntersection] = useState(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const rows = 20;
  const cols = 25;
  const spacing = 60;

  const intersectionRows = rows - 1;
  const intersectionCols = cols - 1;
  const totalIntersections = intersectionRows * intersectionCols;

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveSlide((prev) => (prev + 1) % slideTexts.length);
        setIsTransitioning(false);
      }, 300);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIntersection = Math.floor(Math.random() * totalIntersections);
      setActiveIntersection(randomIntersection);
      
      setTimeout(() => {
        setActiveIntersection(null);
      }, 1000);
    }, 1500);
    return () => clearInterval(interval);
  }, [totalIntersections]);

  const getIntersectionCoords = (index) => {
    if (index === null) return null;
    const row = Math.floor(index / intersectionCols);
    const col = index % intersectionCols;
    return { row, col };
  };

  const coords = getIntersectionCoords(activeIntersection);

  return (
    <>
      <SEO
        title="Sustainability | GridStreak"
        description="How GridStreak advances clean energy access, cold storage, and grid stability with sustainable thermal storage systems."
        canonical="https://www.gridstreak.com/sustainability"
      />
      <div className="hero-wrapper math-grid-hero">
        <div className="grid-background"></div>

        <div className="grid-overlay">
          {coords && (
            <div
              className="grid-intersection-highlight active-highlight"
              style={{
                top: `${(coords.row + 1) * spacing}px`,
                left: `${(coords.col + 1) * spacing}px`,
              }}
            >
              <div className="vertical"></div>
              <div className="horizontal"></div>
            </div>
          )}
        </div>

       {/* hero sliding text */}
        <div className="hero-overlay">
          <h1 className={`hero-text ${isTransitioning ? 'slide-out' : 'slide-in'}`}>
            {slideTexts[activeSlide]}
          </h1>
        </div>

        <svg className="bottom-wave" viewBox="0 0 1440 320" preserveAspectRatio="none">
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,266.7C96,245,192,203,288,165.3C384,128,480,96,576,117.3C672,139,768,213,864,229.3C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
          />
        </svg>
      </div>

      {/* Impact Cards */}
      <div className="impact-title-section">
        <h2 className="impact-title">Our Key Impact Areas</h2>
      </div>

      <div className="impact-pattern-bg">
        <div className="triangle-layout">
          <div className="top-row">
            <ImpactCard
              iconSrc={EnergyIcon}
              title="Clean Energy Access"
              description="Over 80% of Kenyan households and institutions still rely on biomass..."
              bullets={[
                "Eliminates firewood use in institutions.",
                "Provides safe thermal cooking for 500+ people per setup.",
                "Offsets up to 20 tons of CO₂ annually.",
              ]}
            />
            <ImpactCard
              iconSrc={ColdIcon}
              title="Off-Grid Cold Storage"
              description="Up to 40% of harvest is lost post-harvest due to lack of cold storage..."
              bullets={[
                "Uses thermal energy for cooling — no electricity required.",
                "Preserves milk, fish, and vegetables for longer.",
                "Improves food security, market access and rural economic development.",
              ]}
            />
          </div>
          <div className="bottom-row">
            <ImpactCard
              iconSrc={EmpowerIcon}
              title="Grid Stabilization"
              description="Kenya faces high electricity imports and peak demand..."
              bullets={[
                "Stores surplus solar/geothermal energy during off-peak hours.",
                "Releases heat during peak demand to support the grid.",
                "Reduces reliance on diesel and cross-border power imports.",
              ]}
            />
          </div>
        </div>
      </div>

      <SDGCards />
    </>
  );
};

export default Sustainability;