import React, { useRef, useState } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
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

const MOBILE_HERO_IMAGE = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakNano.jpg";
const HERO_INTRO_VIDEO = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/13272920_3840_2160_30fps%281%29.mp4";
const HERO_INTRO_HEADING = "The future runs on stored energy.";
const HERO_ROTATE_MS = 7500;
const SOLUTIONS_ROTATE_MS = 5200;

const heroSlides = [
  {
    heading: "Clean Cooking That Protects Families and the Planet.",
    sub: "Smoke-free thermal cooking replaces charcoal and firewood with renewable heat for households, schools, and community kitchens.",
  },
  {
    heading: "Clean, Reliable Water for Every Community.",
    sub: "Solar-powered thermal purification delivers safe drinking water and dependable daily access without fuel logistics.",
  },
  {
    heading: "Thermal Energy Systems Built for Power, Heat, and Clean Water.",
    sub: "From GridStreak X to Ultra and clean water deployments, each unit turns renewable energy into reliable daily service.",
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
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/image-d81f0fcb-34de-44e5-a47e-1835732a9dfa.jpg",
    alt: "Family cooking with a GridStreak clean cooking system in a modern smoke-free kitchen.",
  },
  {
    id: "home-water-purification",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/purificationhero.webp",
    alt: "GridStreak solar and thermal water purification system delivering clean reliable water.",
  },
  {
    id: "home-clean-water",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cleanWaterSystem.jpg",
    alt: "GridStreak clean water thermal energy system inside containerized unit.",
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
  const solutionsSectionRef = useRef(null);
  const [activeSolutionId, setActiveSolutionId] = useState(null);
  const [solutionDirection, setSolutionDirection] = useState(1);
  const [isSolutionsInView, setIsSolutionsInView] = useState(false);
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
  const homeSolutions = [
    {
      id: 2,
      title: "Hospitals & Clinics",
      subtitle: "Reliable thermal energy for critical care.",
      description: "Supports sterilization, laundry, kitchen systems, and resilient heat for healthcare facilities.",
      path: "/solutions/hospitals-clinics",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/hospital-building-with-solar-panels-and-ambulances.webp",
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
      subtitle: "Smoke-free thermal cooking at scale.",
      description: "Reliable heat for schools, kitchens, and community feeding centers without biomass fuel.",
      path: "/solutions/clean-cooking",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_jazzqojazzqojazz-4a18993d-7bda-4a6f-961a-4c389cba0b8a.jpg",
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
      subtitle: "Renewable cooling for food and medicine.",
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
      subtitle: "Thermal purification for safe water access.",
      description: "Heat-powered treatment helps communities secure clean water without complex fuel logistics.",
      path: "/solutions/water-purification",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cleanWaterSystem.jpg",
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
      subtitle: "Converts waste into useful thermal energy.",
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
      subtitle: "Rapid thermal support for crisis response.",
      description: "Portable units deliver practical heat services for camps, shelters, and field operations.",
      path: "/solutions/emergency-relief",
      image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Gemini_Generated_Image_bs67zibs67zibs67-b0671137-2c13-4065-877b-83cec871d426(1).jpg",
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
  const activeSolution = homeSolutions.find((solution) => solution.id === activeSolutionId) ?? homeSolutions[0];
  const activeSolutionIndex = Math.max(
    0,
    homeSolutions.findIndex((solution) => solution.id === activeSolution.id),
  );
  const previewSolutions = [
    homeSolutions[(activeSolutionIndex + 1) % homeSolutions.length],
    homeSolutions[(activeSolutionIndex + 2) % homeSolutions.length],
  ].filter(Boolean);
  const solutionQueue = [activeSolution, ...previewSolutions];

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

  const showNextSolution = React.useCallback(() => {
    if (!homeSolutions.length) return;
    setSolutionDirection(1);
    const nextIndex = (activeSolutionIndex + 1) % homeSolutions.length;
    setActiveSolutionId(homeSolutions[nextIndex].id);
  }, [activeSolutionIndex, homeSolutions]);

  const showPrevSolution = React.useCallback(() => {
    if (!homeSolutions.length) return;
    setSolutionDirection(-1);
    const prevIndex = (activeSolutionIndex - 1 + homeSolutions.length) % homeSolutions.length;
    setActiveSolutionId(homeSolutions[prevIndex].id);
  }, [activeSolutionIndex, homeSolutions]);

  React.useEffect(() => {
    const section = solutionsSectionRef.current;
    if (!section) return undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsSolutionsInView(entry.isIntersecting);
      },
      { threshold: 0.35 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    if (!homeSolutions.length || !isSolutionsInView) return undefined;
    const id = window.setInterval(() => {
      showNextSolution();
    }, SOLUTIONS_ROTATE_MS);
    return () => window.clearInterval(id);
  }, [homeSolutions.length, showNextSolution, isSolutionsInView]);

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
          <div className="hero-media" aria-hidden="true">
            <div className={`hero-media__layer ${heroPhase === "carousel" ? "is-active" : ""}`}>
              <CookingCrisisCarousel
                slides={heroCarouselSlides}
                showCaptions={false}
                autoplay={false}
                controlledIndex={currentSlide}
                ariaLabel="GridStreak system showcase"
                onSlideChange={setCurrentSlide}
              />
            </div>
            <div className={`hero-media__layer ${heroPhase === "video" ? "is-active" : ""}`}>
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
              />
            </div>
          </div>
        )}
        <div className="hero-overlay"></div>
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
              <div className="hero-slide slide-in-right">
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
            <Link to="/sustainability" className="why-gridstreak__action-link">
              <span>Sustainability</span>
              <span aria-hidden="true">→</span>
            </Link>
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
      <section className="home-solutions" aria-labelledby="home-solutions-title" ref={solutionsSectionRef}>
        <header className="home-solutions__header">
          <h2 id="home-solutions-title">
            Our <span>Solutions</span>
          </h2>
        </header>

        <div className="home-solutions__showcase">
          <div className="home-solutions__visual-row">
            <AnimatePresence initial={false} custom={solutionDirection} mode="popLayout">
              {solutionQueue.map((solution, slot) => (
                <motion.button
                  layout
                  key={solution.id}
                  custom={{ direction: solutionDirection, slot }}
                  variants={{
                    initial: ({ direction, slot: enteringSlot }) => ({
                      opacity: 0,
                      x: direction > 0 ? 80 : -80,
                      scale: enteringSlot === 0 ? 0.96 : 0.92,
                    }),
                    animate: { opacity: 1, x: 0, scale: 1 },
                    exit: ({ direction }) => ({
                      opacity: 0,
                      x: direction > 0 ? -80 : 80,
                      scale: 0.9,
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 0.45, ease: "easeOut" }}
                  type="button"
                  className={`home-solutions__queue-card ${slot === 0 ? "is-active" : ""}`}
                  onClick={() => {
                    setSolutionDirection(slot === 0 ? 1 : 1);
                    setActiveSolutionId(solution.id);
                  }}
                  aria-label={`Show ${solution.title}`}
                >
                  <img src={solution.image} alt={solution.title} loading="lazy" />
                </motion.button>
              ))}
            </AnimatePresence>
          </div>

          <div className="home-solutions__copy">
            <h3>
              <Link to={activeSolution.path} className="home-solutions__category-link">
                {activeSolution.title}
              </Link>
            </h3>
            <p className="home-solutions__description">{activeSolution.description}</p>
          </div>

          <div className="home-solutions__controls">
            <button type="button" aria-label="Previous solution" onClick={showPrevSolution}>
              <FiChevronLeft className="home-solutions__chevron-icon" />
            </button>
            <button type="button" aria-label="Next solution" onClick={showNextSolution}>
              <FiChevronRight className="home-solutions__chevron-icon" />
            </button>
          </div>
        </div>
      </section>
      <Impact />
      <Sustainability />
      <MapSection />
    </div>
  );
}

export default Home;






