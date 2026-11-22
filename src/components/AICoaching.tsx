import React, { useState } from 'react';

interface ComparisonMetric {
  title: string;
  driverValue: string;
  targetValue: string;
  diff: string;
  status: 'warning' | 'optimal' | 'critical';
  insight: string;
}

const COMPARISON_DATA: Record<string, { subtitle: string; metrics: ComparisonMetric[] }> = {
  braking: {
    subtitle: 'Turn 4 Heavy Braking Zone (SpeedBay Circuit)',
    metrics: [
      {
        title: 'Brake Application Point',
        driverValue: '48m before apex',
        targetValue: '55m before apex',
        diff: '-7m early',
        status: 'warning',
        insight: 'Dragging the brakes too early bleeds vital straight-line momentum entering the deceleration zone.',
      },
      {
        title: 'Peak Brake Pressure',
        driverValue: '85 bar',
        targetValue: '110 bar',
        diff: '-22%',
        status: 'critical',
        insight: 'Under-utilizing initial pedal bite increases stopping distance and delays turn-in readiness.',
      },
    ],
  },
  apex: {
    subtitle: 'Mid-Corner Rotation & Apex Velocity',
    metrics: [
      {
        title: 'Minimum Apex Speed',
        driverValue: '68.4 km/h',
        targetValue: '73.1 km/h',
        diff: '-4.7 km/h',
        status: 'warning',
        insight: 'Scrubbing excess speed mid-corner indicates an arc that is pinched too tightly.',
      },
      {
        title: 'Steering Smoothness',
        driverValue: '1.4 deg/ms jitter',
        targetValue: '0.6 deg/ms jitter',
        diff: 'High Corrective Input',
        status: 'warning',
        insight: 'Frequent minor steering corrections point to front-end traction loss or late apex entry.',
      },
    ],
  },
  throttle: {
    subtitle: 'Corner Exit & Throttle Pickup',
    metrics: [
      {
        title: 'Throttle Application Latency',
        driverValue: '0.34s after apex',
        targetValue: '0.12s after apex',
        diff: '+0.22s delay',
        status: 'critical',
        insight: 'Hesitating on power application costs significant speed down the subsequent straight.',
      },
      {
        title: 'Power Ramp Rate',
        driverValue: 'Progressive ramp',
        targetValue: 'Aggressive linear',
        diff: 'Conservative',
        status: 'optimal',
        insight: 'Good rear traction management, but can pick up throttle 15% earlier without wheel-spin.',
      },
    ],
  },
};

export const AICoaching: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('braking');
  const currentTab = COMPARISON_DATA[activeCategory];

  return (
    <section className="bg-[#f0eded] text-[#171719] py-20 px-6 font-sans" id="ai-coaching">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#f0edef] border border-[#171719]/10 rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#701820] animate-pulse"></span>
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#171719]">AI COACHING COMPARISON</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Driver vs. Coach Telemetry Delta</h2>
          <p className="text-[#85858c] text-base leading-relaxed">
            Local edge feature extraction isolates your top time-loss corners by comparing your inputs directly against pro benchmark data.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-3 mb-12 flex-wrap">
          <button
            onClick={() => setActiveCategory('braking')}
            className={`font-mono text-xs font-bold px-6 py-3 rounded-full border transition-all cursor-pointer ${
              activeCategory === 'braking'
                ? 'bg-[#701820] text-[#f0edef] border-[#701820] shadow-md'
                : 'bg-[#d9d9de] text-[#85858c] border-[#171719]/10 hover:bg-[#c75a5e] hover:text-white'
            }`}
          >
            Braking Zones
          </button>
          <button
            onClick={() => setActiveCategory('apex')}
            className={`font-mono text-xs font-bold px-6 py-3 rounded-full border transition-all cursor-pointer ${
              activeCategory === 'apex'
                ? 'bg-[#701820] text-[#f0edef] border-[#701820] shadow-md'
                : 'bg-[#d9d9de] text-[#85858c] border-[#171719]/10 hover:bg-[#c75a5e] hover:text-white'
            }`}
          >
            Apex & Rotation
          </button>
          <button
            onClick={() => setActiveCategory('throttle')}
            className={`font-mono text-xs font-bold px-6 py-3 rounded-full border transition-all cursor-pointer ${
              activeCategory === 'throttle'
                ? 'bg-[#701820] text-[#f0edef] border-[#701820] shadow-md'
                : 'bg-[#d9d9de] text-[#85858c] border-[#171719]/10 hover:bg-[#c75a5e] hover:text-white'
            }`}
          >
            Throttle Pickup
          </button>
        </div>

        {/* Comparison Display Grid */}
        <div className="bg-[#d9d9de] border border-[#171719]/10 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="mb-8 pb-6 border-b border-[#171719]/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-2xl font-bold tracking-tight text-[#171719] mb-1 capitalize">{activeCategory} Analysis</h3>
              <p className="text-[#85858c] text-sm font-mono">{currentTab.subtitle}</p>
            </div>
            <div className="inline-flex items-center gap-2 bg-[#f0edef] border border-[#171719]/10 px-4 py-2 rounded-xl text-xs font-mono text-[#701820] font-bold">
              <span>Target Time Delta: -0.42s</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {currentTab.metrics.map((metric, idx) => (
              <div key={idx} className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono text-[10px] uppercase font-bold text-[#701820] tracking-wider">{metric.title}</span>
                    <span className="font-mono text-[10px] bg-[#171719]/5 text-[#171719] px-2.5 py-1 rounded-full font-bold">
                      {metric.diff}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 my-4 p-4 bg-[#d9d9de]/50 rounded-xl border border-[#171719]/5">
                    <div>
                      <div className="text-[11px] font-mono text-[#85858c] uppercase">Your Run</div>
                      <div className="text-base font-extrabold text-[#171719]">{metric.driverValue}</div>
                    </div>
                    <div>
                      <div className="text-[11px] font-mono text-[#85858c] uppercase">Pro Target</div>
                      <div className="text-base font-extrabold text-[#701820]">{metric.targetValue}</div>
                    </div>
                  </div>

                  <p className="text-[#85858c] text-sm leading-relaxed">{metric.insight}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-[#171719]/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#701820]"></span>
                    <span className="font-mono text-[10px] text-[#85858c] font-medium">Prioritized Action Target</span>
                  </div>
                  <span className="font-mono text-[10px] text-[#701820] font-bold uppercase">High Impact</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};