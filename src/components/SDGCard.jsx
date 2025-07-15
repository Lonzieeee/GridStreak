import React from "react";
import "./SDGCard.css";

const SDGCard = ({ title, color, description, icon, flipped }) => {
  return (
    <div className={`sdg-card-flip ${flipped ? "flipped" : ""}`}>
      <div className="sdg-card-inner">
       
        <div className="sdg-card-front" style={{ backgroundColor: color }}>
          <img src={icon} alt={title} className="sdg-icon" />
          <h4 className="sdg-title-text">{title}</h4>
        </div>
        <div className="sdg-card-back">
          <p>{description}</p>
        </div>
      </div>
    </div>
  );
};

export default SDGCard;
