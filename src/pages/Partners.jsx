import React from "react";
import SEO from "../components/SEO";
import PartnersHero from "../components/Partners/PartnersHero";
import CurrentPartners from "../components/Partners/CurrentPartners";
import WhyCollaborate from "../components/Partners/WhyCollaborate";
import PartnerTypes from "../components/Partners/PartnerTypes";
import PartnerOppoortunities from "../components/Partners/PartnershipOpportunities";
import PartnerCTA from "../components/Partners/PartnerCTA";

const Partners = () => {
  return (
    
    <>
      <SEO
        title="Partners | GridStreak"
        description="Partner with GridStreak to scale clean, reliable, and affordable thermal energy storage across communities, healthcare, agriculture, and industry."
        canonical="https://www.gridstreak.com/partners"
      />
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
