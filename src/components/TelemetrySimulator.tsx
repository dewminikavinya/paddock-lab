import React, { useState, useEffect } from 'react';

export const TelemetrySimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(142);
  const [rpm, setRpm] = useState<number>(8400);
  const [gear, setGear] = useState<number>(4);
  const [throttle, setThrottle] = useState<number>(85);
  const [brake, setBrake] = useState<number>(0);
  const [lapTime, setLapTime] = useState<number>(82.4);
  const [simTick, setSimTick] = useState<number>(0);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSimTick((prev) => prev + 1);
      
      // Simulate real-time acceleration and braking cycles
      setSpeed((prev) => {
        const delta = Math.sin(simTick * 0.1) * 12 + (Math.random() * 4 - 2);
        const nextSpeed = Math.max(60, Math.min(295, prev + delta));
        
        // Automatic gear simulation based on speed
        if (nextSpeed < 90) setGear(2);
        else if (nextSpeed < 140) setGear(3);
        else if (nextSpeed < 190) setGear(4);
        else if (nextSpeed < 240) setGear(5);
        else setGear(6);
        
        return Math.round(nextSpeed);
      });

      setRpm(() => {
        const nextRpm = 4000 + Math.abs(Math.sin(simTick * 0.15)) * 7500 + (Math.random() * 300 - 150);
        return Math.round(Math.min(11500, Math.max(3500, nextRpm)));
      });

      setThrottle(() => {
        const nextThrot = Math.max(0, Math.min(100, 50 + Math.sin(simTick * 0.08) * 50 + (Math.random() * 10 - 5)));
        setBrake(nextThrot < 20 ? Math.round(Math.random() * 80) : 0);
        return Math.round(nextThrot);
      });

      setLapTime((prev) => Number((prev + 0.1).toFixed(1)));
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, simTick]);

  return (
    <section className="bg-[#f0eded] text-[#171719] py-20 px-6 font-sans" id="telemetry-simulator">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#f0edef] border border-[#171719]/10 rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className={`w-2 h-2 rounded-full ${isRunning ? 'bg-emerald-600 animate-pulse' : 'bg-amber-600'}`}></span>
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#171719]">
              {isRunning ? 'LIVE TELEMETRY STREAM ACTIVE' : 'SIMULATOR PAUSED'}
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Real-Time ECU Telemetry Simulator</h2>
          <p className="text-[#85858c] text-base leading-relaxed">
            Simulating high-frequency CAN bus data streams from onboard vehicle sensors at a 10Hz sampling rate.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="flex justify-center gap-4 mb-10">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`font-mono text-xs font-bold px-6 py-3 rounded-full border transition-all cursor-pointer ${
              isRunning
                ? 'bg-[#701820] text-[#f0edef] border-[#701820] shadow-md hover:bg-[#581218]'
                : 'bg-emerald-700 text-white border-emerald-800 shadow-md hover:bg-emerald-800'
            }`}
          >
            {isRunning ? 'Pause Simulator' : 'Resume Simulator'}
          </button>
          <button
            onClick={() => {
              setSpeed(120);
              setRpm(6000);
              setGear(3);
              setSimTick(0);
            }}
            className="font-mono text-xs font-bold px-6 py-3 rounded-full bg-[#d9d9de] text-[#171719] border border-[#171719]/10 hover:bg-[#c7c7cc] transition-all cursor-pointer"
          >
            Reset ECU Stream
          </button>
        </div>

        {/* Main Telemetry Dashboard Grid */}
        <div className="bg-[#d9d9de] border border-[#171719]/10 rounded-3xl p-8 md:p-12 shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Speed Card */}
            <div className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 text-center">
              <div className="text-xs font-mono text-[#85858c] uppercase tracking-wider mb-1">Velocity</div>
              <div className="text-4xl md:text-5xl font-extrabold text-[#171719] font-mono my-2">{speed}</div>
              <div className="text-xs font-mono text-[#701820] font-bold">KM/H</div>
            </div>

            {/* RPM Card */}
            <div className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 text-center">
              <div className="text-xs font-mono text-[#85858c] uppercase tracking-wider mb-1">Engine Speed</div>
              <div className="text-4xl md:text-5xl font-extrabold text-[#701820] font-mono my-2">{rpm}</div>
              <div className="text-xs font-mono text-[#85858c] font-bold">RPM</div>
            </div>

            {/* Gear Card */}
            <div className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 text-center">
              <div className="text-xs font-mono text-[#85858c] uppercase tracking-wider mb-1">Active Gear</div>
              <div className="text-4xl md:text-5xl font-extrabold text-[#171719] font-mono my-2">{gear}</div>
              <div className="text-xs font-mono text-emerald-700 font-bold">SEQUENTIAL</div>
            </div>

            {/* Lap Time Card */}
            <div className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 text-center">
              <div className="text-xs font-mono text-[#85858c] uppercase tracking-wider mb-1">Current Session</div>
              <div className="text-4xl md:text-5xl font-extrabold text-[#171719] font-mono my-2">{lapTime}s</div>
              <div className="text-xs font-mono text-[#85858c] font-bold">ELAPSED</div>
            </div>
          </div>

          {/* Pedal & Temperatures Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pedal Inputs */}
            <div className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6">
              <h4 className="text-sm font-mono font-bold uppercase text-[#171719] mb-4">Pedal Inputs & Load</h4>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#85858c]">THROTTLE POSITION</span>
                    <span className="font-bold text-[#171719]">{throttle}%</span>
                  </div>
                  <div className="w-full bg-[#d9d9de] h-3 rounded-full overflow-hidden border border-[#171719]/10">
                    <div className="bg-emerald-600 h-full transition-all duration-100" style={{ width: `${throttle}%` }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-[#85858c]">BRAKE PRESSURE</span>
                    <span className="font-bold text-[#701820]">{brake} bar</span>
                  </div>
                  <div className="w-full bg-[#d9d9de] h-3 rounded-full overflow-hidden border border-[#171719]/10">
                    <div className="bg-[#701820] h-full transition-all duration-100" style={{ width: `${(brake / 100) * 100}%` }}></div>
                  </div>
                </div>
              </div>
            </div>

           {/* Subsystems & Thermal */}
            
            {/* <div className="bg-[#f0edef] border border-[#171719]/10 rounded-2xl p-6 flex flex-col justify-between">
              <h4 className="text-sm font-mono font-bold uppercase text-[#171719] mb-4">Subsystem Telemetry</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#d9d9de]/50 p-4 rounded-xl border border-[#171719]/5">
                  <div className="text-[11px] font-mono text-[#85858c] uppercase">Oil Temp</div>
                  <div className="text-lg font-bold font-mono text-[#171719]">{oilTemp} °C</div>
                </div>
                <div className="bg-[#d9d9de]/50 p-4 rounded-xl border border-[#171719]/5">
                  <div className="text-[11px] font-mono text-[#85858c] uppercase">CAN Bus Rate</div>
                  <div className="text-lg font-bold font-mono text-[#701820]">10.2 Hz</div>
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-[#171719]/10 flex items-center justify-between text-xs font-mono text-[#85858c]">
                <span>ECU Connection: Stable</span>
               <span className="text-emerald-700 font-bold">● OK</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};