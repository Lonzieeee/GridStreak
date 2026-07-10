import React, { useEffect, useRef, useState } from "react";
import "./HowItWorks.css";

function CaptureIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="20" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M20 4.5V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M20 30V35.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M4.5 20H10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M30 20H35.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M9 9L12.9 12.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M27.1 27.1L31 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M31 9L27.1 12.9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M12.9 27.1L9 31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function StoreIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 7L33 13.5L20 20L7 13.5L20 7Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 20.5L20 27L33 20.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M7 27.5L20 34L33 27.5" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

function DeliverIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M20 8V24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <path
        d="M24.5 19.5V8.5C24.5 6 22.5 4 20 4C17.5 4 15.5 6 15.5 8.5V19.5C13.9 20.8 13 22.9 13 25.2C13 29.1 16.1 32.2 20 32.2C23.9 32.2 27 29.1 27 25.2C27 22.9 26.1 20.8 24.5 19.5Z"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinejoin="round"
      />
      <circle cx="20" cy="25.4" r="2.7" fill="currentColor" />
      <path d="M28.8 12.2H32.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M28.8 17.2H31" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function ImpactIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <path d="M31 8.5C24.5 8.5 17 11.2 12.8 16.1C8.8 20.8 8.7 27.1 12.3 30.7C15.9 34.3 22.3 34.2 27 30.2C31.8 26 34.5 18.5 34.5 12V8.5H31Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M13 31L21 23" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16.5 19.5C19.4 19.5 22.1 18.3 24 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const processSteps = [
  {
    id: "capture",
    title: "Capture",
    description: "Energy is captured from solar, geothermal, the grid, or waste sources.",
    icon: CaptureIcon,
    accent: "capture",
  },
  {
    id: "store",
    title: "Store",
    description: "Heat is stored in sand-based bricks for hours to days.",
    icon: StoreIcon,
    accent: "store",
  },
  {
    id: "deliver",
    title: "Deliver",
    description: "Consistent, high-quality thermal energy is released on demand.",
    icon: DeliverIcon,
    accent: "deliver",
  },
  {
    id: "impact",
    title: "Impact",
    description: "Reliable heat supports cooking, water, healthcare, and industry.",
    icon: ImpactIcon,
    accent: "impact",
  },
];

function HowItWorks() {
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.2, rootMargin: "0px" },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`how-works ${isInView ? "is-inview" : ""}`}
      aria-labelledby="how-works-title"
    >
      <div className="how-works__inner">
        <header className="how-works__header">
          <p className="how-works__eyebrow">How It Works</p>
          <h2 id="how-works-title">Powerful performance.</h2>
          <p className="how-works__lede">
            We capture energy as heat, store it in sand-based bricks, and release it where and when it is needed most.
          </p>
        </header>

        <div className="how-works__rail" role="list" aria-label="GridStreak energy flow">
          {processSteps.map((step, index) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.id}>
                <article
                  className="how-works__card"
                  data-accent={step.accent}
                  style={{ "--card-delay": `${[0, 2.7, 5.7, 8.7][index]}s` }}
                  role="listitem"
                >
                  <div className="how-works__icon-wrap" aria-hidden="true">
                    <Icon className="how-works__icon" />
                  </div>
                  <h3>
                    <span>{index + 1}.</span> {step.title}
                  </h3>
                  <p>{step.description}</p>
                </article>

                {index < processSteps.length - 1 ? (
                  <div
                    className="how-works__connector"
                    data-tone={index === 0 ? "green" : index === 1 ? "shift" : "orange"}
                    style={{ "--conn-delay": `${index * 3}s` }}
                    aria-hidden="true"
                  >
                    <svg className="how-works__connector-svg" viewBox="0 0 126 32" fill="none">
                      <path className="how-works__connector-outline" d="M4 16 H104" />
                      <path className="how-works__connector-outline" d="M92 6 L104 16 L92 26" />
                      <path className="how-works__connector-flow" d="M4 16 H104" />
                      <path className="how-works__connector-flow" d="M92 6 L104 16 L92 26" />
                    </svg>
                  </div>
                ) : null}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
