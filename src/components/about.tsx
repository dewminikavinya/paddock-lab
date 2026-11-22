import { Flag } from "lucide-react";
import "./about.css";

interface UserPersona {
  role: string;
  need: string;
  benefit: string;
}

const personas: UserPersona[] = [
  {
    role: "Beginner Drivers",
    need: "Overwhelmed by raw graphs and complex CSV logs.",
    benefit:
      "A clean session summary with at most two achievable practice targets.",
  },
  {
    role: "Regular Amateur Racers",
    need: "Stuck on lap time plateaus without knowing where time is lost.",
    benefit:
      "Aligned lap comparisons and repeatable gains through key corner sequences.",
  },
  {
    role: "Coaches & Instructors",
    need: "Relying on subjective visual judgment from track sidelines.",
    benefit:
      "Objective sensor measurements supporting driver debriefs with annotation tools.",
  },
  {
    role: "Track Operators & Fleets",
    need: "Cannot afford complex wiring or session delays.",
    benefit:
      "90-second removable installation, driver-kart pairing, and low-disruption workflow.",
  },
];

export function AboutSection() {
  return (
    <section
      id="about-us"
      className="about"
      aria-labelledby="about-title"
    >
      <div className="about-container">
        <div className="about-top">
          {/* Project background */}
          <div className="about-content">
            <div className="about-badge">
              <span className="about-dot" aria-hidden="true" />
              ABOUT PADDOCK LABS
            </div>

            <h2 id="about-title">
              Democratizing Karting Telemetry in Sri Lanka.
            </h2>

            <p className="about-description">
              During field interviews with local racers, we confirmed
              that Sri Lankan karting teams still rely on{" "}
              <strong>manual pen and paper lap sheets</strong>.
              High end systems like AiM MyChron or Garmin Catalyst
              remain cost prohibitive for grassroots drivers.
            </p>

            <p className="about-details">
              Lap times alone cannot explain corner by corner losses
              or driver inputs. Paddock Labs was developed to bridge
              that gap by combining accessible embedded hardware with
              personalized, evidence grounded AI coaching so every
              driver can find their competitive edge.
            </p>
          </div>

          {/* Project vision */}
          <div className="about-vision">
            <div className="about-vision-heading">
              <div className="about-vision-icon">
                <Flag size={20} aria-hidden="true" />
              </div>

              <div>
                <h3>Vision for Driver Development</h3>
                <p>Data Informed Training Culture</p>
              </div>
            </div>

            <p className="about-vision-description">
              Progress should extend beyond recording basic lap times
              to understanding how a driver performs through each
              corner and what specific habit to adjust next. Our
              mission is to make data informed coaching accessible
              to every ambitious racer.
            </p>

            <dl className="about-pilot">
              <div>
                <dt>Pilot Circuit:</dt>
                <dd className="about-pilot-name">
                  SpeedBay International Circuit
                </dd>
              </div>

              <div>
                <dt>Fleet Kart:</dt>
                <dd>Sodi RT10 V2 </dd>
              </div>

              <div>
                <dt>Installation:</dt>
                <dd>100% Removable · Zero Kart Modification</dd>
              </div>
            </dl>
          </div>
        </div>

        {/* Intended users */}
        <div className="about-users">
          <div className="about-users-heading">
            <p>INTENDED USERS</p>
            <h3>Who We Build For</h3>
          </div>

          <div className="about-user-grid">
            {personas.map((persona) => (
              <article className="about-user-card" key={persona.role}>
                <div>
                  <h4>{persona.role}</h4>

                  <p className="about-user-challenge">
                    Challenge: {persona.need}
                  </p>
                </div>

                <div className="about-user-benefit">
                  <h5>Delivered Benefit:</h5>
                  <p>{persona.benefit}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
