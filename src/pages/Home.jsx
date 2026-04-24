import React, { useState } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import "./Home.css";
import CookingCrisisCarousel from "../components/CleanCooking/CookingCrisisCarousel";
const flexibleIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/flexible.svg";
const carbonIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/zero-carbon.svg";
const reliableIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/reliable.svg";
const scalableIcon = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/scalable.svg"
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
        <h2>Why GridStreak?</h2>
        <div className="features">
          <div className="feature-card">
            <img src={flexibleIcon} alt="Flexible Storage" className="feature-icon" />
            <h3>Flexible Storage</h3>
            <p>
                Works with multiple renewable energy sources, adapting to your specific power generation needs.
            </p>
          </div>
          <div className="feature-card">
            <img src={carbonIcon} alt="Carbon Icon" className="feature-icon" />
            <h3>Zero Carbon Emissions</h3>
            <p>
              Fully decoupled from fossil fuel systems, ensuring completely clean energy storage.
            </p>
          </div>
          <div className="feature-card">
            <img src={reliableIcon} alt="Reliable Icon" className="feature-icon" />
            <h3>Reliable</h3>
            <p>
          Store heat for hours to days with minimal losses and providing instant dispatch.
            </p>
          </div>
          <div className="feature-card">
            <img src={scalableIcon} alt="scalable icon" className="feature-icon" />
            <h3>Scalable</h3>
            <p>
              Modular units that can be configured to fit any size project from residential to industrial scale.
            </p>
          </div>
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






