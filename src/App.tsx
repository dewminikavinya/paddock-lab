import React from 'react';
import { AICoaching } from './AICoaching';
import { TelemetrySimulator } from './telemetry-simulator';
import { ContactSection } from './ContactSection';

export default function App() {
  return (
    <main>
      <AICoaching />
      <TelemetrySimulator />
      <ContactSection/>
    </main>
  );
}
