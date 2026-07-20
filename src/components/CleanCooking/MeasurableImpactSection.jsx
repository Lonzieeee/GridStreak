import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ImpactCountStat from "./ImpactCountStat";

const IMPACT_CENTER = 200;
const IMPACT_INNER_RADIUS = 80;
const IMPACT_OUTER_RADIUS = 178;

const toRadians = (angle) => (angle * Math.PI) / 180;

const createImpactSegmentPath = (startAngle, endAngle) => {
  const startRad = toRadians(startAngle);
  const endRad = toRadians(endAngle);

  const x1 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.cos(startRad);
  const y1 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.sin(startRad);
  const x2 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.cos(startRad);
  const y2 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.sin(startRad);
  const x3 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.cos(endRad);
  const y3 = IMPACT_CENTER + IMPACT_OUTER_RADIUS * Math.sin(endRad);
  const x4 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.cos(endRad);
  const y4 = IMPACT_CENTER + IMPACT_INNER_RADIUS * Math.sin(endRad);

  return `
    M ${x1} ${y1}
    L ${x2} ${y2}
    A ${IMPACT_OUTER_RADIUS} ${IMPACT_OUTER_RADIUS} 0 0 1 ${x3} ${y3}
    L ${x4} ${y4}
    A ${IMPACT_INNER_RADIUS} ${IMPACT_INNER_RADIUS} 0 0 0 ${x1} ${y1}
    Z
  `;
};

const getImpactPlacement = (index) => {
  const angle = -90 + index * 72 + 36;
  const rad = toRadians(angle);
  const tipRadius = 420;
  const tipX = 600 + tipRadius * Math.cos(rad);
  const tipY = 450 + tipRadius * Math.sin(rad);
  const cos = Math.cos(rad);

  let align = "center";
  if (cos > 0.2) {
    align = "left";
  } else if (cos < -0.2) {
    align = "right";
  }

  return {
    angle,
    left: tipX / 12,
    top: tipY / 9,
    align,
  };
};

const getImpactLineExtension = (index) => {
  return index === 3 ? 90 : index === 2 ? -50 : 0;
};

const getImpactCardOffset = (index) => ({
  left: index === 2 ? -7 : index === 3 ? -10 : index === 4 ? -8 : 0,
  top: index === 0 ? -5 : index === 1 ? -5 : index === 2 ? -7 : index === 3 ? -1 : index === 4 ? -10 : 0,
});

const getImpactCircleSize = (width) => {
  if (width <= 640) {
    return Math.min(width * 0.88, 360);
  }
  return Math.min(Math.max(width * 0.34, 320), 430);
};

const IMPACT_TABLET_MAX = 1366;

const getLayoutMode = (width) => {
  if (width <= 640) return "mobile";
  if (width <= IMPACT_TABLET_MAX) return "tablet";
  return "desktop";
};

function ImpactWheel({ cards, visible, reducedMotion, showSegmentLabels = true }) {
  return (
    <>
      <svg className="cc-impact-circle" viewBox="0 0 400 400" aria-hidden="true">
        {cards.map((item, index) => {
          const startAngle = -90 + index * 72 + 2;
          const endAngle = -90 + (index + 1) * 72 - 2;
          const midAngle = -90 + index * 72 + 36;
          const labelRadius = (IMPACT_INNER_RADIUS + IMPACT_OUTER_RADIUS) / 2;
          const labelX = IMPACT_CENTER + labelRadius * Math.cos(toRadians(midAngle));
          const labelY = IMPACT_CENTER + labelRadius * Math.sin(toRadians(midAngle));

          return (
            <React.Fragment key={`impact-segment-${item.title}`}>
              <motion.path
                d={createImpactSegmentPath(startAngle, endAngle)}
                fill={item.color}
                className="cc-impact-segment"
                initial={{ scale: 0, opacity: 0 }}
                animate={visible ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
                style={{ transformOrigin: `${IMPACT_CENTER}px ${IMPACT_CENTER}px` }}
              />
              {showSegmentLabels ? (
                <motion.text
                  x={labelX}
                  y={labelY}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  className="cc-impact-segment-label"
                  initial={{ opacity: 0 }}
                  animate={visible ? { opacity: 1 } : {}}
                  transition={{ duration: 0.32, delay: 0.45 + index * 0.07 }}
                >
                  {item.shortLabel}
                </motion.text>
              ) : null}
            </React.Fragment>
          );
        })}
      </svg>

      <motion.div
        className="cc-impact-center-anchor"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.35, delay: 0.25 }}
      >
        <motion.div
          className="cc-impact-center-label"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={visible ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.35, delay: 0.25 }}
        >
          <span>IMPACT</span>
        </motion.div>
      </motion.div>

      <motion.div
        className="cc-impact-icon-layer"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={visible ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.3 }}
      >
        {cards.map((item, index) => {
          const Icon = item.icon;
          const angle = -90 + index * 72 + 36;

          return (
            <motion.div
              key={`impact-icon-${item.title}`}
              className="cc-impact-node"
              style={{ "--impact-angle": `${angle}deg` }}
              initial={{ opacity: 0 }}
              animate={visible ? { opacity: 1 } : {}}
              transition={{ duration: 0.32, delay: 0.42 + index * 0.07 }}
            >
              <Icon />
            </motion.div>
          );
        })}
      </motion.div>
    </>
  );
}

