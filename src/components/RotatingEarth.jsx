import React from "react";
import styles from "./RotatingEarth.module.css";

export default function RotatingEarth({
  className = "",
  maxWidth = "min(60rem, 100%)",
  rotationDuration = 40,
  pulseDuration = 2,
  variant = "continent",
}) {
  return (
    <div
      className={`${styles.earth} ${styles[variant] ?? ""} ${className}`.trim()}
      aria-hidden="true"
      style={{
        "--earth-max-width": maxWidth,
        "--earth-rotation-duration": `${rotationDuration}s`,
        "--earth-pulse-duration": `${pulseDuration}s`,
      }}
    />
  );
}