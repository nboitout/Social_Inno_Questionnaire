import test from 'node:test';
import assert from 'node:assert/strict';
import {generateKeyPairSync,randomUUID} from 'node:crypto';
import submit from '../api/submit.js';
import visit from '../api/visit.js';
import {readRows,responseHeaders,appendRow} from '../lib/store.js';
import {fixture} from './fixtures.mjs';
const req=data=>({method:'POST',headers:{host:'localhost',origin:'http://localhost','content-type':'application/json'},body:data});
const response=()=>({headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(data){this.data=data;}});
test('live submission persists all eight answers and retries do not duplicate',async()=>{
 process.env.DATA_MODE='demo';process.env.SURVEY_LIVE='true';
 try{const data=fixture();data.answers.tedious_task='=SUM(1,2)';let res=response();await submit(req(data),res);assert.equal(res.data.ok,true);res=response();await submit(req(data),res);const rows=await readRows('Responses');assert.equal(rows.length,1);assert.equal(rows[0].tedious_task,'=SUM(1,2)');assert.equal(JSON.parse(rows[0].ai_tools).access.chatgpt,'paid_personally');
 res=response();await submit(req({...data,answers:{}}),res);assert.equal(res.code,400);assert.equal(res.data.code,'validation');
 res=response();await visit(req({eventId:randomUUID(),sessionId:data.sessionId,event:'visit'}),res);assert.equal(res.data.recorded,true);
 }finally{delete process.env.DATA_MODE;delete process.env.SURVEY_LIVE;}
});
test('closed collection and foreign origins cannot write',async()=>{
 process.env.DATA_MODE='demo';delete process.env.SURVEY_LIVE;
 try{let res=response();await submit(req(fixture()),res);assert.equal(res.code,409);assert.equal(res.data.code,'closed');const foreign=req(fixture());foreign.headers.origin='https://foreign.invalid';res=response();await submit(foreign,res);assert.equal(res.code,403);}finally{delete process.env.DATA_MODE;}
});
test('storage failure cannot produce a false success',async()=>{
 process.env.SURVEY_LIVE='true';process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL='test@example.invalid';process.env.GOOGLE_PRIVATE_KEY='invalid-test-key';
 try{const res=response();await submit(req(fixture()),res);assert.equal(res.code,503);assert.equal(res.data.ok,undefined);}finally{delete process.env.SURVEY_LIVE;delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;delete process.env.GOOGLE_PRIVATE_KEY;}
});
test('Google Sheets adapter writes RAW structured columns, reads them back and tolerates future headers',async()=>{
 const oldFetch=global.fetch;const {privateKey}=generateKeyPairSync('rsa',{modulusLength:2048});
 process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL='test@example.invalid';process.env.GOOGLE_PRIVATE_KEY=privateKey.export({type:'pkcs8',format:'pem'});process.env.SURVEY_LIVE='true';
 const headers=[...responseHeaders,'future_question'],rows=[];let appendCount=0;
 global.fetch=async(url,options)=>{
  if(url==='https://oauth2.googleapis.com/token')return Response.json({access_token:'test-token',expires_in:3600});
  if(url.includes(':append?')){assert.ok(url.includes('valueInputOption=RAW'));const values=JSON.parse(options.body).values;rows.push(...values);appendCount++;return Response.json({updates:{updatedRows:1}});}
  if(decodeURIComponent(url).includes('Responses!1:1'))return Response.json({values:[headers]});
  if(decodeURIComponent(url).includes('Responses!A2:'))return Response.json({values:rows});
  throw new Error('Unexpected request');
 };
 try{const payload=fixture('ro');let res=response();await submit(req(payload),res);assert.equal(res.data.ok,true);res=response();await submit(req(payload),res);assert.equal(appendCount,1);const [saved]=await readRows('Responses');assert.deepEqual(JSON.parse(saved.answers_json),payload.answers);assert.equal(saved.response_language,'ro');assert.equal(saved.first_name,payload.participant.first_name);assert.equal(saved.family_name,payload.participant.family_name);assert.equal(saved.company_name,payload.participant.company_name);assert.equal(saved.future_question,'');}
 finally{global.fetch=oldFetch;delete process.env.SURVEY_LIVE;delete process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;delete process.env.GOOGLE_PRIVATE_KEY;}
});
