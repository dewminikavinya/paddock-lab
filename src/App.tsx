import { Navbar, scrollToSection } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { AboutSection } from './components/about';
import { ProductSpecs } from './ProductSpecs';
import { Team } from './components/team';
import { AICoaching } from './components/AICoaching';
import { TelemetrySimulator } from './components/TelemetrySimulator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import './App.css';

export default function App() {
  return (
    <>
      <Navbar />
      <main id="home">
        <HeroSection
          onExploreProduct={() => scrollToSection('product')}
          onTryAiCoach={() => scrollToSection('ai-coaching')}
        />
        <AboutSection />
        <ProductSpecs />
        <AICoaching />
        <TelemetrySimulator />
        <Team />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
