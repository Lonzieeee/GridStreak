import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
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
  FaChevronLeft,
  FaChevronRight,
  FaSmog,
} from "react-icons/fa";
import SEO from "../components/SEO";
import HealthcareProductsSection from "../components/HospitalsClinics/HealthcareProductsSection";
import PageIntroAnimation from "../components/PageIntroAnimation";
import CookingCrisisCarousel from "../components/CleanCooking/CookingCrisisCarousel";
import ImpactCountStat from "../components/CleanCooking/ImpactCountStat";
import MeasurableImpactSection from "../components/CleanCooking/MeasurableImpactSection";
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

const HERO_ROTATE_MS = 11000;
const AUDIENCE_ROTATE_MS = 30000;

const heroSlides = [
  {
    id: "household",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_1u91qf1u91qf1u91-75900db6-1f7a-4854-9d17-c9c25830aac5.jpg",
    kicker: "Household Cooking",
    heading: "Clean Cooking That Protects Families",
    body: "Replace charcoal and firewood with smoke free thermal cooking built for everyday home meals  safer air, lower fuel costs, and reliable heat for the people you cook for.",
    primaryLabel: "Explore household systems",
    primaryHref: "#clean-cooking-systems",
  },
  {
    id: "institutional",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Institutional.jpg",
    kicker: "Institutional Cooking",
    heading: "High Volume Kitchens Without Dirty Fuel",
    body: "Scale clean heat for schools, hospitals, and community kitchens  continuous, high capacity cooking that cuts charcoal and LPG dependence while feeding many people every day.",
    primaryLabel: "Explore institutional systems",
    primaryHref: "#clean-cooking-systems",
  },
];

const audienceSlides = [
  {
    id: "household",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/image-removebg-preview%281%29.png",
    label: "Household Cooking",
    heading: "From firewood smoke to clean heat at home",
    body: "Too many homes still cook on firewood and charcoal living with smoke, high fuel costs, and heat that runs out before the meal is done.",
    points: [
      {
        icon: FaLeaf,
        countUp: {
          type: "range",
          startMin: 0,
          startMax: 0,
          endMin: 2,
          endMax: 4,
          format: (a, b) => `${Math.round(a)}–${Math.round(b)} t`,
        },
        text: "CO₂ avoided per home / year",
      },
      {
        icon: FaUsers,
        countUp: {
          type: "single",
          start: 0,
          end: 8,
          format: (n) => `${Math.round(n)}`,
        },
        text: "People served per Nano system",
      },
      {
        icon: FaClock,
        countUp: {
          type: "single",
          start: 0,
          end: 8,
          format: (n) => `${Math.round(n)}`,
        },
        text: "Meals delivered per charge",
      },
      {
        icon: FaLungs,
        text: "Smoke-free family kitchens",
      },
    ],
    ctaLabel: "See household systems",
    ctaHref: "#clean-cooking-systems",
  },
  {
    id: "institutional",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/image-removebg-preview%282%29.png",
    label: "Institutional Cooking",
    heading: "Big kitchens deserve better than burning piles of wood",
    body: "Schools and hospitals still burn bulk wood and charcoal to feed hundreds  filling kitchens with smoke, unstable heat, and rising fuel bills.",
    points: [
      {
        icon: FaTree,
        countUp: {
          type: "range",
          startMin: 0,
          startMax: 0,
          endMin: 15,
          endMax: 30,
          format: (a, b) => `${Math.round(a)}–${Math.round(b)}+ t`,
        },
        text: "CO₂ avoided per year at scale",
      },
      {
        icon: FaSchool,
        countUp: {
          type: "single",
          start: 0,
          end: 100,
          format: (n) => `${Math.round(n)}+`,
        },
        text: "Meals served without open fires",
      },
      {
        icon: FaSmog,
        text: "No kitchen smoke cloud for staff",
      },
      {
        icon: FaMoneyBillWave,
        text: "Lower spend on bulk firewood & charcoal",
      },
    ],
    ctaLabel: "See institutional systems",
    ctaHref: "#clean-cooking-systems",
  },
];

const getSolarGridConfig = (width) => {
  if (width <= 640) {
    return { columns: 1, cardWidth: 280, cardHeight: 280, gap: 16 };
  }

  if (width <= 1024) {
    return { columns: 3, cardWidth: 200, cardHeight: 200, gap: 14 };
  }

  return { columns: 3, cardWidth: 275, cardHeight: 275, gap: 24 };
};

