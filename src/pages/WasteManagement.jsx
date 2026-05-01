import React, { useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { FaWheatAwnCircleExclamation, FaCloud, FaUsers } from "react-icons/fa6";
import { FaRecycle, FaFire, FaThermometerHalf, FaBolt } from "react-icons/fa";
import ImpactCountStat from "../components/CleanCooking/ImpactCountStat";
import PageIntroAnimation from "../components/PageIntroAnimation";
import "./WasteManagementHero.css";
import "./WasteCrisisSection.css";
import "./SolutionOverviewSection.css";
import "./TechnologyDeepSection.css";
import "./ClimateImpactSection.css";
import "./ValueCreationSection.css";

const wasteCrisisImages = [
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/impactsectionwastemanagement.jpg",
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/plasticlandfill-1.webp",
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/ocean.jpg",
];

const WasteCrisisSection = () => {
  const [activeImageIdx, setActiveImageIdx] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const id = window.setInterval(() => {
      setActiveImageIdx((prev) => (prev + 1) % wasteCrisisImages.length);
    }, 3600);

    return () => window.clearInterval(id);
  }, [prefersReducedMotion]);

  return (
    <section className="waste-crisis-section">
    <motion.div
      className="waste-crisis-content"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
    >
      <motion.h2
        initial={{ opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, ease: "easeOut", delay: 0.05 }}
      >
        A System Under Pressure
      </motion.h2>
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.35 }}
        transition={{ duration: 0.5, ease: "easeOut", delay: 0.12 }}
      >
        Over 2 billion tons of waste are generated annually, much of it unmanaged.
        Organic waste decomposes into methane over 80× more potent than CO₂ while
        plastic waste contaminates ecosystems and waterways. These inefficiencies
        create both environmental damage and lost economic value.
      </motion.p>
      <div className="waste-crisis-cards">
        <motion.div
          className="waste-crisis-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.2 }}
        >
          <FaWheatAwnCircleExclamation />
          30–40% post-harvest loss
        </motion.div>
        <motion.div
          className="waste-crisis-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.3 }}
        >
          <FaCloud />
          Major methane contribution from waste
        </motion.div>
        <motion.div
          className="waste-crisis-card"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.4, ease: "easeOut", delay: 0.4 }}
        >
          <FaUsers />
          Millions affected by poor waste systems
        </motion.div>
      </div>
    </motion.div>
    <motion.div
      className="waste-crisis-image-frame"
      initial={{ opacity: 0, x: 30, scale: 0.985 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: "easeOut", delay: 0.18 }}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={wasteCrisisImages[activeImageIdx]}
          className="waste-crisis-image"
          src={wasteCrisisImages[activeImageIdx]}
          alt="Waste crisis and pollution scene"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: prefersReducedMotion ? 0 : 0.7, ease: "easeInOut" }}
        />
      </AnimatePresence>
    </motion.div>
  </section>
  );
};

const solutionCardVariants = {
  hidden: { opacity: 0 },
  visible: (delayMs = 0) => ({
    opacity: 1,
    transition: {
      duration: 0.4,
      delay: delayMs / 1000,
      ease: "easeOut",
    },
  }),
};

