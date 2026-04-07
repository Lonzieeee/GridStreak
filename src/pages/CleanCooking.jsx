import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { FaFire, FaLeaf, FaBolt, FaClock } from "react-icons/fa";
import SEO from "../components/SEO";
import HealthcareProductsSection from "../components/HospitalsClinics/HealthcareProductsSection";
import "./CleanCooking.css";
import "./HospitalsClinics.css";

const INTRO_DURATION_MS = 8600;

const introBgGroups = {
  2: "cc-animation-common-bg01",
  3: "cc-animation-common-bg01",
  4: "cc-animation-common-bg01",
  5: "cc-animation-common-bg01",
  6: "cc-animation-common-bg02",
  7: "cc-animation-common-bg02",
  8: "cc-animation-common-bg02",
  9: "cc-animation-common-bg02",
  10: "cc-animation-common-bg03",
  11: "cc-animation-common-bg04",
  12: "cc-animation-common-bg03",
  13: "cc-animation-common-bg04",
  14: "cc-animation-common-bg03",
  15: "cc-animation-common-bg04",
  16: "cc-animation-common-bg03",
  17: "cc-animation-common-bg04",
  18: "cc-animation-common-bg05",
  19: "cc-animation-common-bg05",
  20: "cc-animation-common-bg05",
  21: "cc-animation-common-bg05",
  22: "cc-animation-common-bg05",
  23: "cc-animation-common-bg06",
  24: "cc-animation-common-bg06",
  25: "cc-animation-common-bg06",
  26: "cc-animation-common-bg06",
  27: "cc-animation-common-bg07",
  28: "cc-animation-common-bg07",
  29: "cc-animation-common-bg07",
  30: "cc-animation-common-bg07",
  31: "cc-animation-common-bg07",
  32: "cc-animation-common-bg08",
  33: "cc-animation-common-bg08",
  34: "cc-animation-common-bg08",
  35: "cc-animation-common-bg08",
  36: "cc-animation-common-bg09",
  37: "cc-animation-common-bg10",
  38: "cc-animation-common-bg09",
  39: "cc-animation-common-bg10",
  40: "cc-animation-common-bg09",
  41: "cc-animation-common-bg10",
  42: "cc-animation-common-bg09",
  43: "cc-animation-common-bg10",
};

const cookingChallengeStats = [
  "Over 900 million people rely on charcoal, firewood, and kerosene for cooking.",
  "Household air pollution causes over 3.2 million deaths annually.",
  "Families spend a large share of income on cooking fuel and energy.",
  "Traditional cooking contributes to deforestation and CO2 emissions.",
];

const thermalFeatureCards = [
  {
    icon: FaFire,
    title: "Fuel-Free Cooking",
    text: "Eliminates charcoal, firewood, LPG, and kerosene use.",
  },
  {
    icon: FaLeaf,
    title: "Smoke-Free Indoor Air",
    text: "Produces no smoke, fumes, or indoor air pollution.",
  },
  {
    icon: FaBolt,
    title: "Consistent High Heat",
    text: "Delivers reliable high-temperature cooking for African meals.",
  },
  {
    icon: FaClock,
    title: "Long Heat Retention",
    text: "Provides long-duration heat storage for multiple meals per charge.",
  },
];

const offGridBenefits = [
  "Operate in off-grid and remote locations.",
  "Reduce dependence on fuel supply chains.",
  "Deliver consistent cooking performance regardless of energy access.",
  "Support both household and community-scale cooking needs.",
];

const cleanCookingProducts = [
  {
    id: "nano",
    shortLabel: "GridStreak Nano Cooker",
    title: "GridStreak Nano Cooker",
    subtitle: "Clean Cooking for Households",
    body: "Designed for families and small households with reliable, high-heat cooking performance.",
    bullets: [
      "Serves up to 8 people",
      "Delivers up to 8 meals per charge",
      "Optimized for African cooking styles and high-heat meals",
      "Operates with 2 x 600W solar panels",
      "Compact, safe, and easy to use",
    ],
    closing: "Ideal for replacing charcoal and firewood in everyday household cooking.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kilnn.jpg",
  },
  {
    id: "x",
    shortLabel: "GridStreak X Cooker",
    title: "GridStreak X Cooker",
    subtitle: "Community Cooking for Medium-Sized Groups",
    body: "Built for shared kitchens and community use where dependable clean cooking is essential.",
    bullets: [
      "Serves 20-50 people",
      "Provides up to 8 meals per charge",
      "Operates with 4 x 600W solar panels",
      "Suitable for schools, community kitchens, and small institutions",
      "Reduces fuel costs and improves efficiency",
    ],
    closing: "A scalable solution for community-level clean cooking.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kilnn.jpg",
  },
  {
    id: "ultra",
    shortLabel: "GridStreak Ultra Cooker",
    title: "GridStreak Ultra Cooker",
    subtitle: "Large-Scale Cooking & Water Heating",
    body: "Designed for high-demand environments requiring continuous, high-capacity thermal output.",
    bullets: [
      "Serves 100-200 people",
      "Supports both clean cooking and water heating",
      "Operates with up to 10 x 600W solar panels",
      "Built for continuous, high-capacity use",
      "Ideal for schools, hospitals, and large institutions",
    ],
    closing: "A robust system for large institutions and high-volume operations.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kilnn.jpg",
  },
];

