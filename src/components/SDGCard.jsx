import React from "react";
import "./SDGCard.css";

const SDGCard = ({ title, color, description, icon, isExpanded, onClick, style }) => {
  return (
    <div
      className={`sdg-card ${isExpanded ? "expanded" : ""}`}
      style={{ borderColor: color, ...style }}
      onClick={onClick}
    >
      <div className="sdg-card-header" style={{ backgroundColor: color }}>
        <img src={icon} alt={title} className="sdg-icon" />
        <h4 className="sdg-title-text">{title}</h4>
      </div>

      {isExpanded && (
        <div className="sdg-card-body">
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default SDGCard;
