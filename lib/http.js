export class HttpError extends Error { constructor(status, message) { super(message); this.status = status; } }
export function method(req, allowed) { if (req.method !== allowed) throw new HttpError(405, 'Method not allowed'); }
export function sameOrigin(req) {
  const origin = req.headers.origin;
  if (!origin) throw new HttpError(403, 'Origin required');
  try { if (new URL(origin).host !== req.headers.host) throw new Error(); }
  catch { throw new HttpError(403, 'Origin not allowed'); }
}
export function body(req) {
  if (!req.headers['content-type']?.startsWith('application/json')) throw new HttpError(415, 'JSON required');
  if (Number(req.headers['content-length'] || 0) > 30000) throw new HttpError(413, 'Request too large');
  let data;
  try { data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; } catch { throw new HttpError(400, 'Invalid JSON'); }
  if (!data || typeof data !== 'object' || Array.isArray(data) || JSON.stringify(data).length > 30000) throw new HttpError(400, 'Invalid request');
  return data;
}
export const uuid = value => typeof value === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
export function route(handler) { return async (req, res) => {
  res.setHeader('Cache-Control', 'no-store');
  try { await handler(req, res); }
  catch (error) {
    if (!error.status) console.error('API failure:', error.message);
    res.status(error.status || 503).json({ error: error.status ? error.message : 'Serviciul nu este disponibil momentan. Răspunsurile tale sunt păstrate în acest browser. Încearcă din nou.' });
  }
}; }
