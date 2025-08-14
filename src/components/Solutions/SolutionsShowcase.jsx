import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHospital, FaSnowflake, FaTint, FaRecycle, FaAmbulance, FaCheckCircle } from 'react-icons/fa';
import { GiCookingPot } from 'react-icons/gi';
import styles from './SolutionsShowcase.module.css';

const solutions = [
  {
    id: 1,
    title: "Community and Institutional Cooking",
    icon: <GiCookingPot />,
    color: "#EB6A00",
    problem: `Communities and institutions in rural and peri-urban regions still rely on biomass
and kerosene for cooking. These fuels are costly, environmentally destructive, and
harmful to health due to smoke inhalation.`,
    solution: [
      "GridStreak thermal bricks provide high and sustained heat for institutional and communal kitchens.",
      "Energy is stored during off-peak grid hours, from geothermal heat, or from waste-to-energy conversion.",
      "Enables clean, smoke-free, and fuel-free cooking for schools, villages, and community kitchens."
    ],
    impact: [
      "Cuts firewood consumption by up to 90%.",
      "Reduces indoor air pollution-related illnesses.",
      "Lowers CO₂ emissions from cooking by 70% or more."
    ],
  },
  {
    id: 2,
    title: "Powering Remote Hospitals",
    icon: <FaHospital />,
    color: "#3B82F6",
    problem: `Healthcare facilities in off-grid or unstable grid regions suffer from unreliable
heating for sterilization, laundry, cooking, and space heating and greatly risk
patient safety and treatment outcomes.`,
    solution: [
      "GridStreak units provide uninterrupted thermal energy for hospital needs without relying solely on diesel generators or unstable national grid.",
      "Heat can power sterilizers, kitchen systems, laundry boilers, and space heating.",
      "Waste heat from hospital operations can be recycled into the GridStreak system for future use."
    ],
    impact: [
      "Increases operational resilience in healthcare facilities.",
      "Reduces hospital reliance on fossil fuels by up to 60%.",
      "Enhances patient care in emergencies by maintaining heat-based systems during outages."
    ],
  },
  {
    id: 3,
    title: "Agricultural Cold Storage",
    icon: <FaSnowflake />,
    color: "#0EA5E9",
    problem: `Post-harvest losses in agriculture are as high as 40% in some areas due to lack of
affordable cold storage — especially in rural markets.`,
    solution: [
      "GridStreak stores heat to run absorption chillers that convert thermal energy into cooling.",
      "Systems can be deployed in rural cooperatives, markets, and fishing communities.",
      "Operates without the need for constant electricity, reducing food spoilage."
    ],
    impact: [
      "Extends shelf life of fresh produce and fish by 3–5 times.",
      "Increases farmer incomes by reducing spoilage losses.",
      "Reduces reliance on expensive, diesel-powered cold rooms."
    ],
  },
  {
    id: 4,
    title: "Water Purification",
    icon: <FaTint />,
    color: "#0284C7",
    problem: `Many communities lack access to clean drinking water due to microbial contamination
and unsafe water sources.`,
    solution: [
      "GridStreak heat powers distillation or pasteurization systems, eliminating pathogens without chemicals.",
      "Heat energy is stored from geothermal, waste-to-energy, or grid excess for 24/7 operation.",
      "Can serve both emergency response and long-term community water supply."
    ],
    impact: [
      "Provides safe drinking water for up to 1,000 people per unit daily.",
      "Reduces cases of waterborne disease by up to 90%.",
      "Eliminates need for constant electric or diesel-powered water treatment systems."
    ],
  },
  {
    id: 5,
    title: "Waste Management",
    icon: <FaRecycle />,
    color: "#15803D",
    problem: `Plastic waste accumulation is a growing crisis, with significant environmental
and public health impacts. Open burning releases toxic gases, while landfill overflows contaminate soil and water.`,
    solution: [
      "GridStreak integrates oxygen-less pyrolysis to convert waste plastics into thermal energy.",
      "The stored energy is used for cooking, heating, industrial processes, or power generation.",
      "Offers a safe, closed-loop waste management and energy generation process."
    ],
    impact: [
      "Diverts up to 80% of plastic waste from landfills per installation.",
      "Cuts harmful emissions from plastic burning.",
      "Creates local jobs in waste collection and processing."
    ],
  },
  {
    id: 6,
    title: "Emergency & Humanitarian Response",
    icon: <FaAmbulance />,
    color: "#DC2626",
    problem: `In crises such as wars, refugee displacement, earthquakes, floods, or prolonged
blackouts, communities lose access to reliable cooking, heating, water, and power often for weeks or months.`,
    solution: [
      "Portable GridStreak units deployed to refugee camps, disaster shelters, and field hospitals.",
      "Provides heat for cooking, sterilization, water purification, and temporary cold storage.",
      "Operates independently from the grid using waste heat, geothermal sources, or transported pre-charged units."
    ],
    impact: [
      "Ensures life-saving energy access within hours of deployment.",
      "Reduces logistical burden of fuel transport to crisis zones.",
      "Supports humanitarian agencies in delivering rapid, clean energy solutions."
    ],
  }
];

