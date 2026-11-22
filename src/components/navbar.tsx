import { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight} from "lucide-react";
import "./navbar.css";

export const NAV_SECTION_IDS = [
  "home",
  "about-us",
  "how-it-works",
  "product",
  "ai-coaching",
  "telemetry-simulator",
  "team",
  "contact",
  "footer",
] as const;

let scrollAnimationFrame: number | null = null;
let navigationLockId: string | null = null;

function cancelNavigationAnimation() {
  if (scrollAnimationFrame !== null) {
    window.cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }
  navigationLockId = null;
}

function getNavbarOffset() {
  const navbar = document.querySelector<HTMLElement>(".navbar-bar");
  return navbar ? Math.ceil(navbar.getBoundingClientRect().bottom) : 20;
}

export function scrollToSection(sectionId: string) {
  if (scrollAnimationFrame !== null) {
    window.cancelAnimationFrame(scrollAnimationFrame);
    scrollAnimationFrame = null;
  }

  const section = document.getElementById(sectionId);
  if (!section) return;

  navigationLockId = sectionId;
  window.dispatchEvent(new CustomEvent("paddock:navigation", {
    detail: { sectionId },
  }));

  const targetTop = sectionId === "home"
    ? 0
    : Math.max(0, window.scrollY + section.getBoundingClientRect().top - getNavbarOffset());

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    navigationLockId = null;
    return;
  }

  const startTop = window.scrollY;
  const distance = targetTop - startTop;
  if (Math.abs(distance) < 2) {
    window.scrollTo({ top: targetTop, behavior: "auto" });
    navigationLockId = null;
    return;
  }

  const duration = Math.min(900, Math.max(350, Math.abs(distance) * 0.32));
  const startTime = performance.now();

  function animate(now: number) {
    const elapsed = Math.min(1, (now - startTime) / duration);
    const eased = 1 - Math.pow(1 - elapsed, 3);
    window.scrollTo({ top: startTop + distance * eased, behavior: "auto" });

    if (elapsed < 1) {
      scrollAnimationFrame = window.requestAnimationFrame(animate);
    } else {
      window.scrollTo({ top: targetTop, behavior: "auto" });
      window.dispatchEvent(new CustomEvent("paddock:navigation", {
        detail: { sectionId },
      }));
      window.setTimeout(() => {
        if (navigationLockId === sectionId) navigationLockId = null;
      }, 100);
      scrollAnimationFrame = null;
    }
  }

  scrollAnimationFrame = window.requestAnimationFrame(animate);
}
export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Update the navbar appearance when scrolling.
  useEffect(() => {
    let scrollFrame: number | null = null;

    function handleScroll() {
      setScrolled(window.scrollY > 20);

      if (scrollFrame !== null) return;

      scrollFrame = window.requestAnimationFrame(() => {
        scrollFrame = null;

        if (navigationLockId !== null) {
          setActiveSection(navigationLockId);
          return;
        }

        if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 2) {
          setActiveSection("footer");
          return;
        }

        const line = getNavbarOffset() + 1;
        let current = "home";

        for (const sectionId of NAV_SECTION_IDS) {
          const section = document.getElementById(sectionId);
          if (section && section.getBoundingClientRect().top <= line) {
            current = sectionId;
          }
        }

        setActiveSection(current);
      });
    }

    function handleManualScroll() {
      cancelNavigationAnimation();
    }

    function handleScrollKey(event: KeyboardEvent) {
      if (["ArrowDown", "ArrowUp", "PageDown", "PageUp", "Home", "End", " "].includes(event.key)) {
        handleManualScroll();
      }
    }

    function handleNavigationEvent(event: Event) {
      const customEvent = event as CustomEvent<{ sectionId: string }>;
      setActiveSection(customEvent.detail.sectionId);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("wheel", handleManualScroll, { passive: true });
    window.addEventListener("touchstart", handleManualScroll, { passive: true });
    window.addEventListener("keydown", handleScrollKey);
    window.addEventListener("paddock:navigation", handleNavigationEvent);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("wheel", handleManualScroll);
      window.removeEventListener("touchstart", handleManualScroll);
      window.removeEventListener("keydown", handleScrollKey);
      window.removeEventListener("paddock:navigation", handleNavigationEvent);
      if (scrollFrame !== null) window.cancelAnimationFrame(scrollFrame);
    };
  }, []);

  function navigateToSection(sectionId: string) {
    setMenuOpen(false);
    setActiveSection(sectionId);
    scrollToSection(sectionId);
  }

  function scrollToTop() {
    setMenuOpen(false);
    scrollToSection("home");
  }

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  const links = [
    { name: "Home", id: "home" },
    { name: "About Us", id: "about-us" },
    { name: "How It Works", id: "how-it-works" },
    { name: "Product", id: "product" },
    { name: "AI Coaching", id: "ai-coaching" },
    { name: "Live Simulator", id: "telemetry-simulator" },
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
              className={activeSection === link.id ? "active" : undefined}
              aria-current={activeSection === link.id ? "page" : undefined}
              onClick={() => navigateToSection(link.id)}
            >
              {link.name}
            </button>
          ))}

        </nav>

        <div className="navbar-actions">
          <button
            type="button"
            className="contact-button"
            onClick={() => navigateToSection("contact")}
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
