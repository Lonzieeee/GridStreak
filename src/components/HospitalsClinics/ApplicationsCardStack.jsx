import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { LuActivity, LuChefHat, LuDroplets, LuFlaskConical, LuSnowflake, LuTrash2 } from "react-icons/lu";
import { MdBiotech, MdOutlineMedicalServices } from "react-icons/md";

const APP_ICONS = [
  LuSnowflake,
  LuFlaskConical,
  MdOutlineMedicalServices,
  LuActivity,
  LuChefHat,
  MdBiotech,
  LuDroplets,
  LuTrash2,
];

const APP_CARDS = [
  {
    title: "Cold-chain protection",
    description: "Protect vaccines, blood, and temperature-sensitive medicines during outages.",
  },
  {
    title: "Lab continuity",
    description: "Keep diagnostics and laboratory workflows running without interruption.",
  },
  {
    title: "Medical equipment uptime",
    description: "Maintain reliable power for essential clinical and care devices.",
  },
  {
    title: "Outage loss prevention",
    description: "Reduce spoilage, downtime, and service disruption during grid instability.",
  },
  {
    title: "Hospital kitchen heat",
    description: "Deliver efficient, dependable thermal energy for meal operations.",
  },
  {
    title: "Sterilization support",
    description: "Provide consistent heat for infection prevention and equipment sterilization.",
  },
  {
    title: "Hot water and sanitation",
    description: "Support ward hygiene and sanitation with reliable hot water availability.",
  },
  {
    title: "Safer waste handling",
    description: "Enable high-temperature processing for medical and infectious waste.",
  },
];

