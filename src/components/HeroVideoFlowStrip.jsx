import React from "react";
import { motion } from "framer-motion";
import {
  PiCylinderLight,
  PiLeafLight,
  PiLightningLight,
  PiThermometerHotLight,
} from "react-icons/pi";
import "./HeroVideoFlowStrip.css";

const steps = [
  {
    id: "capture",
    Icon: PiThermometerHotLight,
    title: "Capture",
    description: "Waste heat at the source",
    accent: "#eb6a00",
  },
  {
    id: "store",
    Icon: PiCylinderLight,
    title: "Store",
    description: "Thermal energy efficiently",
    accent: "#eb6a00",
  },
  {
    id: "deliver",
    Icon: PiLightningLight,
    title: "Deliver",
    description: "Reliable power to the grid",
    accent: "#5eb8ff",
  },
  {
    id: "drive",
    Icon: PiLeafLight,
    title: "Drive",
    description: "A cleaner, sustainable future",
    accent: "#8fd624",
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
