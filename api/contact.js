import { Resend } from 'resend';

function sendJson(response, status, body) {
  response.status(status).json(body);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

export default async function handler(request, response) {
  if (request.method === 'OPTIONS') {
    response.setHeader('Allow', 'POST, OPTIONS');
    response.status(204).end();
    return;
  }

  if (request.method !== 'POST') {
    sendJson(response, 405, { error: 'Method not allowed.' });
    return;
  }

  const { name, email, team, inquiryType, message } = request.body || {};

  if (
    typeof name !== 'string' || !name.trim() ||
    typeof email !== 'string' || !email.trim() ||
    typeof inquiryType !== 'string' || !inquiryType.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    sendJson(response, 400, { error: 'Please complete all required fields.' });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const toEmail = process.env.CONTACT_TO_EMAIL;
  const fromEmail = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !toEmail || !fromEmail) {
    sendJson(response, 500, { error: 'Email service is not configured.' });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: email.trim(),
      subject: `Paddock Lab inquiry: ${inquiryType.trim()}`,
      html: `
        <h2>New Paddock Lab inquiry</h2>
        <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
        <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
        <p><strong>Team / Organization:</strong> ${escapeHtml(typeof team === 'string' && team.trim() ? team.trim() : 'Not provided')}</p>
        <p><strong>Inquiry Focus:</strong> ${escapeHtml(inquiryType.trim())}</p>
        <p><strong>Project Details:</strong></p>
        <p>${escapeHtml(message.trim()).replaceAll('\n', '<br>')}</p>
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      sendJson(response, 502, { error: 'The email provider could not send your inquiry.' });
      return;
    }

    sendJson(response, 200, { ok: true });
  } catch (error) {
    console.error('Contact form error:', error);
    sendJson(response, 500, { error: 'Unable to send your inquiry.' });
  }
}
