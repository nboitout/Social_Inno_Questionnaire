import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import submit from '../api/submit.js';
import visit from '../api/visit.js';
import { survey, getQuestions } from '../public/survey-config.js';
import { readRows } from '../lib/store.js';
function response() { return { headers:{}, setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(data){this.data=data;} }; }
const req = data => ({ method:'POST',headers:{host:'localhost',origin:'http://localhost','content-type':'application/json'},body:data });
test('live handlers persist to isolated demo storage, deduplicate retries and reject incomplete answers',async()=>{
  const original=survey.draft; survey.draft=false;process.env.DATA_MODE='demo';process.env.SURVEY_LIVE='true';
  try {
    const answers={ai_adoption:'using'};
    for (const q of getQuestions(answers)) if(q.id!=='ai_adoption') answers[q.id]=q.type==='text'?'=SUM(1,2)':q.type==='multi'?[q.options[0].value]:q.options[0].value;
    const data={submissionId:randomUUID(),sessionId:randomUUID(),version:survey.version,consent:true,durationSeconds:200,answers};
    let res=response(); await submit(req(data),res); assert.equal(res.data.ok,true);
    res=response();await submit(req(data),res); assert.equal((await readRows('Responses')).length,1);
    assert.equal((await readRows('Responses'))[0].comment,'=SUM(1,2)');
    res=response();await submit(req({...data,submissionId:randomUUID(),answers:{}}),res);assert.equal(res.code,400);
    res=response();await visit(req({eventId:randomUUID(),sessionId:data.sessionId,event:'visit'}),res);assert.equal(res.data.recorded,true);
    assert.equal((await readRows('Visits')).length,1);
  } finally {survey.draft=original;delete process.env.DATA_MODE;delete process.env.SURVEY_LIVE;}
});
test('storage failure cannot produce a false successful submission',async()=>{
  const original=survey.draft;survey.draft=false;process.env.SURVEY_LIVE='true';process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL='test@example.invalid';process.env.GOOGLE_PRIVATE_KEY='invalid-test-key';
  const answers={ai_adoption:'not_yet'};
  for(const q of getQuestions(answers)) if(q.id!=='ai_adoption') answers[q.id]=q.type==='text'?'':q.type==='multi'?[q.options[0].value]:q.options[0].value;
  try { const res=response();await submit(req({submissionId:randomUUID(),sessionId:randomUUID(),version:survey.version,consent:true,durationSeconds:120,answers}),res);assert.equal(res.code,503);assert.equal(res.data.ok,undefined); }
  finally {survey.draft=original;delete process.env.SURVEY_LIVE;delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;delete process.env.GOOGLE_PRIVATE_KEY;}
});
