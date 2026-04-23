import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import {
  FaBatteryFull,
  FaBolt,
  FaChargingStation,
  FaClock,
  FaFire,
  FaHeartbeat,
  FaHome,
  FaIndustry,
  FaSchool,
  FaUsers,
  FaUtensils,
  FaLeaf,
  FaLungs,
  FaMoneyBillWave,
  FaPlug,
  FaSeedling,
  FaSolarPanel,
  FaTree,
} from "react-icons/fa";
import SEO from "../components/SEO";
import HealthcareProductsSection from "../components/HospitalsClinics/HealthcareProductsSection";
import PageIntroAnimation from "../components/PageIntroAnimation";
import CookingCrisisCarousel from "../components/CleanCooking/CookingCrisisCarousel";
import ImpactCountStat from "../components/CleanCooking/ImpactCountStat";
import "./CleanCooking.css";
import "./HospitalsClinics.css";

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
    sections: [
      {
        title: "Overview",
        text: "Designed for families and small households, delivering reliable high-heat cooking performance for everyday meals and weekly routines.",
        icon: FaHome,
      },
      { title: "Carbon Impact", text: "Avoids about 2-4 tons of CO2 emissions each year per household, depending on usage patterns.", icon: FaLeaf, highlight: true },
      { title: "Capacity", text: "Comfortably serves up to 8 people in a typical family setting, including peak meal times.", icon: FaHeartbeat },
      {
        title: "Meals Per Charge",
        text: "Delivers up to 8 meals per charge, optimized for African cooking styles, high-heat dishes, and long simmer times.",
        icon: FaClock,
      },
      { title: "Power Input", text: "Operates efficiently with 2 x 600W solar panels for dependable daytime charging and predictable energy planning.", icon: FaSolarPanel },
      {
        title: "Best Fit",
        text: "Compact, safe, and easy to use, making it ideal for replacing charcoal and firewood in everyday household cooking.",
        icon: FaBolt,
      },
    ],
    bodyParagraphs: [
      "Designed for families and small households with reliable, high-heat cooking performance.",
      { text: "2-4 tons CO2 saved per year.", highlight: true },
    ],
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
    sections: [
      {
        title: "Overview",
        text: "Built for shared kitchens and community cooking where dependable clean heat is essential every day across multiple meals.",
        icon: FaUtensils,
      },
      { title: "Carbon Impact", text: "Cuts roughly 6-12 tons of CO2 emissions per year, depending on usage intensity and fuel displacement.", icon: FaLeaf, highlight: true },
      { title: "Capacity", text: "Designed to serve about 20-50 people across schools, feeding programs, or community kitchens.", icon: FaUsers },
      { title: "Meals Per Charge", text: "Provides up to 8 meals per charge with stable heat output and consistent cooking quality.", icon: FaClock },
      {
        title: "Power Input",
        text: "Operates with 4 x 600W solar panels to reduce fuel costs, improve operating efficiency, and support regular daily service.",
        icon: FaSolarPanel,
      },
      {
        title: "Best Fit",
        text: "Well suited for schools, community kitchens, and small institutions as a scalable clean-cooking solution that can grow with demand.",
        icon: FaSchool,
      },
    ],
    bodyParagraphs: [
      "Built for shared kitchens and community use where dependable clean cooking is essential.",
      { text: "6-12 tons CO2 saved per year.", highlight: true },
    ],
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
    sections: [
      {
        title: "Overview",
        text: "Designed for high-demand environments that require continuous, high-capacity thermal output and operational reliability.",
        icon: FaChargingStation,
      },
      { title: "Carbon Impact", text: "Can avoid 15-30+ tons of CO2 emissions per year at institutional scale with sustained daily operation.", icon: FaLeaf, highlight: true },
      { title: "Capacity", text: "Built to serve approximately 100-200 people in high-volume operations such as boarding facilities.", icon: FaUsers },
      {
        title: "Operating Scope",
        text: "Supports both clean cooking and water heating at institutional scale for continuous high-capacity use across multiple departments.",
        icon: FaFire,
      },
      { title: "Power Input", text: "Operates with up to 10 x 600W solar panels to sustain large daily demand and long service windows.", icon: FaSolarPanel },
      {
        title: "Best Fit",
        text: "Ideal for schools, hospitals, and large institutions needing a robust high-volume energy system for mission-critical operations.",
        icon: FaIndustry,
      },
    ],
    bodyParagraphs: [
      "Designed for high-demand environments requiring continuous, high-capacity thermal output.",
      { text: "15-30+ tons CO2 saved per year.", highlight: true },
    ],
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

