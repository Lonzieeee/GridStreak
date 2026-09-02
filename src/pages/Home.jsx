import React, { useCallback, useEffect, useRef, useState } from "react";
import SEO from "../components/SEO";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import "./Home.css";
import CookingCrisisCarousel from "../components/CleanCooking/CookingCrisisCarousel";
import HeroVideoModal from "../components/HeroVideoModal";
import ProcessFlow from "../components/ProcessFlow";
import HowItWorks from "../components/HowItWorks";
import Impact from "../components/Impact";
import Sustainability from "../components/Sustainability";
import WhoWeAre from "../components/WhoWeAre";
import MapSection from "../components/MapSection";
import HomeSolutions from "../components/HomeSolutions";

const MOBILE_HERO_IMAGE = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/gridstreakNano.jpg";
const HERO_CAROUSEL_VIDEO =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/%5Btrimmed%5D%20WC0A4354(1)_compressed(3).mp4";
const HERO_STORY_VIDEO =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/WC0A4354(1)_compressed.mp4";
const HERO_INTRO_VIDEO =
  "https://pub-4f2f828d8afd481c97de7c6bd410724a.r2.dev/Cooker1-%20MotionStudy.mp4";
const HERO_ROTATE_MS = 12000;

const HERO_IMAGE_SLIDES = [
  {
    id: "home-decarbonizing-industry",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/steel-factory.jpg",
    alt: "Interior of a steel factory with molten metal and heavy industrial equipment.",
    topLeft:
      "Heavy industry depends on intense, continuous heat. GridStreak stores renewable energy as thermal power that factories can dispatch on demand.",
    bottomLeft: "Decarbonizing Big Industry, One Heat Load at a Time.",
    asideLabel: "Industrial heat",
    asideText:
      "Steel, cement, food processing, and manufacturing — replacing fossil fuel heat with long-duration thermal storage.",
    mobile: {
      topLeft: "Thermal power factories can dispatch on demand.",
      bottomLeft: "Decarbonizing Big Industry.",
      asideLabel: "Industrial heat",
      asideText: "Steel, cement, and manufacturing.",
    },
  },
  {
    id: "home-cleaner-future",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/pylons.avif",
    alt: "Electricity pylons over a green hillside under a blue sky.",
    topLeft:
      "Every deployment moves communities toward cleaner air, lower emissions, and energy people can rely on every day.",
    bottomLeft: "A Cleaner Future, Guaranteed.",
    asideLabel: "Community impact",
    asideText:
      "Cleaner cooking, safer clinics, productive farms, and resilient power for the places people live and work.",
    mobile: {
      topLeft: "Cleaner air and energy communities can rely on.",
      bottomLeft: "A Cleaner Future.",
      asideLabel: "Community impact",
      asideText: "Cooking, clinics, farms, and power.",
    },
  },
];

const HERO_VIDEO_SLIDE = {
  id: "home-hero-video",
  video: HERO_CAROUSEL_VIDEO,
  poster: MOBILE_HERO_IMAGE,
  alt: "GridStreak thermal energy systems in action.",
};

const heroSlides = [...HERO_IMAGE_SLIDES, HERO_VIDEO_SLIDE];
const mobileHeroSlides = HERO_IMAGE_SLIDES;

const heroIntro =
  "GridStreak delivers long-duration thermal energy storage from sand-based brick batteries — for communities, healthcare, agriculture, and industry worldwide.";
const heroTitleSans = "Clean Energy";
const heroTitleSerif = "That Lasts.";
const heroAsideLabel = "What we power";
const heroAsideText =
  "Clean cooking, healthcare systems, water purification, agriculture, industry, and emergency backup.";

function HeroPlayIcon() {
  return (
    <span className="hero-play-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" focusable="false">
        <path d="M8 5v14l11-7z" />
      </svg>
    </span>
  );
}

function getSlideCopy(slide, isMobile) {
  if (!slide || slide.video) return slide;
  if (!isMobile || !slide.mobile) return slide;
  return { ...slide, ...slide.mobile };
}

