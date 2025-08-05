import React from "react";
import "./ProcessFlow.css";

function ProcessFlow() {
  return (
    <section className="process-section">
      <h2>Our process</h2>

      <div className="process-wrapper">
        <div className="process-container">
          {/* ARROWS */}
          <svg className="process-arrows">
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="7"
                refX="10"
                refY="3.5"
                orient="auto"
              >
                <polygon points="0 0, 10 3.5, 0 7" fill="#B0F222" />
              </marker>
            </defs>

            {/* Input to Thermal */}
            <path
              d="M140,40 Q230,40 300,160"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M140,160 Q230,160 300,160"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M140,280 Q230,280 300,160"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />

            {/* Thermal to Diamond */}
            <line
              x1="340"
              y1="172"
              x2="605"
              y2="172"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />

            {/* Diamond to Outputs */}
            <path
              d="M615,160 Q760,40 900,60"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />
            <line
              x1="615"
              y1="172"
              x2="900"
              y2="172"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />
            <path
              d="M615,160 Q760,280 900,292"
              className="arrow-line"
              markerEnd="url(#arrowhead)"
            />
          </svg>

          {/* INPUT SOURCES */}
          <div className="column-left">
            <div className="process-box" style={{ top: "20px" }}>
              Excess Solar
            </div>
          </div>

          <div className="column-left">
            <div className="process-box" style={{ top: "140px" }}>
              Geothermal Heat
            </div>
          </div>

          <div className="column-left">
            <div className="process-box" style={{ top: "260px" }}>
              Plastic Pyrolysis
            </div>
          </div>

          {/* THERMAL CENTER */}
          <div
            className="process-box center-box"
            style={{ top: "140px", left: "300px" }}
          >
            Thermal Bricks
          </div>

          {/* DIAMOND */}
          <div className="diamond-box" style={{ top: "109px", left: "630px" }}>
            <span>Stabilization Services</span>
          </div>

          {/* OUTPUTS */}
          <div className="column right">
            <div className="process-box" style={{ top: "20px", left: "900px" }}>
              Frequency Regulation
            </div>
          </div>

          <div className="column right">
            <div
              className="process-box"
              style={{ top: "147px", left: "900px" }}
            >
              Black Start Capacity
            </div>
          </div>

          <div className="column right">
            <div
              className="process-box"
              style={{ top: "265px", left: "900px" }}
            >
              Renewable Smoothing
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE VERTICAL FLOW */}
      <div className="process-mobile-vertical">
        <div className="mobile-container">
          {/* Mobile Arrows SVG */}
          <svg className="mobile-arrows">
            <defs>
              <marker
                id="mobile-arrowhead"
                markerWidth="8"
                markerHeight="6"
                refX="8"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 8 3, 0 6" fill="#B0F222" />
              </marker>
            </defs>

            {/* Input sources to thermal bricks - from top with updated positions */}
            <path
              d="M60,80 Q60,110 140,140"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />
            <path
              d="M190,80 L190,140"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />
            <path
              d="M320,80 Q320,110 240,140"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />

            {/* Thermal to diamond */}
            <line
              x1="190"
              y1="180"
              x2="190"
              y2="260"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />

            {/* Diamond to outputs with updated positions */}
            <path
              d="M145,340 Q60,380 60,420"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />
            <line
              x1="190"
              y1="340"
              x2="190"
              y2="420"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />
            <path
              d="M235,340 Q320,380 320,420"
              className="mobile-arrow-line"
              markerEnd="url(#mobile-arrowhead)"
            />
          </svg>

          {/* INPUT SOURCES - Now at the top with better spacing */}
          <div className="mobile-process-box" style={{ top: "20px", left: "10px" }}>
            Excess Solar
          </div>
          <div className="mobile-process-box" style={{ top: "20px", left: "140px" }}>
            Geothermal Heat
          </div>
          <div className="mobile-process-box" style={{ top: "20px", left: "270px" }}>
            Plastic Pyrolysis
          </div>

          {/* THERMAL CENTER */}
          <div className="mobile-process-box mobile-center-box" style={{ top: "140px", left: "140px" }}>
            Thermal Bricks
          </div>

          {/* DIAMOND */}
          <div className="mobile-diamond-box" style={{ top: "260px", left: "145px" }}>
            <span>Stabilization Services</span>
          </div>

          {/* OUTPUTS with better spacing */}
          <div className="mobile-process-box" style={{ top: "420px", left: "10px" }}>
            Frequency Regulation
          </div>
          <div className="mobile-process-box" style={{ top: "420px", left: "140px" }}>
            Black Start Capacity
          </div>
          <div className="mobile-process-box" style={{ top: "420px", left: "270px" }}>
            Renewable Smoothing
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProcessFlow;