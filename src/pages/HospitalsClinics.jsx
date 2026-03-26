import React from "react";
import { motion as Motion, useReducedMotion } from "framer-motion";
import { FaGlobeAfrica, FaHeartbeat, FaBolt, FaGasPump } from "react-icons/fa";
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

  return (
    <>
      <SEO
        title="Healthcare Energy Solutions for Hospitals & Clinics | GridStreak Energy Startup"
        description="GridStreak provides thermal energy storage solutions for hospitals and rural clinics. Reliable off-grid energy, medical cold storage, and waste-to-energy systems."
        canonical="https://gridstreak.com/solutions/hospitals-clinics"
      />
      <div className="hc-container">

      {/* HERO SECTION */}
      <section className="hc-hero">
        <img src="/images/hero-placeholder.jpg" alt="Healthcare energy" className="hc-hero-img" />
        <div className="hc-hero-content">
          <h1>Reliable, Clean Energy for Hospitals & Clinics Anywhere</h1>
          <p>
            GridStreak delivers thermal energy storage solutions for uninterrupted power,
            cold storage, and waste-to-energy systems.
          </p>
          <div className="hc-buttons">
            <button className="primary-btn">Deploy GridStreak</button>
            <button className="secondary-btn">Talk to Us</button>
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
                Sand-Based Thermal Energy Storage Technology
              </Motion.h2>
              <Motion.p className="hc-tech-slider__lead" {...techSlideInMotion(prefersReducedMotion, 0.12)}>
                At the core of GridStreak is a breakthrough affordable and long-lasting sand-based
                thermal energy storage system that stores energy as heat and releases it on demand.
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
      </section>

      {/*
      <section className="hc-section hc-impact">
        <div className="hc-impact__head">
          <p className="hc-impact__eyebrow">Proven outcomes</p>
          <h2>Real Impact in Healthcare Operations</h2>
          <p className="hc-impact__lead">
            GridStreak systems are designed to reduce energy pressure on facilities while improving
            service continuity for critical care environments.
          </p>
        </div>

        <div className="hc-impact__grid" role="list" aria-label="Healthcare impact highlights">
          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">Up to 50%</p>
            <p className="hc-impact-card__title">Lower energy cost burden</p>
            <p className="hc-impact-card__desc">
              Reduce generator and fuel-related operating expenses.
            </p>
          </article>

          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">High uptime</p>
            <p className="hc-impact-card__title">Continuity for critical services</p>
            <p className="hc-impact-card__desc">
              Maintain power availability for essential equipment and care workflows.
            </p>
          </article>

          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">Less diesel</p>
            <p className="hc-impact-card__title">Reduced fuel dependency</p>
            <p className="hc-impact-card__desc">
              Lower logistical risk and emissions linked to fuel supply chains.
            </p>
          </article>

          <article className="hc-impact-card" role="listitem">
            <p className="hc-impact-card__value">Safer storage</p>
            <p className="hc-impact-card__title">Better cold-chain reliability</p>
            <p className="hc-impact-card__desc">
              Support medicine and vaccine preservation during grid instability.
            </p>
          </article>
        </div>
      </section>
      */}

      {/* CTA */}
      <section className="hc-cta">
        <h2>Ready to deploy GridStreak?</h2>
        <p className="hc-cta__lead">
          Get a quick deployment plan tailored to your healthcare facility.
        </p>
        <div className="hc-cta__actions">
          <button className="primary-btn hc-cta__btn">Get My Deployment Plan</button>
        </div>
      </section>

      </div>
    </>
  );
};

export default HospitalsClinics;

