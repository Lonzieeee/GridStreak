import React, { useEffect, useLayoutEffect, useRef } from "react";

/** Slower at the start so the counter stays on small values longer (feels like a long climb). */
const easeInCubic = (t) => t * t * t;

const DURATION_MS = 4500;

function getInitialText(countUp) {
  if (!countUp) return "";
  if (countUp.type === "single" && typeof countUp.start === "number") return countUp.format(countUp.start);
  if (countUp.type === "range" && typeof countUp.startMin === "number" && typeof countUp.startMax === "number") {
    return countUp.format(countUp.startMin, countUp.startMax);
  }
  if (countUp.type === "k" && typeof countUp.start === "number") return countUp.format(countUp.start);
  if (countUp.type === "single") return countUp.format(0);
  if (countUp.type === "range") return countUp.format(0, 0);
  if (countUp.type === "k") return countUp.format(0);
  return "";
}

function getFinalText(countUp) {
  if (!countUp) return "";
  if (countUp.type === "single") return countUp.format(countUp.end);
  if (countUp.type === "range") return countUp.format(countUp.endMin, countUp.endMax);
  if (countUp.type === "k") return countUp.format(countUp.end);
  return "";
}

/**
 * Count-up stats. Updates text via requestAnimationFrame + textContent on the node
 * so every frame is painted (avoids React batching hiding the middle of the run).
 * Non-numeric: `countUp={null}` and only `stat` is shown.
 */
export default function ImpactCountStat({ stat, countUp, start, reducedMotion, delayMs = 0, style, className }) {
  const nodeRef = useRef(null);

  useLayoutEffect(() => {
    const el = nodeRef.current;
    if (!el || !countUp) return;
    if (reducedMotion) {
      el.textContent = getFinalText(countUp);
      return;
    }
    if (!start) {
      el.textContent = getInitialText(countUp);
    } else {
      el.textContent = getInitialText(countUp);
    }
  }, [countUp, start, reducedMotion]);

  useEffect(() => {
    const el = nodeRef.current;
    if (!el || !countUp) {
      return undefined;
    }

    if (reducedMotion) {
      el.textContent = getFinalText(countUp);
      return undefined;
    }

    if (!start) {
      el.textContent = getInitialText(countUp);
      return undefined;
    }

    const t0 = performance.now() + delayMs;
    let raf = 0;
    let cancelled = false;

    const run = (now) => {
      if (cancelled) return;
      if (now < t0) {
        raf = requestAnimationFrame(run);
        return;
      }
      const progress = Math.min(1, (now - t0) / DURATION_MS);

      const t = easeInCubic(progress);
      if (countUp.type === "single") {
        const startValue = typeof countUp.start === "number" ? countUp.start : 0;
        el.textContent = countUp.format(startValue + (countUp.end - startValue) * t);
      } else if (countUp.type === "range") {
        const startMin = typeof countUp.startMin === "number" ? countUp.startMin : 0;
        const startMax = typeof countUp.startMax === "number" ? countUp.startMax : 0;
        el.textContent = countUp.format(
          startMin + (countUp.endMin - startMin) * t,
          startMax + (countUp.endMax - startMax) * t,
        );
      } else if (countUp.type === "k") {
        const startValue = typeof countUp.start === "number" ? countUp.start : 0;
        el.textContent = countUp.format(startValue + (countUp.end - startValue) * t);
      }
      if (progress < 1) {
        raf = requestAnimationFrame(run);
      } else {
        el.textContent = getFinalText(countUp);
      }
    };

    raf = requestAnimationFrame(run);
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
    };
  }, [countUp, start, reducedMotion, delayMs, stat]);

  if (!countUp) {
    return (
      <strong className={className} style={style}>
        {stat}
      </strong>
    );
  }

  const baseStyle = {
    ...style,
    fontVariantNumeric: "tabular-nums",
  };

  return <strong ref={nodeRef} className={className} style={baseStyle} />;
}
