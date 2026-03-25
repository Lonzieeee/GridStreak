import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaBolt,
  FaFire,
  FaHeartbeat,
  FaMicroscope,
  FaSnowflake,
  FaSyringe,
  FaTint,
  FaTrashAlt,
} from "react-icons/fa";

const SWIPE_THRESHOLD_PX = 64;
const AUTO_SWIPE_INTERVAL_MS = 12000;
const AUTO_SWIPE_RESUME_DELAY_MS = 1400;
const AUTO_SWIPE_DRAG_MS = 420;
const AUTO_SWIPE_EXTRA_PX = 18;
const UNSTACK_AFTER_LAST_MS = 2200;

const durationFromCSSVarMs = (variableName, element = document.documentElement) => {
  const raw = getComputedStyle(element)?.getPropertyValue(variableName)?.trim();
  if (!raw) return 0;
  if (raw.endsWith("ms")) return Number.parseFloat(raw);
  if (raw.endsWith("s")) return Number.parseFloat(raw) * 1000;
  return Number.parseFloat(raw) || 0;
};

export default function ApplicationsCardStack({ reducedMotion = false }) {
  const cards = useMemo(
    () => [
      {
        id: "cold-chain",
        category: "Protecting Critical Healthcare Systems",
        title: "Cold storage for vaccines, blood, and medicines",
        description: "Protect temperature-sensitive supplies with reliable energy through outages.",
        Icon: FaSnowflake,
        accent: "#57d7ff",
      },
      {
        id: "labs",
        category: "Protecting Critical Healthcare Systems",
        title: "Continuous laboratory and diagnostic operations",
        description: "Keep labs running for testing, diagnostics, and clinical decision-making.",
        Icon: FaSyringe,
        accent: "#b0f222",
      },
      {
        id: "equipment",
        category: "Protecting Critical Healthcare Systems",
        title: "Reliable power for medical equipment",
        description: "Support essential devices and maintain continuity of care.",
        Icon: FaMicroscope,
        accent: "#eb6a00",
      },
      {
        id: "outages",
        category: "Protecting Critical Healthcare Systems",
        title: "Prevention of losses caused by power outages",
        description: "Reduce spoilage, downtime, and disruption when the grid is unstable.",
        Icon: FaHeartbeat,
        accent: "#ff4d6d",
      },
      {
        id: "cooking",
        category: "Clean Heat for Essential Hospital Operations",
        title: "Hospital cooking",
        description: "Deliver efficient thermal energy for kitchens and meal preparation.",
        Icon: FaBolt,
        accent: "#ffd166",
      },
      {
        id: "sterilization",
        category: "Clean Heat for Essential Hospital Operations",
        title: "Sterilization of medical equipment",
        description: "Provide dependable heat to support infection prevention and control.",
        Icon: FaFire,
        accent: "#ff7a18",
      },
      {
        id: "water",
        category: "Clean Heat for Essential Hospital Operations",
        title: "Water heating and sanitation",
        description: "Support hot water needs for wards, cleaning, and hygiene.",
        Icon: FaTint,
        accent: "#62a8ff",
      },
      {
        id: "waste",
        category: "Clean Heat for Essential Hospital Operations",
        title: "Safe destruction of medical and infectious waste",
        description: "Enable high-temperature thermal use for safer waste handling.",
        Icon: FaTrashAlt,
        accent: "#a78bfa",
      },
    ],
    []
  );

  const [order, setOrder] = useState(() => cards.map((c) => c.id));
  const [step, setStep] = useState(0);
  const [expanded, setExpanded] = useState(false);
  const stackRef = useRef(null);
  const isSwipingRef = useRef(false);
  const autoAnimatingRef = useRef(false);
  const autoPausedRef = useRef(false);
  const autoResumeTimeoutRef = useRef(null);
  const autoIntervalRef = useRef(null);
  const unstackTimeoutRef = useRef(null);
  const startXRef = useRef(0);
  const currentXRef = useRef(0);
  const rafRef = useRef(null);

  const activeId = order[0];
  const totalCards = cards.length;
  const counterCurrent = (step % Math.max(totalCards, 1)) + 1;

  const getCardElById = (id) =>
    stackRef.current?.querySelector(`[data-hc-app-card-id="${id}"]`) ?? null;

  const rotateOnce = () => {
    setOrder((prev) => (prev.length ? [...prev.slice(1), prev[0]] : prev));
    setStep((s) => s + 1);
  };

  const autoSwipeOnce = () => {
    if (reducedMotion) return;
    if (expanded) return;
    if (autoAnimatingRef.current || isSwipingRef.current) return;
    if (!activeId) return;

    autoAnimatingRef.current = true;
    const duration = durationFromCSSVarMs("--hc-app-swap-duration");

    // Drive auto-advance through the same path as manual swipe:
    // applySwipeStyles(deltaX) → handleEnd() (which performs the fling + rotateOnce()).
    const direction = 1;
    const targetDeltaX = (SWIPE_THRESHOLD_PX + AUTO_SWIPE_EXTRA_PX) * direction;
    const el = getCardElById(activeId);

    isSwipingRef.current = true;
    startXRef.current = 0;
    currentXRef.current = 0;

    if (el) el.style.transition = "none";

    const startTs = performance.now();
    const tick = (now) => {
      const t = Math.min(1, (now - startTs) / AUTO_SWIPE_DRAG_MS);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const deltaX = targetDeltaX * eased;
      currentXRef.current = deltaX;
      applySwipeStyles(deltaX);

      if (t < 1) {
        requestAnimationFrame(tick);
        return;
      }

      handleEnd();

      window.setTimeout(() => {
        autoAnimatingRef.current = false;
      }, Math.max(0, duration) + 50);
    };

    requestAnimationFrame(tick);
  };

  const resetAllCardTransforms = () => {
    if (!stackRef.current) return;
    order.forEach((id, idx) => {
      const el = getCardElById(id);
      if (!el) return;
      el.style.setProperty("--i", String(idx));
      el.style.setProperty("--hc-app-i-target", "");
      el.dataset.hcAppMoving = "0";
      el.style.setProperty("--swipe-x", "0px");
      el.style.setProperty("--swipe-rotate", "0deg");
      el.style.opacity = "1";
      el.style.transition = "";
    });
  };

  useEffect(() => {
    resetAllCardTransforms();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [order.join("|")]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    if (expanded) return undefined;
    if (counterCurrent !== totalCards) return undefined;

    const attempt = () => {
      if (expanded) return;
      if (autoPausedRef.current || isSwipingRef.current || autoAnimatingRef.current) {
        unstackTimeoutRef.current = window.setTimeout(attempt, 700);
        return;
      }
      setExpanded(true);
    };

    unstackTimeoutRef.current = window.setTimeout(attempt, UNSTACK_AFTER_LAST_MS);

    return () => {
      if (unstackTimeoutRef.current) window.clearTimeout(unstackTimeoutRef.current);
      unstackTimeoutRef.current = null;
    };
  }, [counterCurrent, expanded, reducedMotion, totalCards]);

  const applySwipeStyles = (deltaX) => {
    const el = getCardElById(activeId);
    if (!el) return;
    el.style.setProperty("--swipe-x", `${deltaX}px`);
    el.style.setProperty("--swipe-rotate", `${deltaX * 0.18}deg`);
    el.style.opacity = String(1 - Math.min(Math.abs(deltaX) / 140, 1) * 0.75);
  };

  const handleStart = (clientX) => {
    if (reducedMotion) return;
    if (isSwipingRef.current) return;
    isSwipingRef.current = true;
    autoPausedRef.current = true;
    if (autoResumeTimeoutRef.current) window.clearTimeout(autoResumeTimeoutRef.current);
    startXRef.current = clientX;
    currentXRef.current = clientX;
    const el = getCardElById(activeId);
    if (el) el.style.transition = "none";
  };

  const handleMove = (clientX) => {
    if (reducedMotion) return;
    if (!isSwipingRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(() => {
      currentXRef.current = clientX;
      const deltaX = currentXRef.current - startXRef.current;
      applySwipeStyles(deltaX);
      if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) handleEnd();
    });
  };

  const handleEnd = () => {
    if (reducedMotion) return;
    if (!isSwipingRef.current) return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);

    const deltaX = currentXRef.current - startXRef.current;
    const el = getCardElById(activeId);
    const duration = durationFromCSSVarMs("--hc-app-swap-duration");
    const targetIndex = Math.max(0, order.length - 1);

    if (el) {
      el.style.transition = `transform ${duration}ms ease, opacity ${duration}ms ease`;
      if (Math.abs(deltaX) > SWIPE_THRESHOLD_PX) {
        el.dataset.hcAppMoving = "1";
        el.style.setProperty("--hc-app-i-target", String(targetIndex));
        el.style.setProperty("--swipe-x", "0px");
        el.style.setProperty("--swipe-rotate", "0deg");
        el.style.opacity = "1";

        window.setTimeout(() => {
          rotateOnce();
        }, Math.max(0, duration));
      } else {
        applySwipeStyles(0);
      }
    }

    isSwipingRef.current = false;
    startXRef.current = 0;
    currentXRef.current = 0;

    autoResumeTimeoutRef.current = window.setTimeout(() => {
      autoPausedRef.current = false;
    }, AUTO_SWIPE_RESUME_DELAY_MS);
  };

  const orderedCards = useMemo(() => {
    const map = new Map(cards.map((c) => [c.id, c]));
    return order.map((id) => map.get(id)).filter(Boolean);
  }, [cards, order]);

  useEffect(() => {
    if (reducedMotion) return undefined;
    if (expanded) return undefined;
    if (autoIntervalRef.current) window.clearInterval(autoIntervalRef.current);

    autoIntervalRef.current = window.setInterval(() => {
      if (autoPausedRef.current || isSwipingRef.current || autoAnimatingRef.current) return;
      autoSwipeOnce();
    }, AUTO_SWIPE_INTERVAL_MS);

    return () => {
      if (autoIntervalRef.current) window.clearInterval(autoIntervalRef.current);
      autoIntervalRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedMotion, totalCards, expanded]);

  if (reducedMotion) {
    return (
      <div className="hc-app-grid" role="list" aria-label="Applications">
        {orderedCards.map(({ id, category, title, description, Icon, accent }) => (
          <div className="hc-app-tile" role="listitem" key={id} style={{ "--hc-app-accent": accent }}>
            <span className="hc-app-tile__icon" aria-hidden="true">
              {React.createElement(Icon)}
            </span>
            <div className="hc-app-tile__body">
              <p className="hc-app-tag">{category}</p>
              <h3 className="hc-app-tile__title">{title}</h3>
              <p className="hc-app-tile__desc">{description}</p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (expanded) {
    return (
      <div className="hc-app-stackWrap">
        <div className="hc-app-meta">
          <p className="hc-app-hint">All applications at a glance.</p>
          <p className="hc-app-counter" aria-label={`All ${totalCards} cards`}>
            <span aria-hidden="true">{totalCards}</span>
            <span aria-hidden="true"> / </span>
            <span aria-hidden="true">{totalCards}</span>
          </p>
        </div>

        <div className="hc-app-unstackGrid" role="list" aria-label="Applications grid">
          {cards.map(({ id, category, title, description, Icon, accent }) => (
            <div
              key={id}
              role="listitem"
              className="hc-app-unstackCard"
              style={{ "--hc-app-accent": accent }}
            >
              <span className="hc-app-unstackCard__icon" aria-hidden="true">
                {React.createElement(Icon)}
              </span>
              <p className="hc-app-tag">{category}</p>
              <h3 className="hc-app-unstackCard__title">{title}</h3>
              <p className="hc-app-unstackCard__desc">{description}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="hc-app-stackWrap">
      <div className="hc-app-meta">
        <p className="hc-app-hint">Swipe the cards to explore applications.</p>
        <p className="hc-app-counter" aria-label={`Card ${counterCurrent} of ${totalCards}`}>
          <span aria-hidden="true">{counterCurrent}</span>
          <span aria-hidden="true"> / </span>
          <span aria-hidden="true">{totalCards}</span>
        </p>
      </div>
      <section
        className="hc-app-cardStack"
        ref={stackRef}
        aria-label="Applications card stack"
        onMouseEnter={() => {
          autoPausedRef.current = true;
          if (autoResumeTimeoutRef.current) window.clearTimeout(autoResumeTimeoutRef.current);
        }}
        onMouseLeave={() => {
          autoResumeTimeoutRef.current = window.setTimeout(() => {
            autoPausedRef.current = false;
          }, 400);
        }}
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture?.(e.pointerId);
          handleStart(e.clientX);
        }}
        onPointerMove={(e) => handleMove(e.clientX)}
        onPointerUp={handleEnd}
        onPointerCancel={handleEnd}
      >
        {orderedCards.map(({ id, category, title, description, Icon, accent }, idx) => (
          <article
            key={id}
            className="hc-app-card"
            data-hc-app-card-id={id}
            style={{
              "--i": idx,
              "--hc-app-accent": accent,
            }}
          >
            <div className="hc-app-card__inner">
              <span className="hc-app-card__icon" aria-hidden="true">
                {React.createElement(Icon)}
              </span>
              <p className="hc-app-tag">{category}</p>
              <h3 className="hc-app-card__title">{title}</h3>
              <p className="hc-app-card__desc">{description}</p>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

