import React from "react";
import "./ProcessFlow.css"

function ProcessFlow () {
    return (
        <section className="process-section">
            <h2>Our process</h2>
            <div className="process-wrapper">
                <div className="process-container">
                    {/* ARRROWS */}
                    <svg className="process-arrows">
            <defs>
              <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
                <polygon points="0 0, 10 3.5, 0 7" fill="#B0F222" />
              </marker>
            </defs>

            {/* thermal */}
 <path d="M140,40 Q230,40 300,160" className="arrow-line" markerEnd="url(#arrowhead)" />
            <path d="M140,160 Q230,160 300,160" className="arrow-line" markerEnd="url(#arrowhead)" />
            <path d="M140,280 Q230,280 300,160" className="arrow-line" markerEnd="url(#arrowhead)" />
  {/* thrmal to diamond */}
            <line x1="340" y1="172" x2="605" y2="172" className="arrow-line" markerEnd="url(#arrowhead)" />

            {/* the arrows from diamond to ouyputs */}
            <path d="M615,160 Q760,40 900,60" className="arrow-line" markerEnd="url(#arrowhead)" />
            <line x1="615" y1="172" x2="900" y2="172" className="arrow-line" markerEnd="url(#arrowhead)" />

            <path d="M615,160 Q760,280 900,292" className="arrow-line" markerEnd="url(#arrowhead)" />
            {/* <path d="M615,160 Q740,270 850,292" className="arrow-line" markerEnd="url(#arrowhead)" /> */}

          </svg>

          {/* Input Sources */}

          <div className="column-left">
            <div className="process-box" style={{top: "20px"}}>Excess Solar</div>
          </div>

          <div className="column-left">
            <div className="process-box" style={{top: "140px"}}>Geothermal Heat</div>
          </div>

          <div className="column-left">
            <div className="process-box" style={{top: "260px"}}>Plastic Pyrolysis</div>
          </div>
            
            {/* THERMAL */}

            <div className="process-box center-box" style={{top: "140px", left: "300px"}}>
                Thermal Bricks
            </div>

            {/* DIAMOND */}

            <div className="diamond-box" style={{top: "109px", left: "630px"}}>
                <span>Stabilization Services</span>
            </div>

            {/* OUTPUT SERVICES */}

            <div className="column right">
                <div className="process-box" style={{top : "20px", left: "900px"}}>Frequency Regulation</div>
            </div>

             <div className="column right">
                <div className="process-box" style={{top : "147px", left: "900px"}}>Black Start Capacity</div>
            </div>

             <div className="column right">
                <div className="process-box" style={{top : "265px", left: "900px"}}>Renewable Smoothing</div>
            </div>



                </div>
            </div>
        </section>




    );

    
}

export default ProcessFlow;