import { route, method, sameOrigin, body, HttpError } from '../lib/http.js';
import { authConfigurationError, passwordMatches, makeSession, sessionCookie } from '../lib/auth.js';
import { activityPreference, activityCookie } from '../lib/activity.js';
export default route(async (req, res) => {
  method(req, 'POST'); sameOrigin(req);
  const configurationError = authConfigurationError();
  if (configurationError) throw new HttpError(503, configurationError);
  const data = body(req);
  if (!passwordMatches(data.password)) { await new Promise(resolve => setTimeout(resolve, 700)); throw new HttpError(401, 'Incorrect password.'); }
  const cookies = [sessionCookie(makeSession())];
  if (activityPreference(req) === null) cookies.push(activityCookie(true));
  res.setHeader('Set-Cookie', cookies); res.json({ ok: true });
}, 'The admin service is temporarily unavailable. Please try again.');