export default function SolutionsShowcase() {
  const [selectedSolution, setSelectedSolution] = useState(solutions[0]);
  const [isExploring, setIsExploring] = useState(false);

  return (
    <section id="solutions-showcase" className={styles.solutionsShowcase}>
      <div className={styles.animatedBackground}>
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className={styles.floatingOrb}
            animate={{
              x: [0, (Math.random() - 0.5) * 100],
              y: [0, (Math.random() - 0.5) * 100],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: Math.random() * 20 + 10,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
          />
        ))}
      </div>

      <div className={styles.showcaseContainer}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className={styles.showcaseHeader}
        >
          <h2 className={styles.showcaseTitle}>
            <span className={styles.titleGradient}>Energy Transformation</span> Solutions
          </h2>
          <p className={styles.showcaseSubtitle}>
            Revolutionary thermal storage applications solving critical global challenges
          </p>
        </motion.div>

        <div className={styles.solutionsGrid}>
          <div className={styles.solutionSelector}>
            {solutions.map((solution) => (
              <motion.button
                key={solution.id}
                onClick={() => setSelectedSolution(solution)}
                whileHover={{ x: 10 }}
                whileTap={{ scale: 0.98 }}
                className={styles.solutionButton}
              >
                <div className={styles.buttonContent}>
                  <div className={styles.buttonIcon} style={{ color: solution.color }}>
                    {solution.icon}
                  </div>
                  <h3 className={styles.buttonTitle}>
                    {solution.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>

          <div className={styles.solutionDisplay}>
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedSolution.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
                className={styles.solutionDetail}
              >
                <div className={styles.detailHeader}>
                  <div>
                    <div className={styles.detailIcon} style={{ color: selectedSolution.color }}>
                      {selectedSolution.icon}
                    </div>
                    <h3 className={styles.detailTitle}>
                      {selectedSolution.title}
                    </h3>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsExploring(!isExploring)}
                    className={styles.exploreButton}
                  >
                    {isExploring ? 'Show Impact' : 'Explore Tech'}
                  </motion.button>
                </div>

                <AnimatePresence mode="wait">
                  {isExploring ? (
                    <motion.div
                      key="tech"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.techContent}
                    >
                      <div className={styles.problemSection}>
                        <h4 className={styles.sectionTitle}>The Problem</h4>
                        <p className={styles.sectionText}>{selectedSolution.problem}</p>
                      </div>
                      <div className={styles.solutionSection}>
                        <h4 className={styles.sectionTitle}>Our Solution</h4>
                        <ul className={styles.solutionList}>
                          {selectedSolution.solution.map((item, index) => (
                            <li key={index} className={styles.solutionItem}>
                              <FaCheckCircle className={styles.listIcon} /> {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="impact"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className={styles.impactContent}
                    >
                      <h4 className={styles.sectionTitle}>Transformational Impact</h4>
                      <ul className={styles.impactList}>
                        {selectedSolution.impact.map((item, index) => (
                          <li key={index} className={styles.impactItem}>
                            <FaCheckCircle className={styles.listIcon} /> {item}
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
