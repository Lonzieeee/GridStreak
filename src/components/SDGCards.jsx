import React, { useState, useEffect } from "react";
import "./SDGCard.css";
import sdg7Icon from "../assets/sdg7-energy.png";
import sdg13Icon from "../assets/sdg13-climate.png";
import sdg3Icon from "../assets/sdg3-health.png";
import sdg8Icon from "../assets/sdg8-work.png";
import sdg12Icon from "../assets/sdg12-recycle.png";
import SDGCard from "./SDGCard";

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
  const [flippedIndexes, setFlippedIndexes] = useState(new Array(sdgData.length).fill(false));

  useEffect(() => {
    let currentIndex = 0;

    const flipSequentially = () => {
      
      setFlippedIndexes((prev) => {
        const updated = [...prev];
        updated[currentIndex] = true;
        return updated;
      });

      setTimeout(() => {
      
        setFlippedIndexes((prev) => {
          const updated = [...prev];
          updated[currentIndex] = false;
          return updated;
        });

       
        setTimeout(() => {
          currentIndex = (currentIndex + 1) % sdgData.length;
          flipSequentially();
        }, 2000);
      }, 5000);
    };

    flipSequentially();
  }, []);

  return (
    <div className="sdg-section-wrapper">
      <h2 className="sdg-title-outside">Our Contribution To a Better World</h2>

      <div className="sdg-section" id="sdg-section">
        <div className="sdg-card-layout">
          <div className="top-row">
            <SDGCard {...sdgData[0]} flipped={flippedIndexes[0]} />
            <SDGCard {...sdgData[1]} flipped={flippedIndexes[1]} />
          </div>
          <div className="center-row">
            <SDGCard {...sdgData[2]} flipped={flippedIndexes[2]} />
          </div>
          <div className="bottom-row">
            <SDGCard {...sdgData[3]} flipped={flippedIndexes[3]} />
            <SDGCard {...sdgData[4]} flipped={flippedIndexes[4]} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SDGCards;
