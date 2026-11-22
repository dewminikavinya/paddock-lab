import {
  Users,
  Cpu,
  Brain,
  Monitor,
  Microchip,
  Server,
  type LucideIcon,
} from "lucide-react";
import { useState } from "react";
import "./team.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: LucideIcon;
  badge: string;
  image: string;
  imagePosition?: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rusith Weerasiri",
    role: "Project Lead & Systems Architect",
    bio: "Leads the overall project development, coordinates the team, and oversees system architecture and integration. Ensures that the hardware, backend, AI and frontend components work together to deliver the complete kart telemetry and driver coaching platform.",
    icon: Cpu,
    badge: "PROJECT LEAD",
    image: "/images/Rusith Weerasiri.png",
  },
  {
    name: "Sanupa Gunarathne",
    role: "AI & Machine Learning Lead",
    bio: "Develops intelligent driver performance analysis and personalized coaching algorithms. Works on identifying cornering patterns, detecting performance gaps, and generating data driven recommendations using machine learning.",
    icon: Brain,
    badge: "AI & MACHINE LEARNING",
    image: "/images/Sanupa Gunarathne.jpeg",
  },
  {
    name: "Savindi Perusinghe",
    role: "Frontend Development Lead",
    bio: "Designs and develops the Paddock Labs web application, creating intuitive dashboards for session summaries, lap comparisons, corner analysis, and personalized coaching insights. Focuses on delivering a clear and user-friendly experience for drivers and coaches.",
    icon: Monitor,
    badge: "FRONTEND DEVELOPMENT",
    image: "/images/Savindi Perusinghe.jpeg",
  },
  {
    name: "Dewmini Kavinya",
    role: "Hardware & Embedded Systems Lead",
    bio: "Develops the kart's embedded telemetry unit, integrating ESP32-based hardware, GNSS, IMU and sensor technologies. Oversees sensor calibration, data acquisition, power management, and reliable on kart hardware integration.",
    icon: Microchip,
    badge: "HARDWARE & SENSORS",
    image: "/images/Dewmini Kavinya.jpeg",
  },
  {
    name: "Dimuth Matheesha",
    role: "Backend Development Lead",
    bio: "Develops the backend infrastructure and APIs that process, manage, and store kart telemetry data. Implements session management, sensor data processing, database integration, and communication between the hardware, AI models, and web application.",
    icon: Server,
    badge: "BACKEND DEVELOPMENT",
    image: "/images/Dimuth Matheesha.jpeg",
  },
];

export function Team() {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});

  const toggleCard = (name: string) => {
    setFlippedCards((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  return (
    <section
      id="team"
      className="team"
      aria-labelledby="team-title"
    >
      <div className="team-container">
        {/* Section introduction */}
        <div className="team-heading">
          <div className="team-label">
            <Users size={16} aria-hidden="true" />
            <span>THE MINDS BEHIND PADDOCK LABS</span>
          </div>

          <h2 id="team-title">
            Engineers, Data Scientists & Racers
          </h2>

          <p>
            Bringing together embedded systems, machine learning,
            and motorsport to help drivers understand their
            performance and improve on track.
          </p>
        </div>

        {/* Display one card for each team member */}
        <div className="team-grid">
          {teamMembers.map((member) => {
            const MemberIcon = member.icon;
            const isFlipped = Boolean(flippedCards[member.name]);

            return (
              <article
                className={`team-card${isFlipped ? " is-flipped" : ""}`}
                key={member.name}
              >
                <button
                  type="button"
                  className="team-card-inner"
                  aria-label={`${isFlipped ? "Show front of" : "Show photograph for"} ${member.name}`}
                  aria-pressed={isFlipped}
                  onClick={() => toggleCard(member.name)}
                >
                  <div className="team-card-face team-card-front">
                    <div>
                      <div className="team-card-top">
                        <span className="team-badge">
                          {member.badge}
                        </span>

                        <div className="team-icon">
                          <MemberIcon size={18} aria-hidden="true" />
                        </div>
                      </div>

                      <h3>{member.name}</h3>

                      <p className="team-role">
                        {member.role}
                      </p>

                      <p className="team-bio">
                        {member.bio}
                      </p>
                    </div>

                    <div className="team-card-footer">
                      <span>IIT Sri Lanka</span>
                      <strong>SDGP 2026</strong>
                    </div>
                  </div>

                  <div className="team-card-face team-card-back">
                    <img
                      src={member.image}
                      alt={`${member.name}, ${member.role}`}
                      className="team-member-photo"
                      style={member.imagePosition ? { objectPosition: member.imagePosition } : undefined}
                    />
                    <div className="team-card-back-overlay" aria-hidden="true" />
                    <div className="team-card-back-content">
                      <span className="team-card-back-brand">PADDOCK LABS</span>
                      <div>
                        <h3>{member.name}</h3>
                        <p className="team-role">{member.role}</p>
                      </div>
                    </div>
                  </div>
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
