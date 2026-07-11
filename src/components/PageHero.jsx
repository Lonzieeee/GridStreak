import React from "react";
import { Link } from "react-router-dom";
import "./PageHero.css";

export default function PageHero({
  kicker,
  title,
  description,
  image,
  accent = "#b0f222",
  align = "left",
  children,
  primaryCta,
  secondaryCta,
}) {
  return (
    <section
      className={`page-hero page-hero--${align}`}
      style={{
        "--hero-image": image ? `url(${image})` : undefined,
        "--hero-accent": accent,
      }}
    >
      <div className="page-hero__overlay" aria-hidden="true" />
      <div className="page-hero__content">
        {kicker && <p className="page-hero__kicker">{kicker}</p>}
        <h1 className="page-hero__title">{title}</h1>
        {description && <p className="page-hero__lead">{description}</p>}
        {(primaryCta || secondaryCta) && (
          <div className="page-hero__actions">
            {primaryCta && (
              <Link to={primaryCta.to} className="page-hero__btn page-hero__btn--primary">
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link to={secondaryCta.to} className="page-hero__btn page-hero__btn--secondary">
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
        {children}
      </div>
    </section>
  );
}
