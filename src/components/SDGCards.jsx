import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import SDGCard from "./SDGCard";
import "./SDGCard.css";

import sdg7Icon from "../assets/sdg7-energy.png";
import sdg13Icon from "../assets/sdg13-climate.png";
import sdg3Icon from "../assets/sdg3-health.png";
import sdg8Icon from "../assets/sdg8-work.png";
import sdg12Icon from "../assets/sdg12-recycle.png";

const sdgData = [
  {
    title: "SDG 7: Affordable Clean Energy",
    color: "#fbc412",
    icon: sdg7Icon,
    description:
      "GridStreak enables access to clean, safe, and affordable energy in underserved communities through innovative thermal battery technology.",
  },
  {
    title: "SDG 13: Climate Action",
    color: "#3f7e44",
    icon: sdg13Icon,
    description:
      "Our solution reduces deforestation and CO₂ emissions by replacing firewood with carbon-negative thermal storage.",
  },
  {
    title: "SDG 3: Good health and well-being",
    color: "#4c9f38",
    icon: sdg3Icon,
    description:
      "Clean cooking reduces indoor air pollution, improving respiratory health especially for women and children.",
  },
  {
    title: "SDG 8: Decent Work & Economic Growth",
    color: "#a21942",
    icon: sdg8Icon,
    description:
      "We create jobs through local manufacturing and system deployment while boosting farmer incomes through cold storage.",
  },
  {
    title: "SDG 12: Responsible Consumption & Production",
    color: "#bf8b2e",
    icon: sdg12Icon,
    description:
      "GridStreak promotes circularity by turning plastic waste into energy storage, supporting sustainable resource use.",
  },
];

const SDGCards = () => {
  const location = useLocation();
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (location?.state?.expandSDGIndex !== undefined) {
      setExpandedIndex(location.state.expandSDGIndex);
    }
  }, [location]);

  return (
    <div className="sdg-section" id="sdg-section">
      <h2 className="sdg-title">Our Contribution To a Better World</h2>
      <div className="sdg-card-container">
        {sdgData.map((sdg, index) => {
          const rotation = (index - (sdgData.length - 1) / 2) * 12;
          return (
            <SDGCard
              key={index}
              title={sdg.title}
              color={sdg.color}
              icon={sdg.icon}
              description={sdg.description}
              isExpanded={expandedIndex === index}
              onClick={() =>
                setExpandedIndex(index === expandedIndex ? null : index)
              }
              style={{
                transform: `translateX(-50%) rotate(${rotation}deg) ${
                  expandedIndex === index ? "scale(1.1)" : ""
                }`,
                zIndex: expandedIndex === index ? 10 : index,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SDGCards;