const CleanCooking = () => {
  const [showIntro, setShowIntro] = useState(false);

  const introLabelChars = useMemo(() => "Clean Cooking".split(""), []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const shouldReduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (shouldReduceMotion) {
      return undefined;
    }

    setShowIntro(true);

    const hideTimer = window.setTimeout(() => {
      setShowIntro(false);
    }, INTRO_DURATION_MS);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    
    const ct = document.querySelector(".cc-container-vortex");
    if (!ct) return undefined;
    
    // Just reset to neutral position on load
    ct.style.setProperty("--xv", 0);
    ct.style.setProperty("--yv", 0);
    
    return undefined;
  }, []);

  return (
    <>
      <SEO
        title="Clean Cooking Solutions for Households & Communities | GridStreak Energy Startup"
        description="GridStreak provides solar-powered clean cooking systems using thermal energy storage. Affordable, smoke-free cooking for households and communities in off-grid areas."
        canonical="https://gridstreak.com/solutions/clean-cooking"
      />

      <div className="cc-page">
        {showIntro && (
          <div className="cc-animation" aria-hidden="true">
            <div className="cc-animation-title-wrap">
              <h2 className="cc-animation-title">
                {introLabelChars.map((char, index) => (
                  <span
                    key={`${char}-${index}`}
                    className="cc-animation-char"
                    style={{ "--char-index": index }}
                  >
                    {char === " " ? "\u00A0" : char}
                  </span>
                ))}
              </h2>
            </div>

            {Array.from({ length: 43 }, (_, i) => i + 1).map((num) => {
              const groupClass = introBgGroups[num] || "";
              return (
                <div
                  key={`bg-${num}`}
                  className={`cc-animation-bg cc-animation-bg${String(num).padStart(2, "0")} ${groupClass}`.trim()}
                />
              );
            })}
          </div>
        )}

        <section className="cc-hero">
          <div className="cc-hero-overlay" />
          <div className="cc-hero-content">
            <p className="cc-kicker">Clean Cooking Solutions</p>
            <h1>Affordable, Safe, and Reliable Clean Cooking Anywhere</h1>
            <p>
              GridStreak is a clean energy startup delivering advanced clean cooking
              solutions for households, communities, and institutions, powered by
              sand-based thermal energy storage.
            </p>
            <div className="cc-hero-actions">
              <a href="#clean-cooking-systems" className="cc-btn cc-btn-primary">
                Explore Systems
              </a>
              <Link to="/contact" className="cc-btn cc-btn-secondary">
                Contact GridStreak
              </Link>
            </div>
          </div>
        </section>

        <section className="hc-section hc-problem cc-crisis-problem">
          <h2 className="hc-problem-title">
            The Traditional Cooking Fuel <span className="hc-problem-title-accent">Crisis</span>
          </h2>
          <div className="hc-problem-grid">
            <ul className="hc-problem-list hc-problem-list--left" aria-label="Key statistics">
              <li>{cookingChallengeStats[0]}</li>
              <li>{cookingChallengeStats[1]}</li>
            </ul>

            <div className="hc-problem-scene-wrap" aria-hidden="true">
              <div className="hc-cube-scene">
                <div className="hc-cube-platform">
                  <div className="hc-cube-stage">
                    <div />
                    <div />
                    <div />
                    <div />
                  </div>
                </div>
                <div className="hc-cube-bottom">
                  <i>
                    <div className="hc-cube-mid">
                      <i />
                      <i />
                      <i />
                      <i />
                      <i>
                        <div className="hc-cube-top">
                          <i />
                          <i />
                          <i />
                          <i />
                          <i />
                        </div>
                      </i>
                    </div>
                  </i>
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
            </div>

            <ul className="hc-problem-list hc-problem-list--right" aria-label="Operational impact">
              <li>{cookingChallengeStats[2]}</li>
              <li>{cookingChallengeStats[3]}</li>
            </ul>
          </div>
          <p className="hc-highlight hc-problem-foot">
            GridStreak provides a scalable, long-term solution enabling smoke-free,
            cost-effective, and sustainable cooking in both urban and rural
            environments.
          </p>
        </section>

        <section className="cc-section cc-section-dark cc-thermal-section">
          <h2>Clean Cooking Powered by Thermal Energy Storage</h2>
          <p className="cc-thermal-intro">
            GridStreak systems use sand-based thermal energy storage technology to
            store energy and deliver high, consistent heat on demand.
          </p>
          <div className="cc-thermal-cards" role="list" aria-label="Thermal storage benefits">
            {thermalFeatureCards.map((card) => {
              const Icon = card.icon;
              return (
                <article className="cc-thermal-card" role="listitem" key={card.title}>
                  <span className="cc-thermal-icon" aria-hidden="true">
                    <Icon />
                  </span>
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </article>
              );
            })}
          </div>
          <p className="hc-highlight cc-thermal-highlight">
            With a 25+ year lifespan, GridStreak offers a durable and
            cost-effective alternative to conventional cooking systems.
          </p>
        </section>

        <section className="cc-section">
          <h2>Built for Households, Communities &amp; Off-Grid Areas</h2>
          <p>
            GridStreak cookers are designed for real-world environments, including
            rural and underserved regions.
          </p>
          <ul className="cc-list">
            {offGridBenefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p>
            Whether in a home, village, school, or shared kitchen, GridStreak
            ensures reliable clean cooking every day.
          </p>
        </section>

        <HealthcareProductsSection
          sectionId="clean-cooking-systems"
          headingId="clean-cooking-systems-heading"
          sectionTitle="Our Clean Cooking Systems"
          products={cleanCookingProducts}
          imageOverride="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kilnn.jpg"
        />

        <section className="cc-section cc-two-col">
          <div>
            <h2>Solar-Powered Clean Cooking Systems</h2>
            <p>
              GridStreak enables solar-powered cooking at scale, making it one of
              the most practical solutions for off-grid communities.
            </p>
            <ul className="cc-list">
              <li>Store solar energy during the day and cook anytime.</li>
              <li>Reduce or eliminate fuel and electricity costs.</li>
              <li>Enable fully off-grid clean cooking systems.</li>
              <li>Use renewable energy for daily cooking needs.</li>
            </ul>
          </div>
          <div>
            <h3>Flexible Charging Options</h3>
            <ul className="cc-list">
              <li>Charge using grid electricity during off-peak hours.</li>
              <li>Store excess renewable energy for later use.</li>
            </ul>
          </div>
        </section>

        <section className="cc-section cc-emissions">
          <h2>CO2 Emissions Reduction with GridStreak Cookers</h2>
          <p>
            Switching to GridStreak significantly reduces carbon emissions from
            daily cooking.
          </p>
          <div className="cc-emissions-baseline">
            <p>Charcoal cooking emits approximately 2.5-3.0 kg CO2 per kg burned.</p>
            <p>Households can emit 2-5 tons of CO2 annually from cooking.</p>
          </div>
          <div className="cc-savings-grid">
            <div className="cc-savings-card">
              <h3>Nano Cooker</h3>
              <p>2-4 tons CO2 saved per year</p>
            </div>
            <div className="cc-savings-card">
              <h3>X Cooker</h3>
              <p>6-12 tons CO2 saved per year</p>
            </div>
            <div className="cc-savings-card">
              <h3>Ultra Cooker</h3>
              <p>15-30+ tons CO2 saved per year</p>
            </div>
          </div>
        </section>

        <section className="cc-section cc-two-col">
          <div>
            <h2>Safe, Non-Explosive &amp; Built to Last</h2>
            <ul className="cc-list">
              <li>Non-explosive technology with no gas or pressurized fuels.</li>
              <li>No risk of battery fires or thermal runaway.</li>
              <li>Built with stable, non-reactive materials.</li>
              <li>25+ year lifespan with warranty.</li>
              <li>Minimal maintenance requirements.</li>
            </ul>
            <p>A safer alternative to LPG, kerosene, and lithium-ion cookers.</p>
          </div>
          <div>
            <h2>Reliable in Remote &amp; Emergency Environments</h2>
            <ul className="cc-list">
              <li>Operate in off-grid and rural areas.</li>
              <li>Work during power outages and grid instability.</li>
              <li>Ideal for emergency response and humanitarian use.</li>
              <li>Suitable for refugee camps and disaster relief operations.</li>
            </ul>
          </div>
        </section>

        <section className="cc-section">
          <h2>Measurable Impact for Households &amp; Communities</h2>
          <ul className="cc-list">
            <li>Reduced household fuel costs.</li>
            <li>Elimination of indoor air pollution.</li>
            <li>Reduced deforestation and charcoal demand.</li>
            <li>Improved health outcomes for families.</li>
            <li>Increased access to clean and reliable cooking energy.</li>
          </ul>
        </section>

        <section className="cc-section cc-scale">
          <h2>A Scalable Solution for Clean Cooking</h2>
          <p>GridStreak enables clean cooking at scale across:</p>
          <div className="cc-chip-row">
            <span>Households</span>
            <span>Rural communities</span>
            <span>Schools and institutions</span>
            <span>Urban and peri-urban settlements</span>
          </div>
          <p>
            Our modular systems allow communities to start small and scale over
            time.
          </p>
        </section>

        <section className="cc-section cc-cta cc-cta-vortex">
          <div className="cc-container-vortex">
            <div className="cc-vortex">
              <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501 297.81">
                <ellipse cx="251.32" cy="130.01" rx="248.36" ry="125.82" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10, strokeWidth:'2px'}} />
                <ellipse cx="251.73" cy="150.5" rx="160.66" ry="81.39" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10, strokeWidth:'1.6px'}} />
                <ellipse cx="251.43" cy="186.57" rx="107.6" ry="54.51" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m123.45,22.63c52.05,62.7,97.93,131.45,114.34,213.52.41,2.05,1.23,5.33,1.23,5.33,4.92,18.85,7.79,35.66,10.88,54.9" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m248.86,4.6c2.05,97.95,6.15,194.67,9.31,291.95" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m35.75,67.71c6.15,2.05,11.89,5.33,17.62,8.61,21.31,13.11,40.16,24.59,59.84,40.16,33.61,26.23,56.97,49.59,82.38,84.02,2.46,3.28,6.97,10.25,8.61,13.52,18.03,26.23,31.15,52.46,37.22,82.46" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m5.42,127.55c19.35,2.86,38.36,7.77,56.78,14.33,18.57,6.62,36.53,14.92,53.8,24.41,17.83,9.79,34.96,20.69,50.32,34.09,13.95,12.16,26.41,26.36,36.86,41.65,10.26,14.99,18.58,31.3,24.51,48.48.74,2.15,1.45,4.31,2.11,6.49" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m33.29,190.66c47.95-12.7,102.05-4.51,143.85,27.46,27.05,20.49,45.9,47.54,56.53,78.63" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m137.39,241.48c11.89-12.7,29.1-22.54,46.31-19.26,36.07,5.74,50.82,43.44,61.11,73.93" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m458.7,61.16c-46.31,23.36-84.84,58.61-119.26,98.77-10.66,13.11-18.85,25.41-27.05,39.34-17.21,31.15-31.15,63.11-36.91,98.23" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m495.58,115.25c-42.21,8.61-80.74,25.82-117.62,52.05-31.97,22.13-58.2,46.72-75.41,81.15-.82.82-2.05,3.69-2.87,4.51-8.2,14.75-13.52,28.28-18.2,44.71" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m479.19,180.01c-18.21-1.09-36.54-.34-54.6,2.23-18.1,2.57-35.95,6.98-53.15,13.19-17.54,6.34-34.66,14.39-49.94,25.16-12.74,8.98-24.38,19.6-34.01,31.88-9.22,11.75-16.53,25.03-21.02,39.3-.57,1.8-1.09,3.61-1.56,5.44" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m384.93,236.57c-14.34-13.52-34.84-25-55.33-16.8-31.97,13.11-50,45.9-60.17,77.81" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="3.37" cy="127.14" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <path d="m378.37,21.81c-33.2,38.93-57.79,84.02-77.46,131.56-18.85,45.9-31.15,94.26-36.16,143.74" style={{fill:'none', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="36.16" cy="67.3" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="33.7" cy="191.07" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="136.16" cy="242.71" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="384.52" cy="236.16" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="479.6" cy="180.42" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="497.63" cy="114.84" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="459.11" cy="60.75" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="377.96" cy="22.22" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="249.27" cy="3.37" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
                <circle cx="123.04" cy="22.22" r="2.87" style={{fill:'currentColor', stroke:'currentColor', strokeMiterlimit:10}} />
              </svg>
            </div>

            <div className="cc-mist"></div>

            <div className="cc-orbs">
              <div className="cc-orb">
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
              </div>
              <div className="cc-orb">
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
              </div>
              <div className="cc-orb">
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
                <div className="cc-dot"></div>
              </div>
              <div className="cc-hide-orb"></div>
            </div>

            <div className="cc-tilt">
              <span className="cc-tag">Clean Future</span>
              <h2>Energy for Every Kitchen</h2>
              <p>From households to communities, GridStreak delivers <span>sustainable clean cooking solutions</span> powered by solar thermal technology.</p>
              <Link to="/contact" className="cc-btn cc-btn-primary" style={{marginTop: '1.5rem'}}>
                Start Your Journey
              </Link>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default CleanCooking;

