import React, { useState } from 'react';

interface SpecItem {
  label: string;
  value: string;
  desc: string;
}

interface SpecCategory {
  id: string;
  title: string;
  subtitle: string;
  specs: SpecItem[];
}

const SPEC_CATEGORIES: Record<string, SpecCategory> = {
  hardware: {
    id: 'hardware',
    title: 'Core Hardware & Compute',
    subtitle: 'Engineered for high-vibration motorsport environments',
    specs: [
      { label: 'Microcontroller', value: 'Dual-Core ESP32-S3', desc: 'Runs real-time acquisition clock alongside independent edge feature extraction.' },
      { label: 'Local Storage', value: '32GB Class 10 MicroSD', desc: 'Continuous local fallback buffering guarantees zero lost session telemetry packets.' },
      { label: 'Power System', value: 'Rechargeable LiPo + USB-C', desc: 'Self-powered unit operating independently of the kart electrical harness.' },
      { label: 'Enclosure', value: 'Anodized CNC Aluminum (IP65)', desc: 'Resistant to thermal soak, harsh trackside dust, and intense steering wheel shock loads.' },
    ],
  },
  sensors: {
    id: 'sensors',
    title: 'Precision Sensor Suite',
    subtitle: 'Non-invasive telemetry capture without hydraulic line cuts',
    specs: [
      { label: 'Steering Input', value: 'AS5600 Magnetic Encoder', desc: 'High-resolution contactless angle tracking mounted directly to the steering column.' },
      { label: 'Pedal Travel', value: 'Dual Hall Effect Sensors', desc: 'Measures exact throttle and brake pedal depression depth sampled at high frequency.' },
      { label: 'Motion & Inertia', value: '6-Axis IMU (MPU6050)', desc: 'Captures longitudinal/lateral G-forces, pitch, roll, and chassis yaw rates.' },
      { label: 'Position & Timing', value: 'High-Rate GNSS Module', desc: 'Sub-meter spatial accuracy coupled with SpeedBay track reference markers.' },
    ],
  },
  software: {
    id: 'software',
    title: 'AI Analytics & Firmware',
    subtitle: 'Turning raw sensor logs into actionable driver improvements',
    specs: [
      { label: 'Sampling Rate', value: '100Hz Central Clock', desc: 'Synchronized timestamping across all sensor channels for accurate sector and apex alignment.' },
      { label: 'AI Model', value: 'Random Forest Decision Tree', desc: 'Compares driver telemetry against instructor baselines locally upon session export.' },
      { label: 'Driver Debrief', value: 'Max 2 Actionable Targets', desc: 'Prioritized feedback focused exclusively on the highest time-loss corners without hallucinations.' },
      { label: 'Connectivity', value: 'BLE 5.0 & Wi-Fi Direct', desc: 'Fast wireless post-session data transfer to tablet or smartphone paddock companion apps.' },
    ],
  },
};

export const ProductSpecs: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('hardware');
  const currentCategory = SPEC_CATEGORIES[activeTab];

  return (
    <section className="bg-[#f0eded] text-[#171719] py-20 px-6 font-sans" id="product">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#f0edef] border border-[#171719]/10 rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#701820] animate-pulse"></span>
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#171719]">HARDWARE & SOFTWARE SPECIFICATIONS</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Built for Rigorous Trackside Use</h2>
          <p className="text-[#85858c] text-base leading-relaxed">
            Explore the engineering specifications powering the Paddock Lab data acquisition and AI debrief unit.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          {Object.values(SPEC_CATEGORIES).map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveTab(cat.id)}
              className={`font-mono text-xs font-bold px-6 py-3 rounded-full border transition-all cursor-pointer ${
                activeTab === cat.id
                  ? 'bg-[#701820] text-[#f0edef] border-[#701820] shadow-md'
                  : 'bg-[#d9d9de] text-[#85858c] border-[#171719]/10 hover:bg-[#c75a5e] hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Spec Display Card */}
        <div className="bg-[#d9d9de] border border-[#171719]/10 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="mb-8 pb-6 border-b border-[#171719]/10">
            <h3 className="text-2xl font-bold tracking-tight text-[#171719] mb-1">{currentCategory.title}</h3>
            <p className="text-[#85858c] text-sm font-mono">{currentCategory.subtitle}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentCategory.specs.map((spec, idx) => (
              <div key={idx} className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[10px] uppercase font-bold text-[#701820] tracking-wider mb-2">{spec.label}</div>
                  <div className="text-lg font-extrabold text-[#171719] tracking-tight mb-2">{spec.value}</div>
                  <p className="text-[#85858c] text-sm leading-relaxed">{spec.desc}</p>
                </div>
                <div className="mt-4 pt-4 border-t border-[#171719]/10 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#701820]"></span>
                  <span className="font-mono text-[10px] text-[#85858c] font-medium">Verified Specification</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};