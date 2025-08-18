import React, { useRef } from "react";
import styles from "./SolutionsGrid.module.css";
import { motion, useInView } from "framer-motion";
import {
  FaUtensils,
  FaHospital,
  FaSnowflake,
  FaTint,
  FaRecycle,
  FaAmbulance,
} from "react-icons/fa";

const solutions = [
  {
    id: 1,
    title: "Clean Cooking",
    icon: <FaUtensils />,
    desc: "Reliable, smoke-free cooking solutions powered by stored heat.",
    category: "cooking",
  },
  {
    id: 2,
    title: "Hospitals & Clinics",
    icon: <FaHospital />,
    desc: "Resilient heating systems for sterilization, patient care, and comfort.",
    category: "hospitals",
  },
  {
    id: 3,
    title: "Cold Storage",
    icon: <FaSnowflake />,
    desc: "Keep vaccines, food, and perishables safe with renewable cold storage.",
    category: "cold",
  },
  {
    id: 4,
    title: "Water Purification",
    icon: <FaTint />,
    desc: "Safe, clean water through thermal treatment and purification.",
    category: "water",
  },
  {
    id: 5,
    title: "Waste Management",
    icon: <FaRecycle />,
    desc: "Convert waste into energy and reduce landfill impact.",
    category: "waste",
  },
  {
    id: 6,
    title: "Emergency Relief",
    icon: <FaAmbulance />,
    desc: "Portable heating units for disaster response and relief efforts.",
    category: "emergency",
  },
];

export default function SolutionsGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const scrollToShowcase = () => {
    const showcase = document.getElementById("solutions-showcase");
    if (showcase) {
      showcase.scrollIntoView({ behavior: "smooth" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { when: "beforeChildren", staggerChildren: 0.15 },
    },
  };

  const cardVariantsLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  const cardVariantsRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3, ease: "easeOut" } },
  };

  return (
    <section className={styles.gridSection} ref={ref}>
      <div className={styles.container}>
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className={styles.header}
        >
          <h2 className={styles.heading}>
            Our <span className={styles.highlight}>Solutions</span>
          </h2>
          <p className={styles.subheading}>
            Innovative thermal storage applications across industries
          </p>
        </motion.div>

      
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {solutions.slice(0, 3).map((sol, index) => (
            <motion.div
              key={sol.id}
              className={`${styles.card} ${styles[sol.category]}`}
              variants={index % 2 === 0 ? cardVariantsLeft : cardVariantsRight}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>{sol.icon}</div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{sol.title}</h3>
                  <p className={styles.desc}>{sol.desc}</p>
                </div>
                <div className={styles.cardAccent}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

  
        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {solutions.slice(3, 6).map((sol, index) => (
            <motion.div
              key={sol.id}
              className={`${styles.card} ${styles[sol.category]}`}
              variants={index % 2 === 0 ? cardVariantsRight : cardVariantsLeft}
            >
              <div className={styles.cardInner}>
                <div className={styles.iconWrapper}>
                  <div className={styles.icon}>{sol.icon}</div>
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.title}>{sol.title}</h3>
                  <p className={styles.desc}>{sol.desc}</p>
                </div>
                <div className={styles.cardAccent}></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

      
        <motion.div
          className={styles.learnMoreContainer}
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.25, ease: "easeOut", delay: 0.2 }}
        >
          <button className={styles.learnMoreButton} onClick={scrollToShowcase}>
            Learn More
          </button>
        </motion.div>
      </div>
    </section>
  );
}
