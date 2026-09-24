import { route, method, sameOrigin, body, HttpError } from '../lib/http.js';
import { authConfigured, passwordMatches, makeSession, sessionCookie } from '../lib/auth.js';
export default route(async (req, res) => {
  method(req, 'POST'); sameOrigin(req);
  if (!authConfigured()) throw new HttpError(503, 'Configurează ADMIN_PASSWORD (min. 24 caractere) și SESSION_SECRET (min. 32).');
  const data = body(req);
  if (!passwordMatches(data.password)) { await new Promise(resolve => setTimeout(resolve, 700)); throw new HttpError(401, 'Parolă incorectă.'); }
  res.setHeader('Set-Cookie', sessionCookie(makeSession())); res.json({ ok: true });
});
