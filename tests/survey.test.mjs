import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import { survey, getQuestions, answerError } from '../public/survey-config.js';
import { validateSubmission } from '../api/submit.js';
import { summarize } from '../api/admin.js';
import { requireAdmin, makeSession, passwordMatches } from '../lib/auth.js';
import { sameOrigin } from '../lib/http.js';
import { live, demoMode, responseHeaders } from '../lib/store.js';
function fixture(branch) {
  const answers = { ai_adoption: branch };
  for (const q of getQuestions(answers)) if (q.id !== 'ai_adoption') answers[q.id] = q.type === 'text' ? '' : q.type === 'multi' ? [q.options[0].value] : q.options[0].value;
  return { submissionId: randomUUID(),sessionId: randomUUID(),version:survey.version,consent:true,durationSeconds:120,answers };
}
for (const branch of Object.keys(survey.branches)) test(`${branch}: complete path accepts 17 answers and rejects missing/foreign answers`, () => {
  const payload = fixture(branch), qs = getQuestions(payload.answers);
  assert.equal(qs.length,17); assert.equal(new Set(qs.map(q=>q.id)).size,17);
  assert.equal(validateSubmission(payload).branch,branch);
  assert.ok(qs.every(q => responseHeaders.includes(q.id)));
  const withForeign = {...payload,answers:{...payload.answers,foreign:'x'}};
  assert.throws(()=>validateSubmission(withForeign),{status:400});
  delete payload.answers.role; assert.throws(()=>validateSubmission(payload),{status:400});
});
test('invalid selections, duplicate multi choices and long comments fail validation',()=>{
  const multi = survey.branches.using.questions[0];
  assert.ok(answerError(multi,[])); assert.ok(answerError(multi,['bogus'])); assert.ok(answerError(multi,['marketing','marketing']));
  assert.ok(answerError(survey.closing.at(-1),'a'.repeat(1501)));
  const payload=fixture('using'); payload.consent=false; assert.throws(()=>validateSubmission(payload),{status:400});
});
test('untrusted routing cannot select an inherited branch',()=>{
  const payload=fixture('using'); payload.answers.ai_adoption='__proto__'; assert.throws(()=>validateSubmission(payload),{status:400});
});
test('metrics deduplicate retry IDs and count session completion once',()=>{
  const responses=[{submission_id:'a',session_id:'s',branch:'using'},{submission_id:'a',session_id:'s',branch:'using'},{submission_id:'b',session_id:'s',branch:'using'}];
  const events=[{event_id:'v',session_id:'s',event:'visit'},{event_id:'v',session_id:'s',event:'visit'},{event_id:'t',session_id:'s',event:'start'}];
  const m=summarize(responses,events); assert.equal(m.responses,2);assert.equal(m.visits,1);assert.equal(m.completion,100);assert.equal(summarize([],[]).completion,null);
});
test('admin rejects absent/tampered sessions, validates password and invalidates rotated password',()=>{
  process.env.ADMIN_PASSWORD='test-password-at-least-24-characters';process.env.SESSION_SECRET='test-secret-at-least-32-characters-long';
  assert.ok(passwordMatches(process.env.ADMIN_PASSWORD));assert.equal(passwordMatches('wrong'),false);
  assert.throws(()=>requireAdmin({headers:{}}),{status:401});
  const token=makeSession(); requireAdmin({headers:{cookie:`social_inno_admin=${token}`}});
  assert.throws(()=>requireAdmin({headers:{cookie:`social_inno_admin=${token}bad`}}),{status:401});
  process.env.ADMIN_PASSWORD+='rotated';assert.throws(()=>requireAdmin({headers:{cookie:`social_inno_admin=${token}`}}),{status:401});
  delete process.env.ADMIN_PASSWORD;delete process.env.SESSION_SECRET;
});
test('cross-origin writes are rejected',()=>{
  sameOrigin({headers:{origin:'https://survey.example',host:'survey.example'}});
  assert.throws(()=>sameOrigin({headers:{origin:'https://other.example',host:'survey.example'}}),{status:403});
});
test('draft questionnaire cannot collect even with live env enabled; production cannot use demo storage',()=>{
  process.env.SURVEY_LIVE='true';process.env.DATA_MODE='demo';assert.equal(live(),false);
  process.env.VERCEL='1';assert.equal(demoMode(),false);
  delete process.env.VERCEL;delete process.env.SURVEY_LIVE;delete process.env.DATA_MODE;
});
