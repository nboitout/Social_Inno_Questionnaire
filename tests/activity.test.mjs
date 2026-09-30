import test from 'node:test';
import assert from 'node:assert/strict';
import { randomUUID } from 'node:crypto';
import admin from '../api/admin.js';
import login from '../api/login.js';
import logout from '../api/logout.js';
import visit from '../api/visit.js';
import submit from '../api/submit.js';
import { makeSession } from '../lib/auth.js';
import { activityCookie, activityPreference } from '../lib/activity.js';
import { appendRow, readRows } from '../lib/store.js';
import { fixture } from './fixtures.mjs';

const response=()=>({headers:{},setHeader(k,v){this.headers[k]=v;},status(n){this.code=n;return this;},json(data){this.data=data;}});
const req=(method='GET',body={},cookie='')=>({method,body,headers:{host:'localhost',origin:'http://localhost','content-type':'application/json',cookie}});

test('complete activity history and durable browser exclusion',async()=>{
 const keys=['ADMIN_PASSWORD','SESSION_SECRET','DATA_MODE','SURVEY_LIVE'];
 const previous=Object.fromEntries(keys.map(key=>[key,process.env[key]]));
 Object.assign(process.env,{ADMIN_PASSWORD:'demo-password-for-tests',SESSION_SECRET:'s'.repeat(32),DATA_MODE:'demo',SURVEY_LIVE:'true'});
 try{
  const session=`social_inno_admin=${makeSession()}`;
  const excluded=activityCookie(true).split(';')[0],included=activityCookie(false).split(';')[0];
  assert.equal(activityPreference(req('GET',{},`unrelated=1;${excluded}`)),true);
  assert.equal(activityPreference(req('GET',{},'social_inno_activity_excluded=invalid')),null);
  for(let i=0;i<137;i++)await appendRow('Visits',{event_id:randomUUID(),session_id:randomUUID(),event:i%2?'start':'visit',recorded_at:new Date(Date.UTC(2026,8,29,0,i)).toISOString(),path:'/'});
  const events=await readRows('Visits');await appendRow('Visits',events[0]);
  let res=response();await admin(req('GET',{},session),res);
  assert.equal(res.data.events.length,137,'history must include events beyond the former 100-row cap');
  assert.equal(res.data.events[0].event_id,events[136].event_id);
  assert.equal(res.data.events.at(-1).event_id,events[0].event_id);
  assert.equal(res.data.activityExcluded,true);
  assert.match(res.headers['Set-Cookie'],/Max-Age=31536000/);
  assert.equal(res.data.metrics.visits,69);

  res=response();await login(req('POST',{password:process.env.ADMIN_PASSWORD}),res);
  assert.ok(res.headers['Set-Cookie'].some(c=>c.startsWith(excluded)));
  res=response();await login(req('POST',{password:process.env.ADMIN_PASSWORD},included),res);
  assert.equal(res.headers['Set-Cookie'].length,1,'login preserves explicit opt-in');
  res=response();await admin(req('GET',{},`${session}; ${included}`),res);
  assert.equal(res.data.activityExcluded,false);
  assert.equal(res.headers['Set-Cookie'],undefined);

  for(const event of ['visit','start']){
   res=response();await visit(req('POST',{eventId:randomUUID(),sessionId:randomUUID(),event},excluded),res);
   assert.deepEqual(res.data,{recorded:false,excluded:true});
  }
  assert.equal((await readRows('Visits')).length,138,'excluded events must never reach storage');
  res=response();await logout(req('POST',{},`${session}; ${excluded}`),res);
  assert.ok(!res.headers['Set-Cookie'].includes('social_inno_activity_excluded'),'sign-out leaves the preference intact');
  res=response();await visit(req('POST',{eventId:randomUUID(),sessionId:randomUUID(),event:'visit'},excluded),res);
  assert.equal(res.data.excluded,true,'exclusion requires no active admin session');
  res=response();await submit(req('POST',fixture(),excluded),res);
  assert.equal(res.data.ok,true,'exclusion must not block submitted responses');

  res=response();await admin(req('POST',{excludeActivity:false},session),res);
  assert.equal(res.data.activityExcluded,false);assert.ok(res.headers['Set-Cookie'].startsWith(included));
  res=response();await visit(req('POST',{eventId:randomUUID(),sessionId:randomUUID(),event:'visit'},included),res);
  assert.equal(res.data.recorded,true);
  res=response();await visit(req('POST',{eventId:randomUUID(),sessionId:randomUUID(),event:'visit'}),res);
  assert.equal(res.data.recorded,true,'ordinary participants are still counted');

  res=response();await admin(req('POST',{excludeActivity:true}),res);assert.equal(res.code,401);
  const foreign=req('POST',{excludeActivity:true},session);foreign.headers.origin='https://foreign.invalid';
  res=response();await admin(foreign,res);assert.equal(res.code,403);
  res=response();await admin(req('POST',{excludeActivity:'yes'},session),res);assert.equal(res.code,400);
  res=response();await admin(req('GET',{},excluded),res);assert.equal(res.code,401,'preference grants no admin access');
 }finally{for(const key of keys){if(previous[key]===undefined)delete process.env[key];else process.env[key]=previous[key];}}
});
