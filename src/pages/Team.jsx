import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import SEO from "../components/SEO";
import "./Team.css";


const TEAM_MEMBERS = [
  {
    name: "Faith Mwabe",
    role: "Mechanical Engineer",
    bio: "Engineers the mechanical backbone of GridStreak's thermal energy platform, designing the hardware that turns clean heat into reliable energy for homes, hospitals, and communities.",
    photo:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Faith%20Mwabe.jpeg",
  },
  {
    name: "Kombo Steve",
    role: "Computational Material Scientist",
    bio: "Models and optimizes the sand-based materials that let our thermal batteries store heat efficiently.",
    photo:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Kombo.jpeg",
  },
  {
    name: "Lorna Wanderi",
    role: "Software Engineer",
    bio: "Builds the software, controls, and monitoring tools that keep every GridStreak deployment connected.",
    photo:
      "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/Lonzieee.jpeg",
  },
];

const Team = () => {
  const prefersReducedMotion = useReducedMotion();

  const cardMotion = (index) => {
    if (prefersReducedMotion) return {};
    return {
      initial: { opacity: 0, x: 120 },
      whileInView: { opacity: 1, x: 0 },
      viewport: { once: true, amount: 0.3, margin: "0px 0px -80px 0px" },
      transition: {
        duration: 1.3,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2 + index * 0.75,
      },
    };
  };

  return (
    <>
      <SEO
        title="Our Team | GridStreak"
        description="Meet the team building GridStreak — engineers, operators, and advocates turning clean, reliable energy and water into reality."
        canonical="https://www.gridstreak.com/team"
      />

      <div className="team-page">
        <section className="team-hero" aria-label="Team hero">
          <div className="team-hero__content">
            <span className="team-hero__kicker">The People Behind GridStreak</span>
            <h1 className="team-hero__title">Meet the Team Powering Clean Energy in Africa</h1>
            <p className="team-hero__lead team-hero__lead--desktop">
              Engineers, scientists, and builders on a mission to deliver reliable energy,
              clean water, and real impact to the communities that need it most.
            </p>
            <p className="team-hero__lead team-hero__lead--mobile">
              Engineers and scientists building clean energy for Africa.
            </p>
          </div>
        </section>

        <section className="team-section" aria-label="Team members">
          <div className="team-grid" role="list">
            {TEAM_MEMBERS.map((member, index) => (
              <motion.article
                className="team-card"
                role="listitem"
                key={member.name}
                {...cardMotion(index)}
              >
                <div className="team-card__photo-wrap">
                  <img
                    className="team-card__photo"
                    src={member.photo}
                    alt={`${member.name}, ${member.role}`}
                    loading="lazy"
                  />
                </div>
                <h3 className="team-card__name">{member.name}</h3>
                <p className="team-card__role">{member.role}</p>
                <p className="team-card__bio">{member.bio}</p>
              </motion.article>
            ))}
          </div>
        </section>

      </div>
    </>
  );
};

export default Team;
