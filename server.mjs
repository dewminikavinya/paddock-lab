import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Resend } from 'resend';

const port = Number(process.env.PORT || 3001);
const resend = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;
const rootDir = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.join(rootDir, 'dist');

const escapeHtml = (value) =>
  String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');

const sendJson = (response, status, body) => {
  response.writeHead(status, {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-store',
  });
  response.end(JSON.stringify(body));
};

const readJsonBody = async (request) => {
  let body = '';

  for await (const chunk of request) {
    body += chunk;
    if (body.length > 100_000) {
      throw new Error('Request body is too large.');
    }
  }

  return body ? JSON.parse(body) : {};
};

const contentTypes = {
  '.css': 'text/css',
  '.html': 'text/html',
  '.ico': 'image/x-icon',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
};

const serveStatic = async (request, response) => {
  const requestedPath = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
  const relativePath = requestedPath === '/' ? 'index.html' : requestedPath.replace(/^\/+/, '');
  let filePath = path.resolve(distDir, relativePath);

  if (!filePath.startsWith(`${distDir}${path.sep}`) && filePath !== path.join(distDir, 'index.html')) {
    sendJson(response, 403, { error: 'Forbidden.' });
    return;
  }

  try {
    const fileStats = await stat(filePath);
    if (!fileStats.isFile()) throw new Error('Not a file');
  } catch {
    filePath = path.join(distDir, 'index.html');
  }

  try {
    const file = await readFile(filePath);
    response.writeHead(200, {
      'Content-Type': contentTypes[path.extname(filePath)] || 'application/octet-stream',
    });
    response.end(file);
  } catch {
    sendJson(response, 404, { error: 'Not found.' });
  }
};

const server = http.createServer(async (request, response) => {
  const url = new URL(request.url, 'http://localhost');

  if (url.pathname === '/api/contact' && request.method === 'POST') {
    try {
      const { name, email, team, inquiryType, message } = await readJsonBody(request);

      if (
        typeof name !== 'string' || !name.trim() ||
        typeof email !== 'string' || !email.trim() ||
        typeof inquiryType !== 'string' || !inquiryType.trim() ||
        typeof message !== 'string' || !message.trim()
      ) {
        sendJson(response, 400, { error: 'Please complete all required fields.' });
        return;
      }

      if (!process.env.RESEND_API_KEY || !process.env.CONTACT_TO_EMAIL || !process.env.CONTACT_FROM_EMAIL) {
        sendJson(response, 500, { error: 'Email service is not configured.' });
        return;
      }

      const { error } = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL,
        to: [process.env.CONTACT_TO_EMAIL],
        replyTo: email.trim(),
        subject: `Paddock Lab inquiry: ${inquiryType.trim()}`,
        html: `
          <h2>New Paddock Lab inquiry</h2>
          <p><strong>Name:</strong> ${escapeHtml(name.trim())}</p>
          <p><strong>Email:</strong> ${escapeHtml(email.trim())}</p>
          <p><strong>Team / Organization:</strong> ${escapeHtml(typeof team === 'string' ? team.trim() : 'Not provided')}</p>
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
      if (error instanceof SyntaxError) {
        sendJson(response, 400, { error: 'Invalid request data.' });
        return;
      }
      console.error('Contact form error:', error);
      sendJson(response, 500, { error: 'Unable to send your inquiry.' });
    }
    return;
  }

  if (url.pathname.startsWith('/api/')) {
    sendJson(response, 404, { error: 'Not found.' });
    return;
  }

  await serveStatic(request, response);
});

server.listen(port, () => {
  console.log(`Paddock Lab server listening on http://localhost:${port}`);
});
