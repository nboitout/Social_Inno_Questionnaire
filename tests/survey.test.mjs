import test from 'node:test';
import assert from 'node:assert/strict';
import {survey,getQuestions,answerError,toggleSelection,requiredQuestion} from '../public/survey-config.js';
import {validateSubmission} from '../api/submit.js';
import {summarize} from '../api/admin.js';
import {fixture} from './fixtures.mjs';
import {responseHeaders,validateHeaders,legacyHeaders} from '../lib/store.js';
const q=id=>getQuestions().find(q=>q.id===id);
for(const language of ['en','ro'])test(`${language}: eight-question payload stores separate structured answers`,()=>{
 const data=fixture(language),record=validateSubmission(data);
 assert.equal(getQuestions().length,8);assert.equal(survey.sections.length,3);
 assert.equal(record.survey_version,'2026-09-v1');assert.equal(record.response_language,language);
 assert.deepEqual(JSON.parse(record.ai_tools),data.answers.ai_tools);assert.deepEqual(JSON.parse(record.desktop_ai_apps),data.answers.desktop_ai_apps);
 assert.deepEqual(JSON.parse(record.ai_tasks_last_3_months),data.answers.ai_tasks_last_3_months);
 assert.equal(record.tedious_task,data.answers.tedious_task);assert.deepEqual(JSON.parse(record.answers_json),data.answers);
 assert.ok(survey.questions.every(q=>responseHeaders.includes(q.id)));
});
test('tool access and Other fields are required and stale unselected details are rejected',()=>{
 const data=fixture(),question=q('ai_tools');
 for(const bad of [{selected:['chatgpt'],access:{}},{selected:['chatgpt'],access:{chatgpt:'bogus'}},{selected:['other'],access:{other:'free'},other:' '},{selected:['none','claude'],access:{claude:'free'}},{selected:['claude'],access:{claude:'free',chatgpt:'free'}},{selected:['none'],access:{},other:'stale'}])assert.ok(answerError(question,bad,data.answers));
 assert.equal(answerError(question,{selected:['chatgpt','other'],access:{chatgpt:'free',other:'provided_by_company'},other:'Local AI'},data.answers),'');
});
test('exclusive choices clear selections, access and Other details',()=>{
 let value={selected:['chatgpt','other'],access:{chatgpt:'free',other:'paid_personally'},other:'Test AI'};
 value=toggleSelection(q('ai_tools'),value,'none',true);assert.deepEqual(value,{selected:['none'],access:{}});
 value=toggleSelection(q('ai_tools'),value,'claude',true);assert.deepEqual(value,{selected:['claude'],access:{}});
 let apps={selected:['other'],other:'Local app'};
 apps=toggleSelection(q('desktop_ai_apps'),apps,'browser_only',true);assert.deepEqual(apps,{selected:['browser_only']});
 apps=toggleSelection(q('desktop_ai_apps'),apps,'no_computer_ai',true);assert.deepEqual(apps,{selected:['no_computer_ai']});
 assert.deepEqual(toggleSelection(q('ai_tasks_last_3_months'),['none'],'analyse_data',true),['analyse_data']);
 assert.ok(answerError(q('desktop_ai_apps'),{selected:['browser_only','no_computer_ai']}));
});
test('non-users can skip working style; other respondents must select one; eight questions remain visible',()=>{
 const data=fixture('en',true);assert.equal(requiredQuestion(q('ai_working_mode'),data.answers),false);assert.doesNotThrow(()=>validateSubmission(data));
 const user=fixture();delete user.answers.ai_working_mode;assert.throws(()=>validateSubmission(user),{status:400});
 assert.equal(getQuestions(data.answers).length,8);
});
test('server rejects invalid, old-version, extra, duplicate and oversized answers',()=>{
 const make=()=>fixture();let data=make();data.version='2026-09-draft-1';assert.throws(()=>validateSubmission(data),{code:'version'});
 for(const edit of [d=>d.answers.extra='x',d=>d.answers.ai_usage_frequency='bogus',d=>d.answers.ai_tasks_last_3_months=['translate','translate'],d=>d.answers.tedious_task=' ',d=>d.answers.workshop_expectation='x'.repeat(3001),d=>d.consent=false,d=>d.language='xx',d=>d.answers.desktop_ai_apps={selected:['other'],other:''}]){data=make();edit(data);assert.throws(()=>validateSubmission(data),{status:400});}
});
test('schema extensions retain older fields and tolerate future extra columns',()=>{
 assert.deepEqual(responseHeaders.slice(0,legacyHeaders.length),legacyHeaders);
 assert.doesNotThrow(()=>validateHeaders(legacyHeaders,'Responses'));
 assert.throws(()=>validateHeaders(legacyHeaders,'Responses',true));
 assert.doesNotThrow(()=>validateHeaders([...responseHeaders,'future_question'],'Responses',true));
 assert.throws(()=>validateHeaders([...responseHeaders,'ai_tools'],'Responses',true));
});
test('analytics keep frequency separate and deduplicate retry IDs',()=>{
 const record=validateSubmission(fixture()),legacy={...record,submission_id:'old',survey_version:'2026-09-draft-1'};
 const events=[{event_id:'v',session_id:record.session_id,event:'visit'},{event_id:'v',session_id:record.session_id,event:'visit'},{event_id:'s',session_id:record.session_id,event:'start'}];
 const m=summarize([record,record,legacy],events);assert.equal(m.responses,2);assert.equal(m.currentResponses,1);assert.equal(m.legacyResponses,1);assert.equal(m.frequency.daily,1);assert.equal(m.visits,1);assert.equal(m.completion,100);assert.equal(summarize([],[]).completion,null);
});
