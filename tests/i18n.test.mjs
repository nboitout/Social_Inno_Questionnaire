import test from 'node:test';
import assert from 'node:assert/strict';
import {survey,getQuestions,answerError,formatAnswer} from '../public/survey-config.js';
import {copy,text} from '../public/i18n.js';
import {fixture} from './fixtures.mjs';
test('EN and RO stay synchronized, including option descriptions and helper copy',()=>{
 const en=getQuestions({},'en'),ro=getQuestions({},'ro');
 for(let i=0;i<en.length;i++){assert.equal(en[i].id,ro[i].id);assert.notEqual(en[i].label,ro[i].label);assert.deepEqual(en[i].options?.map(o=>o.value),ro[i].options?.map(o=>o.value));}
 for(const q of survey.questions){assert.ok(q.label.en&&q.label.ro);if(q.helper)assert.ok(q.helper.en&&q.helper.ro);for(const o of q.options||[])if(o.description)assert.ok(o.description.en&&o.description.ro);}
 for(const key of Object.keys(copy))assert.ok(text(key,'en')&&text(key,'ro'));
});
test('validation and access labels are bilingual while user text remains unchanged',()=>{
 const tools=getQuestions()[0];assert.notEqual(answerError(tools,undefined,{},'en'),answerError(tools,undefined,{},'ro'));
 const data=fixture();assert.match(formatAnswer(tools,data.answers.ai_tools),/Paid personally/);
 const q=getQuestions({},'ro').find(q=>q.id==='tedious_task');const input='Raport săptămânal <script>example</script>';assert.equal(formatAnswer(q,input,'en'),input);
});
