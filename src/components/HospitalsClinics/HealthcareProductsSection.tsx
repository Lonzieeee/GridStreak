import React, { useEffect, useId, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import type { IconType } from "react-icons";
import {
  FaBolt,
  FaChargingStation,
  FaClinicMedical,
  FaHospital,
  FaLeaf,
  FaShieldAlt,
  FaUsers,
  FaVials,
} from "react-icons/fa";
import "./HealthcareProductsSection.css";


const PROFILE_IMAGE_FALLBACK =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png";

export type ProductBulletGroup = {
  heading: string;
  items: string[];
};

export type ProductSectionCard = {
  title: string;
  text: string;
  icon?: IconType;
  highlight?: boolean;
};

/** A prose line, or a line to emphasize (e.g. CO₂ stat in brand orange). */
export type ProductBodyParagraph = string | { text: string; highlight?: boolean };

export type Product = {
  id: string;
  shortLabel: string;
  title: string;
  /** Optional line under the product name */
  subtitle?: string;
  /** Single lead paragraph (use with or instead of bodyParagraphs) */
  body?: string;
  /** Multiple short paragraphs for clearer hierarchy */
  bodyParagraphs?: ProductBodyParagraph[];
  /** Optional numbered points (shown when bulletGroups is absent) */
  bullets?: string[];
  /** Grouped lists with headings (takes precedence over bullets) */
  bulletGroups?: ProductBulletGroup[];
  /** Optional section cards (used for tabbed grid layouts). */
  sections?: ProductSectionCard[];
  /** Optional closing line */
  closing?: string;
  image: string;
};

type HealthcareProductsSectionProps = {
  sectionTitle?: string;
  headingId?: string;
  sectionId?: string;
  products?: Product[];
  imageOverride?: string;
  /** Cycle through products on a timer (e.g. Clean Cooking). Off by default. */
  autoRotate?: boolean;
  /** Time between auto-advances, ms. Default 8000. */
  autoRotateIntervalMs?: number;
};

const PRODUCTS: Product[] = [
  {
    id: "nano",
    shortLabel: "Nano Cartridge",
    title: "Nano Cartridge",
    subtitle: "Compact Energy for Small Clinics & Remote Facilities",
    sections: [
      {
        title: "Overview",
        text: "Compact thermal module for rural clinics and health posts needing dependable daily energy support for essential care services.",
        icon: FaClinicMedical,
      },
      {
        title: "Healthcare Impact",
        text: "Supports cold storage reliability and safer care delivery in low-infrastructure settings where energy disruptions are common.",
        icon: FaShieldAlt,
      },
      {
        title: "Scale",
        text: "Best for small facilities, outreach clinics, and mobile healthcare units serving distributed communities.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Supports clean cooking, water heating, and sanitation-linked thermal demands required for routine clinical operations.",
        icon: FaVials,
      },
      {
        title: "Energy Access",
        text: "Operates with solar-linked thermal charging for off-grid continuity and reduced dependence on diesel backup.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Ideal for expanding primary care access in underserved communities with practical, resilient infrastructure.",
        icon: FaLeaf,
      },
    ],
    body: "Designed for small clinics, dispensaries, and off-grid health posts, the Nano Cartridge delivers essential energy where infrastructure is limited.",
    bullets: [
      "Ideal for rural and mobile healthcare units",
      "Supports clean cooking, water heating, and sanitation",
      "Enables backup power for small cold storage systems",
      "Portable, modular, and easy to deploy",
    ],
    closing: "Perfect for expanding primary healthcare access in underserved areas.",
    image: "/images/nano-placeholder.jpg",
  },
  {
    id: "chamber",
    shortLabel: "GridStreak Circular Chamber",
    title: "GridStreak Circular Chamber",
    subtitle: "Sustainable Medical Waste Treatment & Energy Recovery",
    sections: [
      {
        title: "Overview",
        text: "High-temperature chamber for safer medical and plastic waste processing with integrated energy recovery workflows.",
        icon: FaShieldAlt,
      },
      {
        title: "Environmental Impact",
        text: "Reduces open burning and lowers hazardous waste exposure around healthcare sites and nearby communities.",
        icon: FaLeaf,
      },
      {
        title: "Scale",
        text: "Suitable for district hospitals, county systems, and centralized treatment sites handling large waste streams.",
        icon: FaHospital,
      },
      {
        title: "Service Scope",
        text: "Converts waste into usable thermal energy for healthcare-adjacent operations such as heating and sanitation support.",
        icon: FaChargingStation,
      },
      {
        title: "Operational Benefit",
        text: "Improves waste handling reliability while supporting cleaner facility energy systems and compliance standards.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Ideal where safe waste treatment and resilient thermal output are both mission-critical requirements.",
        icon: FaClinicMedical,
      },
    ],
    body: "The GridStreak Circular Chamber enables safe, high-temperature processing of medical and plastic waste, transforming waste into usable energy.",
    bullets: [
      "High-temperature destruction of toxic and infectious medical waste",
      "Converts waste into usable thermal energy",
      "Supports circular economy systems in healthcare",
      "Reduces environmental and public health risks",
    ],
    closing: "Ideal for hospitals, counties, and centralized healthcare waste systems.",
    image: "/images/chamber-placeholder.jpg",
  },
  {
    id: "x",
    shortLabel: "GridStreak X",
    title: "GridStreak X",
    subtitle: "Scalable Energy for Clinics & Mid-Sized Hospitals",
    sections: [
      {
        title: "Overview",
        text: "Scalable thermal storage system for expanding clinics and mid-sized hospitals with rising service demand.",
        icon: FaHospital,
      },
      {
        title: "Healthcare Impact",
        text: "Improves uptime for lab workflows, sterilization, and vaccine-chain support during unstable grid periods.",
        icon: FaVials,
      },
      {
        title: "Scale",
        text: "Supports growing district-level facilities serving broader patient catchments and longer daily operating windows.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Powers cold storage, hospital kitchens, and hot-water-linked care needs across multiple departments.",
        icon: FaChargingStation,
      },
      {
        title: "Cost Stability",
        text: "Reduces volatile fuel dependence and helps stabilize operational energy budgets over long planning cycles.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Strong fit for healthcare centers scaling capacity and service reliability without large infrastructure disruption.",
        icon: FaShieldAlt,
      },
    ],
    body: "GridStreak X is built for growing healthcare facilities requiring reliable and continuous energy.",
    bullets: [
      "Powers cold storage, laboratories, and sterilization systems",
      "Supports hospital kitchens and water heating",
      "Reduces energy costs and improves operational stability",
      "Scalable and adaptable to facility needs",
    ],
    closing: "Ideal for district hospitals and expanding healthcare centers.",
    image: "/images/x-placeholder.jpg",
  },
  {
    id: "ultra",
    shortLabel: "GridStreak Ultra",
    title: "GridStreak Ultra",
    subtitle: "High-Capacity Energy for Large Hospitals & Healthcare Systems",
    sections: [
      {
        title: "Overview",
        text: "Industrial-scale thermal system for large hospitals and integrated health networks with heavy continuous demand.",
        icon: FaHospital,
      },
      {
        title: "Healthcare Impact",
        text: "Enables resilient, high-throughput operations for critical and life-saving services that cannot tolerate outages.",
        icon: FaShieldAlt,
      },
      {
        title: "Scale",
        text: "Designed for major facilities with high patient volumes, long shifts, and round-the-clock workloads.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Supports full hospital energy demand, sterilization heat, and system-wide thermal needs across core departments.",
        icon: FaChargingStation,
      },
      {
        title: "Operational Continuity",
        text: "Built for continuous performance under high-demand conditions and long duty cycles in critical environments.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Best suited to national and regional healthcare institutions requiring robust capacity and long-term resilience.",
        icon: FaLeaf,
      },
    ],
    body: "GridStreak Ultra delivers industrial-scale thermal energy storage for large hospitals and healthcare networks.",
    bullets: [
      "Supports full hospital energy demand",
      "Enables grid stabilization and energy independence",
      "Powers large-scale sterilization, heating, and waste systems",
      "Designed for long-term, high-performance operation",
    ],
    closing: "Built for major hospitals and national healthcare systems.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/ultraaa.png",
  },
];

const DEFAULT_AUTO_ROTATE_MS = 8000;

export default function HealthcareProductsSection({
  sectionTitle = "Our Healthcare Energy Systems",
  headingId = "hc-products-heading",
  sectionId,
  products = PRODUCTS,
  imageOverride,
  autoRotate = false,
  autoRotateIntervalMs = DEFAULT_AUTO_ROTATE_MS,
}: HealthcareProductsSectionProps) {
  const gradientId = useId().replace(/:/g, "");
  const prefersReducedMotion = useReducedMotion();
  const safeProducts = products.length > 0 ? products : PRODUCTS;
  const sectionRef = useRef<HTMLElement | null>(null);
  const listRef = useRef(safeProducts);
  const hoverPauseRef = useRef(false);
  const inViewRef = useRef(false);
  const [selectedId, setSelectedId] = useState<string>(safeProducts[0].id);
  const [imgSrc, setImgSrc] = useState<string>(imageOverride ?? safeProducts[0].image);
  const [typingTick, setTypingTick] = useState(0);
  const [typedCount, setTypedCount] = useState(
    prefersReducedMotion ? sectionTitle.length : 0,
  );
  const [typingDirection, setTypingDirection] = useState<"forward" | "backward">("forward");

  listRef.current = safeProducts;

  const selected = useMemo(
    () => safeProducts.find((p) => p.id === selectedId) ?? safeProducts[0],
    [safeProducts, selectedId],
  );
  const useTabbedGridLayout = safeProducts.every((p) => (p.sections?.length ?? 0) > 0);

  useEffect(() => {
    setSelectedId(safeProducts[0].id);
  }, [safeProducts]);

  useEffect(() => {
    setImgSrc(imageOverride ?? selected.image);
  }, [imageOverride, selected.image, selected.id]);

  useEffect(() => {
    if (prefersReducedMotion) {
      setTypedCount(sectionTitle.length);
      setTypingDirection("forward");
      return undefined;
    }
    setTypedCount(0);
    setTypingDirection("forward");
    return undefined;
  }, [sectionTitle, typingTick, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const fullLength = sectionTitle.length;
    let timer = 0;

    if (typedCount >= fullLength && typingDirection === "forward") {
      timer = window.setTimeout(() => {
        setTypingDirection("backward");
      }, 1100);
      return () => window.clearTimeout(timer);
    }

    if (typedCount <= 0 && typingDirection === "backward") {
      timer = window.setTimeout(() => {
        setTypingDirection("forward");
      }, 500);
      return () => window.clearTimeout(timer);
    }

    timer = window.setTimeout(() => {
      setTypedCount((value) => {
        const delta = typingDirection === "forward" ? 1 : -1;
        const next = value + delta;
        if (next < 0) return 0;
        if (next > fullLength) return fullLength;
        return next;
      });
    }, typingDirection === "forward" ? 110 : 80);

    return () => window.clearTimeout(timer);
  }, [typedCount, typingDirection, sectionTitle, prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;
    const node = sectionRef.current;
    if (!node) return undefined;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !inViewRef.current) {
          inViewRef.current = true;
          setTypingTick((v) => v + 1);
        } else if (!entry.isIntersecting) {
          inViewRef.current = false;
        }
      },
      { threshold: 0.2 },
    );
    io.observe(node);
    return () => io.disconnect();
  }, [prefersReducedMotion]);

  const typedTitleText = sectionTitle.slice(0, typedCount);
  const renderTypedAccentTitle = (prefix: string, accent: string, suffix: string) => {
    const prefixEnd = prefix.length;
    const accentEnd = prefix.length + accent.length;

    const typedPrefix = typedTitleText.slice(0, prefixEnd);
    const typedAccent =
      typedTitleText.length > prefixEnd
        ? typedTitleText.slice(prefixEnd, Math.min(accentEnd, typedTitleText.length))
        : "";
    const typedSuffix = typedTitleText.length > accentEnd ? typedTitleText.slice(accentEnd) : "";

    return (
      <>
        {typedPrefix}
        <span className="hc-products-section__title-accent">{typedAccent}</span>
        {typedSuffix}
      </>
    );
  };

  const renderTypedTitle = () => {
    if (sectionTitle === "Our Products") {
      return renderTypedAccentTitle("Our ", "Products", "");
    }
    if (sectionTitle === "Our Healthcare Energy Systems") {
      return renderTypedAccentTitle("Our ", "Healthcare Energy", " Systems");
    }
    if (sectionTitle === "Our Water Energy Systems") {
      return renderTypedAccentTitle("Our ", "Water Energy", " Systems");
    }
    return typedTitleText;
  };

  useEffect(() => {
    if (!autoRotate) return;
    if (prefersReducedMotion) return;
    if (listRef.current.length < 2) return;

    const tick = () => {
      if (typeof document !== "undefined" && document.hidden) return;
      if (hoverPauseRef.current) return;
      const list = listRef.current;
      setSelectedId((current) => {
        const idx = list.findIndex((p) => p.id === current);
        const next = ((idx >= 0 ? idx : 0) + 1) % list.length;
        return list[next].id;
      });
    };

    const id = window.setInterval(tick, autoRotateIntervalMs);
    return () => window.clearInterval(id);
  }, [autoRotate, autoRotateIntervalMs, prefersReducedMotion, safeProducts.length]);

  useEffect(() => {
    const scope = sectionRef.current;
    if (!scope) return undefined;
    const svg = scope.querySelector(".hc-products-wave-svg");

    if (prefersReducedMotion) {
      if (svg) {
        gsap.set(svg, { opacity: 0.55 });
      }
      return undefined;
    }

    const groups = Array.from(scope.querySelectorAll<SVGGElement>(".hc-wave-group"));
    const allTweens = groups.flatMap((group) => {
      const paths = Array.from(group.querySelectorAll<SVGPathElement>(".hc-wave-path"));
      if (paths.length === 0) return [];

      const duration = gsap.utils.random(42, 82);
      const y = gsap.utils.random(-210, 210);
      const rotate = gsap.utils.random(-16, 16);
      const sxFrom = gsap.utils.random(1.7, 2.3);
      const sxTo = gsap.utils.random(1.35, 1.75);
      const syFrom = gsap.utils.random(1.35, 1.85);
      const syTo = gsap.utils.random(0.58, 0.76);
      const opacityFrom = gsap.utils.random(0.6, 0.78);
      const opacityTo = gsap.utils.random(0.78, 0.95);

      const drift = gsap.to(paths, {
        xPercent: -100,
        duration,
        ease: "none",
        repeat: -1,
      });

      const morph = gsap.fromTo(
        group,
        {
          y,
          opacity: opacityFrom,
          rotate,
          scaleY: syFrom,
          scaleX: sxFrom,
          transformOrigin: "50% 50%",
        },
        {
          y: y * -1,
          opacity: opacityTo,
          rotate: rotate * -1,
          scaleY: syTo,
          scaleX: sxTo,
          duration: duration * 0.28,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          transformOrigin: "50% 50%",
        },
      );

      gsap.set(group, { xPercent: gsap.utils.random(-8, 8) });
      drift.progress(Math.random());
      morph.progress(Math.random());
      return [drift, morph];
    });

    if (svg) {
      gsap.to(svg, { opacity: 0.9, duration: 0.8, ease: "power2.out" });
    }

    return () => {
      allTweens.forEach((tween) => tween.kill());
    };
  }, [prefersReducedMotion]);

  return (
    <section
      ref={sectionRef}
      id={sectionId}
      className={useTabbedGridLayout ? "hc-products-section hc-products-section--tabbed" : "hc-products-section"}
      aria-labelledby={headingId}
    >
      <div className="hc-products-wave-bg" aria-hidden="true">
        <svg
          className="hc-products-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1920 1080"
          preserveAspectRatio="none"
        >
          <defs>
            <linearGradient id={gradientId} x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#b0f222" />
              <stop offset="100%" stopColor="#13b5cf" />
            </linearGradient>
          </defs>
          {Array.from({ length: 6 }).map((_, idx) => (
            <g className="hc-wave-group" key={`wave-group-${idx}`}>
              <path
                className="hc-wave-path"
                fill={`url(#${gradientId})`}
                d="M1920 538.5l8.6-.4h8.6l8.6.3 4.3.3 4.3.4c11.4 1.1 22.8 2.9 34 5.4 22.5 5 44.3 12.4 65.6 21a730.8 730.8 0 0 1 62.3 28.7c20.3 10.3 40.3 21 60.2 31.7l29.8 15.9c9.9 5.2 19.9 10.3 29.9 15.3a727 727 0 0 0 60.7 27.2 360.6 360.6 0 0 0 62.6 18.3c10.6 2 21.2 3.4 31.8 4l8 .3 7.7-.1c2.6-.2 5.1-.2 7.7-.5l3.9-.4 1.9-.2 1.9-.3a177 177 0 0 0 30.8-7.4c10.2-3.3 20.2-7.5 30.1-12.1a448 448 0 0 0 57.5-33.2c37.2-24.9 72.1-53.7 106.7-82.8 34.6-29.1 68.7-59.1 105.7-85.8 9.3-6.6 18.7-13.1 28.5-19.1 9.8-6.1 19.8-11.7 30.3-16.7s21.3-9.4 32.7-12.6c11.4-3.2 23.2-5.3 35.3-5.7 12.1-.3 24.2 1.1 35.8 3.7 11.7 2.6 23 6.4 33.8 11 21.8 9.1 42 20.9 61.2 33.7 9.6 6.4 19 13.1 28.2 20a934 934 0 0 1 27.1 21.1c17.8 14.3 35.1 29 52.4 43.6 34.6 29.2 68.9 58.3 104.9 83.9 9 6.4 18.2 12.5 27.4 18.3 9.3 5.8 18.7 11.2 28.2 16.1 19.1 9.7 39 17.4 59 20.9l3.8.6 3.8.5 7.5.7 3.8.1 3.8.1h5.9l2-.1a243.7 243.7 0 0 0 63-10.6 388 388 0 0 0 31-10.3 706.6 706.6 0 0 0 60.9-26.6c20.1-9.8 40-20.3 60-30.8 20-10.6 40-21.2 60.4-31.4a875.4 875.4 0 0 1 62.3-28.5 430.2 430.2 0 0 1 65.5-20.9c11.2-2.5 22.6-4.3 34-5.5l4.3-.4 4.3-.3 8.6-.4 4.3-.1h4.3c2.9 0 5.7.2 8.6.3v3c-22.5 1.4-44.5 6-65.7 12.8a449 449 0 0 0-61.8 25.5c-40.1 19.7-78.4 43.3-117.4 66.4a1413.4 1413.4 0 0 1-59.3 33.9 675.1 675.1 0 0 1-62.4 29.9c-21.5 8.8-44 16.3-67.5 20.8a250.2 250.2 0 0 1-35.8 4.5l-2.3.1-2.3.1-4.6.1h-4.7l-4.7-.1-9.4-.7-4.6-.6-4.6-.7c-12.3-2-24.2-5.3-35.6-9.4-11.4-4.1-22.4-9-32.9-14.5a454.2 454.2 0 0 1-59.3-37.5c-37.3-27.5-71.2-58-105.1-88-16.9-15-33.8-30-50.8-44.5a845.7 845.7 0 0 0-52.2-41.8c-8.9-6.5-18-12.8-27.3-18.7a297 297 0 0 0-28.5-16.1c-9.7-4.7-19.7-8.8-30-11.8a128 128 0 0 0-31.2-5.2c-21.1-.5-42.6 4.8-62.9 13.4-20.3 8.6-39.7 20-58.2 32.6a590.9 590.9 0 0 0-27.3 19.7l-13.3 10.4-13.1 10.6a1788.2 1788.2 0 0 0-51.4 44.2c-33.9 29.9-67.2 60.8-103.3 89-18.1 14-37 27.3-57.5 38.7a267 267 0 0 1-31.9 15.2 191.4 191.4 0 0 1-34.6 10.1l-2.2.4-2.3.3-4.5.7-9.2 1-4.6.2c-1.5 0-3.1.2-4.6.1l-9-.1c-12-.3-23.9-1.6-35.5-3.7a340 340 0 0 1-67.4-19.9 674.5 674.5 0 0 1-62.6-29.3c-10.1-5.3-20.1-10.9-30-16.5l-14.8-8.5-14.7-8.6c-39.1-22.9-77.5-46.3-117.6-66.1-20-9.8-40.6-18.7-61.8-25.5a279.8 279.8 0 0 0-65.6-13.2v-2.9Z"
              />
              <path
                className="hc-wave-path"
                fill={`url(#${gradientId})`}
                d="M0 538.5l8.6-.4h8.6l8.6.3 4.3.3 4.3.4c11.4 1.1 22.8 2.9 34 5.4 22.5 5 44.3 12.4 65.6 21a730.8 730.8 0 0 1 62.3 28.7c20.3 10.3 40.3 21 60.2 31.7l29.8 15.9c9.9 5.2 19.9 10.3 29.9 15.3a727 727 0 0 0 60.7 27.2 360.6 360.6 0 0 0 62.6 18.3c10.6 2 21.2 3.4 31.8 4l8 .3 7.7-.1c2.6-.2 5.1-.2 7.7-.5l3.9-.4 1.9-.2 1.9-.3a177 177 0 0 0 30.8-7.4c10.2-3.3 20.2-7.5 30.1-12.1a448 448 0 0 0 57.5-33.2c37.2-24.9 72.1-53.7 106.7-82.8 34.6-29.1 68.7-59.1 105.7-85.8 9.3-6.6 18.7-13.1 28.5-19.1 9.8-6.1 19.8-11.7 30.3-16.7s21.3-9.4 32.7-12.6c11.4-3.2 23.2-5.3 35.3-5.7 12.1-.3 24.2 1.1 35.8 3.7 11.7 2.6 23 6.4 33.8 11 21.8 9.1 42 20.9 61.2 33.7 9.6 6.4 19 13.1 28.2 20a934 934 0 0 1 27.1 21.1c17.8 14.3 35.1 29 52.4 43.6 34.6 29.2 68.9 58.3 104.9 83.9 9 6.4 18.2 12.5 27.4 18.3 9.3 5.8 18.7 11.2 28.2 16.1 19.1 9.7 39 17.4 59 20.9l3.8.6 3.8.5 7.5.7 3.8.1 3.8.1h5.9l2-.1a243.7 243.7 0 0 0 63-10.6 388 388 0 0 0 31-10.3 706.6 706.6 0 0 0 60.9-26.6c20.1-9.8 40-20.3 60-30.8 20-10.6 40-21.2 60.4-31.4a875.4 875.4 0 0 1 62.3-28.5 430.2 430.2 0 0 1 65.5-20.9c11.2-2.5 22.6-4.3 34-5.5l4.3-.4 4.3-.3 8.6-.4 4.3-.1h4.3c2.9 0 5.7.2 8.6.3v3c-22.5 1.4-44.5 6-65.7 12.8a449 449 0 0 0-61.8 25.5c-40.1 19.7-78.4 43.3-117.4 66.4a1413.4 1413.4 0 0 1-59.3 33.9 675.1 675.1 0 0 1-62.4 29.9c-21.5 8.8-44 16.3-67.5 20.8a250.2 250.2 0 0 1-35.8 4.5l-2.3.1-2.3.1-4.6.1h-4.7l-4.7-.1-9.4-.7-4.6-.6-4.6-.7c-12.3-2-24.2-5.3-35.6-9.4-11.4-4.1-22.4-9-32.9-14.5a454.2 454.2 0 0 1-59.3-37.5c-37.3-27.5-71.2-58-105.1-88-16.9-15-33.8-30-50.8-44.5a845.7 845.7 0 0 0-52.2-41.8c-8.9-6.5-18-12.8-27.3-18.7a297 297 0 0 0-28.5-16.1c-9.7-4.7-19.7-8.8-30-11.8a128 128 0 0 0-31.2-5.2c-21.1-.5-42.6 4.8-62.9 13.4-20.3 8.6-39.7 20-58.2 32.6a590.9 590.9 0 0 0-27.3 19.7l-13.3 10.4-13.1 10.6a1788.2 1788.2 0 0 0-51.4 44.2c-33.9 29.9-67.2 60.8-103.3 89-18.1 14-37 27.3-57.5 38.7a267 267 0 0 1-31.9 15.2 191.4 191.4 0 0 1-34.6 10.1l-2.2.4-2.3.3-4.5.7-9.2 1-4.6.2c-1.5 0-3.1.2-4.6.1l-9-.1c-12-.3-23.9-1.6-35.5-3.7a340 340 0 0 1-67.4-19.9 674.5 674.5 0 0 1-62.6-29.3c-10.1-5.3-20.1-10.9-30-16.5l-14.8-8.5-14.7-8.6c-39.1-22.9-77.5-46.3-117.6-66.1-20-9.8-40.6-18.7-61.8-25.5A278.2 278.2 0 0 0 0 541.5v-3Z"
              />
            </g>
          ))}
        </svg>
      </div>
      <h2 id={headingId} className="hc-products-section__title">
        {renderTypedTitle()}
        {!prefersReducedMotion && typedCount < sectionTitle.length ? (
          <span className="hc-products-section__title-cursor" aria-hidden="true">
            |
          </span>
        ) : null}
      </h2>

      {useTabbedGridLayout ? (
        <div
          className="hc-products-app hc-products-app--tabbed"
          onMouseEnter={() => {
            hoverPauseRef.current = true;
          }}
          onMouseLeave={() => {
            hoverPauseRef.current = false;
          }}
        >
          <FullOptionsList
            products={safeProducts}
            selectedId={selectedId}
            onSelect={setSelectedId}
            className="hc-products-menu__full-options--tabs"
          />

          <div
            id="hc-product-panel"
            className="hc-products-menu__content hc-products-menu__content--tabbed"
            role="tabpanel"
            aria-labelledby={`hc-product-tab-${selected.id}`}
          >
            <div className="hc-products-menu__contentSurface hc-products-menu__contentSurface--tabbed">
              <header className="hc-products-menu__contentHead">
                <h3 className="hc-products-menu__contentTitle">{selected.title}</h3>
                {selected.subtitle ? (
                  <p className="hc-products-menu__contentSubtitle">{selected.subtitle}</p>
                ) : null}
              </header>

              {selected.sections && selected.sections.length > 0 ? (
                <div className="hc-products-menu__sectionsGrid" role="list" aria-label={`${selected.title} details`}>
                  {selected.sections.map((section, index) => {
                    const Icon = section.icon;
                    return (
                      <article
                        key={`${selected.id}-section-${index}`}
                        role="listitem"
                        className={
                          section.highlight
                            ? "hc-products-menu__sectionCard hc-products-menu__sectionCard--highlight"
                            : "hc-products-menu__sectionCard"
                        }
                      >
                        {Icon ? (
                          <span className="hc-products-menu__sectionIcon" aria-hidden="true">
                            <Icon />
                          </span>
                        ) : null}
                      <div className="hc-products-menu__sectionBody">
                        <h4 className="hc-products-menu__sectionTitle">{section.title}</h4>
                        <p className="hc-products-menu__sectionText">{section.text}</p>
                      </div>
                      </article>
                    );
                  })}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : (
        <div
          className="hc-products-app"
          onMouseEnter={() => {
            hoverPauseRef.current = true;
          }}
          onMouseLeave={() => {
            hoverPauseRef.current = false;
          }}
        >
          <div id="hc-products-menu" className="hc-products-menu">
            <div className="hc-products-menu__visual">
              <div className="hc-products-menu__bg-wrap" aria-hidden>
                <div className="hc-products-menu__bg" />
              </div>

              <img
                key={selected.id}
                className="hc-products-menu__profile-img"
                src={imgSrc}
                alt=""
                loading="lazy"
                decoding="async"
                onError={() => setImgSrc(PROFILE_IMAGE_FALLBACK)}
              />
            </div>

            <FullOptionsList
              products={safeProducts}
              selectedId={selectedId}
              onSelect={setSelectedId}
            />
          </div>

          <div
            id="hc-product-panel"
            className="hc-products-menu__content"
            role="tabpanel"
            aria-labelledby={`hc-product-tab-${selected.id}`}
          >
            <div className="hc-products-menu__contentSurface">
              <header className="hc-products-menu__contentHead">
                <h3 className="hc-products-menu__contentTitle">{selected.title}</h3>
                {selected.subtitle ? (
                  <p className="hc-products-menu__contentSubtitle">{selected.subtitle}</p>
                ) : null}
              </header>

              {selected.bodyParagraphs && selected.bodyParagraphs.length > 0 ? (
                <div className="hc-products-menu__contentProse">
                  {selected.bodyParagraphs.map((para, index) => {
                    const isObject = typeof para === "object" && para !== null && "text" in para;
                    const text = isObject ? (para as { text: string }).text : (para as string);
                    const highlight = isObject && Boolean((para as { highlight?: boolean }).highlight);
                    return (
                      <p
                        key={index}
                        className={
                          highlight
                            ? "hc-products-menu__contentBody hc-products-menu__contentBody--highlight"
                            : "hc-products-menu__contentBody"
                        }
                      >
                        {text}
                      </p>
                    );
                  })}
                </div>
              ) : selected.body ? (
                <div className="hc-products-menu__contentProse">
                  <p className="hc-products-menu__contentBody">{selected.body}</p>
                </div>
              ) : null}

              {selected.bulletGroups && selected.bulletGroups.length > 0
                ? selected.bulletGroups.map((group, gi) => (
                    <div key={gi} className="hc-products-menu__contentBlock">
                      <h4 className="hc-products-menu__contentBlockTitle">{group.heading}</h4>
                      <ul className="hc-products-menu__contentList hc-products-menu__contentList--unordered">
                        {group.items.map((item, ii) => (
                          <li key={ii}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))
                : null}

              {selected.bullets && selected.bullets.length > 0 ? (
                <div className="hc-products-menu__contentHighlights">
                  <p
                    className="hc-products-menu__listKicker"
                    id={`hc-product-highlights-${selected.id}`}
                  >
                    Key points
                  </p>
                  <ol
                    className="hc-products-menu__contentList hc-products-menu__contentList--steps"
                    aria-labelledby={`hc-product-highlights-${selected.id}`}
                  >
                    {selected.bullets.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ol>
                </div>
              ) : null}

              {selected.closing ? (
                <p className="hc-products-menu__contentClosing">{selected.closing}</p>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function FullOptionsList({
  products,
  selectedId,
  onSelect,
  className,
}: {
  products: Product[];
  selectedId: string;
  onSelect: (id: string) => void;
  className?: string;
}) {
  const isTabsVariant = Boolean(className?.includes("hc-products-menu__full-options--tabs"));

  return (
    <div
      className={`hc-products-menu__full-options${className ? ` ${className}` : ""}`}
      style={
        isTabsVariant
          ? { gridTemplateColumns: `repeat(${Math.max(products.length, 1)}, minmax(0, 1fr))` }
          : undefined
      }
      role="tablist"
      aria-label="Product systems"
    >
      {products.map((p) => {
        const isActive = selectedId === p.id;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`hc-product-tab-${p.id}`}
            aria-selected={isActive}
            aria-controls="hc-product-panel"
            className={`hc-products-menu__full-option${isActive ? " is-active" : ""}`}
            onClick={() => onSelect(p.id)}
          >
            <h3 className="label">{p.shortLabel}</h3>
          </button>
        );
      })}
    </div>
  );
}
