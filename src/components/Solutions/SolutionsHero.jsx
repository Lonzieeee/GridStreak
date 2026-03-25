import React from "react";
import { motion } from "framer-motion";
import styles from "./SolutionsHero.module.css";

export default function SolutionsHero() {
  const scrollToSolutions = () => {
    const solutionsGrid = document.querySelector('[class*="gridSection"]');
    if (solutionsGrid) {
      solutionsGrid.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className={styles.hero}>
 
      <motion.div
        className={styles.content}
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <h1>
          Sustainable Heat.{" "}
          <span className={styles.accent}>Infinite Possibilities.</span>
        </h1>
        <p className={styles.sub}>
          Modular thermal bricks that capture, store, and deliver reliable heat;
          enabling clean cooking, resilient healthcare, water safety, and more.
        </p>
        <motion.button
          className={styles.cta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={scrollToSolutions}
        >
          Explore Solutions
        </motion.button>
      </motion.div>

    
      <motion.div
        className={styles.stage}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        <div className={styles.earth} aria-hidden="true" />
      </motion.div>
    </section>
  );
}
