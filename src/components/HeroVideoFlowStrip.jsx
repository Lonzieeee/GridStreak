import React from "react";
import { motion } from "framer-motion";
import "./HeroVideoFlowStrip.css";

function CaptureIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M20 4.5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 30V35.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 20H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 20H35.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9L12.9 12.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M27.1 27.1L31 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 9L27.1 12.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12.9 27.1L9 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StoreIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 7L33 13.5L20 20L7 13.5L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 20.5L20 27L33 20.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 27.5L20 34L33 27.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function DeliverIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 8V24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M24.5 19.5V8.5C24.5 6 22.5 4 20 4C17.5 4 15.5 6 15.5 8.5V19.5C13.9 20.8 13 22.9 13 25.2C13 29.1 16.1 32.2 20 32.2C23.9 32.2 27 29.1 27 25.2C27 22.9 26.1 20.8 24.5 19.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="25.4" r="2.7" fill="currentColor" />
      <path d="M28.8 12.2H32.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28.8 17.2H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ImpactIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M31 8.5C24.5 8.5 17 11.2 12.8 16.1C8.8 20.8 8.7 27.1 12.3 30.7C15.9 34.3 22.3 34.2 27 30.2C31.8 26 34.5 18.5 34.5 12V8.5H31Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 31L21 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 19.5C19.4 19.5 22.1 18.3 24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const steps = [
  {
    id: "capture",
    Icon: CaptureIcon,
    title: "Capture",
    description: "Waste heat at the source",
    accent: "#eb6a00",
  },
  {
    id: "store",
    Icon: StoreIcon,
    title: "Store",
    description: "Thermal energy efficiently",
    accent: "#eb6a00",
  },
  {
    id: "deliver",
    Icon: DeliverIcon,
    title: "Deliver",
    description: "Reliable power to the grid",
    accent: "#eb6a00",
  },
  {
    id: "drive",
    Icon: ImpactIcon,
    title: "Drive",
    description: "A cleaner, sustainable future",
    accent: "#eb6a00",
  },
];

const containerMotion = {
  hidden: { opacity: 0, y: -10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.07, delayChildren: 0.1 },
  },
};

const itemMotion = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
};

export default function HeroVideoFlowStrip() {
  return (
    <motion.aside
      className="hero-flow-strip"
      aria-label="How GridStreak works"
      initial="hidden"
      animate="visible"
      variants={containerMotion}
    >
      {steps.map((step, index) => {
        const { Icon } = step;
        return (
          <motion.div className="hero-flow-strip__step" key={step.id} variants={itemMotion}>
            <div className="hero-flow-strip__icon-wrap" style={{ "--step-accent": step.accent }}>
              <Icon className="hero-flow-strip__icon" aria-hidden="true" />
            </div>
            <p className="hero-flow-strip__title">{step.title}</p>
            <p className="hero-flow-strip__desc">{step.description}</p>
            {index < steps.length - 1 ? <span className="hero-flow-strip__divider" aria-hidden="true" /> : null}
          </motion.div>
        );
      })}
    </motion.aside>
  );
}
