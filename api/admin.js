import { route, method } from '../lib/http.js';
import { requireAdmin } from '../lib/auth.js';
import { readRows, uniqueRows, configured, live, demoMode } from '../lib/store.js';
export function summarize(responses, events) {
  responses = uniqueRows(responses, 'submission_id'); events = uniqueRows(events, 'event_id');
  const visits = events.filter(e => e.event === 'visit');
  const sessions = new Set(visits.map(e => e.session_id));
  const starts = new Set(events.filter(e => e.event === 'start').map(e => e.session_id));
  const completed = new Set(responses.map(r => r.session_id).filter(id => starts.has(id)));
  return { visits: visits.length, sessions: sessions.size, starts: starts.size, responses: responses.length, completion: starts.size ? Math.round(completed.size / starts.size * 100) : null, branches: Object.fromEntries(['using','exploring','not_yet'].map(b => [b, responses.filter(r => r.branch === b).length])) };
}
export default route(async (req, res) => {
  method(req, 'GET'); requireAdmin(req);
  const [responses, events] = configured() ? await Promise.all([readRows('Responses'), readRows('Visits')]) : [[], []];
  res.json({ configured: configured(), live: live(), demo: demoMode(), metrics: summarize(responses, events), responses: uniqueRows(responses, 'submission_id').reverse(), events: uniqueRows(events, 'event_id').reverse().slice(0, 100) });
}, 'The admin service is temporarily unavailable. Please try again.');
