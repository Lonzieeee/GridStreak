import React from "react";
import "./ProcessFlow.css";
function ProcessFlow(){
    return (
        <section className="process-section">
            <h2>Our Process</h2>
            <div className="process-flow">
{/* inputs */}
                <div className="input-box" style={{top: "10%"}}> Excess Solar</div>

                 <div className="input-box" style={{top: "40%"}}> Geothermal Heat</div>

                 <div className="input-box" style={{top: "70%"}}> Plastic Pyrolysis</div>

                 {/* hermal Bricks */}

                 <div className="center-box">Thermal Bricks</div>

                 {/* arrow stabalization */}

                 <div className="arrow-horizontal">→</div>

                 {/* Diamond Stabilization */}

                 <div className="diamond-box">
                    <span>Stabilization Services</span>
                 </div>

                 {/* Outputs */}

                 <div className="output-box" style={{top: "10%"}}>Frequency Regulation</div>

                   <div className="output-box" style={{top: "40%"}}>Black Start Capacity</div>

                     <div className="output-box" style={{top: "70%"}}>Renewable Smoothing</div>

            </div>
        </section>
    );
}
export default ProcessFlow;