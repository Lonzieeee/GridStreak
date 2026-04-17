import React, { useEffect, useRef, useState } from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { FaGlobeAfrica, FaHeartbeat, FaBolt, FaGasPump } from "react-icons/fa";
import { Link } from "react-router-dom";
import SEO from "../components/SEO";
import TechBenefitsSlider from "../components/HospitalsClinics/TechBenefitsSlider";
import HealthcareProductsSection from "../components/HospitalsClinics/HealthcareProductsSection";
import ApplicationsCardStack from "../components/HospitalsClinics/ApplicationsCardStack";
import "./HospitalsClinics.css";

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

const builtForCardMotion = (prefersReducedMotion, index) => {
  if (prefersReducedMotion) return {};

  const fromLeft = index < 2;
  return {
    initial: { opacity: 0, x: fromLeft ? -56 : 56 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, amount: 0.25, margin: "0px 0px -80px 0px" },
    transition: { ...problemSlideTransition, delay: 0.08 + index * 0.08 },
  };
};

const HospitalsClinics = () => {
  const prefersReducedMotion = useReducedMotion();
  const impactRef = useRef(null);
  const counterIntervalRef = useRef(null);
  const impactResetTimeoutRef = useRef(null);
  const impactInViewRef = useRef(false);
  const [impactCounts, setImpactCounts] = useState({
    costReduction: 0,
    uptime: 0,
  });

  const impactTargets = {
    costReduction: 50,
    uptime: 24,
  };

  useEffect(() => {
    return () => {
      if (counterIntervalRef.current) {
        clearInterval(counterIntervalRef.current);
      }
      if (impactResetTimeoutRef.current) {
        clearTimeout(impactResetTimeoutRef.current);
      }
    };
  }, []);

  const startImpactCounting = () => {
    if (prefersReducedMotion) {
      setImpactCounts(impactTargets);
      return;
    }

    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;

    if (counterIntervalRef.current) {
      clearInterval(counterIntervalRef.current);
    }

    counterIntervalRef.current = setInterval(() => {
      currentStep += 1;
      setImpactCounts({
        costReduction: Math.min(Math.floor((impactTargets.costReduction / steps) * currentStep), impactTargets.costReduction),
        uptime: Math.min(Math.floor((impactTargets.uptime / steps) * currentStep), impactTargets.uptime),
      });

      if (currentStep >= steps) {
        clearInterval(counterIntervalRef.current);
      }
    }, stepDuration);
  };

  useEffect(() => {
    const el = impactRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (impactResetTimeoutRef.current) {
              clearTimeout(impactResetTimeoutRef.current);
              impactResetTimeoutRef.current = null;
            }
            if (impactInViewRef.current) {
              return;
            }

            impactInViewRef.current = true;
            startImpactCounting();
            return;
          }

          impactInViewRef.current = false;
          if (impactResetTimeoutRef.current) {
            clearTimeout(impactResetTimeoutRef.current);
          }
          impactResetTimeoutRef.current = setTimeout(() => {
            if (counterIntervalRef.current) {
              clearInterval(counterIntervalRef.current);
            }
            setImpactCounts({ costReduction: 0, uptime: 0 });
          }, 180);
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      if (impactResetTimeoutRef.current) {
        clearTimeout(impactResetTimeoutRef.current);
        impactResetTimeoutRef.current = null;
      }
    };
  }, [prefersReducedMotion]);

  const formatImpactNumber = (value, type) => {
    if (type === "costReduction") {
      return `${value}%`;
    }
    if (type === "uptime") {
      return `${value}/7`;
    }
    return `${value}`;
  };

  const scrollToSection = (id) => {
    const target = document.getElementById(id);
    if (target) {
      target.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
  };

  return (
    <>
      <SEO
        title="Healthcare Thermal Energy Storage for Hospitals and Clinics | GridStreak"
        description="GridStreak provides thermal energy storage for hospitals and clinics, enabling sterilization, sanitation, reliable heat, and cold-chain continuity in grid-unstable environments."
        canonical="https://www.gridstreak.com/solutions/hospitals-clinics"
      />
      <div className="hc-container">

      {/* HERO SECTION */}
      <section className="hc-hero">
        <div className="hc-hero-content">
          <h1>Reliable, Clean Energy for Hospitals & Clinics Anywhere</h1>
          <p>
            GridStreak delivers thermal energy storage solutions for uninterrupted power,
            cold storage, and waste-to-energy systems.
          </p>
          <div className="hc-buttons">
            <button
              type="button"
              className="primary-btn"
              onClick={() => scrollToSection("hc-products-heading")}
            >
              See Deployment Options
            </button>
            <Link className="secondary-btn" to="/contact">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      {/* PROBLEM SECTION */}
      <section className="hc-section hc-problem">
        <h2 className="hc-problem-title">
          The Energy Crisis in{" "}
          <span className="hc-problem-title-accent">Healthcare</span>
        </h2>
        <div className="hc-problem-grid">
          <Motion.ul
            className="hc-problem-list hc-problem-list--left"
            aria-label="Key statistics"
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, x: -44 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: problemSlideViewport,
                  transition: problemSlideTransition,
                })}
          >
            <li>1 billion people use facilities with unreliable electricity.</li>
            <li>Just 30% of Sub-Saharan clinics have reliable electricity.</li>
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
            aria-label="Operational impact"
            {...(prefersReducedMotion
              ? {}
              : {
                  initial: { opacity: 0, x: 44 },
                  whileInView: { opacity: 1, x: 0 },
                  viewport: problemSlideViewport,
                  transition: problemSlideTransition,
                })}
          >
            <li>Cold storage failures waste vaccines and critical medicines.</li>
            <li>Hospitals may spend up to 60% of operating costs on energy.</li>
          </Motion.ul>
        </div>
        <p className="hc-highlight hc-problem-foot">
          Energy failure in healthcare isn’t an inconvenience—it’s life-threatening.
        </p>
      </section>

      {/* BUILT FOR RURAL / OFF-GRID */}
      <section className="hc-section hc-built-for">
        <div className="hc-built-for__head">
          <h2>
            Built for <span className="hc-problem-title-accent">Off-Grid Care</span>
          </h2>
          <p className="hc-built-for__lead">
            Designed for rural clinics and grid-unstable hospitals—so essential services stay on,
            costs stay predictable, and patient care doesn’t pause.
          </p>
        </div>

        <div className="hc-built-for__grid" role="list" aria-label="Built for off-grid benefits">
          <Motion.div
            className="hc-built-card"
            role="listitem"
            {...builtForCardMotion(prefersReducedMotion, 0)}
          >
            <p className="hc-built-card__index" aria-hidden="true">01</p>
            <span className="hc-built-card__icon" aria-hidden="true">
              <FaBolt />
            </span>
            <p className="hc-built-card__title">24/7 energy &amp; heat</p>
            <p className="hc-built-card__desc">Continuous operations—even during outages.</p>
          </Motion.div>

          <Motion.div
            className="hc-built-card"
            role="listitem"
            {...builtForCardMotion(prefersReducedMotion, 1)}
          >
            <p className="hc-built-card__index" aria-hidden="true">02</p>
            <span className="hc-built-card__icon" aria-hidden="true">
              <FaGlobeAfrica />
            </span>
            <p className="hc-built-card__title">Remote-ready</p>
            <p className="hc-built-card__desc">Built to perform in rural and off-grid locations.</p>
          </Motion.div>

          <Motion.div
            className="hc-built-card"
            role="listitem"
            {...builtForCardMotion(prefersReducedMotion, 2)}
          >
            <p className="hc-built-card__index" aria-hidden="true">03</p>
            <span className="hc-built-card__icon" aria-hidden="true">
              <FaGasPump />
            </span>
            <p className="hc-built-card__title">Less diesel dependence</p>
            <p className="hc-built-card__desc">Reduce fuel logistics and generator costs.</p>
          </Motion.div>

          <Motion.div
            className="hc-built-card"
            role="listitem"
            {...builtForCardMotion(prefersReducedMotion, 3)}
          >
            <p className="hc-built-card__index" aria-hidden="true">04</p>
            <span className="hc-built-card__icon" aria-hidden="true">
              <FaHeartbeat />
            </span>
            <p className="hc-built-card__title">Care-first reliability</p>
            <p className="hc-built-card__desc">Support critical services with higher uptime.</p>
          </Motion.div>
        </div>
      </section>

      {/* TECHNOLOGY — title + intro live inside the dark slider panel. */}
      <section className="hc-section hc-tech-section">
        <div className="hc-tech-section__copy">
          <Motion.div
            className="hc-tech-section__sliderWrap"
            {...techSlideInMotion(prefersReducedMotion, 0.08)}
          >
            <TechBenefitsSlider reducedMotion={!!prefersReducedMotion}>
              <Motion.h2 className="hc-tech-slider__title" {...techTitleMotion(prefersReducedMotion)}>
                Reliable Thermal Storage Built for Healthcare Operations
              </Motion.h2>
              <Motion.p className="hc-tech-slider__lead" {...techSlideInMotion(prefersReducedMotion, 0.12)}>
                GridStreak uses long-life sand-based thermal storage to keep essential services
                running, stabilize energy costs, and release heat on demand when facilities need it.
              </Motion.p>
            </TechBenefitsSlider>
          </Motion.div>
        </div>
      </section>

      {/* PRODUCTS — radial menu layout; see HealthcareProductsSection */}
      <HealthcareProductsSection />

      {/* APPLICATIONS */}
      <section className="hc-section hc-applications">
        <div className="hc-applications__head">
          <h2>
            <span className="hc-problem-title-accent">Healthcare Applications</span>: Operational
            Resilience &amp; Clean Heat
          </h2>
          <p className="hc-applications__lead">
            One platform, two critical jobs: protect essential healthcare operations and deliver
            clean, reliable heat for sterilization, hot water, and safer waste handling especially
            where power is unstable.
          </p>
        </div>
        <ApplicationsCardStack reducedMotion={!!prefersReducedMotion} />
        <p className="hc-applications__footnote">
          With over 25,000 healthcare facilities in Sub-Saharan Africa lacking electricity, the
          need for scalable solutions is urgent.
        </p>
      </section>

      <section ref={impactRef} className="hc-section hc-impact" id="impact">
        <div className="hc-impact__head">
          <p className="hc-impact__eyebrow">Proven outcomes</p>
          <h2 className="hc-impact__title">
            Measurable <span className="handUnderline">Impact in Healthcare</span>
          </h2>
          <p className="hc-impact__lead">GridStreak delivers real, measurable outcomes for healthcare operations.</p>
        </div>

        <div className="hc-impact__grid" role="list" aria-label="Healthcare impact highlights">
          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">{formatImpactNumber(impactCounts.costReduction, "costReduction")}</p>
            <p className="hc-impact-card__title">Reduction in healthcare energy costs</p>
          </article>

          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">Less Diesel</p>
            <p className="hc-impact-card__title">Reduced reliance on diesel and polluting fuels</p>
          </article>

          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">Safer Storage</p>
            <p className="hc-impact-card__title">Improved medical supply preservation</p>
          </article>

          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">{formatImpactNumber(impactCounts.uptime, "uptime")}</p>
            <p className="hc-impact-card__title">Increased uptime for life-saving healthcare services</p>
          </article>
        </div>
      </section>

      {/* CTA */}
      <section className="hc-cta" id="deployment-plan">
        <div className="hc-cta__media" aria-hidden="true">
          <img
            src="https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png"
            alt=""
            loading="lazy"
          />
        </div>
        <div className="hc-cta__content">
          <h2>Deploy GridStreak in Your Healthcare Facility</h2>
          <p className="hc-cta__lead">
            Ensure uninterrupted care, protect critical supplies, and reduce operational costs with
            GridStreak.
          </p>
        <div className="hc-cta__actions">
          <Link className="primary-btn hc-cta__btn" to="/contact?solution=hospitals-clinics">
            Contact Us Today
          </Link>
        </div>
        </div>
      </section>

      </div>
    </>
  );
};

export default HospitalsClinics;

