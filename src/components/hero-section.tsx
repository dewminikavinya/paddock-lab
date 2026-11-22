import { ArrowRight, Sparkles, Compass } from "lucide-react";
import { lazy, Suspense } from "react";
import "./hero.css";

const ModelViewer = lazy(() => import("./ModelViewer"));

interface HeroSectionProps {
  onExploreProduct: () => void;
  onTryAiCoach: () => void;
}

export function HeroSection({
  onExploreProduct,
  onTryAiCoach,
}: HeroSectionProps) {
  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="hero-container">
        {/* Introduction */}
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-dot" aria-hidden="true" />
            <span>PADDOCK LABS //</span>
            <strong>NEXT-GEN KARTING</strong>
          </div>

          <h1 id="hero-title">
            The kart telemetry device that{" "}
            <span>coaches you</span> to the podium.
          </h1>

          <p className="hero-description">
            Go beyond the stopwatch. 
            Discover the science behind every lap with intelligent kart telemetry,
            detailed performance analysis, and personalized driver coaching. 
            Transform real-time measurements into meaningful insights and make every session count.
          </p>

          <div className="hero-pilot">
            <Compass size={18} aria-hidden="true" />

            <p>
              <strong>Target Pilot:</strong> Sodi RT10 V2
              at SpeedBay International Circuit 
            </p>
          </div>

          {/* Main action buttons */}
          <div className="hero-buttons">
            <button
              type="button"
              className="hero-primary-button"
              onClick={onExploreProduct}
            >
              Discover Paddock Unit
              <ArrowRight size={16} aria-hidden="true" />
            </button>

            <button
              type="button"
              className="hero-secondary-button"
              onClick={onTryAiCoach}
            >
              <Sparkles size={16} aria-hidden="true" />
              Test AI Coach Simulator
            </button>
          </div>
         
        </div>

        {/* Interactive kart */}
        <div className="hero-kart">
          <Suspense fallback={<div className="model-loading" role="status">Loading 3D kart viewer…</div>}>
            <ModelViewer />
          </Suspense>

          <div className="hero-kart-caption">
            <p>
              <span className="hero-dot" aria-hidden="true" />
              Interactive kart model · drag to rotate, scroll to zoom
            </p>

            <span className="hero-kart-model">
              Sodi RT10 V2 Setup
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
