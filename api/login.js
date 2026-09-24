import { route, method, sameOrigin, body, HttpError } from '../lib/http.js';
import { authConfigurationError, passwordMatches, makeSession, sessionCookie } from '../lib/auth.js';
export default route(async (req, res) => {
  method(req, 'POST'); sameOrigin(req);
  const configurationError = authConfigurationError();
  if (configurationError) throw new HttpError(503, configurationError);
  const data = body(req);
  if (!passwordMatches(data.password)) { await new Promise(resolve => setTimeout(resolve, 700)); throw new HttpError(401, 'Incorrect password.'); }
  res.setHeader('Set-Cookie', sessionCookie(makeSession())); res.json({ ok: true });
}, 'The admin service is temporarily unavailable. Please try again.');
