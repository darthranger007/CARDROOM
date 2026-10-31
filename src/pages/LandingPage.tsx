import { CTASection } from "../components/landing/CTASection";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { LandingSeo } from "../components/landing/LandingSeo";
import { TemplateShowcase } from "../components/landing/TemplateShowcase";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";
import { landingTitle, usePageMeta } from "../hooks/usePageMeta";
import { SITE_DESCRIPTION } from "../config/site";

export function LandingPage() {
  usePageMeta({
    title: landingTitle(),
    description: SITE_DESCRIPTION,
    path: "",
  });

  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header variant="dark" />
      <main>
        <Hero />
        <HowItWorks />
        <TemplateShowcase />
        <LandingSeo />
        <CTASection />
      </main>
      <Footer variant="dark" />
    </div>
  );
}