function ImpactListCard({
  item,
  index,
  visible,
  countActive,
  reducedMotion,
  variant = "mobile",
  wide = false,
}) {
  const Icon = item.icon;
  const isTablet = variant === "tablet";

  return (
    <motion.article
      className={
        isTablet
          ? `cc-impact-tablet-card${wide ? " cc-impact-tablet-card--wide" : ""}`
          : "cc-impact-mobile-card"
      }
      style={isTablet ? { "--impact-card-color": item.color } : undefined}
      role={isTablet ? undefined : "listitem"}
      initial={{ opacity: 0, y: isTablet ? 8 : 12 }}
      animate={visible ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.32, delay: 0.38 + index * 0.07 }}
    >
      {!isTablet ? (
        <span
          className="cc-impact-mobile-icon"
          style={{ "--impact-mobile-color": item.color }}
          aria-hidden="true"
        >
          <Icon />
        </span>
      ) : null}
      <motion.div
        initial={isTablet ? { opacity: 0 } : undefined}
        animate={isTablet && visible ? { opacity: 1 } : undefined}
        transition={{ duration: 0.28, delay: 0.44 + index * 0.07 }}
      >
        <h3>{item.title}</h3>
        <p>
          <ImpactCountStat
            stat={item.stat}
            countUp={item.countUp}
            start={countActive}
            reducedMotion={reducedMotion}
            delayMs={index * 150}
            style={
              isTablet
                ? { color: item.color, display: "block", fontWeight: 700, marginBottom: "0.12rem" }
                : { color: item.color }
            }
          />
          {isTablet ? null : " "}
          {item.description}
        </p>
      </motion.div>
    </motion.article>
  );
}