const SolutionOverviewSection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.28 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="solution-overview-section" ref={sectionRef}>
      <div className="solution-overview-inner">
        <motion.h2
          className="solution-overview-title"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={
            prefersReducedMotion
              ? { opacity: 1, y: 0 }
              : sectionInView
                ? { opacity: 1, y: 0 }
                : { opacity: 0, y: 18 }
          }
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          A <span className="solution-overview-title-accent">Circular Energy</span> Platform
        </motion.h2>
        <div className="solution-overview-flow">
        <svg
          className={`solution-flow-arrows ${sectionInView ? "is-active" : ""} ${prefersReducedMotion ? "is-reduced" : ""}`}
          viewBox="0 0 900 520"
          aria-hidden="true"
          focusable="false"
        >
          <defs>
            <marker
              id="solution-arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="#eb6a00" />
            </marker>
          </defs>

          <path className="solution-arrow-segment arrow-waste-conversion" pathLength="1" d="M230 354 L352 354" />
          <path className="solution-arrow-segment arrow-conversion-use" pathLength="1" d="M548 354 L670 354" />
          <path className="solution-arrow-segment arrow-use-waste" pathLength="1" d="M765 452 C680 552, 235 552, 135 452" />
          <path className="solution-arrow-segment arrow-conversion-thermal" pathLength="1" d="M450 257 L450 164" />
        </svg>

        <motion.article
          className="solution-card solution-card-thermal"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={420}
        >
          <FaThermometerHalf />
          <h3>Thermal Storage</h3>
          <p>Long-duration retention</p>
        </motion.article>
        <motion.article
          className="solution-card solution-card-waste"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={120}
        >
          <FaRecycle />
          <h3>Waste Interception</h3>
          <p>Prevents decomposition</p>
        </motion.article>
        <motion.article
          className="solution-card solution-card-conversion"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={250}
        >
          <FaFire />
          <h3>Energy Conversion</h3>
          <p>Converts waste to heat</p>
        </motion.article>
        <motion.article
          className="solution-card solution-card-use"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={330}
        >
          <FaBolt />
          <h3>Energy Use</h3>
          <p>Productive applications</p>
        </motion.article>
      </div>

      <div className="solution-overview-mobile" aria-label="Mobile circular energy flow">
        <motion.article
          className="solution-card solution-mobile-card"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={120}
        >
          <FaRecycle />
          <h3>Waste Interception</h3>
          <p>Prevents decomposition</p>
        </motion.article>

        <div className="solution-mobile-connector" aria-hidden="true">
          <span className="solution-mobile-connector-line" />
          <span className="solution-mobile-connector-tip" />
        </div>

        <motion.article
          className="solution-card solution-mobile-card solution-mobile-conversion"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={240}
        >
          <FaFire />
          <h3>Energy Conversion</h3>
          <p>Converts waste to heat</p>
        </motion.article>

        <div className="solution-mobile-branch" aria-hidden="true">
          <span className="solution-mobile-branch-line" />
          <span className="solution-mobile-branch-tip" />
        </div>

        <motion.article
          className="solution-card solution-mobile-card solution-mobile-thermal"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={360}
        >
          <FaThermometerHalf />
          <h3>Thermal Storage</h3>
          <p>Long-duration retention</p>
        </motion.article>

        <div className="solution-mobile-connector" aria-hidden="true">
          <span className="solution-mobile-connector-line" />
          <span className="solution-mobile-connector-tip" />
        </div>

        <motion.article
          className="solution-card solution-mobile-card"
          variants={solutionCardVariants}
          initial="hidden"
          animate={prefersReducedMotion || sectionInView ? "visible" : "hidden"}
          custom={420}
        >
          <FaBolt />
          <h3>Energy Use</h3>
          <p>Productive applications</p>
        </motion.article>

        <div className="solution-mobile-loop" aria-hidden="true">
          <span className="solution-mobile-loop-line" />
          <span className="solution-mobile-loop-tip" />
          <p>Loops back to Waste Interception</p>
        </div>
      </div>
    </div>
    </section>
  );
};

