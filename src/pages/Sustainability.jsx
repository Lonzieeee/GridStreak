import React, { useState, useEffect } from "react";
import "./Sustainability.css";
import SDGCards from "../components/SDGCards";






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
      <div className="hero-wrapper gradient-bg">
        <div
          className="hero-slide-track"
          style={{ transform: `translateX(-${(activeSlide - 1) * 100}%)` }}
        >
          <div className="hero-slide">
            <div className="hero-overlay">
              <h1 className="hero-text">The brighter side of the future!</h1>
            </div>
          </div>

          <div className="hero-slide">
            <div className="hero-overlay">
              <h1 className="hero-text">Powering a new clean future</h1>
            </div>
          </div>

          <div className="hero-slide">
            <div className="hero-overlay">
              <div className="typewriter-box" id="typewriter-multi"></div>
            </div>
          </div>
        </div>

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

        <svg
          className="bottom-wave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            fillOpacity="1"
            d="M0,288L48,266.7C96,245,192,203,288,165.3C384,128,480,96,576,117.3C672,139,768,213,864,229.3C960,245,1056,203,1152,186.7C1248,171,1344,181,1392,186.7L1440,192V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
          ></path>
        </svg>
      </div>

                    {/* IMPACT */}
<div className="impact-flow-container">
  <h2 className="impact-title">Our Key Impact Areas</h2>

  <svg
    className="impact-path"
    viewBox="0 0 300 1200"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M150 0 C150 200, 150 200, 150 400 S150 600, 150 800 S150 1000, 150 1200"
      stroke="#AFF122"
      strokeWidth="4"
      fill="none"
      strokeDasharray="8,8"
    />
  </svg>
                        {/* part 1 */}
<div className="impact-station">
  <div className="flip-box">
    <div className="flip-box-inner">
      <div className="flip-box-front">
        <div className="icon">
         <svg width="40" height="40" viewBox="0 0 24 24" fill="#AFF122" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C11.5 7 8 8.5 8 12c0 2.2 1.8 4 4 4s4-1.8 4-4c0-2-1-2.5-2-5-.5-1-.8-3-.8-5z" />
</svg>

        </div>
        <h3>Clean Energy Access For Undeserved Communities</h3>
        <p className="description">
         Over 80% of Kenyan households and public institutions still rely on biomass (firewood and charcoal) for daily cooking and heating. This dependence leads to deforestation and land degradation, Indoor air pollution causing respiratory illness and costs time and labor for wood collection especially for women and children
        </p>
      </div>
      <div className="flip-box-back">
        <h3>Our Impact</h3>
        <ul className="impact-list">
          <li>GridStreak thermal batteries eliminate the need for daily firewood in institutional kitchens like schools, prisons, and hospitals.</li>
          <li>Gridstreak enables smokeless, safe and efficient thermal cooking for up to 500 people per setup.</li>
          <li>Each system offsets up to 20 tons of CO₂ annually, a significant climate impact</li>
        </ul>
      </div>
    </div>
  </div>
</div>

{/*impact 2 */}
<div className="impact-station">
  <div className="flip-box">
    <div className="flip-box-inner">
      <div className="flip-box-front">
        <div className="icon">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="#AFF122" xmlns="http://www.w3.org/2000/svg">
  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10
           10-4.48 10-10S17.52 2 12 2zm1 17h-2v-5H8l4-8v5h3l-2 8z" />
</svg>




        </div>
        <h3>Off-Grid Cold Storage</h3>
        <p className="description">
          In Kenya, up to 40% of farm produce is lost post-harvest due to the absence of affordable cold storage. Smallholder farmers struggle to preserve perishables and reach larger markets.
        </p>
      </div>
      <div className="flip-box-back">
        <h3>Our Impact</h3>
        <ul className="impact-list">
          <li>GridStreak powers off-grid cold rooms using stored thermal energy paired with absorption/adsorption cooling no electricity required.</li>
          <li>Helps farmers preserve milk, fish, fruits, and vegetables for longer, increasing their income and reducing waste.</li>
          <li>Supports food security, market access, and rural economic development.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

{/* impact 3 */}
<div className="impact-station">
  <div className="flip-box">
    <div className="flip-box-inner">
      <div className="flip-box-front">
        <div className="icon">
         <svg width="40" height="40" viewBox="0 0 24 24" fill="#AFF122" xmlns="http://www.w3.org/2000/svg">
  <path d="M16 4h-1V2h-6v2H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H8V6h8v14zm-2.5-8.5H13V8l-4 5h2v4l4-5z"/>
</svg>


        </div>
        <h3>Grid Stabilization (Future)</h3>
        <p className="description">
          Kenya imports over 4,000 MWh of electricity daily and experiences growing peak demand challenges. Utilities rely on expensive backup diesel generation or power shedding.
        </p>
      </div>
      <div className="flip-box-back">
        <h3>Our Impact</h3>
        <ul className="impact-list">
          <li>GridStreak batteries store surplus energy (e.g., geothermal or solar) during off-peak hours.</li>
          <li>Release stored heat during high-demand times for industrial processes or grid support, reducing stress on national infrastructure.</li>
          <li>Helps reduce reliance on fossil-fueled peaking plants and cross-border power imports.</li>
        </ul>
      </div>
    </div>
  </div>
</div>

</div>

<SDGCards />



    </>
  );
};

export default Sustainability;
