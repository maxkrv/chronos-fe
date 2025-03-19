import { AboutSection } from '../components/about-section';
import { CTASection } from '../components/cta-section';
import { FAQSection } from '../components/faq-section';
import { FeaturesSection } from '../components/features-section';
import { Header } from '../components/header';
import { HeroSection } from '../components/hero-section';

export const HomePage = () => {
  return (
    <div className="flex max-h-screen flex-col">
      <Header />
      <main className="flex-1 max-h-screen overflow-y-auto snap-y snap-proximity">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <FAQSection />
        <CTASection />
      </main>
    </div>
  );
};
