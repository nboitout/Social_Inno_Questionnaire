import { route, method } from '../lib/http.js';
import { live, demoMode } from '../lib/store.js';
export default route(async (req, res) => { method(req, 'GET'); res.json({ live: live(), mode: demoMode() ? 'demo' : live() ? 'live' : 'preview' }); });
