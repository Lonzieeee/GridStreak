import React, { useCallback, useEffect, useId, useRef, useState } from "react";
import "./TechBenefitsSlider.css";


const TECH_SLIDES = [
  {
    id: "temp-1",
    title: "1500°C",
    subtitle: "High-temperature storage",
    description: "High-temperature storage up to 1500°C",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/1500.png",
  },
  {
    id: "temp-2",
    title: "Long duration",
    subtitle: "Minimal loss",
    description: "Long-duration energy retention with minimal loss",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/insulation.webp",
  },
  {
    id: "temp-3",
    title: "25+ years",
    subtitle: "Low maintenance",
    description: "25+ year lifespan with low maintenance",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/maintenamce-low.jpg",
  },
  {
    id: "temp-4",
    title: "Healthcare-ready",
    subtitle: "Scalable performance",
    description: "Reliable, scalable performance across healthcare settings",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/backup(1).jpg",
  },
];


function modIndex(i, len) {
  return ((i % len) + len) % len;
}


const AUTO_ADVANCE_MS = 5000;

const PEEK_START_MS = 1000;

const PEEK_HOLD_MS = 3200;


const MOBILE_ADVANCE_MS = 8500;
const MOBILE_PEEK_START_MS = 850;
const MOBILE_PEEK_HOLD_MS = 4400;

const MOBILE_MQ = "(max-width: 720px)";

function useIsMobileLayout() {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(MOBILE_MQ);
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);
  return isMobile;
}

function useSlideTilt(triggerRef, innerRef, infoInnerRef, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const trigger = triggerRef.current;
    if (!trigger) return;

    let rafId = 0;
    const rot = { x: 0, y: 0, tx: 0, ty: 0 };
    const tgt = { x: 0, y: 0, tx: 0, ty: 0 };
    const lerp = (a, b, t) => a + (b - a) * t;

    const apply = () => {
      const nodes = [innerRef?.current, infoInnerRef?.current].filter(Boolean);
      for (const el of nodes) {
        el.style.setProperty("--rotX", `${rot.y.toFixed(2)}deg`);
        el.style.setProperty("--rotY", `${rot.x.toFixed(2)}deg`);
        el.style.setProperty("--bgPosX", `${rot.tx.toFixed(2)}%`);
        el.style.setProperty("--bgPosY", `${rot.ty.toFixed(2)}%`);
      }
    };

    let cancelled = false;
    const tick = () => {
      if (cancelled) return;
      rot.x = lerp(rot.x, tgt.x, 0.12);
      rot.y = lerp(rot.y, tgt.y, 0.12);
      rot.tx = lerp(rot.tx, tgt.tx, 0.12);
      rot.ty = lerp(rot.ty, tgt.ty, 0.12);
      apply();
      rafId = requestAnimationFrame(tick);
    };

    const onMove = (e) => {
      const rect = trigger.getBoundingClientRect();
      const ox = (e.clientX - rect.left - rect.width * 0.5) / (Math.PI * 3);
      const oy = -(e.clientY - rect.top - rect.height * 0.5) / (Math.PI * 4);
      tgt.x = ox;
      tgt.y = oy;
      tgt.tx = -ox * 0.3;
      tgt.ty = oy * 0.3;
    };

    const onLeave = () => {
      tgt.x = 0;
      tgt.y = 0;
      tgt.tx = 0;
      tgt.ty = 0;
    };

    trigger.addEventListener("mousemove", onMove);
    trigger.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelled = true;
      trigger.removeEventListener("mousemove", onMove);
      trigger.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(rafId);
    };
  }, [enabled, triggerRef, innerRef, infoInnerRef]);
}

