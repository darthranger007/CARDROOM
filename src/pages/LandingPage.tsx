import { CTASection } from "../components/landing/CTASection";
import { Hero } from "../components/landing/Hero";
import { HowItWorks } from "../components/landing/HowItWorks";
import { TemplateShowcase } from "../components/landing/TemplateShowcase";
import { Footer } from "../components/layout/Footer";
import { Header } from "../components/layout/Header";

export function LandingPage() {
  return (
    <div className="min-h-screen bg-bg text-fg">
      <Header variant="dark" />
      <main>
        <Hero />
        <HowItWorks />
        <TemplateShowcase />
        <CTASection />
      </main>
      <Footer variant="dark" />
    </div>
  );
}
