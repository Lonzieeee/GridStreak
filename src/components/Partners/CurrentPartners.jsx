import React, { useEffect, useRef, useState } from "react";
import "./CurrentPartners.css";

const spotlightItems = [
  {
    id: "zalisha",
    name: "Zalisha",
    src: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/zalisha.webp",
    href: "https://www.zalishafrica.com/",
  },
  {
    id: "kenyatta",
    name: "Kenyatta University",
    src: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kenyatta.jpeg",
    href: "https://www.ku.ac.ke/",
  },
  {
    id: "kenia",
    name: "KENIA",
    src: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kenia.png",
    href: "https://kenia.go.ke/",
  },
  {
    id: "growthafrica",
    name: "GrowthAfrica",
    src: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/nKwS8kxo.jpg",
    href: "https://www.linkedin.com/feed/update/urn:li:activity:7474012653309403136/",
  },
  {
    id: "palladium",
    name: "Palladium Challenge Fund",
    src: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Palladium_Logo-removebg-preview.png",
    href: "https://thepalladiumgroup.com/news/2025-Challenge-Fund-Shortlist-Powering-Progress-in-Remote-Communities",
  },
];

const CurrentPartners = () => {
  const sectionRef = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (prefersReducedMotion) {
      setInView(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.22, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`partners-spotlight${inView ? " is-inview" : ""}`}
      aria-labelledby="partners-spotlight-heading"
    >
      <div className="partners-spotlight__inner">
        <p className="partners-spotlight__eyebrow">Recognition & collaboration</p>
        <h2 id="partners-spotlight-heading" className="partners-spotlight__heading">
          Partners, Awards and Media
        </h2>

        <div className="partners-spotlight__grid" role="list">
          {spotlightItems.map((item, index) => (
            <a
              key={item.id}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`partners-spotlight__card partners-spotlight__card--${item.id}`}
              role="listitem"
              style={{ "--card-index": index }}
              aria-label={`${item.name} (opens in a new tab)`}
            >
              <img src={item.src} alt="" loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurrentPartners;
