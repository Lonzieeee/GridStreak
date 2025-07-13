import React, { useEffect, useState } from "react";
import "./PartnerCTA.css";

const typingTexts = [
  "GridStreak",
  "Powering a New Clean Future, Together",
];

const PartnerCTA = () => {
  const [currentText, setCurrentText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout;

    if (isTyping) {
      if (charIndex < typingTexts[textIndex].length) {
        timeout = setTimeout(() => {
          setCurrentText((prev) => prev + typingTexts[textIndex][charIndex]);
          setCharIndex((prev) => prev + 1);
        }, 80);
      } else {
        timeout = setTimeout(() => {
          setIsTyping(false);
        }, 2000); 
      }
    } else {
      timeout = setTimeout(() => {
        setCurrentText("");
        setCharIndex(0);
        setTextIndex((prev) => (prev + 1) % typingTexts.length);
        setIsTyping(true);
      }, 400);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isTyping, textIndex]);

  return (
    <section className="partnercta-section">
      <div className="partnercta-left">
        <h1 className="typewriter-title">Let’s Build the Future Together</h1>
        <p className="typewriter-sub">
          <span className="type-text">{currentText}</span>
          <span className="blinker">|</span>
        </p>
      </div>

      <div className="partnercta-right">
        <div className="cta-card">
          <h2>Interested in becoming a partner?</h2>
          <p>
            We’re looking for collaborators who share our vision for clean energy access,
            circular systems, and community-first innovation.
          </p>
          <p>📩 <strong>Email us:</strong> <a href="mailto:partnerships@gridstreak.com">partnerships@gridstreak.com</a></p>

          <p>Or use the form below:</p>
          <a href="/contact" className="cta-button">Let's Connect</a>
        </div>
      </div>
    </section>
  );
};

export default PartnerCTA;
