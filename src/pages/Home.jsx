import React, { useState } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import CookingCrisisCarousel from "../components/CleanCooking/CookingCrisisCarousel";
import ImpactCountStat from "../components/CleanCooking/ImpactCountStat";
import RotatingEarth from "../components/RotatingEarth";
import ProcessFlow from "../components/ProcessFlow";
import Impact from "../components/Impact"
import Sustainability from "../components/Sustainability";
import WhoWeAre from "../components/WhoWeAre";
import MapSection from "../components/MapSection";

const MOBILE_HERO_IMAGE = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakNano.jpg";
const HERO_ROTATE_MS = 5500;

const heroSlides = [
  {
    heading: "Zero-Carbon Grid Stability Starts Here",
    sub: "Our thermal bricks convert plastic waste into grid resilience stabilizing networks with 100% clean energy storage.",
  },
  {
    heading: "Grid Stability Powered by 100% Clean and Renewable Energy.",
    sub: "Containerized thermal storage systems deliver dependable power continuity for industrial and community-scale operations.",
  },
  {
    heading: "Thermal Energy Systems Built for Power, Heat, and Clean Water.",
    sub: "From GridStreak X to Ultra and clean water deployments, each unit turns renewable energy into reliable daily service.",
  },
];

const heroCarouselSlides = [
  {
    id: "home-gridstreak-x",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakX.jpg",
    alt: "GridStreak X thermal energy container with rooftop solar panels.",
  },
  {
    id: "home-gridstreak-ultra",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakUltra.jpg",
    alt: "GridStreak Ultra thermal brick battery system inside a container.",
  },
  {
    id: "home-clean-water",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cleanWaterSystem.jpg",
    alt: "GridStreak clean water thermal energy system inside containerized unit.",
  },
];

const whyGridStreakStats = [
  {
    countUp: { type: "single", start: 1, end: 4, format: (n) => `${Math.round(n)}+` },
    title: "Flexible Storage",
    description: "Works with multiple renewable energy sources.",
  },
  {
    countUp: { type: "single", start: 0, end: 100, format: (n) => `${Math.round(n)}%` },
    title: "Zero Carbon Emissions",
    description: "Fully decoupled from fossil fuel systems.",
  },
  {
    countUp: { type: "single", start: 0, end: 24, format: (n) => `${Math.round(n)}/7` },
    title: "Reliable Dispatch",
    description: "Stores heat for hours to days with minimal losses.",
  },
  {
    countUp: { type: "single", start: 0, end: 3, format: (n) => `${Math.round(n)}+` },
    title: "Scalable",
    description: "Modular units can fit residential to industrial projects.",
  },
];

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobileHero, setIsMobileHero] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const activeHeroSlide = heroSlides[currentSlide] ?? heroSlides[0];

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setIsMobileHero(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    if (!isMobileHero) return undefined;
    const id = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isMobileHero]);

  return (
    <div className="home-page">
      <SEO
        title="Thermal Energy Storage Startup for Clean, Reliable and Scalable Energy | GridStreak"
        description="GridStreak is a thermal energy storage startup building long-duration, sand-based brick batteries for clean cooking, healthcare, agriculture, industry, and emergency energy systems."
        canonical="https://www.gridstreak.com/"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "GridStreak",
            "url": "https://www.gridstreak.com/",
            "logo": "https://www.gridstreak.com/logo.png",
            "description": "GridStreak develops long-duration thermal energy storage systems using sand-based brick batteries for clean, reliable, and scalable energy access.",
            "sameAs": [
              "https://www.linkedin.com/company/grid-streak/",
              "https://x.com/GridStreak",
              "https://www.facebook.com/Gridstreak/"
            ]
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "GridStreak",
            "url": "https://www.gridstreak.com/",
            "potentialAction": {
              "@type": "SearchAction",
              "target": "https://www.gridstreak.com/?q={search_term_string}",
              "query-input": "required name=search_term_string"
            }
          }
        ]}
      />
      {/* Hero Section */}
      <section className="hero">
        {isMobileHero ? (
          <div
            className="hero-mobile-image"
            style={{ backgroundImage: `url(${MOBILE_HERO_IMAGE})` }}
            aria-hidden="true"
          />
        ) : (
          <CookingCrisisCarousel
            slides={heroCarouselSlides}
            showCaptions={false}
            ariaLabel="GridStreak system showcase"
            onSlideChange={setCurrentSlide}
          />
        )}
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <div className="hero-slide slide-in-right">
            <h1>{activeHeroSlide.heading}</h1>
            <p>{activeHeroSlide.sub}</p>
          </div>
          <Link to="/solutions" className="hero-btn">
            Learn More
          </Link>
        </div>
      </section>

      {/* Why GridStreak Section */}
      <section className="why-gridstreak">
        <div className="why-gridstreak__shell">
          <div className="why-gridstreak__copy">
            <p className="why-gridstreak__eyebrow">Why GridStreak</p>
            <h2 className="why-gridstreak__title">Clean energy storage measured in real impact.</h2>

            <div className="why-gridstreak__stats" aria-label="GridStreak statistics">
              {whyGridStreakStats.map((item) => (
                <article key={item.title} className="why-gridstreak__stat-item">
                  <ImpactCountStat className="why-gridstreak__stat-number" countUp={item.countUp} start reducedMotion={false} />
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </div>

          <motion.div
            className="why-gridstreak__globe-stage"
            initial={{ opacity: 0, x: 80, scale: 0.94 }}
            whileInView={{ opacity: 1, x: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <RotatingEarth className="why-gridstreak__globe" variant="continent" rotationDuration={40} maxWidth="28rem" />
          </motion.div>
        </div>
      </section>
      <WhoWeAre />
      <ProcessFlow />
      <Impact />
      <Sustainability />
      <MapSection />
    </div>
  );
}

export default Home;






