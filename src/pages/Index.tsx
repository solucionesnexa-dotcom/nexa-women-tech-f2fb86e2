import HeroSection from "@/components/landing/HeroSection";
import ProblemSection from "@/components/landing/ProblemSection";
import WhatIsNexaSection from "@/components/landing/WhatIsNexaSection";
import RutaSection from "@/components/landing/RutaSection";
import CommunitySection from "@/components/landing/CommunitySection";
import FounderBenefitsSection from "@/components/landing/FounderBenefitsSection";
import ManifestoSection from "@/components/landing/ManifestoSection";
import CtaSection from "@/components/landing/CtaSection";
import LandingFooter from "@/components/landing/LandingFooter";

const Index = () => (
  <div className="min-h-screen bg-background">
    <HeroSection />
    <ProblemSection />
    <WhatIsNexaSection />
    <RutaSection />
    <CommunitySection />
    <FounderBenefitsSection />
    <ManifestoSection />
    <CtaSection />
    <LandingFooter />
  </div>
);

export default Index;
