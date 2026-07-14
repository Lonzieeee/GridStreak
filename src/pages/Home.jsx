import React, { useRef, useState } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import CookingCrisisCarousel from "../components/CleanCooking/CookingCrisisCarousel";
import ImpactCountStat from "../components/CleanCooking/ImpactCountStat";
import ProcessFlow from "../components/ProcessFlow";
import HowItWorks from "../components/HowItWorks";
import Impact from "../components/Impact"
import Sustainability from "../components/Sustainability";
import WhoWeAre from "../components/WhoWeAre";
import MapSection from "../components/MapSection";
import HeroVideoFlowStrip from "../components/HeroVideoFlowStrip";
import HomeSolutions from "../components/HomeSolutions";

const MOBILE_HERO_IMAGE = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakNano.jpg";
const HERO_INTRO_VIDEO = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/13272920_3840_2160_30fps%281%29.mp4";
const HERO_INTRO_HEADING = "The future runs on stored energy.";
const HERO_ROTATE_MS = 14000;

const heroSlides = [
  {
    heading: "Clean Cooking That Protects Families and the Planet.",
    sub: "Smoke-free thermal cooking replaces charcoal and firewood with renewable heat for households, schools, and community kitchens.",
  },
  {
    heading: "Turning Waste into Clean, Reliable Energy.",
    sub: "GridStreak converts organic and plastic waste into long-duration thermal energy, preventing methane emissions and delivering affordable power for communities, agriculture, and industry.",
  },
  {
    heading: "Decarbonizing Big Industry, One Heat Load at a Time.",
    sub: "Heavy industry runs on intense, continuous heat. GridStreak’s long duration thermal storage helps factories cut fossil fuel use, lower emissions, and keep high temperature processes running cleanly and reliably.",
  },
  // {
  //   heading: "Thermal Energy Systems Built for Power, Heat, and Clean Water.",
  //   sub: "From GridStreak X to Ultra and clean water deployments, each unit turns renewable energy into reliable daily service.",
  // },
  {
    heading: "A Cleaner Future, Guaranteed.",
    sub: "Reliable thermal energy that cuts emissions, protects communities, and powers everyday life so every deployment moves us toward cleaner air and a cleaner tomorrow.",
  },
];

const heroStats = [
  { id: "savings", countUp: { type: "single", start: 0, end: 40, format: (n) => `Up to ${Math.round(n)}%` }, label: "Lower energy costs" },
  { id: "lifespan", countUp: { type: "range", startMin: 0, startMax: 0, endMin: 10, endMax: 25, format: (a, b) => `${Math.round(a)}–${Math.round(b)}+` }, label: "Years of service life" },
  { id: "dispatch", countUp: { type: "single", start: 0, end: 24, format: (n) => `${Math.round(n)}/7` }, label: "Reliable dispatch" },
  { id: "carbon", countUp: { type: "single", start: 0, end: 100, format: (n) => `${Math.round(n)}%` }, label: "Zero carbon emissions" },
];

const heroCarouselSlides = [
  {
    id: "home-clean-cooking",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_1u91qf1u91qf1u91-75900db6-1f7a-4854-9d17-c9c25830aac5.jpg",
    alt: "From smoky traditional cooking to a clean GridStreak kitchen with a family cooking together.",
  },
  {
    id: "home-waste-management",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Untitled%20design.jpg",
    alt: "GridStreak waste-to-energy system converting waste into clean thermal energy.",
  },
  {
    id: "home-decarbonizing-industry",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/steel-factory.jpg",
    alt: "Interior of a steel factory with molten metal and heavy industrial equipment, representing the challenge of decarbonizing big industry.",
  },
  // {
  //   id: "home-clean-water",
  //   image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cleanWaterSystem.jpg",
  //   alt: "GridStreak clean water thermal energy system inside containerized unit.",
  // },
  {
    id: "home-cleaner-future",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/pylons.avif",
    alt: "Electricity pylons over a green hillside under a blue sky, representing clean power for a cleaner future.",
  },
];

