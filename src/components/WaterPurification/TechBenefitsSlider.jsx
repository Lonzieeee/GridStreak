import React, { useCallback, useEffect, useId, useState } from "react";
import "./TechBenefitsSlider.css";

const TECH_SLIDES = [
  {
    id: "water-1",
    title: "Solar + Thermal",
    subtitle: "Fully Renewable",
    description:
      "Sunlight heats the water during the day, and a sand battery keeps it warm through the night. No diesel, no bills.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/solardistillation.jpg",
  },
  {
    id: "water-2",
    title: "Distillation",
    subtitle: "Safe To Drink",
    description:
      "Turns rain, river or even salty water into clean drinking water you can trust for your family.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/drinkingdistillation.webp",
  },
  {
    id: "water-3",
    title: "25+ Years",
    subtitle: "Low Maintenance",
    description:
      "Simple design, few moving parts. Built to last in places where the repair truck can't easily reach.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/hadyman.jpg",
  },
  {
    id: "water-4",
    title: "Scalable",
    subtitle: "Nano To Ultra",
    description:
      "Start with one unit for a family. Add more as you grow into a school, a clinic, or a whole village.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/backup(1).jpg",
  },
];

function wrap(n, max) {
  return ((n % max) + max) % max;
}

function getRole(index, current, total) {
  if (index === current) return "current";
  if (index === wrap(current + 1, total)) return "next";
  if (index === wrap(current - 1, total)) return "previous";
  return null;
}

function directionFor(role) {
  if (role === "current") return 0;
  if (role === "next") return 1;
  if (role === "previous") return -1;
  return 0;
}

function roleProps(role) {
  return {
    "data-current": role === "current" ? "" : undefined,
    "data-next": role === "next" ? "" : undefined,
    "data-previous": role === "previous" ? "" : undefined,
  };
}

const AUTOPLAY_INTERVAL_MS = 5500;

export default function TechBenefitsSlider({
  reducedMotion = false,
  autoplay = true,
  autoplayIntervalMs = AUTOPLAY_INTERVAL_MS,
  children = null,
}) {
  const slides = TECH_SLIDES;
  const n = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const baseId = useId();

  const go = useCallback(
    (dir) => {
      setCurrentIndex((i) => wrap(i + dir, n));
    },
    [n],
  );

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  useEffect(() => {
    if (!autoplay || reducedMotion || paused || n <= 1) return undefined;
    const id = window.setInterval(() => {
      setCurrentIndex((i) => wrap(i + 1, n));
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, reducedMotion, paused, n, autoplayIntervalMs, currentIndex]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  return (
    <section
      className="wp-voyage"
      role="region"
      aria-roledescription="carousel"
      aria-label="GridStreak water technology benefits"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="wp-voyage__bg-layer" aria-hidden="true">
        {slides.map((slide, index) => {
          const role = getRole(index, currentIndex, n);
          return (
            <div
              key={`bg-${slide.id}`}
              className="wp-voyage__bg"
              style={{
                "--bg": `url(${slide.image})`,
                "--dir": directionFor(role),
              }}
              {...roleProps(role)}
            />
          );
        })}
      </div>

      {children ? <div className="wp-voyage__header">{children}</div> : null}

      <button
        type="button"
        className="wp-voyage__btn wp-voyage__btn--prev"
        onClick={() => go(-1)}
        aria-controls={`${baseId}-slides`}
        aria-label="Previous benefit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <button
        type="button"
        className="wp-voyage__btn wp-voyage__btn--next"
        onClick={() => go(1)}
        aria-controls={`${baseId}-slides`}
        aria-label="Next benefit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>

      <div className="wp-voyage__slider">
        <div className="wp-voyage__slides-wrapper" id={`${baseId}-slides`}>
          <div className="wp-voyage__slides">
            {slides.map((slide, index) => {
              const role = getRole(index, currentIndex, n);
              const isCurrent = role === "current";
              return (
                <div
                  key={`slide-${slide.id}`}
                  className="wp-voyage__slide"
                  aria-hidden={!isCurrent}
                  {...roleProps(role)}
                >
                  <div className="wp-voyage__slide-inner">
                    <div className="wp-voyage__slide-image-wrap">
                      <img
                        className="wp-voyage__slide-image"
                        src={slide.image}
                        alt={slide.title}
                        loading="lazy"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="wp-voyage__infos" aria-live="polite">
            {slides.map((slide, index) => {
              const role = getRole(index, currentIndex, n);
              const isCurrent = role === "current";
              return (
                <div
                  key={`info-${slide.id}`}
                  className="wp-voyage__info"
                  {...roleProps(role)}
                  aria-hidden={!isCurrent}
                >
                  <div className="wp-voyage__info-inner">
                    <div className="wp-voyage__info-text-wrap">
                      <div data-title className="wp-voyage__info-text">
                        <span>{slide.title}</span>
                      </div>
                      <div data-subtitle className="wp-voyage__info-text">
                        <span>{slide.subtitle}</span>
                      </div>
                      <div data-description className="wp-voyage__info-text">
                        <span>{slide.description}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="wp-voyage__counter" aria-live="polite">
        <span>{String(currentIndex + 1).padStart(2, "0")}</span>
        <span className="wp-voyage__counter-sep">/</span>
        <span>{String(n).padStart(2, "0")}</span>
      </div>
    </section>
  );
}
