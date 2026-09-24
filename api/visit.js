import { route, method, sameOrigin, body, uuid, HttpError } from '../lib/http.js';
import { live, appendRow } from '../lib/store.js';
export default route(async (req, res) => {
  method(req, 'POST'); sameOrigin(req);
  if (!live()) return res.json({ recorded: false });
  const data = body(req);
  if (!uuid(data.eventId) || !uuid(data.sessionId) || !['visit','start'].includes(data.event)) throw new HttpError(400, 'Invalid event');
  await appendRow('Visits', { event_id: data.eventId, recorded_at: new Date().toISOString(), session_id: data.sessionId, event: data.event, path: '/' });
  res.json({ recorded: true });
});
