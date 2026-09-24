import test from 'node:test';
import assert from 'node:assert/strict';
import {survey,getQuestions,answerError,toggleSelection,requiredQuestion,pruneAnswers,formatAnswer} from '../public/survey-config.js';
import {validateSubmission} from '../api/submit.js';
import {summarize} from '../api/admin.js';
import {fixture} from './fixtures.mjs';
import {responseHeaders,validateHeaders,legacyHeaders} from '../lib/store.js';
const q=id=>getQuestions().find(q=>q.id===id);
for(const language of ['en','ro'])test(`${language}: ten-question payload stores separate structured answers`,()=>{
 const data=fixture(language),record=validateSubmission(data);
 assert.equal(getQuestions().length,10);assert.equal(survey.sections.length,4);
 assert.equal(record.survey_version,'2026-09-data-decisions-v3');assert.equal(record.response_language,language);
 assert.deepEqual(JSON.parse(record.ai_tools),data.answers.ai_tools);assert.deepEqual(JSON.parse(record.ai_data_access),data.answers.ai_data_access);
 assert.deepEqual(JSON.parse(record.ai_tasks_last_3_months),data.answers.ai_tasks_last_3_months);
 assert.equal(record.business_data_question,data.answers.business_data_question);assert.deepEqual(JSON.parse(record.answers_json),data.answers);
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
 assert.deepEqual(toggleSelection(q('ai_tasks_last_3_months'),['none'],'analyse_data',true),['analyse_data']);
});
test('non-users can skip working style; other respondents must select one; ten main questions remain visible',()=>{
 const data=fixture('en',true);assert.equal(requiredQuestion(q('ai_working_mode'),data.answers),false);assert.doesNotThrow(()=>validateSubmission(data));
 const user=fixture();delete user.answers.ai_working_mode;assert.throws(()=>validateSubmission(user),{status:400});
 assert.equal(getQuestions(data.answers).filter(q=>!q.condition).length,10);
});
test('server rejects invalid, old-version, extra, duplicate and oversized answers',()=>{
 const make=()=>fixture();let data=make();data.version='2026-09-draft-1';assert.throws(()=>validateSubmission(data),{code:'version'});
 for(const edit of [d=>d.answers.extra='x',d=>d.answers.ai_usage_frequency='bogus',d=>d.answers.ai_tasks_last_3_months=['translate','translate'],d=>d.answers.business_data_question=' ',d=>d.answers.workshop_other_expectation='x'.repeat(3001),d=>d.consent=false,d=>d.language='xx',d=>d.answers.ai_data_access=['invalid']]){data=make();edit(data);assert.throws(()=>validateSubmission(data),{status:400});}
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

test('participant identity is required, bounded, trimmed and stored separately',()=>{
 const data=fixture();data.participant.first_name=' Ana ';const record=validateSubmission(data);assert.equal(record.first_name,'Ana');assert.equal(record.family_name,'Popescu');assert.equal(record.company_name,'Exemplu SRL');assert.equal(JSON.parse(record.answers_json).first_name,undefined);
 for(const value of [undefined,null,[],{}, {...data.participant,first_name:' '},{...data.participant,family_name:42},{...data.participant,company_name:'x'.repeat(201)},{...data.participant,first_name:'x'.repeat(101)},{...data.participant,extra:'x'}])assert.throws(()=>validateSubmission({...data,participant:value}),{status:400});
 assert.throws(()=>validateHeaders(responseHeaders.filter(h=>h!=='first_name'),'Responses',true));assert.doesNotThrow(()=>validateHeaders(responseHeaders.filter(h=>h!=='first_name'),'Responses'));
});

test('conditional workshop questions appear only when applicable and stale answers are removed',()=>{
 const data=fixture();data.answers.data_to_decisions_interest='another_topic';assert.throws(()=>validateSubmission(data),{status:400});data.answers.workshop_preferred_topic='AI for marketing';data.answers.workshop_dataset_type={selected:['sales','other'],other:'Warranty claims'};let record=validateSubmission(data);assert.equal(record.workshop_preferred_topic,'AI for marketing');assert.deepEqual(JSON.parse(record.workshop_dataset_type),data.answers.workshop_dataset_type);
 for(const readiness of ['yes','probably','maybe']){data.answers.workshop_dataset_readiness=readiness;assert.ok(getQuestions(data.answers).some(q=>q.id==='workshop_dataset_type'));}
 data.answers.workshop_dataset_readiness='cannot_use_company_data';data.answers.data_to_decisions_interest='useful';assert.throws(()=>validateSubmission(data),{status:400});data.answers=pruneAnswers(data.answers);assert.equal(data.answers.workshop_preferred_topic,undefined);assert.equal(data.answers.workshop_dataset_type,undefined);assert.doesNotThrow(()=>validateSubmission(data));
 data.answers.workshop_other_expectation='';assert.equal(JSON.parse(validateSubmission(data).answers_json).workshop_other_expectation,null);
 data.answers.workshop_dataset_readiness='maybe';assert.doesNotThrow(()=>validateSubmission(data));data.answers.workshop_dataset_type={selected:['other'],other:''};assert.throws(()=>validateSubmission(data),{status:400});
});
test('unchanged initial questions preserve v1 wording and archived records retain old questions',async()=>{
 const old=(await import('../public/survey-v1.js')).survey;
 const english=value=>JSON.parse(JSON.stringify(value,(key,v)=>key==='ro'?undefined:v));
 for(const i of [0,1,3,4,5])for(const key of ['id','label','type','options'])assert.deepEqual(english(survey.questions[i][key]),english(old.questions[i][key]));
 assert.equal(old.questions.length,8);assert.ok(responseHeaders.includes('tedious_task'));assert.ok(responseHeaders.includes('workshop_expectation'));
});

test('Q3 accepts combined file sources, stores them and preserves the previous questionnaire',async()=>{
 const data=fixture();let value=toggleSelection(q('ai_data_access'),[],'cloud_storage',true);
 value=toggleSelection(q('ai_data_access'),value,'local_files',true);value=toggleSelection(q('ai_data_access'),value,'manual_upload',true);
 data.answers.ai_data_access=value;const record=validateSubmission(data);
 assert.deepEqual(JSON.parse(record.ai_data_access),['cloud_storage','local_files','manual_upload']);
 assert.ok(formatAnswer(getQuestions().find(q=>q.id==='ai_data_access'),value).includes('on my computer'));
 assert.ok(answerError(q('ai_data_access'),[]));assert.ok(answerError(q('ai_data_access'),['local_files','local_files']));
 const old=(await import('../public/survey-v2.js')).survey;assert.equal(old.questions[2].id,'desktop_ai_apps');assert.notEqual(old.version,survey.version);
 assert.ok(responseHeaders.includes('desktop_ai_apps'));assert.equal(responseHeaders.at(-1),'ai_data_access');
});
