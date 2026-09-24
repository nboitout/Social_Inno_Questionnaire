import { route, method, sameOrigin, body, uuid, HttpError } from '../lib/http.js';
import { live, appendRow, readRows } from '../lib/store.js';
import { survey, getQuestions, answerError } from '../public/survey-config.js';
export function validateSubmission(data) {
  if (!uuid(data.submissionId) || !uuid(data.sessionId) || data.version !== survey.version || data.consent !== true) throw new HttpError(400, 'Datele trimise sunt incomplete sau versiunea chestionarului s-a schimbat.');
  if (!data.answers || Array.isArray(data.answers) || typeof data.answers !== 'object') throw new HttpError(400, 'Răspunsuri invalide.');
  const branch = data.answers[survey.branchQuestionId];
  if (!Object.hasOwn(survey.branches, branch)) throw new HttpError(400, 'Selectează etapa de adoptare AI.');
  const questions = getQuestions(data.answers);
  if (Object.keys(data.answers).some(id => !questions.some(q => q.id === id))) throw new HttpError(400, 'Răspunsuri dintr-o altă ramură.');
  for (const q of questions) { const error = answerError(q, data.answers[q.id]); if (error) throw new HttpError(400, `${q.label} ${error}`); }
  if (!Number.isFinite(data.durationSeconds) || data.durationSeconds < 0 || data.durationSeconds > 604800) throw new HttpError(400, 'Durată invalidă.');
  return { submission_id: data.submissionId, submitted_at: new Date().toISOString(), survey_version: survey.version, branch, session_id: data.sessionId, duration_seconds: Math.round(data.durationSeconds), ...Object.fromEntries(questions.map(q => [q.id, Array.isArray(data.answers[q.id]) ? data.answers[q.id].join(' | ') : data.answers[q.id] || ''])), answers_json: JSON.stringify(data.answers) };
}
export default route(async (req, res) => {
  method(req, 'POST'); sameOrigin(req);
  if (!live()) throw new HttpError(409, 'Chestionarul este în previzualizare. Nu se colectează răspunsuri.');
  const data = body(req);
  const record = validateSubmission(data);
  // Best-effort retry deduplication. Google Sheets has no atomic unique constraint.
  const existing = (await readRows('Responses')).find(r => r.submission_id === record.submission_id);
  if (!existing) await appendRow('Responses', record);
  res.json({ ok: true, submissionId: record.submission_id });
});