function HeroCornerLayout({ slide, onPlayStory, isMobile = false }) {
  const isVideoSlide = Boolean(slide?.video) && !isMobile;
  const copy = getSlideCopy(slide, isMobile);

  return (
    <div
      className={`hero-layout is-visible${isMobile ? " hero-layout--mobile-slides" : ""}${isVideoSlide ? " hero-layout--video-slide" : ""}`}
      key={isVideoSlide ? "video-slide" : `${copy?.id ?? "slide"}-${isMobile ? "m" : "d"}`}
    >
      <div className="hero-block hero-block--top-left">
        <p className="hero-intro">{isVideoSlide ? heroIntro : copy.topLeft}</p>
      </div>
      <div className="hero-block hero-block--bottom-left">
        {isVideoSlide ? (
          <h1 className="hero-title">
            <span className="hero-title__sans">{heroTitleSans}</span>
            <span className="hero-title__serif">{heroTitleSerif}</span>
          </h1>
        ) : (
          <h1 className="hero-title hero-title--slide">{copy.bottomLeft}</h1>
        )}
        {isVideoSlide && (
          <div className="hero-actions hero-actions--left">
            <button
              type="button"
              className="hero-btn hero-btn--play"
              onClick={onPlayStory}
              aria-label="Play our story video"
            >
              <HeroPlayIcon />
            </button>
            <Link to="/solutions" className="hero-btn">
              Explore Solutions
            </Link>
          </div>
        )}
      </div>
      <div className="hero-block hero-block--bottom-right">
        <p className="hero-aside-label">{isVideoSlide ? heroAsideLabel : copy.asideLabel}</p>
        <p className="hero-aside-text">{isVideoSlide ? heroAsideText : copy.asideText}</p>
      </div>
    </div>
  );
}

const whyGridStreakFeatures = [
  { label: "Affordable", description: "Up to 40% lower energy costs." },
  { label: "Safe", description: "No explosion risk and no thermal runaway." },
  { label: "Non-Toxic", description: "No hazardous battery materials." },
  { label: "Long Lasting", description: "Expected lifespan of 10-25+ years." },
];