export default function ApplicationsCardStack() {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const firstCardRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [cardSize, setCardSize] = useState({ width: 280, height: 220 });
  const reducedMotion = useReducedMotion();

  const cards = useMemo(
    () => APP_CARDS.map((card, index) => ({ ...card, Icon: APP_ICONS[index] })),
    []
  );

  useEffect(() => {
    const checkScreen = () => {
      const width = window.innerWidth;
      setIsMobile(width <= 768);
      setIsDesktop(width > 1024);
    };
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateMetrics = () => {
      if (gridRef.current) {
        setGridWidth(gridRef.current.clientWidth);
        setGridHeight(gridRef.current.clientHeight);
      }
      if (firstCardRef.current) {
        const rect = firstCardRef.current.getBoundingClientRect();
        if (rect.width) {
          setCardSize({ width: rect.width, height: rect.height || 220 });
        }
      }
    };

    updateMetrics();
    window.addEventListener("resize", updateMetrics);
    return () => window.removeEventListener("resize", updateMetrics);
  }, []);

  const sparklePositions = [
    { top: "11%", left: "10%" },
    { top: "17%", left: "82%" },
    { top: "36%", left: "28%" },
    { top: "44%", left: "63%" },
    { top: "62%", left: "15%" },
    { top: "70%", left: "74%" },
    { top: "84%", left: "52%" },
    { top: "12%", left: "55%" },
  ];

  const cardGap = isMobile ? 12 : 20;
  const rowGap = isMobile ? 12 : 26;

  const getColumnCount = () => {
    const width = cardSize.width || 280;
    const available = gridWidth || 1200;
    const breakpointMaxCols = isDesktop ? 4 : available >= 900 ? 3 : 2;
    const fitCols = Math.floor((available + cardGap) / (width + cardGap));
    if (isDesktop) {
      return 4;
    }
    return Math.max(1, Math.min(cards.length, breakpointMaxCols, fitCols || 1));
  };

  const columns = getColumnCount();
  const rows = Math.ceil(cards.length / columns);
  const animatedGridHeight =
    rows * (cardSize.height || 220) + Math.max(0, rows - 1) * rowGap;

  const calculateRowPosition = (index) => {
    const width = cardSize.width || 280;
    const height = cardSize.height || 220;
    const row = Math.floor(index / columns);
    const col = index % columns;
    const cardsInRow = Math.min(columns, cards.length - row * columns);
    const rowWidth = cardsInRow * width + (cardsInRow - 1) * cardGap;
    const startX = ((gridWidth || 1200) - rowWidth) / 2;
    return {
      left: startX + col * (width + cardGap),
      top: row * (height + rowGap),
    };
  };

  const calculateStackPosition = (index) => {
    const width = cardSize.width || 280;
    const height = cardSize.height || 220;
    const centerX = (gridWidth || 1200) / 2 - width / 2;
    const centerY = (gridHeight || (height * 2 + rowGap)) / 2 - height / 2;
    return {
      left: centerX + index * 3,
      top: centerY - index * 1.5,
      rotate: (index % 2 === 0 ? -1 : 1) * index * 0.55,
      scale: 1 - index * 0.02,
      zIndex: cards.length - index,
    };
  };

  if (isMobile || reducedMotion) {
    return (
      <section
        ref={sectionRef}
        className={["hc-app-themes", isVisible ? "hc-app-themes--visible" : ""].filter(Boolean).join(" ")}
        aria-label="Healthcare applications themes"
      >
        <div className="hc-app-themes__sparkles" aria-hidden="true">
          {sparklePositions.map((pos, index) => (
            <svg
              key={index}
              className="hc-app-themes__sparkle"
              style={{ ...pos, animationDelay: `${(index * 0.7).toFixed(2)}s` }}
              viewBox="0 0 20 20"
              fill="none"
            >
              <path d="M10 2 L11 9 L18 10 L11 11 L10 18 L9 11 L2 10 L9 9 Z" fill="#fffbe6" stroke="#eb6a00" strokeWidth="0.8" />
            </svg>
          ))}
        </div>
        <div className="hc-app-themes__container">
          <div className="hc-app-themes__grid-static" role="list" aria-label="Healthcare applications">
            {cards.map(({ title, description, Icon }, index) => (
              <article className="hc-app-theme-card" role="listitem" key={title} style={{ "--stagger": index }}>
                <p className="hc-app-theme-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <span className="hc-app-theme-card__icon" aria-hidden="true">
                  {React.createElement(Icon, { size: 30, strokeWidth: 2.1 })}
                </span>
                <h3 className="hc-app-theme-card__title">{title}</h3>
                <p className="hc-app-theme-card__desc">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className={["hc-app-themes", isVisible ? "hc-app-themes--visible" : ""].filter(Boolean).join(" ")}
      aria-label="Healthcare applications themes"
    >
      <div className="hc-app-themes__sparkles" aria-hidden="true">
        {sparklePositions.map((pos, index) => (
          <svg
            key={index}
            className="hc-app-themes__sparkle"
            style={{ ...pos, animationDelay: `${(index * 0.7).toFixed(2)}s` }}
            viewBox="0 0 20 20"
            fill="none"
          >
            <path d="M10 2 L11 9 L18 10 L11 11 L10 18 L9 11 L2 10 L9 9 Z" fill="#fffbe6" stroke="#eb6a00" strokeWidth="0.8" />
          </svg>
        ))}
      </div>

      <div className="hc-app-themes__container">
        <div
          className="hc-app-themes__pyramid-grid"
          ref={gridRef}
          role="list"
          aria-label="Healthcare applications"
          style={{ height: animatedGridHeight }}
        >
          {cards.map(({ title, description, Icon }, index) => {
            const rowPos = calculateRowPosition(index);
            const stackPos = calculateStackPosition(index);
            return (
              <motion.article
                key={title}
                className="hc-app-theme-card hc-app-theme-card--animated"
                role="listitem"
                ref={index === 0 ? firstCardRef : null}
                initial={{
                  opacity: 0,
                  left: stackPos.left,
                  top: stackPos.top,
                  rotate: stackPos.rotate,
                  scale: stackPos.scale,
                  zIndex: stackPos.zIndex,
                }}
                animate={
                  isVisible
                    ? {
                        opacity: 1,
                        left: rowPos.left,
                        top: rowPos.top,
                        rotate: 0,
                        scale: 1,
                        zIndex: 1,
                        transition: {
                          type: "spring",
                          stiffness: 80,
                          damping: 20,
                          mass: 0.8,
                          delay: index * 0.14,
                        },
                      }
                    : {
                        opacity: 0,
                        left: stackPos.left,
                        top: stackPos.top,
                        rotate: stackPos.rotate,
                        scale: stackPos.scale,
                        zIndex: stackPos.zIndex,
                      }
                }
              >
                <p className="hc-app-theme-card__index" aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <span className="hc-app-theme-card__icon" aria-hidden="true">
                  {React.createElement(Icon, { size: 30, strokeWidth: 2.1 })}
                </span>
                <h3 className="hc-app-theme-card__title">{title}</h3>
                <p className="hc-app-theme-card__desc">{description}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

