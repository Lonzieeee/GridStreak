import React, { useEffect, useState } from "react";
import heroImage from "../assets/hero1.webp";
import { Link } from "react-router-dom";
import "./Home.css";
import flexibleIcon from "../assets/flexible.svg";
import carbonIcon from "../assets/zero-carbon.svg";
import reliableIcon from "../assets/reliable.svg";
import scalableIcon from "../assets/scalable.svg"
import ProcessFlow from "../components/ProcessFlow";

const heroSlides = [
  {
    heading: "Zero-Carbon Grid Stability Starts Here",
    sub: "Our thermal bricks convert plastic waste into grid resilience—stabilizing networks with 100% clean energy storage.",
  },
  {
    heading: "Grid Stability Powered by 100% Clean and Renewable Energy.",
    sub: "We're pioneering plastic-to-grid storage that is clean, scalable, and reliable for the future.",
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
              Adaptable energy storage systems that evolve with grid demand and
              size.
            </p>
          </div>
          <div className="feature-card">
            <img src={carbonIcon} alt="Carbon Icon" className="feature-icon" />
            <h3>Zero Carbon Emissions</h3>
            <p>
              Clean, plastic-powered energy storage that doesn't pollute the
              planet.
            </p>
          </div>
          <div className="feature-card">
            <img src={reliableIcon} alt="Reliable Icon" className="feature-icon" />
            <h3>Reliable</h3>
            <p>
              Proven uptime and dependable output even during peak energy
              usage.
            </p>
          </div>
          <div className="feature-card">
            <img src={scalableIcon} alt="scalable icon" className="feature-icon" />
            <h3>Scalable</h3>
            <p>
              Designed to grow with your infrastructure—city to continent scale.
            </p>
          </div>
        </div>
      </section>
      <ProcessFlow />
    </div>
  );
}

export default Home;
