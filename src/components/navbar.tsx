import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight} from "lucide-react";
import "./navbar.css";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Update the navbar appearance when scrolling.
  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 20);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToSection(sectionId: string) {
    setMenuOpen(false);

    const section = document.getElementById(sectionId);

    if (section) {
      section.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
    }
  }

  function scrollToTop() {
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const links = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about-us" },
    { name: "Live Simulator", id: "telemetry-simulator" },
    { name: "Product", id: "product" },
    { name: "AI Coaching", id: "ai-coaching" },
    { name: "Team", id: "team" },
    { name: "Contact", id: "contact" },
    { name: "Footer", id: "footer" },
  ];

  return (
    <header className="navbar">
      <div className={`navbar-bar ${scrolled ? "scrolled" : ""}`}>
        <button
          type="button"
          className="navbar-logo"
          onClick={scrollToTop}
          aria-label="Paddock Labs home"
        >
          <img className="navbar-emblem" src="/logo.png" alt="" width={40} height={40} />

          <span className="navbar-brand">
            <span>
              PADDOCK <span className="labs-label">LABS</span>
            </span>

            <span className="navbar-tagline">
              KART TELEMETRY & AI COACH
            </span>
          </span>
        </button>

        <nav
          id="navbar-menu"
          className={`navbar-menu ${menuOpen ? "is-open" : ""}`}
          aria-label="Main navigation"
        >
          {links.map((link) => (
            <button
              type="button"
              key={link.id}
              onClick={() => scrollToSection(link.id)}
            >
              {link.name}
            </button>
          ))}

        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="contact-button"
            onClick={() => scrollToSection("contact")}
          >
            Contact Team
            <ArrowUpRight size={14} />
          </button>

          <button
            type="button"
            className="menu-button"
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="navbar-menu"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