export default function MeasurableImpactSection({ title, cards }) {
  const sectionRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const reducedMotion = !!prefersReducedMotion;
  const [impactVisible, setImpactVisible] = useState(false);
  const [impactCountActive, setImpactCountActive] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(
    typeof window === "undefined" ? 1280 : window.innerWidth,
  );

  const layoutMode = getLayoutMode(viewportWidth);
  const impactCircleSize = useMemo(() => getImpactCircleSize(viewportWidth), [viewportWidth]);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const onResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setImpactVisible(entry.isIntersecting),
      { threshold: 0.15 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const el = sectionRef.current;
    if (!el) return undefined;

    const isMeaningfulVisible = (entry) => {
      if (!entry.isIntersecting) return false;
      const hVis = entry.intersectionRect?.height ?? 0;
      return entry.intersectionRatio >= 0.06 || hVis >= 80;
    };

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          setImpactCountActive(isMeaningfulVisible(entry));
        }
      },
      { root: null, threshold: [0, 0.1, 0.15, 0.2, 0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0] },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      className={`cc-section cc-impact-section cc-impact-section--${layoutMode}`}
      ref={sectionRef}
    >
      <h2>{title}</h2>

      {layoutMode === "mobile" ? (
        <motion.div
          className="cc-impact-mobile"
          initial={{ opacity: 0, y: 12 }}
          animate={impactVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.4 }}
        >
          <motion.div className="cc-impact-mobile-wheel">
            <ImpactWheel cards={cards} visible={impactVisible} reducedMotion={reducedMotion} showSegmentLabels={false} />
          </motion.div>

          <div className="cc-impact-mobile-list" role="list" aria-label="Impact highlights">
            {cards.map((item, index) => (
              <ImpactListCard
                key={`impact-mobile-${item.title}`}
                item={item}
                index={index}
                visible={impactVisible}
                countActive={impactCountActive}
                reducedMotion={reducedMotion}
                variant="mobile"
              />
            ))}
          </div>
        </motion.div>
      ) : null}

      {layoutMode === "tablet" ? (
        <motion.div
          className="cc-impact-tablet"
          initial={{ opacity: 0, y: 14 }}
          animate={impactVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45 }}
        >
          <div className="cc-impact-tablet-wheel">
            <ImpactWheel cards={cards} visible={impactVisible} reducedMotion={reducedMotion} />
          </div>

          <motion.div
            className="cc-impact-tablet-cards"
            role="list"
            aria-label="Impact highlights"
            initial={{ opacity: 0 }}
            animate={impactVisible ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.15 }}
          >
            {cards.map((item, index) => (
              <ImpactListCard
                key={`impact-tablet-${item.title}`}
                item={item}
                index={index}
                visible={impactVisible}
                countActive={impactCountActive}
                reducedMotion={reducedMotion}
                variant="tablet"
                wide={index === cards.length - 1}
              />
            ))}
          </motion.div>
        </motion.div>
      ) : null}

      {layoutMode === "desktop" ? (
        <div className="cc-impact-infographic">
          <ImpactWheel cards={cards} visible={impactVisible} reducedMotion={reducedMotion} />

          <svg
            className="cc-impact-lines-overlay"
            viewBox="0 0 1200 900"
            preserveAspectRatio="xMidYMid meet"
            aria-hidden="true"
          >
            {cards.map((item, index) => {
              const placement = getImpactPlacement(index);
              const ringScale = impactCircleSize / 400;
              const lineStartRadius = IMPACT_OUTER_RADIUS * ringScale + 10;
              const lineStartX = 600 + lineStartRadius * Math.cos(toRadians(placement.angle));
              const lineStartY = 450 + lineStartRadius * Math.sin(toRadians(placement.angle));
              const targetX = placement.left * 12;
              const targetY = placement.top * 9;
              const dx = targetX - lineStartX;
              const dy = targetY - lineStartY;
              const distance = Math.sqrt(dx * dx + dy * dy) || 1;
              const extension = getImpactLineExtension(index);
              const lineEndX = targetX + (dx / distance) * extension;
              const lineEndY = targetY + (dy / distance) * extension;

              return (
                <motion.line
                  key={`impact-line-${item.title}`}
                  x1={lineStartX}
                  y1={lineStartY}
                  x2={lineEndX}
                  y2={lineEndY}
                  stroke="#3f6f54"
                  strokeWidth="2"
                  opacity="0.45"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={impactVisible ? { pathLength: 1, opacity: 0.45 } : {}}
                  transition={{ duration: 0.55, delay: 0.7 + index * 0.08 }}
                />
              );
            })}
          </svg>

          {cards.map((item, index) => {
            const placement = getImpactPlacement(index);
            const offset = getImpactCardOffset(index);
            const cardLeft = placement.left + offset.left;
            const cardTop = placement.top + offset.top;

            return (
              <motion.article
                key={`impact-copy-${item.title}`}
                className={`cc-impact-description cc-impact-description-${placement.align}`}
                style={{ left: `${cardLeft}%`, top: `${cardTop}%` }}
                initial={{ opacity: 0, y: 10 }}
                animate={impactVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.34, delay: 0.82 + index * 0.08 }}
              >
                <h3>{item.title}</h3>
                <p>
                  <ImpactCountStat
                    stat={item.stat}
                    countUp={item.countUp}
                    start={impactCountActive}
                    reducedMotion={reducedMotion}
                    delayMs={index * 150}
                    style={{
                      color: item.color,
                      display: "block",
                      fontSize: "1.25em",
                      lineHeight: 1.15,
                      marginBottom: "0.2em",
                    }}
                  />
                  {item.description}
                </p>
              </motion.article>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}
