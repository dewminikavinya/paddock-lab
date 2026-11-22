import React, { useEffect, useRef, useState } from 'react';

const BEST_LAP_SECONDS = 82.4;

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

const formatLapTime = (totalSeconds: number) => {
  const safeSeconds = Math.max(0, totalSeconds);
  const minutes = Math.floor(safeSeconds / 60);
  const seconds = safeSeconds % 60;
  const wholeSeconds = Math.floor(seconds);
  const tenths = Math.floor((seconds - wholeSeconds) * 10 + 1e-9);
  return `${minutes}:${String(wholeSeconds).padStart(2, '0')}.${tenths}`;
};

const formatSigned = (value: number, digits = 1) => `${value >= 0 ? '+' : ''}${value.toFixed(digits)}`;

export const TelemetrySimulator: React.FC = () => {
  const [isRunning, setIsRunning] = useState<boolean>(true);
  const [speed, setSpeed] = useState<number>(142);
  const [gForce, setGForce] = useState<number>(0);
  const [gForceMs2, setGForceMs2] = useState<number>(0);
  const [peakG, setPeakG] = useState<number>(0);
  const [lapTimeSeconds, setLapTimeSeconds] = useState<number>(0);
  const [deltaSeconds, setDeltaSeconds] = useState<number>(0);
  const [simTick, setSimTick] = useState<number>(0);
  const prevSpeedRef = useRef<number>(142);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setSimTick((prev) => prev + 1);

      setSpeed((prevSpeed) => {
        const delta = Math.sin(simTick * 0.1) * 12 + (Math.random() * 4 - 2);
        const nextSpeed = Math.round(clamp(prevSpeed + delta, 60, 295));

        const deltaKmh = nextSpeed - prevSpeed;
        const ms2 = (deltaKmh / 3.6) / 0.1;
        const g = ms2 / 9.80665;

        setGForceMs2(Number(ms2.toFixed(1)));
        setGForce(Number(g.toFixed(2)));
        setPeakG((prevPeak) => Number(Math.max(prevPeak, Math.abs(g)).toFixed(2)));

        prevSpeedRef.current = nextSpeed;
        return nextSpeed;
      });

      setLapTimeSeconds((prev) => Number((prev + 0.1).toFixed(1)));

      setDeltaSeconds((prev) => {
        const paceBias = Math.sin(simTick * 0.07) * 0.12;
        const noise = (Math.random() - 0.5) * 0.18;
        const nextDelta = prev * 0.82 + paceBias + noise;
        return Number(clamp(nextDelta, -2.5, 3.0).toFixed(1));
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isRunning, simTick]);

  const cardClassName =
    'group relative overflow-hidden rounded-2xl border border-[#d9dde6]/80 bg-gradient-to-br from-[#8b3a44]/22 via-[#7a2f3a]/14 to-[#d8dde6]/12 p-6 shadow-[0_10px_30px_rgba(87,35,43,0.12)] backdrop-blur-md ring-1 ring-white/45 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[#e6e9f0] hover:shadow-[0_18px_40px_rgba(87,35,43,0.18)]';
  const cardAccentClassName =
    'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#dfe4ec] to-transparent opacity-80 transition-all duration-300 group-hover:via-[#f3f5f8] group-hover:opacity-100';
  const cardGlowClassName =
    'pointer-events-none absolute -top-16 right-[-20%] h-40 w-40 rounded-full bg-[#8b3a44]/12 blur-3xl transition-opacity duration-300 group-hover:opacity-100';
  const metricLabelClassName = 'mb-1 font-mono text-[16px] uppercase tracking-wider text-[#7a5c61]';
  const innerPanelClassName =
    'rounded-xl border border-[#dde2ea]/80 bg-white/30 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-sm';

  return (
    <section className="bg-[#f0eded] px-6 py-20 font-sans text-[#171719]" id="telemetry-simulator">
      <div className="mx-auto max-w-[1240px]">
        {/* Header */}
        <div className="mx-auto mb-14 max-w-[700px] text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#171719]/10 bg-[#f0edef] px-4 py-2 shadow-sm">
            <span className={`h-2 w-2 rounded-full ${isRunning ? 'animate-pulse bg-emerald-600' : 'bg-amber-600'}`}></span>
            <span className="font-mono text-xs font-bold uppercase tracking-wider text-[#171719]">
              {isRunning ? 'LIVE TELEMETRY STREAM ACTIVE' : 'SIMULATOR PAUSED'}
            </span>
          </div>
          <h2 className="mb-4 text-3xl font-extrabold tracking-tight text-[#171719] md:text-5xl">
            Real-Time ECU Telemetry Simulator
          </h2>
          <p className="text-base leading-relaxed text-[#85858c]">
            Simulating high-frequency CAN bus data streams from onboard vehicle sensors at a 10Hz sampling rate.
          </p>
        </div>

        {/* Controls Bar */}
        <div className="mb-10 flex justify-center">
          <button
            onClick={() => setIsRunning(!isRunning)}
            className={`cursor-pointer rounded-full border px-6 py-3 font-mono text-xs font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] backdrop-blur-md transition-all duration-300 ${
              isRunning
                ? 'border-[#d8dde6]/80 bg-[#7a2f3a]/80 text-[#fff7f8] ring-1 ring-white/30 hover:bg-[#682733]/85 hover:shadow-[0_10px_24px_rgba(122,47,58,0.25)]'
                : 'border-[#d8dde6]/80 bg-emerald-700/80 text-white ring-1 ring-white/30 hover:bg-emerald-700/90 hover:shadow-[0_10px_24px_rgba(16,185,129,0.2)]'
            }`}
          >
            {isRunning ? 'Pause Simulator' : 'Resume Simulator'}
          </button>
        </div>

        {/* Main Telemetry Dashboard */}
        <div className="rounded-3xl border border-[#d7dce3]/80 bg-white/28 p-8 shadow-[0_20px_60px_rgba(86,42,49,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-xl ring-1 ring-white/40 md:p-12">
          <div className="space-y-8">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
              {/* Velocity Card */}
              <div className={cardClassName}>
                <div className={cardAccentClassName}></div>
                <div className={cardGlowClassName}></div>
                <div className={metricLabelClassName}>Velocity</div>
                <div className="my-2 font-mono text-4xl font-extrabold tabular-nums text-[#2b1d20] md:text-5xl">{speed}</div>
                <div className="font-mono text-[16px] font-bold tracking-wider text-[#7a2f3a]">KM/H</div>
                <div className="mt-4 font-mono text-[16px] text-[#7b666a]">Wheel-speed derived vehicle velocity</div>
              </div>

              {/* Acceleration Section */}
              <div className={cardClassName}>
                <div className={cardAccentClassName}></div>
                <div className={cardGlowClassName}></div>
                <div className={metricLabelClassName}>Acceleration</div>
                <div className="my-2 font-mono text-4xl font-extrabold tabular-nums text-[#2b1d20] md:text-5xl">
                  {formatSigned(gForce, 2)} <span className="text-xl text-[#5a3d42] md:text-2xl">G-FORCE</span>
                </div>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className={innerPanelClassName}>
                    <div className="font-mono text-[16px] uppercase text-[#7a5c61]">Converted</div>
                    <div className="mt-1 font-mono text-lg font-bold tabular-nums text-[#2b1d20]">{gForceMs2.toFixed(1)} m/s²</div>
                  </div>
                  <div className={innerPanelClassName}>
                    <div className="font-mono text-[16px] uppercase text-[#7a5c61]">Peak Recorded</div>
                    <div className="mt-1 font-mono text-lg font-bold tabular-nums text-[#7a2f3a]">{peakG.toFixed(2)} G</div>
                  </div>
                </div>
              </div>

              {/* Lap Time Section */}
              <div className={`${cardClassName} md:col-span-2 md:mx-auto md:w-full md:max-w-xl`}>
                <div className={cardAccentClassName}></div>
                <div className={cardGlowClassName}></div>
                <div className={metricLabelClassName}>Lap Time</div>
                <div className="my-2 font-mono text-4xl font-extrabold tabular-nums text-[#2b1d20] md:text-5xl">
                  {formatLapTime(lapTimeSeconds)}
                </div>
                <div className="font-mono text-[16px] font-bold tracking-wider text-[#7a2f3a]">LIVE LAP CLOCK</div>
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <div className={innerPanelClassName}>
                    <div className="font-mono text-[16px] uppercase text-[#7a5c61]">Best Reference</div>
                    <div className="mt-1 font-mono text-lg font-bold tabular-nums text-[#2b1d20]">{formatLapTime(BEST_LAP_SECONDS)}</div>
                  </div>
                  <div className={innerPanelClassName}>
                    <div className="font-mono text-[16px] uppercase text-[#7a5c61]">Live Delta vs Best</div>
                    <div
                      className={`mt-1 font-mono text-lg font-bold tabular-nums ${
                        deltaSeconds > 0 ? 'text-[#8b3a44]' : deltaSeconds < 0 ? 'text-emerald-700' : 'text-[#2b1d20]'
                      }`}
                    >
                      {formatSigned(deltaSeconds, 1)} s
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
