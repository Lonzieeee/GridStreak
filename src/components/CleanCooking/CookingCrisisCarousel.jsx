import React, { useCallback, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
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
    text: "Traditional cooking releases methane and CO2, driving over 1 billion metric tons of climate emissions each year.",
    image:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Deforestation-ezremove.webp",
    alt: "A deforested hillside with charcoal kilns billowing smoke into the sky.",
  },
];

const AUTOPLAY_INTERVAL_MS = 5500;

const wrap = (n, max) => ((n % max) + max) % max;

function CrisisSlideMedia({ slide, isCurrent, onVideoEnded }) {
  const videoRef = useRef(null);
  const retryTimerRef = useRef(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !slide.video) return undefined;

    const clearRetry = () => {
      if (retryTimerRef.current) {
        window.clearTimeout(retryTimerRef.current);
        retryTimerRef.current = 0;
      }
    };

    const tryPlay = (attempt = 0) => {
      if (!isCurrent || !videoRef.current) return;

      const el = videoRef.current;
      el.muted = true;

      const start = () => {
        if (!isCurrent || !videoRef.current) return;
        el.currentTime = 0;
        const playPromise = el.play();
        if (playPromise && typeof playPromise.catch === "function") {
          playPromise.catch(() => {
            if (!isCurrent || attempt >= 4) return;
            clearRetry();
            retryTimerRef.current = window.setTimeout(() => tryPlay(attempt + 1), 350);
          });
        }
      };

      if (el.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
        start();
        return;
      }

      const onReady = () => {
        el.removeEventListener("canplay", onReady);
        el.removeEventListener("error", onError);
        start();
      };
      const onError = () => {
        el.removeEventListener("canplay", onReady);
        el.removeEventListener("error", onError);
        if (attempt < 4 && isCurrent) {
          clearRetry();
          retryTimerRef.current = window.setTimeout(() => tryPlay(attempt + 1), 500);
        }
      };

      el.addEventListener("canplay", onReady);
      el.addEventListener("error", onError);
      el.load();
    };

    if (isCurrent) {
      tryPlay();
      return clearRetry;
    }

    clearRetry();
    video.pause();
    return undefined;
  }, [isCurrent, slide.video]);

  if (slide.video) {
    return (
      <video
        ref={videoRef}
        className="cc-crisis-slide__image cc-crisis-slide__video"
        src={slide.video}
        poster={slide.poster}
        muted
        playsInline
        autoPlay={isCurrent}
        loop={false}
        preload="auto"
        onEnded={() => {
          if (isCurrent) onVideoEnded?.();
        }}
        aria-hidden="true"
      />
    );
  }

  return (
    <img
      className="cc-crisis-slide__image"
      src={slide.image}
      alt={slide.alt}
      loading={slide._eagerLoad ? "eager" : "lazy"}
      fetchPriority={slide._eagerLoad ? "high" : undefined}
    />
  );
}

