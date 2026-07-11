import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { homeSolutions } from "../data/homeSolutions";
import SolutionFlipBack from "./SolutionFlipBack";
import "./HomeSolutions.css";

const SOLUTIONS_ROTATE_MS = 5200;

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth <= breakpoint : false,
  );

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= breakpoint);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}

function getShortDesc(desc, max = 80) {
  if (!desc) return "";
  if (desc.length <= max) return desc;
  return `${desc.slice(0, max).replace(/\s+\S*$/, "")}...`;
}

function getShortSubtitle(subtitle) {
  if (!subtitle) return "";
  if (subtitle.length <= 28) return subtitle;
  return `${subtitle.slice(0, 25)}...`;
}

export default function HomeSolutions() {
  const isMobile = useIsMobile();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [prevIndex, setPrevIndex] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const sectionRef = useRef(null);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return undefined;
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    currentIndexRef.current = currentIndex;
  }, [currentIndex]);

  const transitionToIndex = useCallback((nextIndex) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prev) => {
        setPrevIndex(prev);
        return nextIndex;
      });
    }, 50);
    setTimeout(() => {
      setIsTransitioning(false);
      setPrevIndex(null);
    }, 550);
  }, []);

  const handleNext = useCallback(() => {
    transitionToIndex((currentIndexRef.current + 1) % homeSolutions.length);
  }, [transitionToIndex]);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;
    if (reduceMotion) {
      setIsVisible(true);
      setIsInView(true);
      return undefined;
    }

    const revealObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          revealObserver.disconnect();
        }
      },
      { threshold: 0.2, rootMargin: "0px 0px -10% 0px" },
    );

    const viewObserver = new IntersectionObserver(
      ([entry]) => setIsInView(entry.isIntersecting),
      { threshold: 0.35 },
    );

    revealObserver.observe(el);
    viewObserver.observe(el);

    return () => {
      revealObserver.disconnect();
      viewObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!isInView || reduceMotion) return undefined;
    const interval = window.setInterval(handleNext, SOLUTIONS_ROTATE_MS);
    return () => window.clearInterval(interval);
  }, [isInView, handleNext, reduceMotion]);

  const previewIndices = [
    (currentIndex + 1) % homeSolutions.length,
    (currentIndex + 2) % homeSolutions.length,
  ];
  const thirdPreviewIndex = (currentIndex + 3) % homeSolutions.length;

  const currentSolution = homeSolutions[currentIndex];
  const prevSolution = prevIndex !== null ? homeSolutions[prevIndex] : null;

  return (
    <section
      className={`home-solutions${isVisible ? " home-solutions--visible" : ""}`}
      aria-labelledby="home-solutions-title"
      ref={sectionRef}
    >
      <div className="home-solutions__background" aria-hidden="true" />

      <div className="home-solutions__header">
        <h2 className="home-solutions__title" id="home-solutions-title">
          Our <span className="home-solutions__highlight">Solutions</span>
        </h2>
        <p className="home-solutions__subtitle">
          Thermal energy systems for clean cooking, healthcare, water, cold storage, waste recovery,
          and emergency response.
        </p>
      </div>

      <div className="home-solutions__content-wrapper">
        <div className={`home-solutions__main-card${isTransitioning ? " transitioning" : ""}`}>
          <div className="home-solutions__counter-badge" aria-hidden="true">
            <span className="home-solutions__counter-numerator">{currentIndex + 1}</span>
            <span className="home-solutions__counter-divider" />
            <span className="home-solutions__counter-denominator">{homeSolutions.length}</span>
          </div>

          <div
            className="home-solutions__main-image-wrapper"
            role="img"
            aria-label={currentSolution.title}
          >
            {prevSolution && isTransitioning && (
              <div
                className="home-solutions__main-image-img crossfade-out"
                style={{ backgroundImage: `url("${prevSolution.image}")` }}
                aria-hidden="true"
              >
                <div className="home-solutions__image-category">
                  {getShortSubtitle(prevSolution.subtitle)}
                </div>
              </div>
            )}
            <div
              className={`home-solutions__main-image-img${isTransitioning ? " crossfade-in" : ""}`}
              style={{ backgroundImage: `url("${currentSolution.image}")` }}
            >
              <div className="home-solutions__image-category">
                {getShortSubtitle(currentSolution.subtitle)}
              </div>
            </div>
          </div>

          <div className="home-solutions__main-content" aria-live="polite" aria-atomic="true">
            <h3 className="home-solutions__name">{currentSolution.title}</h3>
            <p className="home-solutions__description">
              {isMobile
                ? getShortDesc(currentSolution.description, 120)
                : currentSolution.description}
            </p>
            <Link to={currentSolution.path} className="home-solutions__btn">
              Learn More
            </Link>
          </div>
        </div>

        {!isMobile && (
          <div className={`home-solutions__previews${isTransitioning ? " transitioning" : ""}`}>
            <div className="home-solutions__preview-flip-container large">
              <div className="home-solutions__preview-flip-card">
                <button
                  type="button"
                  className="home-solutions__preview-card home-solutions__preview-card-front large"
                  style={{ backgroundImage: `url("${homeSolutions[previewIndices[0]].image}")` }}
                  onClick={() => transitionToIndex(previewIndices[0])}
                  aria-label={`Show ${homeSolutions[previewIndices[0]].title}`}
                >
                  <span className="home-solutions__preview-number">{previewIndices[0] + 1}</span>
                  <span className="home-solutions__preview-overlay">
                    <span className="home-solutions__preview-sector">
                      {homeSolutions[previewIndices[0]].subtitle}
                    </span>
                    <span className="home-solutions__preview-name large">
                      {homeSolutions[previewIndices[0]].title}
                    </span>
                  </span>
                </button>
                <div className="home-solutions__preview-card home-solutions__preview-card-back" aria-hidden="true">
                  <SolutionFlipBack solution={homeSolutions[previewIndices[0]]} />
                </div>
              </div>
            </div>

            <div className="home-solutions__preview-row">
              <button
                type="button"
                className="home-solutions__preview-card small"
                style={{ backgroundImage: `url("${homeSolutions[previewIndices[1]].image}")` }}
                onClick={() => transitionToIndex(previewIndices[1])}
                aria-label={`Show ${homeSolutions[previewIndices[1]].title}`}
              >
                <span className="home-solutions__preview-number">{previewIndices[1] + 1}</span>
                <span className="home-solutions__preview-overlay">
                  <span className="home-solutions__preview-sector">
                    {homeSolutions[previewIndices[1]].subtitle}
                  </span>
                  <span className="home-solutions__preview-name">
                    {homeSolutions[previewIndices[1]].title}
                  </span>
                </span>
              </button>

              <button
                type="button"
                className="home-solutions__preview-card small"
                style={{ backgroundImage: `url("${homeSolutions[thirdPreviewIndex].image}")` }}
                onClick={() => transitionToIndex(thirdPreviewIndex)}
                aria-label={`Show ${homeSolutions[thirdPreviewIndex].title}`}
              >
                <span className="home-solutions__preview-number">{thirdPreviewIndex + 1}</span>
                <span className="home-solutions__preview-overlay">
                  <span className="home-solutions__preview-sector">
                    {homeSolutions[thirdPreviewIndex].subtitle}
                  </span>
                  <span className="home-solutions__preview-name">
                    {homeSolutions[thirdPreviewIndex].title}
                  </span>
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="home-solutions__navigation">
        <div className="home-solutions__dots" aria-label="Solution slides">
          {homeSolutions.map((solution, idx) => (
            <button
              key={solution.id}
              type="button"
              aria-current={idx === currentIndex ? "true" : undefined}
              aria-label={`Go to ${solution.title}`}
              className={`home-solutions__dot${idx === currentIndex ? " active" : ""}`}
              onClick={() => transitionToIndex(idx)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