const solarCookingCards = [
  {
    icon: FaSolarPanel,
    title: "Store Solar Energy",
    description: "Store solar energy during the day and cook anytime.",
  },
  {
    icon: FaMoneyBillWave,
    title: "Lower Daily Costs",
    description: "Reduce or eliminate fuel and electricity costs.",
  },
  {
    icon: FaPlug,
    title: "Fully Off-Grid Ready",
    description: "Enable fully off-grid clean cooking systems.",
  },
  {
    icon: FaSeedling,
    title: "Renewable Every Day",
    description: "Use renewable energy for daily cooking needs.",
  },
  {
    icon: FaChargingStation,
    title: "Flexible Off-Peak Charging",
    description: "Charge using grid electricity during off-peak hours.",
  },
  {
    icon: FaBatteryFull,
    title: "Store Extra Energy",
    description: "Store excess renewable energy for later use.",
  },
];

const impactInfoCards = [
  {
    icon: FaMoneyBillWave,
    shortLabel: "COST",
    title: "Lower Fuel Costs",
    stat: "Up to 80%",
    countUp: { type: "single", end: 80, format: (n) => `Up to ${Math.round(n)}%` },
    description: "less on household fuel in a typical year.",
    color: "#f2c300",
  },
  {
    icon: FaLungs,
    shortLabel: "AIR",
    title: "Cleaner Indoor Air",
    stat: "Zero smoke",
    countUp: null,
    description: "No smoke or indoor fumes from the cookstove.",
    color: "#13b5cf",
  },
  {
    icon: FaTree,
    shortLabel: "FOREST",
    title: "Forest Protection",
    stat: "2–30+ tonnes",
    countUp: {
      type: "range",
      endMin: 2,
      endMax: 30,
      format: (a, b) => `${Math.round(a)}–${Math.round(b)}+ tonnes`,
    },
    description: "CO₂ avoided per home per year, by system size.",
    color: "#145b8c",
  },
  {
    icon: FaHeartbeat,
    shortLabel: "HEALTH",
    title: "Healthier Families",
    stat: "600K+ per year",
    countUp: { type: "k", end: 600, format: (n) => `${Math.round(n)}K+ per year` },
    description: "deaths in sub-Saharan Africa from home air pollution. Clean cooking cuts exposure.",
    color: "#c11764",
  },
  {
    icon: FaBolt,
    shortLabel: "ACCESS",
    title: "Reliable Energy Access",
    stat: "25+ years",
    countUp: { type: "single", end: 25, format: (n) => `${Math.round(n)}+ years` },
    description: "expected life. Steady clean heat for cooking, every day.",
    color: "#f03b47",
  },
];

const IMPACT_CENTER = 200;
const IMPACT_INNER_RADIUS = 80;
const IMPACT_OUTER_RADIUS = 178;

const toRadians = (angle) => (angle * Math.PI) / 180;

const getImpactPlacement = (index) => {
  const angle = -90 + index * 72 + 36;
  const rad = toRadians(angle);
  const tipRadius = 420;
  const tipX = 600 + tipRadius * Math.cos(rad);
  const tipY = 450 + tipRadius * Math.sin(rad);
  const cos = Math.cos(rad);

  let align = "center";
  if (cos > 0.2) {
    align = "left";
  } else if (cos < -0.2) {
    align = "right";
  }

  return {
    angle,
    left: tipX / 12,
    top: tipY / 9,
    align,
  };
};

