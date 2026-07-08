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
const HERO_INTRO_VIDEO = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/13272920_3840_2160_30fps%281%29.mp4";
const HERO_INTRO_POSTER = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakX.jpg";
const HERO_INTRO_HEADING = "The future runs on stored energy.";
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

const heroStats = [
  { countUp: { type: "single", start: 0, end: 100, format: (n) => `${Math.round(n)}%` }, label: "Zero-Carbon Energy" },
  { countUp: { type: "single", start: 0, end: 24, format: (n) => `${Math.round(n)}/7` }, label: "Reliable Dispatch" },
  { countUp: { type: "single", start: 0, end: 4, format: (n) => `${Math.round(n)}+` }, label: "Renewable Sources" },
  { countUp: { type: "single", start: 0, end: 3, format: (n) => `${Math.round(n)}+` }, label: "Deployment Scales" },
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

function Typewriter({ text, speed = 55, startDelay = 250, className }) {
  const [count, setCount] = useState(0);

  React.useEffect(() => {
    setCount(0);
    let intervalId = 0;
    const startId = window.setTimeout(() => {
      intervalId = window.setInterval(() => {
        setCount((c) => {
          if (c >= text.length) {
            window.clearInterval(intervalId);
            return c;
          }
          return c + 1;
        });
      }, speed);
    }, startDelay);
    return () => {
      window.clearTimeout(startId);
      window.clearInterval(intervalId);
    };
  }, [text, speed, startDelay]);

  const done = count >= text.length;

  return (
    <span className={className}>
      {text.slice(0, count)}
      <span className={`hero-type-caret ${done ? "is-done" : ""}`} aria-hidden="true" />
    </span>
  );
}

function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [heroIntroDone, setHeroIntroDone] = useState(false);
  const [activeSolutionId, setActiveSolutionId] = useState(null);
  const [isMobileHero, setIsMobileHero] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const activeHeroSlide = heroSlides[currentSlide] ?? heroSlides[0];
  const homeSolutions = [
    {
      id: 2,
      title: "Hospitals & Clinics",
      subtitle: "Consistent thermal energy for critical care operations.",
      description: "Supports sterilization, laundry, kitchen systems, and resilient heat for healthcare facilities.",
      path: "/solutions/hospitals-clinics",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cloudy-day_converted.avif",
      applications: [
        "Sterilization",
        "Laundry Systems",
        "Kitchen & Catering",
        "Hot Water Supply",
        "Space Heating",
        "Backup Power Resilience",
      ],
    },
    {
      id: 1,
      title: "Clean Cooking",
      subtitle: "Smoke-free thermal cooking for communities and institutions.",
      description: "Reliable heat for schools, kitchens, and community feeding centers without biomass fuel.",
      path: "/solutions/clean-cooking",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/sauteeing-food_compressed.webp",
      applications: [
        "Schools & Institutions",
        "Community Kitchens",
        "Restaurants & Hotels",
        "Feeding Programs",
        "Bakeries",
        "Household Cooking",
      ],
    },
    {
      id: 3,
      title: "Cold Storage",
      subtitle: "Renewable cooling for food and medicine resilience.",
      description: "Thermal energy powers dependable cold storage to reduce spoilage and protect supply chains.",
      path: "/solutions/cold-storage",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/coldstorage.avif",
      applications: [
        "Food Preservation",
        "Vaccine Storage",
        "Dairy & Fisheries",
        "Agricultural Produce",
        "Pharmaceutical Cooling",
        "Supply Chain Logistics",
      ],
    },
    {
      id: 4,
      title: "Water Purification",
      subtitle: "Thermal purification for safe daily water access.",
      description: "Heat-powered treatment helps communities secure clean water without complex fuel logistics.",
      path: "/solutions/water-purification",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/view-water-tank-storage_converted.avif",
      applications: [
        "Community Water Points",
        "Schools & Clinics",
        "Disaster Zones",
        "Rural Households",
        "Institutions",
        "Agriculture & Irrigation",
      ],
    },
    {
      id: 5,
      title: "Waste Management",
      subtitle: "Turning waste streams into useful thermal energy.",
      description: "Closed-loop processing converts plastic waste into usable heat while reducing landfill pressure.",
      path: "/solutions/waste-management",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Nolabels.jpg",
      applications: [
        "Plastic Waste Processing",
        "Landfill Reduction",
        "Circular Recycling",
        "Industrial Waste",
        "Municipal Waste",
        "Energy Recovery",
      ],
    },
    {
      id: 6,
      title: "Emergency Relief",
      subtitle: "Rapid deployment energy for crisis response.",
      description: "Portable units deliver practical heat services for camps, shelters, and field operations.",
      path: "/solutions/emergency-relief",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/emergency.png",
      applications: [
        "Refugee Camps",
        "Disaster Response",
        "Field Hospitals",
        "Temporary Shelters",
        "Mobile Kitchens",
        "Off-Grid Deployments",
      ],
    },
  ];

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
        ) : !heroIntroDone ? (
          <video
            className="hero-intro-video"
            src={HERO_INTRO_VIDEO}
            poster={HERO_INTRO_POSTER}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
            onEnded={() => setHeroIntroDone(true)}
            onError={() => setHeroIntroDone(true)}
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
          {!isMobileHero && !heroIntroDone ? (
            <div className="hero-slide hero-slide--intro slide-in-right">
              <h1>
                <Typewriter text={HERO_INTRO_HEADING} />
              </h1>
            </div>
          ) : (
            <>
              <div className="hero-slide slide-in-right">
                <h1>{activeHeroSlide.heading}</h1>
                <p>{activeHeroSlide.sub}</p>
              </div>
              <div className="hero-stats" aria-label="GridStreak at a glance">
                {heroStats.map((stat) => (
                  <div className="hero-stat" key={stat.label}>
                    <ImpactCountStat
                      className="hero-stat__value"
                      countUp={stat.countUp}
                      start
                      reducedMotion={false}
                    />
                    <span className="hero-stat__label">{stat.label}</span>
                  </div>
                ))}
              </div>
              <Link to="/solutions" className="hero-btn">
                Learn More
              </Link>
            </>
          )}
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
      <section className="home-solutions" aria-labelledby="home-solutions-title">
        <header className="home-solutions__header">
          <span className="home-solutions__accent" aria-hidden="true" />
          <h2 id="home-solutions-title">Our Solutions</h2>
        </header>

        <div
          className={`home-solutions__rail ${activeSolutionId === homeSolutions[homeSolutions.length - 1].id ? "is-end" : ""}`}
          role="list"
          onMouseLeave={() => setActiveSolutionId(null)}
        >
          {homeSolutions.map((solution) => {
            const isActive = solution.id === activeSolutionId;
            return (
              <article
                key={solution.id}
                role="listitem"
                className={`home-solutions__card ${isActive ? "is-active" : ""}`}
                onMouseEnter={() => setActiveSolutionId(solution.id)}
                onFocus={() => setActiveSolutionId(solution.id)}
                onClick={() => setActiveSolutionId(solution.id)}
              >
                <div className="home-solutions__media-wrap">
                  <img src={solution.image} alt={solution.title} className="home-solutions__media" loading="lazy" />
                </div>

                <div className="home-solutions__overlay">
                  <h3>{solution.title}</h3>
                  <p className="home-solutions__teaser">{solution.subtitle}</p>
                </div>

                <div className="home-solutions__panel" aria-hidden={!isActive}>
                  <div className="home-solutions__panel-head">
                    <h3 className="home-solutions__panel-title">{solution.title}</h3>
                    <p className="home-solutions__panel-desc">{solution.description}</p>
                  </div>

                  <ul className="home-solutions__apps">
                    {solution.applications.map((app) => (
                      <li key={app} className="home-solutions__app">
                        <span>{app}</span>
                      </li>
                    ))}
                  </ul>

                  <Link to={solution.path} className="home-solutions__link">
                    Learn more →
                  </Link>
                </div>
              </article>
            );
          })}
        </div>
      </section>
      <Impact />
      <Sustainability />
      <MapSection />
    </div>
  );
}

export default Home;






