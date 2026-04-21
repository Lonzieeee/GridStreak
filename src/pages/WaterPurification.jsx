import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, motion as Motion, useReducedMotion } from "framer-motion";
import {
  FaGlobeAfrica,
  FaTint,
  FaBolt,
  FaRecycle,
  FaMoneyBillWave,
  FaLeaf,
  FaHeartbeat,
} from "react-icons/fa";
      import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import PageIntroAnimation from "../components/PageIntroAnimation";
import TechBenefitsSlider from "../components/WaterPurification/TechBenefitsSlider";
import WaterProductsSection from "../components/WaterPurification/WaterProductsSection";
import ApplicationsCardStack from "../components/WaterPurification/ApplicationsCardStack";
import "./WaterPurification.css";

const problemSlideViewport = { once: true, amount: 0.32, margin: "0px 0px -100px 0px" };
const problemSlideTransition = { duration: 0.55, ease: [0.22, 1, 0.36, 1] };

const techInViewViewport = {
  once: true,
  amount: 0.08,
  margin: "120px 0px 120px 0px",
};

const techTitleMotion = (prefersReducedMotion) =>
  prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: techInViewViewport,
        transition: { ...problemSlideTransition, duration: 0.65 },
      };

const techSlideInMotion = (prefersReducedMotion, delay = 0) =>
  prefersReducedMotion
    ? {}
    : {
        initial: { opacity: 0, x: -52 },
        whileInView: { opacity: 1, x: 0 },
        viewport: techInViewViewport,
        transition: { ...problemSlideTransition, delay },
      };

