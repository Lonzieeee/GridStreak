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
            GridStreak transforms plastic waste into clean thermal energy through
            a zero-waste process, powering portable sand “brick” batteries
            designed for scalable grid stabilization and community energy
            systems.
            <br /><br />
            Our carbon-negative solution empowers businesses and governments to
            balance grid frequency, eliminate fossil fuel backups, and divert
            plastic from landfills — all while cutting costs by 40%.
            <br /><br />
            As the only energy storage system integrating waste-to-energy
            pyrolysis, long period thermal storage, and instant grid response,
            we’re redefining how the world achieves zero-carbon grid resilience
            from small scale to large scale industrial use.
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
