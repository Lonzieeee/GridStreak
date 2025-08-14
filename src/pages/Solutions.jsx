import React from "react";
import SolutionsHero from "../components/Solutions/SolutionsHero";
import SolutionsGrid from "../components/Solutions/SolutionsGrid";

import SolutionsShowcase from "../components/Solutions/SolutionsShowcase";

const Solutions = () => {
  return (
    <>
      <SolutionsHero />
     <SolutionsGrid />
     <SolutionsShowcase />
     
     {/* <ProblemSolutionImpact /> */}
    </>
  );
};

export default Solutions;
