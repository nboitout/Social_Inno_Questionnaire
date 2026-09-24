import { route, method, sameOrigin } from '../lib/http.js';
import { sessionCookie } from '../lib/auth.js';
export default route(async (req, res) => { method(req, 'POST'); sameOrigin(req); res.setHeader('Set-Cookie', sessionCookie('', true)); res.json({ ok: true }); });
