import React from "react";
import PartnersHero from "../components/Partners/PartnersHero";
import CurrentPartners from "../components/Partners/CurrentPartners";
import WhyCollaborate from "../components/Partners/WhyCollaborate";
import PartnerTypes from "../components/Partners/PartnerTypes";
import PartnerOppoortunities from "../components/Partners/PartnershipOpportunities";
import PartnerCTA from "../components/Partners/PartnerCTA";

const Partners = () => {
  return (
    <>
      <PartnersHero />
      <CurrentPartners />
      <WhyCollaborate />
      <PartnerTypes />
        <PartnerOppoortunities />
        <PartnerCTA />
     
    </>
  );
};

export default Partners;
