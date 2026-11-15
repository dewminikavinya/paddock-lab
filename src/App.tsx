import React from 'react';
import { AICoaching } from './AICoaching';
import { TelemetrySimulator } from './telemetry-simulator';

export default function App() {
  return (
    <main>
      <AICoaching />
      <TelemetrySimulator />
    </main>
  );
}
