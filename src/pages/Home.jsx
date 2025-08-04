import React, { useEffect, useState } from "react";
const heroImage = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/hero1.webp";
import { Link } from "react-router-dom";
import "./Home.css";
const flexibleIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/flexible.svg";
const carbonIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/zero-carbon.svg";
const reliableIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/reliable.svg";
const scalableIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/scalable.svg"
import ProcessFlow from "../components/ProcessFlow";
import Impact from "../components/Impact"
import Sustainability from "../components/Sustainability";
import WhoWeAre from "../components/WhoWeAre";
import MapSection from "../components/MapSection";

const heroSlides = [
  {
    heading: "Zero-Carbon Grid Stability Starts Here",
    sub: "Our thermal bricks convert plastic waste into grid resilience—stabilizing networks with 100% clean energy storage.",
  },
  {
    heading: "Grid Stability Powered by 100% Clean and Renewable Energy.",
    
  },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isSliding, setIsSliding] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsSliding(true);
      setTimeout(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
        setIsSliding(false);
      }, 600);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section
        className="hero"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div
            className={`hero-slide ${
              isSliding ? "slide-out-left" : "slide-in-right"
            }`}
          >
            <h1>{heroSlides[currentSlide].heading}</h1>
            <p>{heroSlides[currentSlide].sub}</p>
          </div>
          <Link to="/company" className="hero-btn">
            Learn More
          </Link>
        </div>
      </section>

      {/* Why GridStreak Section */}
      <section className="why-gridstreak">
        <h2>Why GridStreak?</h2>
        <div className="features">
          <div className="feature-card">
            <img src={flexibleIcon} alt="Flexible Storage" className="feature-icon" />
            <h3>Flexible Storage</h3>
            <p>
              Works with Multiple renewable sources.
            </p>
          </div>
          <div className="feature-card">
            <img src={carbonIcon} alt="Carbon Icon" className="feature-icon" />
            <h3>Zero Carbon Emissions</h3>
            <p>
             Fully decoupled from fossil fuel systems.
            </p>
          </div>
          <div className="feature-card">
            <img src={reliableIcon} alt="Reliable Icon" className="feature-icon" />
            <h3>Reliable</h3>
            <p>
             Store heat for hours to days with minimal losses and providing instant dispatch.
            </p>
          </div>
          <div className="feature-card">
            <img src={scalableIcon} alt="scalable icon" className="feature-icon" />
            <h3>Scalable</h3>
            <p>
             Modular units fits any size project.
            </p>
          </div>
        </div>
      </section>
      <WhoWeAre />
      <ProcessFlow />
      <Impact />
      <Sustainability />
      <MapSection />
    </div>
  );
}

export default Home;
