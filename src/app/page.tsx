import { SiteHeader } from "@/components/site-header";
import { HeroSection } from "@/components/marketing/HeroSection";
import { TrustBar } from "@/components/marketing/TrustBar";
import { FeaturesSection } from "@/components/marketing/FeaturesSection";
import { VirtualCardsSection } from "@/components/marketing/VirtualCardsSection";
import { SavingsSection } from "@/components/marketing/SavingsSection";
import { BusinessSection } from "@/components/marketing/BusinessSection";
import { HowItWorksSection } from "@/components/marketing/HowItWorksSection";
import { StatsSection } from "@/components/marketing/StatsSection";
import { TestimonialsSection } from "@/components/marketing/TestimonialsSection";
import { CTASection } from "@/components/marketing/CTASection";
import { MarketingFooter } from "@/components/marketing/MarketingFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-text font-body antialiased">
      <SiteHeader />
      <HeroSection />
      <TrustBar />
      <FeaturesSection />
      <VirtualCardsSection />
      <SavingsSection />
      <BusinessSection />
      <HowItWorksSection />
      <StatsSection />
      <TestimonialsSection />
      <CTASection />
      <MarketingFooter />
    </div>
  );
}