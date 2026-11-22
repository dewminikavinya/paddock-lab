import {
  Users,
  Cpu,
  Brain,
  Wrench,
  Flag,
  type LucideIcon,
} from "lucide-react";
import "./team.css";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  icon: LucideIcon;
  badge: string;
}

const teamMembers: TeamMember[] = [
  {
    name: "Rusith Weerasiri",
    role: "Project Lead & Systems Architect",
    bio: "Leads the project at IIT Sri Lanka and coordinates the firmware, GPS integration, and telemetry software architecture.",
    icon: Cpu,
    badge: "LEAD ARCHITECT",
  },
  {
    name: "Hardware & Sensor Lead",
    role: "Embedded Electronics & Power Engineering",
    bio: "Develops the pedal sensors, battery system, and protective enclosure for removable installation on the kart.",
    icon: Wrench,
    badge: "HARDWARE & SENSORS",
  },
  {
    name: "Machine Learning Specialist",
    role: "Telemetry Modeling & Driver Coaching AI",
    bio: "Develops the algorithms that analyse driving data, identify corner losses, and provide feedback based on sensor measurements.",
    icon: Brain,
    badge: "AI & DATA MODELING",
  },
  {
    name: "Track Operations Specialist",
    role: "Kart Dynamics & Testing Operations",
    bio: "Coordinates track testing at SpeedBay and collects feedback from drivers and instructors to evaluate the system.",
    icon: Flag,
    badge: "TRACK OPERATIONS",
  },
];

export function Team() {
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

            return (
              <article className="team-card" key={member.name}>
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
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
