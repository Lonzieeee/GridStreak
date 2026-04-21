import React, { useEffect, useMemo, useState } from "react";
import "../HospitalsClinics/HealthcareProductsSection.css";

const PROFILE_IMAGE_FALLBACK =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png";

const PRODUCTS = [
  {
    id: "nano",
    shortLabel: "Nano Water System",
    title: "GridStreak Nano Water System",
    subtitle: "Compact water heating & distillation — up to 100 L",
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
  const safeProducts = products.length > 0 ? products : PRODUCTS;
  const [selectedId, setSelectedId] = useState(safeProducts[0].id);
  const [imgSrc, setImgSrc] = useState(imageOverride ?? safeProducts[0].image);

  const selected = useMemo(
    () => safeProducts.find((p) => p.id === selectedId) ?? safeProducts[0],
    [safeProducts, selectedId],
  );

  useEffect(() => {
    setSelectedId(safeProducts[0].id);
  }, [safeProducts]);

  useEffect(() => {
    setImgSrc(imageOverride ?? selected.image);
  }, [imageOverride, selected.image, selected.id]);

  return (
    <section
      id={sectionId}
      className="hc-products-section"
      aria-labelledby={headingId}
    >
      <h2 id={headingId} className="hc-products-section__title">
        {sectionTitle}
      </h2>

      <div className="hc-products-app">
        <div id="wp-products-menu" className="hc-products-menu">
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
          id="wp-product-panel"
          className="hc-products-menu__content"
          role="tabpanel"
          aria-labelledby={`wp-product-tab-${selected.id}`}
        >
          <div className="hc-products-menu__contentSurface">
            <header className="hc-products-menu__contentHead">
              <h3 className="hc-products-menu__contentTitle">{selected.title}</h3>
              {selected.subtitle ? (
                <p className="hc-products-menu__contentSubtitle">{selected.subtitle}</p>
              ) : null}
            </header>

            {selected.body ? (
              <div className="hc-products-menu__contentProse">
                <p className="hc-products-menu__contentBody">{selected.body}</p>
              </div>
            ) : null}

            {selected.bullets && selected.bullets.length > 0 ? (
              <div className="hc-products-menu__contentHighlights">
                <p
                  className="hc-products-menu__listKicker"
                  id={`wp-product-highlights-${selected.id}`}
                >
                  Key points
                </p>
                <ol
                  className="hc-products-menu__contentList hc-products-menu__contentList--steps"
                  aria-labelledby={`wp-product-highlights-${selected.id}`}
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
    </section>
  );
}

function FullOptionsList({ products, selectedId, onSelect }) {
  return (
    <div className="hc-products-menu__full-options" role="tablist" aria-label="Water systems">
      {products.map((p) => {
        const isActive = selectedId === p.id;
        return (
          <button
            key={p.id}
            type="button"
            role="tab"
            id={`wp-product-tab-${p.id}`}
            aria-selected={isActive}
            aria-controls="wp-product-panel"
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
