import React from "react";

const waterProducts = [
  {
    name: "GridStreak Nano Water System",
    capacity: "Up to 100 litres",
    features: [
      "Compact water heating & distillation",
      "Clean drinking water through distillation",
      "Ideal for households, small clinics, rural communities",
      "Operates using solar or stored thermal energy",
    ],
  },
  {
    name: "GridStreak X Water System",
    capacity: "Up to 250 litres",
    features: [
      "Community water heating & purification",
      "Distilled drinking water and water heating",
      "Suitable for schools, communities, small institutions",
      "Reliable, scalable, efficient",
    ],
  },
  {
    name: "GridStreak Ultra Water System",
    capacity: "Up to 1000 litres",
    features: [
      "High-capacity water heating & distillation",
      "Large-scale water heating and distilled water production",
      "Ideal for hospitals, large communities, industrial applications",
      "Continuous, high-demand operation",
    ],
  },
];

const WaterProductsSection = () => (
  <section className="wp-section wp-products" id="wp-products-heading">
    <div className="wp-products__head">
      <h2>Our Water Energy Systems</h2>
      <p>GridStreak offers modular systems designed for different water needs and scales.</p>
    </div>
    <div className="wp-products__grid">
      {waterProducts.map((product, idx) => (
        <article className="wp-product-card" key={product.name}>
          <h3 className="wp-product-card__title">{product.name}</h3>
          <p className="wp-product-card__capacity">{product.capacity}</p>
          <ul className="wp-product-card__features">
            {product.features.map((feature, i) => (
              <li key={i}>{feature}</li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  </section>
);

export default WaterProductsSection;
