import { route, method, sameOrigin, body, HttpError } from '../lib/http.js';
import { authConfigured, passwordMatches, makeSession, sessionCookie } from '../lib/auth.js';
export default route(async (req, res) => {
  method(req, 'POST'); sameOrigin(req);
  if (!authConfigured()) throw new HttpError(503, 'Configure ADMIN_PASSWORD (at least 24 characters) and SESSION_SECRET (at least 32).');
  const data = body(req);
  if (!passwordMatches(data.password)) { await new Promise(resolve => setTimeout(resolve, 700)); throw new HttpError(401, 'Incorrect password.'); }
  res.setHeader('Set-Cookie', sessionCookie(makeSession())); res.json({ ok: true });
}, 'The admin service is temporarily unavailable. Please try again.');
