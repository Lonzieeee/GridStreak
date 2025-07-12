import React, { useEffect } from "react";
import "./WhyCollaborate.css";

import innovationIcon from "../../assets/innovation.png";
import circularIcon from "../../assets/circular.png";
import impactIcon from "../../assets/impact.png";
import scalableIcon from "../../assets/scalable.png";

const benefits = [
  {
    title: "Proven Innovation",
    description: "Our heat-storage bricks offer scalable, circular energy for off-grid, industrial, and utility use.",
    icon: innovationIcon,
  },
  {
    title: "Circular, Clean & Local",
    description: "GridStreak uses plastic-to-energy and natural, low-cost materials to reduce emissions, waste, and create jobs.",
    icon: circularIcon,
  },
  {
    title: "High-Impact Use Cases",
    description: "From school kitchens to grid stabilization, our tech enables climate-smart, locally adapted infrastructure.",
    icon: impactIcon,
  },
  {
    title: "Scalable & Customizable",
    description: "GridStreak partners with communities to create scalable thermal solutions for grid backup, clean cooking, and peak shaving.",
    icon: scalableIcon,
  },
];

const WhyCollaborate = () => {
  useEffect(() => {
    const cards = document.querySelectorAll(".benefit-card");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          } else {
            entry.target.classList.remove("in-view"); 
          }
        });
      },
      { threshold: 0.3 }
    );

    cards.forEach((card) => observer.observe(card));
    return () => cards.forEach((card) => observer.unobserve(card));
  }, []);

  return (
    <section className="why-collaborate-section">
      <h2 className="why-collab-heading">Why Collaborate with GridStreak?</h2>
      <div className="benefits-grid">
        {benefits.map((benefit, index) => (
          <div
            className={`benefit-card ${index % 2 === 0 ? "slide-left" : "slide-right"}`}
            key={index}
          >
            <div className="benefit-content">
              <img src={benefit.icon} alt={benefit.title} className="benefit-icon" />
              <h3>{benefit.title}</h3>
              <p>{benefit.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default WhyCollaborate;
