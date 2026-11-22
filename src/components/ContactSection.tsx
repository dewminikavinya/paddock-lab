import React, { useState } from 'react';

export const ContactSection: React.FC = () => {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    team: '',
    inquiryType: 'GT3 / Endurance Telemetry',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Unable to send your inquiry.');
      }

      setSubmitted(true);
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : 'Unable to send your inquiry.',
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="bg-[#f0eded] text-[#171719] py-20 px-6 font-sans" id="contact">
      <div className="max-w-[1240px] mx-auto">
        {/* Header */}
        <div className="text-center max-w-[700px] mx-auto mb-14">
          <div className="inline-flex items-center gap-2 bg-[#f0edef] border border-[#171719]/10 rounded-full px-4 py-2 mb-5 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-[#701820] animate-pulse"></span>
            <span className="font-mono text-xs font-bold tracking-wider uppercase text-[#171719]">GET IN TOUCH</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">Connect With Our Engineers</h2>
          <p className="text-[#85858c] text-base leading-relaxed">
            Ready to deploy Paddock Lab telemetry on your race car or simulator rig? Drop us a line for enterprise licensing or hardware integration.
          </p>
        </div>

        {/* Form Container */}
        <div className="max-w-[800px] mx-auto bg-[#d9d9de] border border-[#171719]/10 rounded-3xl p-8 md:p-12 shadow-lg">
          {submitted ? (
            <div className="text-center py-12">
              <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-4 font-bold text-xl">
                ✓
              </div>
              <h3 className="text-2xl font-bold mb-2 text-[#171719]">Demo Inquiry Completed</h3>
              <p className="text-[#85858c] text-sm mb-6">
                This is a local demonstration. Your inquiry has not been sent or stored.
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setFormData({ name: '', email: '', team: '', inquiryType: 'GT3 / Endurance Telemetry', message: '' });
                }}
                className="font-mono text-xs font-bold px-6 py-3 rounded-full bg-[#701820] text-[#f0edef] hover:bg-[#581218] transition-all cursor-pointer"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-name" className="block text-xs font-mono font-bold text-[#171719] uppercase mb-2">Your Name</label>
                  <input id="contact-name"
                    type="text"
                    required
                    placeholder="e.g. Alex Mercer"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#f0edef] border border-[#171719]/10 rounded-xl px-4 py-3 text-[#171719] text-sm focus:outline-none focus:border-[#701820] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-mono font-bold text-[#171719] uppercase mb-2">Email Address</label>
                  <input id="contact-email"
                    type="email"
                    required
                    placeholder="alex@racingteam.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-[#f0edef] border border-[#171719]/10 rounded-xl px-4 py-3 text-[#171719] text-sm focus:outline-none focus:border-[#701820] transition-colors"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contact-team" className="block text-xs font-mono font-bold text-[#171719] uppercase mb-2">Team / Organization</label>
                  <input id="contact-team"
                    type="text"
                    placeholder="Apex Motorsports"
                    value={formData.team}
                    onChange={(e) => setFormData({ ...formData, team: e.target.value })}
                    className="w-full bg-[#f0edef] border border-[#171719]/10 rounded-xl px-4 py-3 text-[#171719] text-sm focus:outline-none focus:border-[#701820] transition-colors"
                  />
                </div>
                <div>
                  <label htmlFor="contact-focus" className="block text-xs font-mono font-bold text-[#171719] uppercase mb-2">Inquiry Focus</label>
                  <select id="contact-focus"
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    className="w-full bg-[#f0edef] border border-[#171719]/10 rounded-xl px-4 py-3 text-[#171719] text-sm focus:outline-none focus:border-[#701820] transition-colors cursor-pointer"
                  >
                    <option value="GT3 / Endurance Telemetry">GT3 / Endurance Telemetry</option>
                    <option value="Custom ECU Integration">Custom ECU Integration</option>
                    <option value="Sim Racing Rig Setup">Sim Racing Rig Setup</option>
                    <option value="Enterprise Licensing">Enterprise Licensing</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="contact-message" className="block text-xs font-mono font-bold text-[#171719] uppercase mb-2">Project Details & Requirements</label>
                <textarea id="contact-message"
                  rows={4}
                  required
                  placeholder="Describe your vehicle sensors, CAN bus specifications, or deployment goals..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#f0edef] border border-[#171719]/10 rounded-xl px-4 py-3 text-[#171719] text-sm focus:outline-none focus:border-[#701820] transition-colors resize-none"
                ></textarea>
              </div>

              <div className="text-center pt-2">
                {error && (
                  <p className="mb-4 text-sm font-medium text-red-700" role="alert">
                    {error}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={submitting}
                  className="font-mono text-xs font-bold px-8 py-4 rounded-full bg-[#701820] text-[#f0edef] hover:bg-[#581218] transition-all shadow-md cursor-pointer w-full md:w-auto disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? 'Transmitting...' : 'Transmit Inquiry'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};