const createImpactSegmentPath = (startAngle, endAngle) => {
  const startRad = toRadians(startAngle);
  const endRad = toRadians(endAngle);

  const x1 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.cos(startRad);
  const y1 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.sin(startRad);
  const x2 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.cos(startRad);
  const y2 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.sin(startRad);
  const x3 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.cos(endRad);
  const y3 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.sin(endRad);
  const x4 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.cos(endRad);
  const y4 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.sin(endRad);

  return `
    M ${x1} ${y1}
    L ${x2} ${y2}
    A ${IMPACT_OUTER_RADIUS} ${IMPACT_OUTER_RADIUS} 0 0 1 ${x3} ${y3}
    L ${x4} ${y4}
    A ${IMPACT_INNER_RADIUS} ${IMPACT_INNER_RADIUS} 0 0 0 ${x1} ${y1}
    Z
  `;
};

const getSolarGridConfig = (width) => {
  if (width <= 640) {
    return { columns: 1, cardWidth: 280, cardHeight: 220, gap: 16 };
  }

  if (width <= 1024) {
    return { columns: 2, cardWidth: 220, cardHeight: 220, gap: 16 };
  }

  return { columns: 3, cardWidth: 275, cardHeight: 245, gap: 24 };
};

const getImpactCircleSize = (width) => {
  if (width <= 900) {
    return Math.min(width * 0.88, 360);
  }

  return Math.min(Math.max(width * 0.34, 320), 430);
};

