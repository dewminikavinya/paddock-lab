import { Navbar } from './components/navbar';
import { HeroSection } from './components/hero-section';
import { AboutSection } from './components/about';
import { Team } from './components/team';
import { AICoaching } from './components/AICoaching';
import { TelemetrySimulator } from './components/TelemetrySimulator';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import './App.css';

function scrollToSection(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}

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
        <AICoaching />
        <TelemetrySimulator />
        <Team />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