const whyGridStreakFeatures = [
  { label: "Affordable", description: "Up to 40% lower energy costs." },
  { label: "Safe", description: "No explosion risk and no thermal runaway." },
  { label: "Non-Toxic", description: "No hazardous battery materials." },
  { label: "Long Lasting", description: "Expected lifespan of 10-25+ years." },
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
  const [heroPhase, setHeroPhase] = useState("carousel");
  const heroVideoRef = useRef(null);
  const heroVideoSessionRef = useRef(0);
  const heroVideoPreloadedRef = useRef(false);
  const [isMobileHero, setIsMobileHero] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const activeHeroSlide = heroSlides[currentSlide] ?? heroSlides[0];
  const whySectionVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: "easeOut", when: "beforeChildren", staggerChildren: 0.12 },
    },
  };
  const whyItemVariants = {
    hidden: { opacity: 0, y: 22 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: "easeOut" } },
  };

  React.useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setIsMobileHero(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  React.useEffect(() => {
    if (!isMobileHero) return undefined;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isMobileHero]);

  React.useEffect(() => {
    if (isMobileHero) return undefined;
    const video = heroVideoRef.current;
    if (!video || heroVideoPreloadedRef.current) return undefined;
    video.preload = "auto";
    video.load();
    heroVideoPreloadedRef.current = true;
    return undefined;
  }, [isMobileHero]);

  React.useEffect(() => {
    if (isMobileHero || heroPhase !== "carousel") return undefined;
    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) return undefined;
    const id = window.setInterval(() => {
      setCurrentSlide((prev) => {
        if (prev < heroSlides.length - 1) return prev + 1;
        setHeroPhase("video");
        return prev;
      });
    }, HERO_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [isMobileHero, heroPhase]);

  const heroVideoActiveRef = useRef(false);

  React.useEffect(() => {
    heroVideoActiveRef.current = heroPhase === "video";
  }, [heroPhase]);

  const finishHeroVideo = React.useCallback(() => {
    if (!heroVideoActiveRef.current) return;
    heroVideoActiveRef.current = false;
    const video = heroVideoRef.current;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    setHeroPhase("carousel");
    setCurrentSlide(0);
  }, []);

  React.useEffect(() => {
    if (isMobileHero || heroPhase !== "video") return undefined;
    const video = heroVideoRef.current;
    if (!video) return undefined;

    const session = heroVideoSessionRef.current + 1;
    heroVideoSessionRef.current = session;
    video.loop = false;

    const playOnce = () => {
      if (heroVideoSessionRef.current !== session) return;
      video.currentTime = 0;
      video.play().catch(finishHeroVideo);
    };

    if (video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA) {
      playOnce();
    } else {
      video.addEventListener("canplaythrough", playOnce, { once: true });
    }

    return () => {
      video.removeEventListener("canplaythrough", playOnce);
      if (heroVideoSessionRef.current === session) {
        video.pause();
      }
    };
  }, [isMobileHero, heroPhase, finishHeroVideo]);

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
          <div className="hero-media">
            <div className={`hero-media__layer ${heroPhase === "carousel" ? "is-active" : ""}`}>
              <CookingCrisisCarousel
                slides={heroCarouselSlides}
                showCaptions={false}
                autoplay={false}
                controlledIndex={currentSlide}
                ariaLabel="GridStreak system showcase"
                onSlideChange={setCurrentSlide}
                prevLabel="Previous hero slide"
                nextLabel="Next hero slide"
              />
            </div>
            <div className={`hero-media__layer ${heroPhase === "video" ? "is-active" : ""}`} aria-hidden="true">
              <video
                ref={heroVideoRef}
                className="hero-intro-video"
                src={HERO_INTRO_VIDEO}
                muted
                playsInline
                loop={false}
                preload="auto"
                onEnded={finishHeroVideo}
                onError={finishHeroVideo}
                aria-hidden="true"
              />
            </div>
          </div>
        )}
        <div className="hero-overlay" aria-hidden="true" />
        {!isMobileHero && heroPhase === "video" ? <HeroVideoFlowStrip /> : null}
        <div className="hero-content">
          {!isMobileHero && heroPhase === "video" ? (
            <div className="hero-slide hero-slide--intro hero-content__phase is-active" key="hero-video-copy">
              <h1>
                <Typewriter text={HERO_INTRO_HEADING} />
              </h1>
            </div>
          ) : (
            <div className="hero-content__phase is-active" key={`hero-slide-${currentSlide}`}>
              <div className="hero-slide slide-in-right" aria-live="polite" aria-atomic="true">
                <h1>{activeHeroSlide.heading}</h1>
                <p>{activeHeroSlide.sub}</p>
              </div>
              <div className="hero-stats" aria-label="GridStreak at a glance">
                {heroStats.map((stat) => (
                  <div className="hero-stat" key={stat.id}>
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
            </div>
          )}
        </div>
      </section>

      <WhoWeAre />
      <HowItWorks />
      <ProcessFlow />

      {/* Why GridStreak Section */}
      <motion.section
        className="why-gridstreak"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.3 }}
        variants={whySectionVariants}
      >
        <div className="why-gridstreak__overlay" aria-hidden="true" />
        <div className="why-gridstreak__shell">
          <motion.div className="why-gridstreak__copy" variants={whyItemVariants}>
            <p className="why-gridstreak__eyebrow">Why GridStreak</p>
            <h2 className="why-gridstreak__title">Built from Local Resources.</h2>
            <p className="why-gridstreak__lede">
              We use locally available inputs such as sand, clay, industrial minerals, recycled materials, and agricultural by-products to lower costs, strengthen local supply chains, and support circular economic growth.
            </p>
          </motion.div>

          <motion.div className="why-gridstreak__rows" aria-label="GridStreak advantages" variants={whyItemVariants}>
            {whyGridStreakFeatures.map((item) => (
              <motion.article key={item.label} className="why-gridstreak__row" variants={whyItemVariants}>
                <h3>{item.label}</h3>
                <p>{item.description}</p>
              </motion.article>
            ))}
          </motion.div>
        </div>
      </motion.section>
      <HomeSolutions />
      <Impact />
      <Sustainability />
      <MapSection />
    </div>
  );
}

export default Home;