export default function TechBenefitsSlider({ reducedMotion = false, children = null }) {
  const slides = TECH_SLIDES;
  const n = slides.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [pauseAdvanceHover, setPauseAdvanceHover] = useState(false);
  const [pausePeekHover, setPausePeekHover] = useState(false);
  const [autoPeek, setAutoPeek] = useState(false);
  const baseId = useId();

  const prevIndex = modIndex(currentIndex - 1, n);
  const nextIndex = modIndex(currentIndex + 1, n);

  const go = useCallback(
    (dir) => {
      setCurrentIndex((i) => modIndex(i + dir, n));
    },
    [n]
  );

  const isMobileLayout = useIsMobileLayout();
  const advanceMs = isMobileLayout ? MOBILE_ADVANCE_MS : AUTO_ADVANCE_MS;
  const peekStartMs = isMobileLayout ? MOBILE_PEEK_START_MS : PEEK_START_MS;
  const peekHoldMs = isMobileLayout ? MOBILE_PEEK_HOLD_MS : PEEK_HOLD_MS;


  useEffect(() => {
    if (reducedMotion || pauseAdvanceHover) return;
    const id = window.setInterval(() => {
      setCurrentIndex((i) => modIndex(i + 1, n));
    }, advanceMs);
    return () => window.clearInterval(id);
  }, [reducedMotion, pauseAdvanceHover, advanceMs, n]);

  useEffect(() => {
    if (reducedMotion || pausePeekHover) {
      setAutoPeek(false);
      return;
    }
    setAutoPeek(false);
    const show = window.setTimeout(() => setAutoPeek(true), peekStartMs);
    const hide = window.setTimeout(() => setAutoPeek(false), peekStartMs + peekHoldMs);
    return () => {
      window.clearTimeout(show);
      window.clearTimeout(hide);
    };
  }, [currentIndex, reducedMotion, pausePeekHover, peekStartMs, peekHoldMs]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        go(-1);
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        go(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go]);

  const [tiltOk, setTiltOk] = useState(false);
  useEffect(() => {
    setTiltOk(typeof window !== "undefined" && window.matchMedia("(hover: hover)").matches);
  }, []);
  const tiltEnabled = !reducedMotion && tiltOk;

  const prevTrigger = useRef(null);
  const curTrigger = useRef(null);
  const nextTrigger = useRef(null);
  const prevInner = useRef(null);
  const prevInfoInner = useRef(null);
  const curInner = useRef(null);
  const curInfoInner = useRef(null);
  const nextInner = useRef(null);
  const nextInfoInner = useRef(null);

  useSlideTilt(prevTrigger, prevInner, prevInfoInner, tiltEnabled);
  useSlideTilt(curTrigger, curInner, curInfoInner, false);
  useSlideTilt(nextTrigger, nextInner, nextInfoInner, tiltEnabled);

  const prevSlide = slides[prevIndex];
  const currentSlide = slides[currentIndex];
  const nextSlide = slides[nextIndex];

  return (
    <div
      className="hc-tech-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label="Key technology benefits, continuous loop"
      onMouseEnter={() => setPauseAdvanceHover(true)}
      onMouseLeave={() => setPauseAdvanceHover(false)}
    >
      {children ? <div className="hc-tech-slider__header">{children}</div> : null}

      <div className="hc-tech-slider__track">
      <button
        type="button"
        className="hc-tech-slider__btn hc-tech-slider__btn--prev"
        onClick={() => go(-1)}
        aria-controls={`${baseId}-slides`}
        aria-label="Previous benefit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m15 18-6-6 6-6" />
        </svg>
      </button>

      <div className="hc-tech-slider__inner">
        <div className="hc-tech-slider__slidesWrap" id={`${baseId}-slides`}>
          <div className="hc-tech-slider__slides">
            <div className="hc-tech-slider__slide" ref={prevTrigger} data-previous tabIndex={-1}>
              <div className="hc-tech-slider__slideInner" ref={prevInner}>
                <div className="hc-tech-slider__imgWrap">
                  <img className="hc-tech-slider__img" src={prevSlide.image} alt="" loading="lazy" />
                  <div className="hc-tech-slider__hoverText" aria-hidden="true">
                    <h3 className="hc-tech-slider__hoverTitle">{prevSlide.title}</h3>
                    <p className="hc-tech-slider__hoverSubtitle">{prevSlide.subtitle}</p>
                    <p className="hc-tech-slider__hoverDesc">{prevSlide.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`hc-tech-slider__slide${autoPeek ? " hc-tech-slider__slide--peek" : ""}`}
              ref={curTrigger}
              data-current
              tabIndex={0}
              onMouseEnter={() => setPausePeekHover(true)}
              onMouseLeave={() => setPausePeekHover(false)}
            >
              <div className="hc-tech-slider__slideInner" ref={curInner}>
                <div className="hc-tech-slider__imgWrap">
                  <img
                    className="hc-tech-slider__img"
                    src={currentSlide.image}
                    alt=""
                    loading="lazy"
                  />
                  <div className="hc-tech-slider__hoverText">
                    <h3 className="hc-tech-slider__hoverTitle">{currentSlide.title}</h3>
                    <p className="hc-tech-slider__hoverSubtitle">{currentSlide.subtitle}</p>
                    <p className="hc-tech-slider__hoverDesc">{currentSlide.description}</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="hc-tech-slider__slide" ref={nextTrigger} data-next tabIndex={-1}>
              <div className="hc-tech-slider__slideInner" ref={nextInner}>
                <div className="hc-tech-slider__imgWrap">
                  <img className="hc-tech-slider__img" src={nextSlide.image} alt="" loading="lazy" />
                  <div className="hc-tech-slider__hoverText" aria-hidden="true">
                    <h3 className="hc-tech-slider__hoverTitle">{nextSlide.title}</h3>
                    <p className="hc-tech-slider__hoverSubtitle">{nextSlide.subtitle}</p>
                    <p className="hc-tech-slider__hoverDesc">{nextSlide.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="hc-tech-slider__infos" aria-hidden="true" />
        </div>
      </div>

      <button
        type="button"
        className="hc-tech-slider__btn hc-tech-slider__btn--next"
        onClick={() => go(1)}
        aria-controls={`${baseId}-slides`}
        aria-label="Next benefit"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="m9 18 6-6-6-6" />
        </svg>
      </button>
      </div>

      <p className="hc-tech-slider__counter" aria-live="polite">
        {currentIndex + 1} / {n}
      </p>
    </div>
  );
}
