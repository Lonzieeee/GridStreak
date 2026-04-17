import React from "react";
import "./WhoWeAre.css";
import EnergyModel from "./EnergyModel";

function WhoWeAre() {
  return (
    <section className="who-we-are">
      <div className="who-wrapper">
        <div className="who-text">
          <h2>Who We Are</h2>
          <p>
            GridStreak is a thermal energy storage startup developing long-duration, sand-based "brick" batteries
            that deliver safe, affordable, and reliable energy across household, healthcare, agricultural, industrial,
            and emergency applications.
            <br /><br />
            Our advanced systems store energy from solar energy, geothermal energy, off-peak grid electricity, and
            co-pyrolysis, converting it into consistent thermal power for real-world use. GridStreak enables clean
            cooking, water heating, medical sterilization, vaccine and drug cold-chain stability, agricultural
            processing, and industrial heat applications, making it a versatile solution for both off-grid and grid-
            connected environments.
          </p>
        </div>

        <div className="who-visual">
          <EnergyModel />
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