export default function CookingCrisisCarousel({
  reducedMotion = false,
  autoplay = true,
  autoplayIntervalMs = AUTOPLAY_INTERVAL_MS,
  slides: slidesProp,
  showCaptions = true,
  ariaLabel = "Traditional cooking fuel crisis",
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  onSlideChange,
  controlledIndex,
  onVideoEnded,
}) {
  const slides = Array.isArray(slidesProp) && slidesProp.length > 0 ? slidesProp : CRISIS_SLIDES;
  const total = slides.length;
  const isControlled = typeof controlledIndex === "number";

  const loopSlides = [
    { ...slides[total - 1], id: `${slides[total - 1].id}-clone-pre`, _clone: true },
    ...slides,
    { ...slides[0], id: `${slides[0].id}-clone-post`, _clone: true },
  ];

  const trackSlides = isControlled ? slides : loopSlides;

  const [virtualIndex, setVirtualIndex] = useState(() =>
    isControlled && typeof controlledIndex === "number" ? controlledIndex : 1,
  );
  const [animate, setAnimate] = useState(true);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const baseId = useId();
  const trackRef = useRef(null);
  const rootRef = useRef(null);
  const prevControlledRef = useRef(controlledIndex);

  const currentIndex = isControlled ? wrap(virtualIndex, total) : wrap(virtualIndex - 1, total);

  const go = useCallback((dir) => {
    if (isControlled && typeof onSlideChange === "function") {
      onSlideChange(wrap(currentIndex + dir, total));
      return;
    }
    setAnimate(true);
    setVirtualIndex((v) => v + dir);
  }, [isControlled, onSlideChange, currentIndex, total]);

  const goTo = useCallback((index) => {
    if (isControlled && typeof onSlideChange === "function") {
      onSlideChange(wrap(index, total));
      return;
    }
    setAnimate(true);
    setVirtualIndex(wrap(index, total) + 1);
  }, [isControlled, onSlideChange, total]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    }
  };

  // Start autoplay only when the section is visible in the viewport.
  useEffect(() => {
    const el = rootRef.current;
    if (typeof window === "undefined" || !el) return undefined;
    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return undefined;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Autoplay advances only while in view — the seamless loop handles the wrap.
  useEffect(() => {
    if (!autoplay || reducedMotion || paused || !inView || total <= 1) return undefined;
    const id = window.setInterval(() => {
      setAnimate(true);
      setVirtualIndex((v) => v + 1);
    }, autoplayIntervalMs);
    return () => window.clearInterval(id);
  }, [autoplay, reducedMotion, paused, inView, total, autoplayIntervalMs]);

  useEffect(() => {
    if (typeof onSlideChange === "function") {
      onSlideChange(currentIndex);
    }
  }, [currentIndex, onSlideChange]);

  useLayoutEffect(() => {
    if (!isControlled) return undefined;
    if (typeof controlledIndex !== "number") return undefined;

    const prev = prevControlledRef.current;
    if (prev === controlledIndex) return undefined;

    prevControlledRef.current = controlledIndex;

    if (typeof prev === "number" && prev === total - 1 && controlledIndex === 0 && total > 2) {
      setAnimate(false);
      setVirtualIndex(0);
      return undefined;
    }

    setAnimate(true);
    setVirtualIndex(controlledIndex);
    return undefined;
  }, [controlledIndex, isControlled, total]);

  useEffect(() => {
    if (typeof document === "undefined") return undefined;
    const onVisibility = () => setPaused(document.hidden);
    document.addEventListener("visibilitychange", onVisibility);
    return () => document.removeEventListener("visibilitychange", onVisibility);
  }, []);

  // When we land on one of the clones, snap (without animation) to the
  // matching real slide, so the forward motion continues indefinitely.
  const onTransitionEnd = (e) => {
    if (isControlled) return;
    if (e.target !== trackRef.current) return;
    if (virtualIndex === loopSlides.length - 1) {
      setAnimate(false);
      setVirtualIndex(1);
    } else if (virtualIndex === 0) {
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
      ref={rootRef}
      className="cc-crisis-carousel"
      role="region"
      aria-roledescription="carousel"
      aria-label={ariaLabel}
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
          {trackSlides.map((slide, index) => {
            const isCurrent = index === virtualIndex;
            const slideLabel = slide.eyebrow || slide.alt || `Slide ${index + 1}`;
            const mediaSlide =
              isControlled && index === 0 ? { ...slide, _eagerLoad: true } : slide;
            return (
              <article
                key={slide.id}
                className="cc-crisis-slide"
                data-current={isCurrent ? "" : undefined}
                aria-hidden={!isCurrent || slide._clone}
                aria-roledescription="slide"
                aria-label={slideLabel}
              >
                <CrisisSlideMedia
                  slide={mediaSlide}
                  isCurrent={isCurrent && !slide._clone}
                  onVideoEnded={onVideoEnded}
                />
                <div className="cc-crisis-slide__scrim" aria-hidden="true" />

                {showCaptions ? (
                  <div className="cc-crisis-slide__body">
                    <p className="cc-crisis-slide__eyebrow">{slide.eyebrow}</p>
                    <p className="cc-crisis-slide__quote-mark" aria-hidden="true">“</p>
                    <h3 className="cc-crisis-slide__text">{slide.text}</h3>
                  </div>
                ) : null}
              </article>
            );
          })}
        </div>

        <button
          type="button"
          className="cc-crisis-carousel__btn cc-crisis-carousel__btn--prev"
          onClick={() => go(-1)}
          aria-controls={`${baseId}-stage`}
          aria-label={prevLabel}
        >
          <FaChevronLeft aria-hidden="true" />
        </button>

        <button
          type="button"
          className="cc-crisis-carousel__btn cc-crisis-carousel__btn--next"
          onClick={() => go(1)}
          aria-controls={`${baseId}-stage`}
          aria-label={nextLabel}
        >
          <FaChevronRight aria-hidden="true" />
        </button>

        <div className="cc-crisis-carousel__controls">
          <div className="cc-crisis-carousel__dots" aria-label="Select slide">
            {slides.map((slide, index) => {
              const isCurrent = index === currentIndex;
              return (
                <button
                  key={`dot-${slide.id}`}
                  type="button"
                  className="cc-crisis-carousel__dot"
                  data-current={isCurrent ? "" : undefined}
                  aria-current={isCurrent ? "true" : undefined}
                  aria-label={`Go to slide ${index + 1}`}
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
