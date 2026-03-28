import React, { useEffect, useMemo, useState } from "react";
import "./HealthcareProductsSection.css";

/** Fallback when a product image is missing */
const PROFILE_IMAGE_FALLBACK =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Adobe%20Express%20-%20file.png";

type ProductBulletGroup = {
  heading: string;
  items: string[];
};

type Product = {
  id: string;
  shortLabel: string;
  title: string;
  /** Optional line under the product name */
  subtitle?: string;
  /** Single lead paragraph (use with or instead of bodyParagraphs) */
  body?: string;
  /** Multiple short paragraphs for clearer hierarchy */
  bodyParagraphs?: string[];
  /** Optional numbered points (shown when bulletGroups is absent) */
  bullets?: string[];
  /** Grouped lists with headings (takes precedence over bullets) */
  bulletGroups?: ProductBulletGroup[];
  /** Optional closing line */
  closing?: string;
  image: string;
};

const PRODUCTS: Product[] = [
  {
    id: "nano",
    shortLabel: "Nano Cartridge",
    title: "Nano Cartridge",
    subtitle: "Compact Energy for Small Clinics & Remote Facilities",
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

export default function HealthcareProductsSection() {
  const [selectedId, setSelectedId] = useState<string>(PRODUCTS[0].id);
  const [imgSrc, setImgSrc] = useState<string>(PRODUCTS[0].image);

  const selected = useMemo(
    () => PRODUCTS.find((p) => p.id === selectedId) ?? PRODUCTS[0],
    [selectedId],
  );

  useEffect(() => {
    setImgSrc(selected.image);
  }, [selected.image, selected.id]);

  return (
    <section className="hc-products-section" aria-labelledby="hc-products-heading">
      <h2 id="hc-products-heading" className="hc-products-section__title">
        Our Healthcare Energy Systems
      </h2>

      <div className="hc-products-app">
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

          <FullOptionsList selectedId={selectedId} onSelect={setSelectedId} />
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
                {selected.bodyParagraphs.map((para, index) => (
                  <p key={index} className="hc-products-menu__contentBody">
                    {para}
                  </p>
                ))}
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
    </section>
  );
}

function FullOptionsList({
  selectedId,
  onSelect,
}: {
  selectedId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="hc-products-menu__full-options" role="tablist" aria-label="Product systems">
      {PRODUCTS.map((p) => {
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
