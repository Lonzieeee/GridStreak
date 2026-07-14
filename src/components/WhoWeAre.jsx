import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import Splitting from "splitting";
import "splitting/dist/splitting.css";
import "./WhoWeAre.css";

const WHO_WE_ARE_BG = "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/footer-bg-5.jpg";
const WHO_WE_ARE_IMAGE =
  "https://pub-4cadfb4c0ebc41a9bdd57aa74b8bd719.r2.dev/image-removebg-preview.png";

function WhoWeAre() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const image = imageRef.current;
    if (!section || !heading || !image) return undefined;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.matchMedia("(max-width: 700px)").matches;

    if (!prefersReducedMotion && !heading.classList.contains("splitting")) {
      Splitting({ target: heading, by: "lines" });
    }
    if (!isMobile) image.style.visibility = "visible";

    const lineTargets = [...heading.querySelectorAll("span")];
    const fadeupTargets = isMobile ? lineTargets : [...lineTargets, image];

    if (prefersReducedMotion) {
      heading.style.visibility = "visible";
      if (!isMobile) image.style.visibility = "visible";
      return undefined;
    }

    let tl = null;
    const resetTargets = () => {
      fadeupTargets.forEach((target) => {
        gsap.set(target, { autoAlpha: 0, y: 80, skewY: 16 });
        target.style.visibility = "hidden";
      });
    };

    resetTargets();

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          tl?.kill();
          tl = gsap.timeline({ defaults: { ease: "power3.out" } });
          tl.set(fadeupTargets, { visibility: "visible" });
          tl.fromTo(
            fadeupTargets,
            { y: 200, skewY: 40, autoAlpha: 0 },
            {
              duration: 1.5,
              y: 0,
              skewY: 0,
              autoAlpha: 1,
              stagger: 0.1,
              overwrite: "auto",
            },
          );
        } else {
          tl?.kill();
          resetTargets();
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.28 },
    );

    observer.observe(section);

    return () => {
      tl?.kill();
      observer.disconnect();
    };
  }, []);

  return (
    <section className="who-we-are" aria-labelledby="who-we-are-heading" ref={sectionRef}>
      <div className="who-we-are__shell">
        <div className="who-we-are__grid">
          <div className="who-we-are__copy item-1">
            <p className="who-we-are__eyebrow">Who We Are</p>
            <h2 id="who-we-are-heading" ref={headingRef} data-splitting="lines">
              Thermal energy storage built for real-world impact
            </h2>
            <p className="who-we-are__body">
              GridStreak is a thermal energy storage startup developing long-duration, sand-based brick batteries
              that deliver safe, affordable, and reliable energy across household, healthcare, agricultural, industrial,
              and emergency applications.
            </p>
            <p className="who-we-are__body">
              Our systems store energy from solar, geothermal, off-peak grid electricity, and co-pyrolysis, converting it
              into consistent thermal power for clean cooking, water heating, medical sterilization, cold-chain
              stability, agricultural processing, and industrial heat.
            </p>
          </div>

          <div className="who-we-are__media item-2">
            <img
              ref={imageRef}
              src={WHO_WE_ARE_IMAGE}
              alt="Stacked GridStreak modular thermal units with company branding."
              loading="eager"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
