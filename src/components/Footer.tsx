import React from 'react';

const currentYear = new Date().getFullYear();

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#171719] text-[#f0eded] py-16 px-6 font-sans border-t border-[#f0eded]/10" id="footer">
      <div className="max-w-[1240px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12 pb-12 border-b border-[#f0eded]/10">
          {/* Brand & Status */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 rounded-full bg-[#701820]"></div>
              <span className="font-mono text-base font-extrabold tracking-wider uppercase text-white">PADDOCK LAB</span>
            </div>
            <p className="text-[#85858c] text-sm leading-relaxed max-w-md mb-6">
              Edge-computed motorsport telemetry, real-time CAN bus streaming, and pro driver AI benchmarking for professional racing teams and elite sim racers.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#f0eded]/5 border border-[#f0eded]/10 px-3 py-1.5 rounded-lg text-xs font-mono text-[#f0eded]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Telemetry Node: Online (v4.2.0)</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">Navigation</h4>
            <ul className="space-y-2 text-sm text-[#85858c] font-mono">
              <li><a href="#product" className="hover:text-white transition-colors">Product Specs</a></li>
              <li><a href="#ai-coaching" className="hover:text-white transition-colors">AI Coaching</a></li>
              <li><a href="#telemetry-simulator" className="hover:text-white transition-colors">Live Simulator</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Engineering</a></li>
            </ul>
          </div>

          {/* Compliance & Security */}
          <div>
            <h4 className="font-mono text-xs font-bold uppercase tracking-wider text-white mb-4">Security & Protocol</h4>
            <ul className="space-y-2 text-sm text-[#85858c] font-mono">
              <li>Encrypted CAN Bus</li>
              <li>Zero-Latency Edge Sync</li>
              <li>FIA Compliance Ready</li>
              <li>Secure Data Policy</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono text-[#85858c]">
          <div>© {currentYear} Paddock Lab Telemetry Systems. All rights reserved.</div>
          <div className="flex items-center gap-6">
            <span>Latency: 12ms</span>
            <span>Region: EU-Track-1</span>
          </div>
        </div>
      </div>
    </footer>
  );
};