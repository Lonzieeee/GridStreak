import React from "react";
import "./WhoWeAre.css";

function WhoWeAre() {
  return (
    <section className="who-we-are">
      <div className="who-wrapper">
        <div className="who-text">
          <h2>Who We Are</h2>
          <p>
            GridStreak pioneers clean energy grid stabilization through our
            innovative thermal brick technology that converts plastic waste into
            renewable energy storage.
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
   
          <div className="visual-box">🌱</div>
        </div>
      </div>
    </section>
  );
}

export default WhoWeAre;
