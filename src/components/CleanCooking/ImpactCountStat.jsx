import React, { useEffect, useLayoutEffect, useRef } from "react";

/** Slower at the start so the counter stays on small values longer (feels like a long climb). */
const easeInCubic = (t) => t * t * t;

const DURATION_MS = 4500;

function getInitialText(countUp) {
  if (!countUp) return "";
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
        el.textContent = countUp.format(countUp.end * t);
      } else if (countUp.type === "range") {
        el.textContent = countUp.format(countUp.endMin * t, countUp.endMax * t);
      } else if (countUp.type === "k") {
        el.textContent = countUp.format(countUp.end * t);
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
