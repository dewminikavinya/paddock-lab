import "./navbar.css";
import React, { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Sparkles, Layers } from 'lucide-react';
export const Navbar = ({ onFigmaToolClick, showFigmaBar }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    const scrollToSection = (id) => {
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    const scrollToTop = () => {
        setMobileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (<header className="navbar-header-1">
      {/* SoterCare style floating pill navbar on off-white canvas */}
      <div className={`navbar-div-2 ${scrolled
        ? "navbar-div-state-active-3" : "navbar-div-state-idle-4"} `}>
        {/* Home = Logo (Uploaded PL Emblem) */}
        <button onClick={scrollToTop} className="navbar-button-5 interaction-group" aria-label="Paddock Labs Home">
          <div className="navbar-div-6">
            <img src="/assets/aistudio/Dynamic_P_L_Go-Kart_Emblem_067c38a0.png" alt="Paddock Labs Logo" className="navbar-img-7"/>
          </div>

          <div className="navbar-div-8">
            <div className="navbar-div-9">
              <span className="navbar-span-10">
                PADDOCK
              </span>
              <span className="navbar-span-11">
                LABS
              </span>
            </div>
            <span className="navbar-span-12">
              KART TELEMETRY & AI COACH
            </span>
          </div>
        </button>

        {/* Center Navigation Links */}
        <nav className="navbar-nav-13">
          <button onClick={() => scrollToSection('about-us')} className="navbar-button-14">
            About Us
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="navbar-button-14">
            How It Works
          </button>
          <button onClick={() => scrollToSection('product')} className="navbar-button-14">
            Product
          </button>
          <button onClick={() => scrollToSection('ai-coaching')} className="navbar-button-15">
            <Sparkles className="navbar-sparkles-16"/>
            <span>AI Coaching</span>
          </button>
          <button onClick={() => scrollToSection('team')} className="navbar-button-14">
            Team
          </button>
        </nav>

        {/* Right Action Buttons */}
        <div className="navbar-div-17">
          <button onClick={onFigmaToolClick} title="Inspect Figma Design Tokens" className={`navbar-button-18 ${showFigmaBar
        ? "navbar-button-state-active-19" : "navbar-button-state-idle-20"} `}>
            <Layers className="navbar-layers-21"/>
            <span>Tokens</span>
          </button>

          <button onClick={() => scrollToSection('contact')} className="navbar-button-22">
            <span>Contact Team</span>
            <ArrowUpRight className="navbar-arrowupright-23"/>
          </button>

          {/* Mobile Hamburger */}
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="navbar-button-24" aria-label="Toggle menu">
            {mobileMenuOpen ? <X className="navbar-x-25"/> : <Menu className="navbar-x-25"/>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (<div className="navbar-div-26">
          <button onClick={scrollToTop} className="navbar-button-27">
            <span>Home</span>
            <span className="navbar-span-28">Top</span>
          </button>
          <button onClick={() => scrollToSection('about-us')} className="navbar-button-29">
            About Us
          </button>
          <button onClick={() => scrollToSection('how-it-works')} className="navbar-button-29">
            How It Works
          </button>
          <button onClick={() => scrollToSection('product')} className="navbar-button-29">
            Product
          </button>
          <button onClick={() => scrollToSection('ai-coaching')} className="navbar-button-30">
            <span className="navbar-div-17">
              <Sparkles className="navbar-sparkles-31"/>
              AI Coaching
            </span>
            <span className="navbar-span-32">
              BUILT-IN
            </span>
          </button>
          <button onClick={() => scrollToSection('team')} className="navbar-button-29">
            The Team
          </button>
          <button onClick={() => scrollToSection('contact')} className="navbar-button-29">
            Contact
          </button>

          <div className="navbar-div-33">
            <button onClick={() => {
                setMobileMenuOpen(false);
                onFigmaToolClick();
            }} className="navbar-button-34">
              Figma Tokens
            </button>
            <button onClick={() => scrollToSection('contact')} className="navbar-button-35">
              Get In Touch
            </button>
          </div>
        </div>)}
    </header>);
};
