import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { motion } from "framer-motion";
import styles from "./SolutionsHero.module.css";

export default function SolutionsHero() {
  const globeRef = useRef();
  const [globeImage, setGlobeImage] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setGlobeImage("//unpkg.com/three-globe/example/img/earth-dark.jpg");

    const rotate = () => {
      if (globeRef.current) {
        const controls = globeRef.current.controls();
        controls.autoRotate = true;
        controls.autoRotateSpeed = 2.0;
        controls.enableZoom = false;
        controls.enablePan = false;
      }
    };
    setTimeout(rotate, 500);

    // detect mobile size
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.hero}>
      {/* Text Content */}
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
        >
          Explore Solutions
        </motion.button>
      </motion.div>

      {/* Globe */}
      <motion.div
        className={styles.stage}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
      >
        {globeImage && (
          <Globe
            ref={globeRef}
            globeImageUrl={globeImage}
            backgroundColor="#000000"
            width={isMobile ? 320 : 600}
            height={isMobile ? 320 : 600}
          />
        )}
      </motion.div>
    </section>
  );
}