const TechnologyDeepSection = () => {
  const sectionRef = useRef(null);
  const sectionInView = useInView(sectionRef, { once: true, amount: 0.32 });
  const prefersReducedMotion = useReducedMotion();
  const [startMetricCount, setStartMetricCount] = useState(false);
  const metricAnimate = prefersReducedMotion || sectionInView;

  useEffect(() => {
    if (!sectionInView) {
      setStartMetricCount(false);
      return undefined;
    }

    if (prefersReducedMotion) {
      setStartMetricCount(true);
      return undefined;
    }

    const timer = window.setTimeout(() => {
      setStartMetricCount(true);
    }, 860);

    return () => window.clearTimeout(timer);
  }, [sectionInView, prefersReducedMotion]);

  return (
    <section className={`waste-tech-section ${sectionInView ? "is-active" : ""}`} ref={sectionRef}>
      <div className="waste-tech-inner">
        <motion.figure
          className="waste-tech-figure"
          initial={prefersReducedMotion ? false : { opacity: 0, x: -36, scale: 0.97 }}
          animate={
            prefersReducedMotion || sectionInView
              ? { opacity: 1, x: 0, scale: 1 }
              : { opacity: 0, x: -36, scale: 0.97 }
          }
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
        >
          <img
            src="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Nolabels.jpg"
            alt="Co-pyrolysis system showing organic and inorganic waste streams"
            loading="lazy"
          />
        </motion.figure>

        <motion.div
          className="waste-tech-content"
          initial={prefersReducedMotion ? false : { opacity: 0, x: 32 }}
          animate={
            prefersReducedMotion || sectionInView
              ? { opacity: 1, x: 0 }
              : { opacity: 0, x: 32 }
          }
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        >
          <motion.h2
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={prefersReducedMotion || sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.46, ease: "easeOut", delay: 0.16 }}
          >
            <span>Co-Pyrolysis</span> + Thermal Storage
          </motion.h2>
          <motion.p
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion || sectionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.24 }}
          >
            GridStreak uses controlled co-pyrolysis to convert mixed organic and plastic
            waste into thermal energy. This process prevents methane formation by
            eliminating anaerobic decomposition pathways. The generated heat is stored in
            high-efficiency sand-based thermal batteries for on-demand use.
          </motion.p>

          <div className="waste-tech-metrics" role="list" aria-label="Technical metrics">
            <motion.article
              className="waste-tech-metric-row"
              role="listitem"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={metricAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.44, ease: "easeOut", delay: 0.32 }}
            >
              <ImpactCountStat
                stat="<1%"
                countUp={{
                  type: "single",
                  end: 1,
                  format: (n) => `<${Math.max(1, Math.round(n))}%`,
                }}
                start={startMetricCount}
                reducedMotion={!!prefersReducedMotion}
                className="waste-tech-metric-value"
              />
              <p className="waste-tech-metric-label">Near-zero methane leakage</p>
            </motion.article>

            <motion.article
              className="waste-tech-metric-row"
              role="listitem"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={metricAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.44, ease: "easeOut", delay: 0.42 }}
            >
              <ImpactCountStat
                stat="300-1800°C+"
                countUp={{
                  type: "single",
                  end: 1800,
                  format: (n) => `300-${Math.round(n)}\u00B0C+`,
                }}
                start={startMetricCount}
                reducedMotion={!!prefersReducedMotion}
                delayMs={120}
                className="waste-tech-metric-value"
              />
              <p className="waste-tech-metric-label">Operating temperature</p>
            </motion.article>

            <motion.article
              className="waste-tech-metric-row"
              role="listitem"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 20, scale: 0.96 }}
              animate={metricAnimate ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 20, scale: 0.96 }}
              transition={{ duration: 0.44, ease: "easeOut", delay: 0.52 }}
            >
              <ImpactCountStat
                stat="75-90%"
                countUp={{
                  type: "single",
                  end: 90,
                  format: (n) => `75-${Math.round(n)}%`,
                }}
                start={startMetricCount}
                reducedMotion={!!prefersReducedMotion}
                delayMs={220}
                className="waste-tech-metric-value"
              />
              <p className="waste-tech-metric-label">Thermal efficiency</p>
            </motion.article>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const valueCreationCards = [
  {
    title: "Clean Cooking",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/CLEANCOOKING%281%29.jpg",
    body: "GridStreak replaces firewood and charcoal with clean, reliable heat, eliminating indoor air pollution while reducing fuel costs for households and community kitchens.",
  },
  {
    title: "Agriculture",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/agricdry.jpg",
    body: "By providing consistent thermal energy, GridStreak enables crop drying, preservation, and greenhouse heating, reducing post-harvest losses and improving productivity.",
  },
  {
    title: "Water Systems",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/impactsectionwastemanagement.jpg",
    body: "GridStreak delivers efficient heat for water sanitation and purification, supporting communities and institutions while reducing reliance on diesel systems.",
  },
  {
    title: "Industry",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/industrytake2.jpg",
    body: "GridStreak supplies low-cost process heat for small and medium industries, improving efficiency while lowering fuel and operational costs.",
  },
  {
    title: "Emergency & Off-Grid",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/emergency%281%29.jpg",
    zoom: "128%",
    body: "In remote and disaster settings, GridStreak provides reliable, rapidly deployable energy to support essential services like cooking, water, and shelter.",
  },
  {
    title: "Waste Processing",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Untitled%20design.jpg",
    body: "GridStreak converts organic and plastic waste into usable energy, reducing landfill dependency while enabling circular waste systems.",
  },
];

const ValueCreationSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: false, amount: 0.24 });
  const prefersReducedMotion = useReducedMotion();

  const getCardMotion = (index) => {
    const firstRow = index < 3;
    if (prefersReducedMotion) {
      return {
        initial: false,
        animate: { opacity: 1, x: 0, y: 0, scale: 1 },
        transition: { duration: 0.2 },
      };
    }

    if (firstRow) {
      const xOffsets = [-48, 0, 48];
      return {
        initial: { opacity: 0, y: 34, x: xOffsets[index], scale: 0.9 },
        animate: inView ? { opacity: 1, y: 0, x: 0, scale: 1 } : { opacity: 0, y: 34, x: xOffsets[index], scale: 0.9 },
        transition: { duration: 0.52, delay: 0.12 + index * 0.12, ease: [0.22, 1, 0.36, 1] },
      };
    }

    return {
      initial: { opacity: 0, y: 24, scale: 0.96 },
      animate: inView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 24, scale: 0.96 },
      transition: { duration: 0.46, delay: 0.66 + (index - 3) * 0.1, ease: "easeOut" },
    };
  };

  return (
    <section className="value-creation-section" ref={sectionRef}>
      <div className="value-creation-inner">
        <motion.header
          className="value-creation-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2>Where GridStreak Creates Value</h2>
          <p>From households to industry, delivering reliable energy across critical sectors.</p>
        </motion.header>

        <div className="value-creation-grid">
          {valueCreationCards.map((card, index) => (
            <motion.article
              key={card.title}
              className={`value-creation-card ${index < 3 ? "value-card-first-row" : "value-card-second-row"}`}
              style={
                card.image
                  ? {
                      backgroundImage: `url(${card.image})`,
                      backgroundSize: card.zoom ?? "cover",
                    }
                  : undefined
              }
              {...getCardMotion(index)}
            >
              <div className="value-creation-card-overlay" />
              <div className="value-creation-card-content">
                <h3>{card.title}</h3>
                <p>{card.body}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

const ClimateImpactSection = () => {
  const sectionRef = useRef(null);
  const inView = useInView(sectionRef, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    if (!inView) return undefined;

    if (prefersReducedMotion) {
      setStartCount(true);
      return undefined;
    }

    const timer = window.setTimeout(() => setStartCount(true), 120);
    return () => window.clearTimeout(timer);
  }, [inView, prefersReducedMotion]);

  return (
    <section
      className="climate-impact-section"
      ref={sectionRef}
      style={{
        backgroundColor: "#1b2632",
        backgroundImage:
          'url("https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/wide-angle-shot-white-smoke-coming-out-nuclear-plants.webp")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="climate-impact-overlay" />
      <div className="climate-impact-inner">
        <motion.header
          className="climate-impact-header"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
          animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
          transition={{ duration: 0.45, ease: "easeOut" }}
        >
          <h2>Measurable Climate Impact</h2>
          <p>
            Every ton of waste processed through GridStreak delivers verified emissions
            reductions and helps shift communities away from landfill dependence.
          </p>
        </motion.header>

        <div className="climate-impact-metrics" role="list" aria-label="Climate impact metrics">
          <motion.div
            className="climate-impact-metric"
            role="listitem"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.06 }}
          >
            <ImpactCountStat
              stat="100 kg CH₄"
              countUp={{
                type: "single",
                end: 100,
                format: (n) => `${Math.round(n)} kg CH₄`,
              }}
              start={startCount}
              reducedMotion={!!prefersReducedMotion}
              className="climate-impact-metric-value"
            />
            <span className="climate-impact-metric-label">avoided per ton</span>
          </motion.div>

          <motion.div
            className="climate-impact-metric"
            role="listitem"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.14 }}
          >
            <ImpactCountStat
              stat="2.8 tCO₂e"
              countUp={{
                type: "single",
                end: 2.8,
                format: (n) => `${n.toFixed(1)} tCO₂e`,
              }}
              start={startCount}
              reducedMotion={!!prefersReducedMotion}
              delayMs={120}
              className="climate-impact-metric-value"
            />
            <span className="climate-impact-metric-label">avoided per ton</span>
          </motion.div>

          <motion.div
            className="climate-impact-metric"
            role="listitem"
            initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
            animate={prefersReducedMotion || inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: "easeOut", delay: 0.22 }}
          >
            <strong className="climate-impact-metric-value climate-impact-metric-value--text">
              Reduced landfill dependency
            </strong>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

const WasteManagement = () => {
  const [impactCountActive, setImpactCountActive] = useState(false);
  const impactSectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const el = impactSectionRef.current;
    if (!el) return undefined;

    const isMeaningfulVisible = (entry) => {
      if (!entry.isIntersecting) return false;
      const visibleHeight = entry.intersectionRect?.height ?? 0;
      return entry.intersectionRatio >= 0.08 || visibleHeight >= 70;
    };

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setImpactCountActive(isMeaningfulVisible(entry));
        }
      },
      { threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.7, 1] },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <SEO
        title="Waste Management | GridStreak Solutions"
        description="Waste management solutions powered by GridStreak thermal storage technology."
        canonical="https://gridstreak.com/solutions/waste-management"
      />
      <PageIntroAnimation text="Waste Management" color="#b0f222" colorDark="#5d7d12" />
      <section className="waste-hero">
        <div className="waste-hero-content">
          <h1>Turning Waste into Clean, Reliable Energy</h1>
          <p>
            GridStreak converts organic and plastic waste into long-duration
            thermal energy, preventing methane emissions and delivering affordable
            power for communities, agriculture, and industry.
          </p>
          <div className="waste-impact-strip" ref={impactSectionRef}>
            <div className="waste-impact-item">
              <ImpactCountStat
                stat="2.8 tCO2e"
                countUp={{
                  type: "single",
                  end: 2.8,
                  format: (n) => `${n.toFixed(1)} tCO2e`,
                }}
                start={impactCountActive}
                reducedMotion={!!prefersReducedMotion}
                style={{ color: "#eb6a00" }}
                className="waste-impact-number"
              />
              <span className="waste-impact-label">avoided per ton</span>
            </div>
            <div className="waste-impact-item">
              <ImpactCountStat
                stat="40%"
                countUp={{
                  type: "single",
                  end: 40,
                  format: (n) => `${Math.round(n)}%`,
                }}
                start={impactCountActive}
                reducedMotion={!!prefersReducedMotion}
                delayMs={150}
                style={{ color: "#eb6a00" }}
                className="waste-impact-number"
              />
              <span className="waste-impact-label">lower energy costs</span>
            </div>
          </div>
          <div className="waste-hero-ctas">
            <Link to="/technology" className="waste-hero-btn-primary">
              Explore Technology
            </Link>
            <Link to="/partners" className="waste-hero-btn-secondary">
              Partner With Us
            </Link>
          </div>
        </div>
      </section>
      <WasteCrisisSection />
      <SolutionOverviewSection />
      <TechnologyDeepSection />
      <ValueCreationSection />
      <ClimateImpactSection />
    </>
  );
};

export default WasteManagement;