const CleanCooking = () => {
  const [solarVisible, setSolarVisible] = useState(false);
  const [solarStart, setSolarStart] = useState(false);
  const [impactVisible, setImpactVisible] = useState(false);
  const [impactCountActive, setImpactCountActive] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  const solarSectionRef = useRef(null);
  const impactSectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  const solarGrid = useMemo(() => getSolarGridConfig(viewportWidth), [viewportWidth]);
  const impactCircleSize = useMemo(() => getImpactCircleSize(viewportWidth), [viewportWidth]);
  const isMobileImpact = viewportWidth <= 900;

  const getSolarGridPosition = (index) => {
    const row = Math.floor(index / solarGrid.columns);
    const col = index % solarGrid.columns;

    return {
      x: col * (solarGrid.cardWidth + solarGrid.gap),
      y: row * (solarGrid.cardHeight + solarGrid.gap),
    };
  };

  const getSolarDeckCenter = () => {
    const totalRows = Math.ceil(solarCookingCards.length / solarGrid.columns);
    const totalWidth =
      solarGrid.columns * solarGrid.cardWidth + (solarGrid.columns - 1) * solarGrid.gap;
    const totalHeight =
      totalRows * solarGrid.cardHeight + (totalRows - 1) * solarGrid.gap;

    return {
      x: totalWidth / 2 - solarGrid.cardWidth / 2,
      y: totalHeight / 2 - solarGrid.cardHeight / 2,
    };
  };

  const getSolarStackPosition = (index) => {
    const center = getSolarDeckCenter();
    const step = index * 5;

    return {
      x: center.x + step,
      y: center.y - step * 0.35,
      rotate: (index % 2 === 0 ? -1 : 1) * index * 0.9,
      scale: 1 - index * 0.02,
      zIndex: solarCookingCards.length - index,
    };
  };

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  useEffect(() => {
    let revealTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSolarVisible(true);
          revealTimer = window.setTimeout(() => {
            setSolarStart(true);
          }, 500);
        } else {
          setSolarVisible(false);
          setSolarStart(false);
          if (revealTimer) {
            window.clearTimeout(revealTimer);
          }
        }
      },
      { threshold: 0.15 },
    );

    if (solarSectionRef.current) {
      observer.observe(solarSectionRef.current);
    }

    return () => {
      observer.disconnect();
      if (revealTimer) {
        window.clearTimeout(revealTimer);
      }
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setImpactVisible(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    if (impactSectionRef.current) {
      observer.observe(impactSectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  // Count-up whenever a meaningful part of the impact section is in view. Turn
  // off when it leaves, so re-entering replays the animation. (No one-shot:
  // tall blocks need a loose visibility test so intersectionRatio can be low.)
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const el = impactSectionRef.current;
    if (!el) return undefined;

    const isMeaningfulVisible = (entry) => {
      if (!entry.isIntersecting) return false;
      const hVis = entry.intersectionRect?.height ?? 0;
      return entry.intersectionRatio >= 0.06 || hVis >= 80;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setImpactCountActive(isMeaningfulVisible(entry));
        }
      },
      { root: null, threshold: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] },
    );

    io.observe(el);
    return () => io.disconnect();
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
        title="Clean Cooking with Thermal Energy Storage | GridStreak"
        description="Safe, affordable, smoke-free clean cooking powered by GridStreak's sand-based thermal batteries — for homes, schools, and clinics, on-grid or off-grid."
        canonical="https://www.gridstreak.com/solutions/clean-cooking"
        type="website"
        image="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gsBanner.jpg"
        meta={[
          { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
          {
            name: "keywords",
            content:
              "clean cooking, thermal cooking, sand battery, electric cooking, off-grid cooking, replace biomass, replace charcoal, household energy Africa, institutional cooking, GridStreak",
          },
          { property: "og:locale", content: "en_US" },
          {
            property: "og:image:alt",
            content: "Family using GridStreak clean cooking stove powered by thermal energy storage",
          },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { name: "twitter:site", content: "@GridStreak" },
          { name: "twitter:creator", content: "@GridStreak" },
          {
            name: "twitter:image:alt",
            content: "Family using GridStreak clean cooking stove powered by thermal energy storage",
          },
          { name: "author", content: "GridStreak" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Clean Cooking with Thermal Energy Storage | GridStreak",
            url: "https://www.gridstreak.com/solutions/clean-cooking",
            description:
              "Safe, affordable, smoke-free clean cooking powered by GridStreak's sand-based thermal batteries for households, communities, and institutions.",
            inLanguage: "en",
            isPartOf: {
              "@type": "WebSite",
              name: "GridStreak",
              url: "https://www.gridstreak.com/",
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gsBanner.jpg",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "GridStreak Clean Cooking Solutions",
            serviceType: "Clean Cooking with Thermal Energy Storage",
            provider: {
              "@type": "Organization",
              name: "GridStreak",
              url: "https://www.gridstreak.com/",
              logo: "https://www.gridstreak.com/outLine-Orange@3x.png",
            },
            areaServed: [
              { "@type": "Place", name: "Kenya" },
              { "@type": "Place", name: "Sub-Saharan Africa" },
              { "@type": "Place", name: "Africa" },
            ],
            description:
              "Thermal-battery-powered clean cooking for homes, schools, clinics, and community kitchens — replacing charcoal, firewood, and LPG with clean, reliable heat.",
            audience: {
              "@type": "Audience",
              audienceType: "Households, institutions, and off-grid communities",
            },
            url: "https://www.gridstreak.com/solutions/clean-cooking",
            image:
              "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gsBanner.jpg",
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.gridstreak.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Solutions",
                item: "https://www.gridstreak.com/solutions",
              },
              {
                "@type": "ListItem",
                position: 3,
                name: "Clean Cooking",
                item: "https://www.gridstreak.com/solutions/clean-cooking",
              },
            ],
          },
        ]}
      />

      <PageIntroAnimation text="Clean Cooking" color="#eb6a00" colorDark="#7a3700" />

      <div className="cc-page">
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

        <section className="cc-section cc-solar-grid-section" ref={solarSectionRef}>
          <h2>Solar-Powered Clean Cooking Systems</h2>
          <p className="cc-solar-grid-lead">
            GridStreak enables solar-powered cooking at scale, making it one of
            the most practical solutions for off-grid communities.
          </p>

          <div
            className="cc-solar-grid"
            style={{
              width:
                solarGrid.columns * solarGrid.cardWidth +
                (solarGrid.columns - 1) * solarGrid.gap,
              height:
                Math.ceil(solarCookingCards.length / solarGrid.columns) * solarGrid.cardHeight +
                (Math.ceil(solarCookingCards.length / solarGrid.columns) - 1) * solarGrid.gap,
            }}
          >
            {solarCookingCards.map((card, index) => {
              const Icon = card.icon;
              const stackPos = getSolarStackPosition(index);
              const gridPos = getSolarGridPosition(index);

              return (
                <motion.article
                  key={card.title}
                  className="cc-solar-card"
                  initial={{
                    opacity: 0,
                    x: stackPos.x,
                    y: stackPos.y,
                    rotate: stackPos.rotate,
                    scale: stackPos.scale,
                  }}
                  animate={{
                    opacity: 1,
                    x: solarStart || prefersReducedMotion ? gridPos.x : stackPos.x,
                    y: solarStart || prefersReducedMotion ? gridPos.y : stackPos.y,
                    rotate: solarStart || prefersReducedMotion ? 0 : stackPos.rotate,
                    scale: solarStart || prefersReducedMotion ? 1 : stackPos.scale,
                    zIndex: solarStart || prefersReducedMotion ? 1 : stackPos.zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 80,
                    damping: 20,
                    mass: 0.8,
                    delay: prefersReducedMotion ? 0 : index * 0.14,
                  }}
                  whileHover={solarVisible ? { scale: 1.04, zIndex: 12 } : {}}
                  style={{
                    width: `${solarGrid.cardWidth}px`,
                    height: `${solarGrid.cardHeight}px`,
                  }}
                >
                  <div className="cc-solar-card-icon" aria-hidden="true">
                    <Icon />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </motion.article>
              );
            })}
          </div>
        </section>

        <section className="hc-section hc-problem cc-crisis-problem">
          <CookingCrisisCarousel reducedMotion={!!prefersReducedMotion} />
        </section>

        {/*
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
        */}

        <HealthcareProductsSection
          sectionId="clean-cooking-systems"
          headingId="clean-cooking-systems-heading"
          sectionTitle="Our Products"
          products={cleanCookingProducts}
          imageOverride="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/kilnn.jpg"
          autoRotate
          autoRotateIntervalMs={14000}
        />

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

        <section className="cc-section cc-impact-section" ref={impactSectionRef}>
          <h2>Measurable Impact for Households &amp; Communities</h2>

          {isMobileImpact ? (
            <div className="cc-impact-mobile">
              <div className="cc-impact-mobile-wheel">
                <svg className="cc-impact-circle" viewBox="0 0 400 400" aria-hidden="true">
                  {impactInfoCards.map((item, index) => {
                    const startAngle = -90 + index * 72 + 2;
                    const endAngle = -90 + (index + 1) * 72 - 2;
                    const midAngle = -90 + index * 72 + 36;
                    const labelRadius = (IMPACT_INNER_RADIUS + IMPACT_OUTER_RADIUS) / 2;
                    const labelX = IMPACT_CENTER + labelRadius * Math.cos(toRadians(midAngle));
                    const labelY = IMPACT_CENTER + labelRadius * Math.sin(toRadians(midAngle));

                    return (
                      <React.Fragment key={`impact-mobile-segment-${item.title}`}>
                        <motion.path
                          d={createImpactSegmentPath(startAngle, endAngle)}
                          fill={item.color}
                          className="cc-impact-segment"
                          initial={{ scale: 0, opacity: 0 }}
                          animate={impactVisible ? { scale: 1, opacity: 1 } : {}}
                          transition={{ duration: 0.36, delay: 0.16 + index * 0.06 }}
                          style={{ transformOrigin: `${IMPACT_CENTER}px ${IMPACT_CENTER}px` }}
                        />
                        <motion.text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          className="cc-impact-segment-label"
                          initial={{ opacity: 0 }}
                          animate={impactVisible ? { opacity: 1 } : {}}
                          transition={{ duration: 0.28, delay: 0.35 + index * 0.06 }}
                        >
                          {item.shortLabel}
                        </motion.text>
                      </React.Fragment>
                    );
                  })}
                </svg>

                <div className="cc-impact-center-label" aria-hidden="true">
                  <span>IMPACT</span>
                </div>

                <div className="cc-impact-icon-layer" aria-hidden="true">
                  {impactInfoCards.map((item, index) => {
                    const Icon = item.icon;
                    const angle = -90 + index * 72 + 36;

                    return (
                      <motion.div
                        key={`impact-mobile-icon-${item.title}`}
                        className="cc-impact-node"
                        style={{ "--impact-angle": `${angle}deg` }}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={impactVisible ? { opacity: 1, scale: 1 } : {}}
                        transition={{ duration: 0.3, delay: 0.34 + index * 0.06 }}
                      >
                        <Icon />
                      </motion.div>
                    );
                  })}
                </div>
              </div>

              <div className="cc-impact-mobile-list" role="list" aria-label="Impact highlights">
                {impactInfoCards.map((item, index) => {
                  const Icon = item.icon;

                  return (
                    <motion.article
                      key={`impact-mobile-copy-${item.title}`}
                      className="cc-impact-mobile-card"
                      role="listitem"
                      initial={{ opacity: 0, y: 12 }}
                      animate={impactVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.32, delay: 0.44 + index * 0.08 }}
                    >
                      <span
                        className="cc-impact-mobile-icon"
                        style={{ "--impact-mobile-color": item.color }}
                        aria-hidden="true"
                      >
                        <Icon />
                      </span>
                      <div>
                        <h3>{item.title}</h3>
                        <p>
                          <ImpactCountStat
                            stat={item.stat}
                            countUp={item.countUp}
                            start={impactCountActive}
                            reducedMotion={!!prefersReducedMotion}
                            delayMs={index * 150}
                            style={{ color: item.color }}
                          />
                          {" "}
                          {item.description}
                        </p>
                      </div>
                    </motion.article>
                  );
                })}
              </div>
            </div>
          ) : (
          <div className="cc-impact-infographic">
            <svg className="cc-impact-circle" viewBox="0 0 400 400" aria-hidden="true">
              {impactInfoCards.map((item, index) => {
                const startAngle = -90 + index * 72 + 2;
                const endAngle = -90 + (index + 1) * 72 - 2;
                const midAngle = -90 + index * 72 + 36;
                const labelRadius = (IMPACT_INNER_RADIUS + IMPACT_OUTER_RADIUS) / 2;
                const labelX = IMPACT_CENTER + labelRadius * Math.cos(toRadians(midAngle));
                const labelY = IMPACT_CENTER + labelRadius * Math.sin(toRadians(midAngle));

                return (
                  <React.Fragment key={`impact-segment-${item.title}`}>
                    <motion.path
                      d={createImpactSegmentPath(startAngle, endAngle)}
                      fill={item.color}
                      className="cc-impact-segment"
                      initial={{ scale: 0, opacity: 0 }}
                      animate={impactVisible ? { scale: 1, opacity: 1 } : {}}
                      transition={{ duration: 0.42, delay: 0.24 + index * 0.08 }}
                      style={{ transformOrigin: `${IMPACT_CENTER}px ${IMPACT_CENTER}px` }}
                    />
                    <motion.text
                      x={labelX}
                      y={labelY}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      className="cc-impact-segment-label"
                      initial={{ opacity: 0 }}
                      animate={impactVisible ? { opacity: 1 } : {}}
                      transition={{ duration: 0.35, delay: 0.52 + index * 0.08 }}
                    >
                      {item.shortLabel}
                    </motion.text>
                  </React.Fragment>
                );
              })}
            </svg>

            <div className="cc-impact-center-label" aria-hidden="true">
              <span>IMPACT</span>
            </div>

            <div className="cc-impact-icon-layer" aria-hidden="true">
              {impactInfoCards.map((item, index) => {
                const Icon = item.icon;
                const angle = -90 + index * 72 + 36;

                return (
                  <motion.div
                    key={`impact-icon-${item.title}`}
                    className="cc-impact-node"
                    style={{ "--impact-angle": `${angle}deg` }}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={impactVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.35, delay: 0.52 + index * 0.08 }}
                  >
                    <Icon />
                  </motion.div>
                );
              })}
            </div>

            <svg className="cc-impact-lines-overlay" viewBox="0 0 1200 900" preserveAspectRatio="none" aria-hidden="true">
              {impactInfoCards.map((item, index) => {
                const placement = getImpactPlacement(index);
                const ringScale = impactCircleSize / 400;
                const lineStartRadius = IMPACT_OUTER_RADIUS * ringScale + 10;
                const lineStartX = 600 + lineStartRadius * Math.cos(toRadians(placement.angle));
                const lineStartY = 450 + lineStartRadius * Math.sin(toRadians(placement.angle));
                const targetX = placement.left * 12;
                const targetY = placement.top * 9;
                const dx = targetX - lineStartX;
                const dy = targetY - lineStartY;
                const distance = Math.sqrt(dx * dx + dy * dy) || 1;
                const extension = index === 3 ? 90 : index === 2 ? -50 : 0;
                const lineEndX = targetX + (dx / distance) * extension;
                const lineEndY = targetY + (dy / distance) * extension;

                return (
                  <motion.line
                    key={`impact-line-${item.title}`}
                    x1={lineStartX}
                    y1={lineStartY}
                    x2={lineEndX}
                    y2={lineEndY}
                    stroke="#3f6f54"
                    strokeWidth="2"
                    opacity="0.45"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={impactVisible ? { pathLength: 1, opacity: 0.45 } : {}}
                    transition={{ duration: 0.55, delay: 0.7 + index * 0.08 }}
                  />
                );
              })}
            </svg>

            {impactInfoCards.map((item, index) => (
              (() => {
                const placement = getImpactPlacement(index);
                const cardLeft =
                  placement.left +
                  (index === 2 ? -7 : 0) +
                  (index === 3 ? -10 : 0) +
                  (index === 4 ? -8 : 0);
                const cardTop =
                  placement.top +
                  (index === 0 ? -5 : 0) +
                  (index === 1 ? -5 : 0) +
                  (index === 2 ? -7 : 0) +
                  (index === 3 ? -1 : 0) +
                  (index === 4 ? -10 : 0);

                return (
              <motion.article
                key={`impact-copy-${item.title}`}
                className={`cc-impact-description cc-impact-description-${placement.align}`}
                style={{ left: `${cardLeft}%`, top: `${cardTop}%` }}
                initial={{ opacity: 0, y: 10 }}
                animate={impactVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.34, delay: 0.82 + index * 0.08 }}
              >
                <h3>{item.title}</h3>
                <p>
                  <ImpactCountStat
                    stat={item.stat}
                    countUp={item.countUp}
                    start={impactCountActive}
                    reducedMotion={!!prefersReducedMotion}
                    delayMs={index * 150}
                    style={{
                      color: item.color,
                      display: "block",
                      fontSize: "1.25em",
                      lineHeight: 1.15,
                      marginBottom: "0.2em",
                    }}
                  />
                  {item.description}
                </p>
              </motion.article>
                );
              })()
            ))}
          </div>
          )}
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