const CleanCooking = () => {
  const [heroSlide, setHeroSlide] = useState(0);
  const [audienceSlide, setAudienceSlide] = useState(0);
  const [solarVisible, setSolarVisible] = useState(false);
  const [solarStart, setSolarStart] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );
  const solarSectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion || heroSlides.length < 2) return undefined;
    const id = window.setInterval(() => {
      setHeroSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion || audienceSlides.length < 2) return undefined;
    const id = window.setTimeout(() => {
      setAudienceSlide((prev) => (prev + 1) % audienceSlides.length);
    }, AUDIENCE_ROTATE_MS);
    return () => window.clearTimeout(id);
  }, [prefersReducedMotion, audienceSlide]);

  const activeHero = heroSlides[heroSlide] ?? heroSlides[0];
  const activeAudience = audienceSlides[audienceSlide] ?? audienceSlides[0];

  const goAudience = (direction) => {
    setAudienceSlide((prev) => {
      const next = prev + direction;
      if (next < 0) return audienceSlides.length - 1;
      if (next >= audienceSlides.length) return 0;
      return next;
    });
  };
  const solarGrid = useMemo(() => getSolarGridConfig(viewportWidth), [viewportWidth]);

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
        image="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_1u91qf1u91qf1u91-75900db6-1f7a-4854-9d17-c9c25830aac5.jpg"
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
              url: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_1u91qf1u91qf1u91-75900db6-1f7a-4854-9d17-c9c25830aac5.jpg",
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
              "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_1u91qf1u91qf1u91-75900db6-1f7a-4854-9d17-c9c25830aac5.jpg",
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
        <section className="cc-hero" aria-roledescription="carousel" aria-label="Clean cooking audiences">
          <div className="cc-hero-media" aria-hidden="true">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`cc-hero-slide${index === heroSlide ? " is-active" : ""}`}
                style={{ backgroundImage: `url(${slide.image})` }}
              />
            ))}
          </div>
          <div className="cc-hero-overlay" />
          <div className="cc-hero-content" key={activeHero.id}>
            <h1>{activeHero.heading}</h1>
            <p>{activeHero.body}</p>
            <div className="cc-hero-actions">
              <a href={activeHero.primaryHref} className="cc-btn cc-btn-primary">
                {activeHero.primaryLabel}
              </a>
              <Link to="/contact" className="cc-btn cc-btn-secondary">
                Contact GridStreak
              </Link>
            </div>
          </div>

          <div className="cc-hero-dots" role="tablist" aria-label="Hero slides">
            {heroSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                role="tab"
                className={`cc-hero-dot${index === heroSlide ? " is-active" : ""}`}
                aria-selected={index === heroSlide}
                aria-label={slide.kicker}
                onClick={() => setHeroSlide(index)}
              />
            ))}
          </div>
        </section>

        <section
          className="cc-audience"
          aria-roledescription="carousel"
          aria-label="Household and institutional cooking"
        >
          <div className="cc-audience__inner">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeAudience.id}
                className="cc-audience__panel"
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0 }}
                transition={{ duration: prefersReducedMotion ? 0 : 0.55, ease: "easeInOut" }}
              >
                <div className="cc-audience__media">
                  <img
                    src={activeAudience.image}
                    alt=""
                    className={`cc-audience__image cc-audience__image--${activeAudience.id}`}
                  />
                </div>

                <div className="cc-audience__copy">
                  <p className="cc-audience__label">{activeAudience.label}</p>
                  <h2>{activeAudience.heading}</h2>
                  <p className="cc-audience__body">{activeAudience.body}</p>
                  <ul className="cc-audience__points">
                    {activeAudience.points.map((point, index) => {
                      const Icon = point.icon;
                      return (
                        <li key={point.text}>
                          <span className="cc-audience__point-icon" aria-hidden="true">
                            <Icon />
                          </span>
                          <span className="cc-audience__point-copy">
                            {point.countUp ? (
                              <ImpactCountStat
                                countUp={point.countUp}
                                start
                                reducedMotion={!!prefersReducedMotion}
                                delayMs={index * 90}
                                className="cc-audience__stat"
                              />
                            ) : null}
                            <span className="cc-audience__point-text">{point.text}</span>
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                  <a href={activeAudience.ctaHref} className="cc-btn cc-btn-primary">
                    {activeAudience.ctaLabel}
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="cc-audience__controls">
              <button
                type="button"
                className="cc-audience__nav"
                onClick={() => goAudience(-1)}
                aria-label="Previous cooking audience"
              >
                <FaChevronLeft aria-hidden="true" />
              </button>
              <div className="cc-audience__dots" role="tablist" aria-label="Audience slides">
                {audienceSlides.map((slide, index) => (
                  <button
                    key={slide.id}
                    type="button"
                    role="tab"
                    className={`cc-audience__dot${index === audienceSlide ? " is-active" : ""}`}
                    aria-selected={index === audienceSlide}
                    aria-label={slide.label}
                    onClick={() => setAudienceSlide(index)}
                  />
                ))}
              </div>
              <button
                type="button"
                className="cc-audience__nav"
                onClick={() => goAudience(1)}
                aria-label="Next cooking audience"
              >
                <FaChevronRight aria-hidden="true" />
              </button>
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

        <MeasurableImpactSection
          title="Measurable Impact for Households & Communities"
          cards={impactInfoCards}
        />

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