// -----------------------------------------------------------------------------
// Impact pie-wheel (Clean Cooking style)
// -----------------------------------------------------------------------------
const impactInfoCards = [
  {
    icon: FaMoneyBillWave,
    shortLabel: "COST",
    title: "Lower Operating Costs",
    description: "Reduced diesel and fuel costs for water heating and distribution.",
    color: "#f2c300",
  },
  {
    icon: FaLeaf,
    shortLabel: "CO₂",
    title: "Lower Emissions",
    description: "Cleaner water systems powered by solar + thermal storage.",
    color: "#13b5cf",
  },
  {
    icon: FaRecycle,
    shortLabel: "PLASTIC",
    title: "Less Plastic Waste",
    description: "Plastic diverted from rivers, drains, and coastal ecosystems.",
    color: "#145b8c",
  },
  {
    icon: FaHeartbeat,
    shortLabel: "HEALTH",
    title: "Healthier Communities",
    description: "Safe drinking water and reliable hot water for hygiene.",
    color: "#c11764",
  },
  {
    icon: FaTint,
    shortLabel: "ACCESS",
    title: "Reliable Water Access",
    description: "24/7 clean water availability in off-grid and coastal regions.",
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

const getImpactCircleSize = (width) => {
  if (width <= 900) {
    return Math.min(width * 0.88, 360);
  }
  return Math.min(Math.max(width * 0.34, 320), 430);
};

const WaterPurification = () => {
  const prefersReducedMotion = useReducedMotion();
  const impactSectionRef = useRef(null);
  const [impactVisible, setImpactVisible] = useState(false);
  const [introDone, setIntroDone] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );

  const impactCircleSize = useMemo(() => getImpactCircleSize(viewportWidth), [viewportWidth]);
  const isMobileImpact = viewportWidth <= 900;

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setImpactVisible(entry.isIntersecting),
      { threshold: 0.2 },
    );
    if (impactSectionRef.current) observer.observe(impactSectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <SEO
        title="Solar Water Heating & Distillation | GridStreak"
        description="Clean drinking water and 24/7 hot water from GridStreak's solar + thermal storage and distillation systems — built for off-grid villages, coastal regions, and institutions."
        canonical="https://www.gridstreak.com/solutions/water-purification"
        type="website"
        image="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/purificationhero.webp"
        meta={[
          { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1" },
          {
            name: "keywords",
            content:
              "solar water heating, water distillation, clean drinking water, off-grid water, thermal water system, sand battery water, water purification Africa, coastal water systems, GridStreak",
          },
          { property: "og:locale", content: "en_US" },
          {
            property: "og:image:alt",
            content: "GridStreak solar + thermal water purification system delivering clean drinking water",
          },
          { property: "og:image:width", content: "1200" },
          { property: "og:image:height", content: "630" },
          { name: "twitter:site", content: "@GridStreak" },
          { name: "twitter:creator", content: "@GridStreak" },
          {
            name: "twitter:image:alt",
            content: "GridStreak solar + thermal water purification system delivering clean drinking water",
          },
          { name: "author", content: "GridStreak" },
        ]}
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Solar Water Heating & Distillation | GridStreak",
            url: "https://www.gridstreak.com/solutions/water-purification",
            description:
              "Clean drinking water and reliable hot water from GridStreak's solar + thermal storage and distillation systems — for villages, coastal regions, and institutions.",
            inLanguage: "en",
            isPartOf: {
              "@type": "WebSite",
              name: "GridStreak",
              url: "https://www.gridstreak.com/",
            },
            primaryImageOfPage: {
              "@type": "ImageObject",
              url: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/purificationhero.webp",
            },
          },
          {
            "@context": "https://schema.org",
            "@type": "Service",
            name: "GridStreak Water Purification & Thermal Water Systems",
            serviceType: "Solar Water Heating and Distillation",
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
              "Solar + sand-based thermal storage and distillation systems delivering clean drinking water and 24/7 hot water for off-grid, rural, coastal, and institutional sites.",
            audience: {
              "@type": "Audience",
              audienceType:
                "Water-stressed communities, schools, clinics, coastal towns, and institutions",
            },
            url: "https://www.gridstreak.com/solutions/water-purification",
            image:
              "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/purificationhero.webp",
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
                name: "Water Purification",
                item: "https://www.gridstreak.com/solutions/water-purification",
              },
            ],
          },
        ]}
      />
      <PageIntroAnimation
        text="Water Purification"
        color="#13b5cf"
        colorDark="#0a5a6a"
        onFinish={() => setIntroDone(true)}
      />
      <div className="hc-container">

        {/* HERO SECTION */}
        <section
          className="hc-hero hc-hero--water"
          data-intro-ready={introDone ? "true" : undefined}
        >
          <div className="hc-hero-content">
            <h1>Reliable, Clean Water Systems Powered by Thermal Energy</h1>
            <p>
              GridStreak combines sand-based thermal storage, solar energy, and distillation to
              deliver safe drinking water and reliable hot water — anywhere.
            </p>
            <div className="hc-buttons">
              <button
                type="button"
                className="primary-btn"
                onClick={() => scrollToSection("wp-products-heading")}
              >
                See Water Systems
              </button>
              <Link className="secondary-btn" to="/contact?solution=water-purification">
                Talk to Us
              </Link>
            </div>
          </div>
        </section>

        {/* PROBLEM SECTION */}
        <section className="hc-section hc-problem">
          <h2 className="hc-problem-title">
            The Global{" "}
            <span className="hc-problem-title-accent">Water Crisis</span>
          </h2>
          <div className="hc-problem-grid">
            <Motion.ul
              className="hc-problem-list hc-problem-list--left"
              aria-label="Water access statistics"
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: -44 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: problemSlideViewport,
                    transition: problemSlideTransition,
                  })}
            >
              <li>Over 2 billion people lack safely managed drinking water.</li>
              <li>Many communities rely on contaminated or untreated sources.</li>
            </Motion.ul>

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

            <Motion.ul
              className="hc-problem-list hc-problem-list--right"
              aria-label="Water system failure impact"
              {...(prefersReducedMotion
                ? {}
                : {
                    initial: { opacity: 0, x: 44 },
                    whileInView: { opacity: 1, x: 0 },
                    viewport: problemSlideViewport,
                    transition: problemSlideTransition,
                  })}
            >
              <li>Water systems depend on diesel and unreliable electricity.</li>
              <li>Plastic waste clogs rivers, drainage, and coastal ecosystems.</li>
            </Motion.ul>
          </div>
          <p className="hc-highlight hc-problem-foot">
            Safe water isn’t a convenience—it’s the foundation of health and development.
          </p>
        </section>

        {/* BUILT FOR WATER-STRESSED COMMUNITIES — styled like Clean Cooking's thermal section */}
        <section className="cc-section cc-section-dark cc-thermal-section">
          <h2>Built for Water-Stressed Communities</h2>
          <p className="cc-thermal-intro">
            Engineered for villages, coastal towns, and institutions where reliable power and
            clean water can’t be taken for granted.
          </p>
          <div className="cc-thermal-cards" role="list" aria-label="Built for water systems benefits">
            <article className="cc-thermal-card" role="listitem">
              <span className="cc-thermal-icon" aria-hidden="true">
                <FaTint />
              </span>
              <h3>Clean Drinking Water</h3>
              <p>Distillation-grade water produced from almost any source.</p>
            </article>

            <article className="cc-thermal-card" role="listitem">
              <span className="cc-thermal-icon" aria-hidden="true">
                <FaBolt />
              </span>
              <h3>24/7 Hot Water</h3>
              <p>Continuous heating — even through grid outages and cloudy days.</p>
            </article>

            <article className="cc-thermal-card" role="listitem">
              <span className="cc-thermal-icon" aria-hidden="true">
                <FaGlobeAfrica />
              </span>
              <h3>Remote-Ready</h3>
              <p>Purpose-built for rural, coastal, and fully off-grid sites.</p>
            </article>

            <article className="cc-thermal-card" role="listitem">
              <span className="cc-thermal-icon" aria-hidden="true">
                <FaRecycle />
              </span>
              <h3>Plastic-to-Energy</h3>
              <p>Turns plastic waste into clean thermal fuel for water heating.</p>
            </article>
          </div>
          <p className="hc-highlight cc-thermal-highlight">
            A 25+ year lifespan delivers durable, cost-effective clean water infrastructure —
            anywhere it’s needed.
          </p>
        </section>

        {/* TECHNOLOGY — title + intro live inside the dark slider panel. */}
        <section className="hc-section hc-tech-section">
          <div className="hc-tech-section__copy">
            <Motion.div
              className="hc-tech-section__sliderWrap"
              {...techSlideInMotion(prefersReducedMotion, 0.08)}
            >
              <TechBenefitsSlider reducedMotion={!!prefersReducedMotion}>
                <Motion.h2 className="wp-cover-title" {...techTitleMotion(prefersReducedMotion)}>
                  Thermal + Solar Water Technology, Engineered to Last
                </Motion.h2>
                <Motion.p className="wp-cover-lead" {...techSlideInMotion(prefersReducedMotion, 0.12)}>
                  GridStreak pairs long-life sand-based thermal storage with solar energy and
                  distillation to deliver clean drinking water and reliable hot water on demand.
                </Motion.p>
              </TechBenefitsSlider>
            </Motion.div>
          </div>
        </section>

        {/* PRODUCTS — radial menu layout; see WaterProductsSection */}
        <WaterProductsSection />

        {/* APPLICATIONS */}
        <section className="hc-section hc-applications">
          <div className="hc-applications__head">
            <h2>
              <span className="hc-problem-title-accent">Water Applications</span>: Safe Water &amp;
              Reliable Heat
            </h2>
            <p className="hc-applications__lead">
              One platform, many roles: produce clean drinking water, deliver reliable hot water,
              and build resilience for communities where water access is under strain.
            </p>
          </div>
          <ApplicationsCardStack reducedMotion={!!prefersReducedMotion} />
          <p className="hc-applications__footnote">
            Over 2 billion people live without safely managed drinking water — scalable, clean
            water systems are urgently needed.
          </p>
        </section>

        {/* IMPACT — Clean-Cooking-style pie-wheel infographic */}
        <section className="cc-section cc-impact-section" ref={impactSectionRef}>
          <h2>Measurable Impact for Water Systems &amp; Communities</h2>

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
                        <p>{item.description}</p>
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

              <svg
                className="cc-impact-lines-overlay"
                viewBox="0 0 1200 900"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
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
                      <p>{item.description}</p>
                    </motion.article>
                  );
                })()
              ))}
            </div>
          )}
        </section>

        {/* CTA — temporarily disabled */}
        {/*
        <section className="hc-cta" id="deployment-plan">
          <div className="hc-cta__media" aria-hidden="true">
            <img
              src="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png"
              alt=""
              loading="lazy"
            />
          </div>
          <div className="hc-cta__content">
            <h2>Deploy GridStreak Water Solutions</h2>
            <p className="hc-cta__lead">
              Deliver clean drinking water, reliable hot water, and environmental impact — all from
              one integrated thermal + solar platform.
            </p>
            <div className="hc-cta__actions">
              <Link className="primary-btn hc-cta__btn" to="/contact?solution=water-purification">
                Contact Us Today
              </Link>
            </div>
          </div>
        </section>
        */}

      </div>
    </>
  );
};

export default WaterPurification;
