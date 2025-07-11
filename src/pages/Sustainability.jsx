import React, { useState, useEffect } from "react";
import "./Sustainability.css";

import background1 from "../assets/Background1.jpg";
import background2 from "../assets/Background2.jpg";
import background3 from "../assets/Background3.jpg";

const Sustainability = () => {
  const [activeSlide, setActiveSlide] = useState(1);

  // Preload images to avoid flashes
  useEffect(() => {
    const images = [background1, background2, background3];
    images.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, []);

  return (
    <div className="hero-wrapper">
      <div
        className="hero-slide-track"
        style={{ transform: `translateX(-${(activeSlide - 1) * 100}%)` }}
      >
        {/* Slide 1 */}
        <div
          className="hero-slide"
          style={{ backgroundImage: `url(${background1})` }}
        >
          <div className="hero-overlay">
            <h1 className="hero-text">The brighter side of the future!</h1>
          </div>
        </div>

        {/* Slide 2 */}
        <div
          className="hero-slide"
          style={{ backgroundImage: `url(${background2})` }}
        >
          <div className="hero-overlay">
            <h1 className="hero-text">Powering a new clean future</h1>
          </div>
        </div>

        {/* Slide 3 */}
        <div
          className="hero-slide"
          style={{ backgroundImage: `url(${background3})` }}
        >
          <div className="hero-overlay">
            <div className="hero-info-boxes">
              <div className="info-box delay-1">
                At GridStreak, impact is not just a byproduct; it is the
                foundation of everything we stand for. Our innovative and
                affordable thermal battery technology is designed to solve
                urgent, real-world problems at the intersection of energy,
                environment, and society.
              </div>
              <div className="info-box delay-2">
                From clean cooking in schools to cold storage for farmers, we
                are creating measurable, scalable future in underserved
                societies in Kenya and the world at large.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dot Navigation */}
      <div className="circle-nav">
        <div
          className={`nav-dot ${activeSlide === 1 ? "active" : ""}`}
          onClick={() => setActiveSlide(1)}
        ></div>
        <div
          className={`nav-dot ${activeSlide === 2 ? "active" : ""}`}
          onClick={() => setActiveSlide(2)}
        ></div>
        <div
          className={`nav-dot ${activeSlide === 3 ? "active" : ""}`}
          onClick={() => setActiveSlide(3)}
        ></div>
      </div>
    </div>
  );
};

export default Sustainability;
