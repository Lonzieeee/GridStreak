import React from "react";
import "./Company.css";
import heroImage from "../assets/Company_Hero.jpg";
import storyImage1 from "../assets/story1.webp";
import storyImage2 from "../assets/story2.webp";
// import partnersImage from "../assets/partners.png"; 



function Company() {
  return (
    <div className="company-page">
      {/* Hero Section */}
      <section className="company-hero" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay">
        <div className="hero-content">
          <h2>About GridStreak</h2>
          <p>Innovation that moves industries forward.</p>
        </div>
        </div>
      </section>

      {/* Our Story Sections */}
      <section className="our-story">
        <h3>Our Story</h3>
        <div className="story-section">
          <img src={storyImage1} alt="Story Part 1" />
          <p>GridStreak began with a vision to redefine how technology transforms industries. Our passion lies in creating solutions that push the boundaries of what’s possible.</p>
        </div>
        <div className="story-section reverse">
          <img src={storyImage2} alt="Story Part 2" />
          <p>Over the years, we’ve grown into a trusted partner for global companies seeking digital transformation, with a relentless focus on innovation and integrity.</p>
        </div>
      </section>

      {/* Our Values */}
      <section className="our-values">
        <h3>Our Values</h3>
        <ul>
          <li><strong>Innovation:</strong> We embrace bold ideas and creative solutions.</li>
          <li><strong>Integrity:</strong> We act with honesty and transparency.</li>
          <li><strong>Collaboration:</strong> We grow through teamwork and partnerships.</li>
          <li><strong>Excellence:</strong> We strive for the highest standards in everything we do.</li>
        </ul>
      </section>

      {/* Partner Companies */}
      <section className="our-partners">
        <h3>Companies We’ve Worked With</h3>
        {/* <img src={partnersImage} alt="Partner Logos" /> */}
      </section>
    </div>
  );
}

export default Company;
