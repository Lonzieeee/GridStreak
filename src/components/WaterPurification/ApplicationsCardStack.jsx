import React from "react";

const applications = [
  {
    title: "Clean Drinking Water Production",
    desc: "Provide safe, distilled drinking water for households and communities.",
  },
  {
    title: "Water Heating & Sanitation",
    desc: "Enable reliable hot water for homes, schools, healthcare, and hygiene systems.",
  },
  {
    title: "Coastal & Marine Water Systems",
    desc: "Convert saltwater into drinking water and support coastal/island communities.",
  },
  {
    title: "Water System Resilience",
    desc: "Ensure continuous operation in off-grid, disaster, and water-stressed regions.",
  },
];

const ApplicationsCardStack = () => (
  <section className="wp-section wp-applications">
    <div className="wp-applications__head">
      <h2>Applications across Water Systems</h2>
      <p>GridStreak supports a wide range of water use cases:</p>
    </div>
    <div className="wp-applications__grid">
      {applications.map((app, idx) => (
        <article className="wp-app-card" key={app.title}>
          <h3 className="wp-app-card__title">{app.title}</h3>
          <p className="wp-app-card__desc">{app.desc}</p>
        </article>
      ))}
    </div>
  </section>
);

export default ApplicationsCardStack;