function Home() {
  const introVideoRef = useRef(null);
  const cacheVideoRef = useRef(null);
  const [isMobileHero, setIsMobileHero] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false,
  );
  const [heroPhase, setHeroPhase] = useState(() =>
    typeof window !== "undefined" && window.innerWidth <= 768 ? "carousel" : "intro",
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [storyOpen, setStoryOpen] = useState(false);

  const carouselSlides = isMobileHero ? mobileHeroSlides : heroSlides;
  const activeHeroSlide = carouselSlides[currentSlide] ?? carouselSlides[0];
  const showCornerContent = heroPhase === "carousel" || isMobileHero;

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

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const onResize = () => setIsMobileHero(window.innerWidth <= 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    if (!isMobileHero) return undefined;
    setHeroPhase("carousel");
    setCurrentSlide(0);
    return undefined;
  }, [isMobileHero]);

  useEffect(() => {
    if (typeof window === "undefined" || isMobileHero) return undefined;

    [HERO_INTRO_VIDEO, HERO_CAROUSEL_VIDEO].forEach((href) => {
      const link = document.createElement("link");
      link.rel = "prefetch";
      link.href = href;
      document.head.appendChild(link);
    });

    const cacheVideo = document.createElement("video");
    cacheVideo.preload = "auto";
    cacheVideo.muted = true;
    cacheVideo.src = HERO_CAROUSEL_VIDEO;
    cacheVideo.load();
    cacheVideoRef.current = cacheVideo;

    return () => {
      if (cacheVideoRef.current) {
        cacheVideoRef.current.src = "";
        cacheVideoRef.current = null;
      }
    };
  }, [isMobileHero]);

  useEffect(() => {
    if (isMobileHero) {
      delete document.body.dataset.heroNav;
      return undefined;
    }

    if (heroPhase === "intro") {
      document.body.dataset.heroNav = "solid";
    } else {
      delete document.body.dataset.heroNav;
    }

    return () => {
      delete document.body.dataset.heroNav;
    };
  }, [heroPhase, isMobileHero]);

  useEffect(() => {
    if (isMobileHero) return undefined;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      setCurrentSlide(0);
      setHeroPhase("carousel");
      return undefined;
    }

    if (heroPhase !== "intro") return undefined;

    const introVideo = introVideoRef.current;
    if (!introVideo) return undefined;

    introVideo.loop = false;
    introVideo.currentTime = 0;
    introVideo.play().catch(() => {
      setCurrentSlide(0);
      setHeroPhase("carousel");
    });

    return undefined;
  }, [heroPhase, isMobileHero]);

  const handleCarouselVideoEnded = useCallback(() => {
    setCurrentSlide(0);
  }, []);

  useEffect(() => {
    if (heroPhase !== "carousel") return undefined;

    const slides = isMobileHero ? mobileHeroSlides : heroSlides;
    const id = window.setInterval(() => {
      setCurrentSlide((prev) => {
        const current = slides[prev];
        if (current?.video) return prev;
        if (prev >= slides.length - 1) return 0;
        return prev + 1;
      });
    }, HERO_ROTATE_MS);

    return () => window.clearInterval(id);
  }, [heroPhase, isMobileHero]);

  const handleIntroEnded = () => {
    if (introVideoRef.current) {
      introVideoRef.current.pause();
    }
    setCurrentSlide(0);
    setHeroPhase("carousel");
  };

  useEffect(() => {
    if (heroPhase !== "carousel" || !introVideoRef.current) return undefined;
    introVideoRef.current.pause();
    return undefined;
  }, [heroPhase]);

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
            name: "GridStreak",
            url: "https://www.gridstreak.com/",
            logo: "https://www.gridstreak.com/logo.png",
            description:
              "GridStreak develops long-duration thermal energy storage systems using sand-based brick batteries for clean, reliable, and scalable energy access.",
            sameAs: [
              "https://www.linkedin.com/company/grid-streak/",
              "https://x.com/GridStreak",
              "https://www.facebook.com/Gridstreak/",
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "GridStreak",
            url: "https://www.gridstreak.com/",
            potentialAction: {
              "@type": "SearchAction",
              target: "https://www.gridstreak.com/?q={search_term_string}",
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />
      <section
        className={`hero${showCornerContent ? " hero--content-visible" : ""}${heroPhase === "intro" ? " hero--intro-phase" : ""}${isMobileHero ? " hero--mobile-slides" : ""}`}
      >
        <div className="hero-media">
          {heroPhase === "carousel" && (
            <CookingCrisisCarousel
              slides={carouselSlides}
              showCaptions={false}
              autoplay={false}
              controlledIndex={currentSlide}
              ariaLabel="GridStreak hero showcase"
              onSlideChange={setCurrentSlide}
              onVideoEnded={handleCarouselVideoEnded}
              prevLabel="Previous hero slide"
              nextLabel="Next hero slide"
            />
          )}
          {!isMobileHero && (
            <video
              ref={introVideoRef}
              className={`hero-intro-video hero-intro-video--intro${heroPhase === "intro" ? " is-active" : ""}`}
              src={HERO_INTRO_VIDEO}
              poster={MOBILE_HERO_IMAGE}
              muted
              playsInline
              loop={false}
              preload="auto"
              onEnded={handleIntroEnded}
              aria-hidden={heroPhase !== "intro"}
            />
          )}
        </div>
        <div
          className={`hero-overlay${showCornerContent ? " hero-overlay--cinematic" : ""}`}
          aria-hidden="true"
        />
        {showCornerContent && (
          <HeroCornerLayout
            slide={activeHeroSlide}
            onPlayStory={() => setStoryOpen(true)}
            isMobile={isMobileHero}
          />
        )}
        <HeroVideoModal
          src={HERO_STORY_VIDEO}
          isOpen={storyOpen}
          onClose={() => setStoryOpen(false)}
          title="GridStreak — Our Story"
        />
      </section>

      <WhoWeAre />
      <HowItWorks />
      <ProcessFlow />

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
              We use locally available inputs such as sand, clay, industrial minerals, recycled materials, and
              agricultural by-products to lower costs, strengthen local supply chains, and support circular economic
              growth.
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
