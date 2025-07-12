import React from "react";
import "./CurrentPartners.css";

import zalishaLogo from "../../assets/zalisha.webp";
import kenyattaLogo from "../../assets/kenyatta.jpeg";
import keniaLogo from "../../assets/kenia.png";

const partnerLogos = [
  { src: zalishaLogo, alt: "Zalisha", href: "https://www.zalishafrica.com/" },
  { src: kenyattaLogo, alt: "Kenyatta University", href: "https://www.ku.ac.ke/" },
  { src: keniaLogo, alt: "KENIA", href: "https://kenia.go.ke/" },
];

const CurrentPartners = () => {
  return (
    <section className="partner-carousel-section">
      <h2 className="partner-carousel-heading">Our Current Partners</h2>
      <div className="carousel">
        <div className="carousel-track">
          {[...partnerLogos, ...partnerLogos, ...partnerLogos].map((logo, index) => (
            <a
              key={index}
              href={logo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="carousel-logo"
            >
              <img src={logo.src} alt={logo.alt} />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentPartners;
