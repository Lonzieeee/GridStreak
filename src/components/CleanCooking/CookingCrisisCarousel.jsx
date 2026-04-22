import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import "./CookingCrisisCarousel.css";

const CRISIS_SLIDES = [
  {
    id: "crisis-1",
    eyebrow: "Crisis 01",
    text: "Over 900 million people rely on charcoal, firewood, and kerosene for cooking.",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/cooking%20firewood-ezremove.webp",
    alt: "A woman cooking with firewood and charcoal inside a mud-walled kitchen.",
  },
  {
    id: "crisis-2",
    eyebrow: "Crisis 02",
    text: "Families spend a large share of income on cooking fuel and energy.",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/costoffirewood.webp",
    alt: "A mother and child counting coins next to a charcoal sack and cooking pot.",
  },
  {
    id: "crisis-3",
    eyebrow: "Crisis 03",
    text: "Household air pollution causes over 3.2 million deaths annually.",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Womanchidcoughing.webp",
    alt: "A woman and child coughing next to a smoky wood-fire cooking stove.",
  },
  {
    id: "crisis-4",
    eyebrow: "Crisis 04",
    text: "Traditional cooking contributes to deforestation and CO₂ emissions.",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Deforestation-ezremove.webp",
    alt: "A deforested hillside with charcoal kilns billowing smoke into the sky.",
  },
];

const AUTOPLAY_INTERVAL_MS = 5500;

const wrap = (n, max) => ((n % max) + max) % max;

export default function CookingCrisisCarousel({
  reducedMotion = false,
  autoplay = true,
  autoplayIntervalMs = AUTOPLAY_INTERVAL_MS,
}) {
  const slides = CRISIS_SLIDES;
  const total = slides.length;

  // Build an extended track with a clone of the last slide at the start
  // and a clone of the first slide at the end, so we can seamlessly loop.
  // Extended indices:  0          1 .. total       total + 1
  //                    clone-last real slides      clone-first
  const extendedSlides = [
    { ...slides[total - 1], id: `${slides[total - 1].id}-clone-pre`, _clone: true },
    ...slides,
    { ...slides[0], id: `${slides[0].id}-clone-post`, _clone: true },
  ];

  const [virtualIndex, setVirtualIndex] = useState(1); // start on first real slide
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const baseId = useId();
  const trackRef = useRef(null);

  // Real slide index (0..total-1) derived from the virtual index.
  const currentIndex = wrap(virtualIndex - 1, total);

  const go = useCallback((dir) => {
    setAnimate(true);
    setVirtualIndex((v) => v + dir);
  }, []);

  const goTo = useCallback((index) => {
    setAnimate(true);
    setVirtualIndex(wrap(index, total) + 1);
  }, [total]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  // Autoplay always advances forward — the seamless loop handles the wrap.
  useEffect(() => {
    if (!autoplay || reducedMotion || paused || total <= 1) return undefined;
    const id = window.setInterval(() => {
      setAnimate(true);
      setVirtualIndex((v) => v + 1);
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, reducedMotion, paused, total, autoplayIntervalMs]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // When we land on one of the clones, snap (without animation) to the
  // matching real slide, so the forward motion continues indefinitely.
  const onTransitionEnd = (e) => {
    if (e.target !== trackRef.current) return;
    if (virtualIndex === extendedSlides.length - 1) {
      // landed on clone-first after the last real slide -> snap to real first
      setAnimate(false);
      setVirtualIndex(1);
    } else if (virtualIndex === 0) {
      // landed on clone-last before the first real slide -> snap to real last
      setAnimate(false);
      setVirtualIndex(total);
    }
  };

  // After a snap (animate=false), re-enable animation on the next frame so the
  // next user/autoplay move transitions smoothly again.
  useEffect(() => {
    if (animate) return undefined;
    let raf2 = 0;
    const raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setAnimate(true));
    });
    return () => {
      cancelAnimationFrame(raf1);
      if (raf2) cancelAnimationFrame(raf2);
    };
  }, [animate]);

  return (
    <div
      className="cc-crisis-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label="Traditional cooking fuel crisis"
      onKeyDown={onKeyDown}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) setPaused(false);
      }}
    >
      <div className="cc-crisis-carousel__viewport" id={`${baseId}-stage`}>
        <div
          ref={trackRef}
          className="cc-crisis-carousel__track"
          data-animate={animate ? "" : undefined}
          style={{ transform: `translate3d(-${virtualIndex * 100}vw, 0, 0)` }}
          onTransitionEnd={onTransitionEnd}
        >
          {extendedSlides.map((slide, index) => {
            const isCurrent = index === virtualIndex;
            return (
              <article
                key={slide.id}
                className="cc-crisis-slide"
                data-current={isCurrent ? "" : undefined}
                aria-hidden={!isCurrent || slide._clone}
                aria-roledescription="slide"
                aria-label={`${slide.eyebrow}`}
              >
                <img
                  className="cc-crisis-slide__image"
                  src={slide.image}
                  alt={slide.alt}
                  loading={index <= 1 ? "eager" : "lazy"}
                />
                <div className="cc-crisis-slide__scrim" aria-hidden="true" />

                <div className="cc-crisis-slide__body">
                  <p className="cc-crisis-slide__eyebrow">{slide.eyebrow}</p>
                  <p className="cc-crisis-slide__quote-mark" aria-hidden="true">“</p>
                  <h3 className="cc-crisis-slide__text">{slide.text}</h3>
                </div>
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="cc-crisis-carousel__btn cc-crisis-carousel__btn--prev"
          onClick={() => go(-1)}
          aria-controls={`${baseId}-stage`}
          aria-label="Previous crisis"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>

        <button
          type="button"
          className="cc-crisis-carousel__btn cc-crisis-carousel__btn--next"
          onClick={() => go(1)}
          aria-controls={`${baseId}-stage`}
          aria-label="Next crisis"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>

        <div className="cc-crisis-carousel__controls">
          <div className="cc-crisis-carousel__dots" role="tablist" aria-label="Select crisis">
            {slides.map((slide, index) => {
              const isCurrent = index === currentIndex;
              return (
                <button
                  key={`dot-${slide.id}`}
                  type="button"
                  className="cc-crisis-carousel__dot"
                  data-current={isCurrent ? "" : undefined}
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Go to crisis ${index + 1}`}
                  onClick={() => goTo(index)}
                >
                  <span className="cc-crisis-carousel__dot-bar" />
                </button>
              );
            })}
          </div>

          <div className="cc-crisis-carousel__counter" aria-live="polite">
            <span>{String(currentIndex + 1).padStart(2, "0")}</span>
            <span className="cc-crisis-carousel__counter-sep">/</span>
            <span>{String(total).padStart(2, "0")}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
