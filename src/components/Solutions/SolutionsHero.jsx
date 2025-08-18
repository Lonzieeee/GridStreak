import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import { motion } from "framer-motion";
import styles from "./SolutionsHero.module.css";

export default function SolutionsHero() {
  const globeRef = useRef();
  const [globeImage, setGlobeImage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  const [pointsData, setPointsData] = useState([]);

  const scrollToSolutions = () => {
    const solutionsGrid = document.querySelector('[class*="gridSection"]');
    if (solutionsGrid) {
      solutionsGrid.scrollIntoView({ behavior: "smooth" });
    }
  };


  const kenyaSustainableEnergyPoints = [
    { lat: -1.2921, lng: 36.8219, label: "Nairobi - Clean Cooking Solutions", size: 1.2, color: "#eb6a00" },
    { lat: -0.0917, lng: 34.7680, label: "Kisumu - Rural Healthcare Heating", size: 0.8, color: "#b0f222" },
    { lat: -4.0435, lng: 39.6682, label: "Mombasa - Water Purification", size: 0.9, color: "#eb6a00" },
    { lat: 0.5143, lng: 35.2697, label: "Eldoret - Agricultural Processing", size: 0.7, color: "#b0f222" },
    { lat: -0.7833, lng: 36.0667, label: "Nakuru - Cold Storage Solutions", size: 0.8, color: "#eb6a00" },
    { lat: -1.4741, lng: 36.9540, label: "Machakos - Community Kitchens", size: 0.6, color: "#b0f222" },
    { lat: -3.3869, lng: 38.5619, label: "Garissa - Emergency Relief Centers", size: 0.7, color: "#eb6a00" }
  ];

  useEffect(() => {

    setGlobeImage("//unpkg.com/three-globe/example/img/earth-blue-marble.jpg");
    
   
    setTimeout(() => {
      setPointsData(kenyaSustainableEnergyPoints);
    }, 1000);

    const setupGlobe = () => {
      if (globeRef.current) {
        const globe = globeRef.current;
        const controls = globe.controls();
        
     
        controls.autoRotate = true;
        controls.autoRotateSpeed = 1.5;
        controls.enableZoom = false;
        controls.enablePan = false;
        controls.enableDamping = true;
        controls.dampingFactor = 0.1;
       
        globe.showAtmosphere(true);
        globe.atmosphereColor('#4fa8d8');
        globe.atmosphereAltitude(0.25);
        
       
        globe.pointOfView({ lat: -1.2921, lng: 36.8219, altitude: 2.5 }, 2000);
      }
    };
    setTimeout(setupGlobe, 500);

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
            backgroundColor="rgba(0,0,0,0)"
            backgroundImageUrl=""
            width={isMobile ? 280 : 600}
            height={isMobile ? 280 : 600}
            
            // Points data for sustainable energy solutions
            pointsData={pointsData}
            pointLat={d => d.lat}
            pointLng={d => d.lng}
            pointLabel={d => d.label}
            pointColor={d => d.color}
            pointAltitude={d => d.size * 0.02}
            pointRadius={d => d.size * 0.3}
            pointsTransitionDuration={2000}
            
            // Enhanced atmosphere
            showAtmosphere={true}
            atmosphereColor="#4fa8d8"
            atmosphereAltitude={0.25}
            
            // Interaction callbacks
            onPointHover={(point, prevPoint) => {
              if (point !== prevPoint) {
   
                document.body.style.cursor = point ? 'pointer' : 'default';
              }
            }}
          />
        )}
      </motion.div>
    </section>
  );
}
