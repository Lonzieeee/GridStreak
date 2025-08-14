import React, { useRef, useEffect, useState } from "react";
import Globe from "react-globe.gl";
import styles from "./SolutionsHero.module.css";

export default function SolutionsHero() {
  const globeRef = useRef();

  const [globeImage, setGlobeImage] = useState("");

  useEffect(() => {
   
    setGlobeImage("//unpkg.com/three-globe/example/img/earth-dark.jpg");

    
    const rotate = () => {
      if (globeRef.current) {
        globeRef.current.controls().autoRotate = true; 
        globeRef.current.controls().autoRotateSpeed = 1.0;
      }
    };
    setTimeout(rotate, 1000); 
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.content}>
        <h1>
          Sustainable Heat. <span className={styles.accent}>Infinite Possibilities.</span>
        </h1>
        <p className={styles.sub}>
          Modular thermal bricks that capture, store, and deliver reliable heat;
          enabling clean cooking, resilient healthcare, water safety, and more.
        </p>
        <button className={styles.cta}>Explore Solutions</button>
      </div>

      {/* Globe */}
      <div className={styles.stage}>
        {globeImage && (
          <Globe
  ref={globeRef}
  globeImageUrl={globeImage}
  backgroundColor="#000000"
  width={600}
  height={600}
  onGlobeReady={() => {
    const controls = globeRef.current.controls();
    controls.enableZoom = false;     
    controls.enablePan = false;       
    controls.autoRotate = true;    
    controls.autoRotateSpeed = 2.0;   
  }}
/>

        )}
      </div>
    </section>
  );
}
