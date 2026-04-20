import React from "react";

const impacts = [
  {
    value: "-",
    title: "Reduced diesel use in water systems",
  },
  {
    value: "-",
    title: "Lower CO₂ emissions",
  },
  {
    value: "-",
    title: "Removal of plastic waste from waterways",
  },
  {
    value: "-",
    title: "Sustainable production of clean drinking water",
  },
];

const ImpactSection = () => (
  <section className="wp-section wp-impact" id="impact">
    <div className="wp-impact__head">
      <p className="wp-impact__eyebrow">Environmental & Climate Impact</p>
      <h2 className="wp-impact__title">
        Measurable <span className="handUnderline">Impact in Water Systems</span>
      </h2>
      <p className="wp-impact__lead">GridStreak delivers measurable sustainability benefits for water access and the environment.</p>
    </div>
    <div className="wp-impact__grid" role="list" aria-label="Water impact highlights">
      {impacts.map((impact, idx) => (
        <article className="wp-impact-card" role="listitem" key={impact.title}>
          <p className="wp-impact-card__value">{impact.value}</p>
          <p className="wp-impact-card__title">{impact.title}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ImpactSection;
