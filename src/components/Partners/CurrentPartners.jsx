import React from "react";
import "./CurrentPartners.css";

const zalishaLogo = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/zalisha.webp";
const kenyattaLogo = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kenyatta.jpeg";
const keniaLogo = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kenia.png";

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
