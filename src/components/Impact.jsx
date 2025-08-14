import React from "react";
import  "./Impact.css";
import {
 PieChart,
 Pie,
 Cell,
 Legend,
 Tooltip,

} from "recharts";

const data = [
    { name: "Plastic Waste to Energy", value:30},
    { name: "Decarbonization", value:35},
    { name: "Grid Stabilization", value:35},


];

const COLORS = ["#B0F222", "#f4f4ff","#F2F1DF"];



// The lables inside pie's
const renderCustomLabel = ({cx, cy, midAngle, innerRadius, outerRadius, percent}) => {
    const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) / 2;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
        <text
        x={x}
        y={y}
        fill="#0D0D0D"
        textAnchor="middle"
        dominantBaseline="central"
        fontWeight="bold"
        fontSize="16"
        >
              {`${(percent * 100).toFixed(0)}%`}

        </text>
    );
};
const renderLegend = () => {
  return (
    <ul className="custom-legend">
      {data.map((entry, index) => (
        <li key={index}>
          <span
            className="legend-color-box"
            style={{ backgroundColor: COLORS[index] }}
          ></span>
          {entry.name}
        </li>
      ))}
    </ul>
  );
};
function Impact() {
    return (
        <section className="impact-pie-section">
            <h2>GridStreak's Circular Impact</h2>

            <div className="impact-chart-wrapper">

            <PieChart width={600} height={400}>
                <Pie
                data={data}
                cx={200}
                cy={200}
                innerRadius={0}
                outerRadius={150}
                // fill="#8884d8"
                dataKey="value"
                label={renderCustomLabel}
                labelLine={false}
                
                 stroke="#0D0D0D"
          strokeWidth={2}
        >
          {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
          ))}
          </Pie>
          <Tooltip/>

          
 <Legend content={renderLegend} />
            </PieChart>
           
            </div>
        </section>
    );
}
export default Impact






 





       
