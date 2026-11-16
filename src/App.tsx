import { useState } from "react";
import "./App.css";
import { Navbar } from "./components/navbar";
import { HeroSection } from "./components/hero-section";
import { AboutSection } from "./components/about";
import { Team } from "./components/team";

function App() {
  const [showFigmaBar, setShowFigmaBar] = useState(false);

  function scrollToSection(sectionId: string) {
    const section = document.getElementById(sectionId);

    if (!section) {
      console.warn(`Cannot scroll to missing section "${sectionId}".`);
      return;
    }

    section.scrollIntoView({ behavior: "smooth" });
  }

  return (
    <div>
      <Navbar
        onFigmaToolClick={() => setShowFigmaBar((isVisible) => !isVisible)}
        showFigmaBar={showFigmaBar}
      />
      <HeroSection
        onExploreProduct={() => scrollToSection("product")}
        onTryAiCoach={() => scrollToSection("ai-coaching")}
      />
      <AboutSection />
      <Team />
      
    </div>
  );
}

export default App;