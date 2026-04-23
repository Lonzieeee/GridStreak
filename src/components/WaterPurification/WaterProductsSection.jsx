import React from "react";
import {
  FaBolt,
  FaChargingStation,
  FaLeaf,
  FaRecycle,
  FaTint,
  FaUsers,
} from "react-icons/fa";
import HealthcareProductsSection from "../HospitalsClinics/HealthcareProductsSection";
import "../HospitalsClinics/HealthcareProductsSection.css";

const PROFILE_IMAGE_FALLBACK =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png";

const PRODUCTS = [
  {
    id: "nano",
    shortLabel: "Nano Water System",
    title: "GridStreak Nano Water System",
    subtitle: "Compact water heating & distillation — up to 100 L",
    sections: [
      {
        title: "Overview",
        text: "Portable system for reliable water heating and distilled drinking water in smaller sites, including homes, clinics, and remote community points.",
        icon: FaTint,
      },
      {
        title: "Water Impact",
        text: "Improves safe-water access for households, clinics, and remote community points where water quality is inconsistent or untreated.",
        icon: FaLeaf,
      },
      {
        title: "Scale",
        text: "Designed for small off-grid facilities and local daily demand profiles, with dependable output for routine household and hygiene use.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Delivers both clean distilled water and dependable hot water for hygiene, cleaning, and essential daily sanitation workflows.",
        icon: FaChargingStation,
      },
      {
        title: "Energy Input",
        text: "Runs on solar and stored thermal energy for stable operation in low-grid areas, reducing interruptions during weak-grid periods.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Ideal for underserved areas that need practical, easy-to-deploy clean-water systems with low operating complexity.",
        icon: FaRecycle,
      },
    ],
    body: "A portable, solar-powered unit that produces clean distilled drinking water and hot water for households, small clinics, and rural communities.",
    bullets: [
      "Ideal for households and small, off-grid clinics",
      "Distillation delivers safe drinking water from any source",
      "Runs on solar or stored thermal energy",
      "Plug-and-play install, minimal maintenance",
    ],
    closing: "Perfect for expanding clean-water access in underserved areas.",
    image: "/images/nano-placeholder.jpg",
  },
  {
    id: "chamber",
    shortLabel: "Circular Chamber",
    title: "GridStreak Circular Chamber",
    subtitle: "Plastic-waste-to-energy for integrated water systems",
    sections: [
      {
        title: "Overview",
        text: "Circular chamber that converts plastic waste into usable thermal energy for water systems, linking cleanup and service delivery in one loop.",
        icon: FaRecycle,
      },
      {
        title: "Environmental Impact",
        text: "Removes plastic from rivers, drains, and coastlines while reducing contamination pressure and improving local environmental resilience.",
        icon: FaLeaf,
      },
      {
        title: "Scale",
        text: "Deployable across river basins, drainage corridors, and coastal infrastructure zones where waste accumulation disrupts water access.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Feeds recovered thermal energy into water heating and distillation processes downstream to support continuous clean-water output.",
        icon: FaChargingStation,
      },
      {
        title: "Operational Value",
        text: "Combines waste cleanup with energy recovery to support resilient local water services and lower dependence on external fuel.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Strong fit for areas needing both environmental restoration and dependable clean-water heat for long-term service continuity.",
        icon: FaTint,
      },
    ],
    body: "A circular-economy unit that converts plastic waste into usable thermal energy powering water heating and distillation — while cleaning rivers, drains, and coastlines.",
    bullets: [
      "High-temperature conversion of plastic waste into thermal energy",
      "Deploys at river basins, coastal regions, and drainage systems",
      "Removes waste that causes flooding and water contamination",
      "Directly powers water heating and distillation downstream",
    ],
    closing: "Clean water + clean energy + cleaner environments in one system.",
    image: "/images/chamber-placeholder.jpg",
  },
  {
    id: "x",
    shortLabel: "X Water System",
    title: "GridStreak X Water System",
    subtitle: "Community-scale water heating & purification — up to 250 L",
    sections: [
      {
        title: "Overview",
        text: "Community-scale system for schools and institutions needing steady daily water output across classes, kitchens, and sanitation points.",
        icon: FaTint,
      },
      {
        title: "Water Impact",
        text: "Supports safe drinking water and hygiene outcomes in growing population centers where demand rises faster than supply infrastructure.",
        icon: FaLeaf,
      },
      {
        title: "Scale",
        text: "Built for mid-sized demand in schools, health posts, and community hubs, with predictable daily throughput.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Provides distilled water and reliable hot water through day-long service cycles for drinking, cleaning, and hygiene operations.",
        icon: FaChargingStation,
      },
      {
        title: "Energy Input",
        text: "Uses solar plus thermal storage to maintain water service even in unstable grids and during intermittent power windows.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Ideal where demand is rising and operators need scalable, low-interruption systems that can expand with community needs.",
        icon: FaRecycle,
      },
    ],
    body: "Designed for schools, growing communities, and small institutions needing dependable hot water and distilled drinking water throughout the day.",
    bullets: [
      "Distilled drinking water for institutional demand",
      "Reliable hot water for hygiene and sanitation",
      "Solar + thermal storage keeps flow steady off-grid",
      "Scalable to match rising demand",
    ],
    closing: "Ideal for schools, community hubs, and mid-sized facilities.",
    image: "/images/x-placeholder.jpg",
  },
  {
    id: "ultra",
    shortLabel: "Ultra Water System",
    title: "GridStreak Ultra Water System",
    subtitle: "High-capacity heating & distillation — up to 1000 L",
    sections: [
      {
        title: "Overview",
        text: "High-capacity industrial water system for continuous large-volume heating and distillation in mission-critical operations.",
        icon: FaChargingStation,
      },
      {
        title: "Water Impact",
        text: "Enables sustained safe-water and hot-water delivery for essential institutional operations with high reliability requirements.",
        icon: FaLeaf,
      },
      {
        title: "Scale",
        text: "Sized for hospitals, coastal towns, and large industrial demand profiles where outages and shortages carry major risk.",
        icon: FaUsers,
      },
      {
        title: "Service Scope",
        text: "Supports long service windows for high-demand municipal and institutional water needs across multiple departments and shifts.",
        icon: FaTint,
      },
      {
        title: "Energy Input",
        text: "High-efficiency thermal core supports continuous operation with robust solar integration and stable thermal retention over time.",
        icon: FaBolt,
      },
      {
        title: "Best Fit",
        text: "Best for mission-critical, high-throughput water networks requiring resilient infrastructure and long-term operational durability.",
        icon: FaRecycle,
      },
    ],
    body: "Industrial-scale water system engineered for hospitals, large communities, and coastal / industrial applications that require continuous, high-demand output.",
    bullets: [
      "Large-scale water heating and distilled water production",
      "Supports hospital wards, industrial processes, and municipal use",
      "Built for continuous, high-demand operation",
      "Long-life, high-efficiency thermal core",
    ],
    closing: "Built for hospitals, coastal towns, and industrial water networks.",
    image: "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/ultraaa.png",
  },
];

export default function WaterProductsSection({
  sectionTitle = "Our Water Energy Systems",
  headingId = "wp-products-heading",
  sectionId,
  products = PRODUCTS,
  imageOverride,
}) {
  return (
    <HealthcareProductsSection
      sectionId={sectionId}
      headingId={headingId}
      sectionTitle={sectionTitle}
      products={products}
      imageOverride={imageOverride ?? PROFILE_IMAGE_FALLBACK}
    />
  );
}
