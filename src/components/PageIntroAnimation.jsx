import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import "./PageIntroAnimation.css";

const DEFAULT_DURATION_MS = 6500;

const buildChars = (text) => {
  const chars = Array.from(text);
  const total = chars.length;
  const center = (total - 1) / 2;
  const maxDistance = Math.max(center, 1);

  return chars.map((char, index) => {
    const offset = index - center;
    const distancePercent = Math.abs(offset) / maxDistance;

    return {
      char,
      index,
      total,
      offset,
      distancePercent,
      isSpace: char === " ",
    };
  });
};

const PageIntroAnimation = ({
  text,
  color = "#eb6a00",
  colorDark = "#7a3700",
  durationMs = DEFAULT_DURATION_MS,
  onFinish,
}) => {
  const prefersReducedMotion = useReducedMotion();
  const [mounted, setMounted] = useState(false);
  const [play, setPlay] = useState(false);

  const chars = useMemo(() => buildChars(text), [text]);

  // Hold the latest onFinish in a ref so the intro effect only runs once
  // and doesn't restart whenever the parent re-renders with a new callback.
  const onFinishRef = useRef(onFinish);
  useEffect(() => {
    onFinishRef.current = onFinish;
  }, [onFinish]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (prefersReducedMotion) {
      // Intro doesn't play in reduced motion, but pages waiting on the
      // onFinish signal still need to know the "intro" is effectively done.
      if (typeof onFinishRef.current === "function") onFinishRef.current();
      return undefined;
    }

    setMounted(true);
    const hideTimer = window.setTimeout(() => {
      setMounted(false);
      if (typeof onFinishRef.current === "function") onFinishRef.current();
    }, durationMs);

    return () => {
      window.clearTimeout(hideTimer);
    };
  }, [durationMs, prefersReducedMotion]);

  useEffect(() => {
    if (!mounted) {
      setPlay(false);
      return undefined;
    }

    const frame = window.requestAnimationFrame(() => {
      setPlay(true);
    });

    return () => {
      window.cancelAnimationFrame(frame);
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div
      className="page-intro"
      aria-hidden="true"
      data-play={play ? "true" : undefined}
      style={{
        "--page-intro-dot-color": color,
        "--page-intro-dot-color-dark": colorDark,
      }}
    >
      <div className="page-intro-container">
        <h1 className="page-intro-title">
          {chars.map((item) => (
            <span
              key={`page-intro-char-${item.index}`}
              className="page-intro-char"
              data-char={item.isSpace ? undefined : item.char}
              style={{
                "--char-index": item.index,
                "--char-total": item.total,
                "--char-offset": item.offset,
                "--distance-percent": item.distancePercent,
              }}
            >
              {item.isSpace ? "\u00A0" : item.char}
            </span>
          ))}
        </h1>

        <div className="page-intro-dot">
          <div className="page-intro-dot-inner">
            <svg
              className="page-intro-dot-wave page-intro-dot-wave--bg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
            >
              <path d="M799.09 90s11.04 0 0 0c-80.714 0-79.621-90-200-90-120.377 0-118.607 90-200 90-81.391 0-81.215-90-200-90C80.308 0 78.68 89.29-.91 90c-6.946.062 0 0 0 0v510h800V90z" />
            </svg>
            <svg
              className="page-intro-dot-wave page-intro-dot-wave--fg"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 800 800"
            >
              <path d="M799.09 90s11.04 0 0 0c-80.714 0-79.621-90-200-90-120.377 0-118.607 90-200 90-81.391 0-81.215-90-200-90C80.308 0 78.68 89.29-.91 90c-6.946.062 0 0 0 0v510h800V90z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageIntroAnimation;
