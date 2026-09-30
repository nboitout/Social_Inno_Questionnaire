import test from 'node:test';
import assert from 'node:assert/strict';
import admin from '../api/admin.js';
import { makeSession } from '../lib/auth.js';
import { appendRow, readRows } from '../lib/store.js';
import { survey } from '../public/survey-config.js';

test('admin metrics and every returned row use the inclusive Bucharest reporting cutoff',async()=>{
 const settings={ADMIN_PASSWORD:'admin-period-test-password',SESSION_SECRET:'s'.repeat(32),DATA_MODE:'demo',SURVEY_LIVE:'true'};
 const previous=Object.fromEntries(Object.keys(settings).map(key=>[key,process.env[key]]));
 Object.assign(process.env,settings);
 try{
  const req={method:'GET',headers:{cookie:`social_inno_admin=${makeSession()}`}};
  const load=async()=>{
   const res={headers:{},setHeader(key,value){this.headers[key]=value;},status(code){this.code=code;return this;},json(data){this.data=data;}};
   await admin(req,res);
   assert.equal(res.code,undefined);
   assert.equal(res.headers['Cache-Control'],'no-store');
   return res.data;
  };
  const response=(id,time,session=id)=>({submission_id:id,submitted_at:time,session_id:session,survey_version:survey.version,ai_usage_frequency:'daily'});
  const event=(id,time,kind,session=id)=>({event_id:id,recorded_at:time,session_id:session,event:kind,path:'/'});
  const before='2026-09-28T20:59:59.999Z';
  const boundary='2026-09-28T21:00:00.000Z';
  const localBoundary='2026-09-29T00:00:00+03:00';
  for(const [id,time] of [['old',before],['missing',''],['invalid','invalid']]){
   await appendRow('Responses',response(id,time));
   await appendRow('Visits',event(`${id}-visit`,time,'visit',id));
   await appendRow('Visits',event(`${id}-start`,time,'start',id));
  }
  let data=await load();
  assert.deepEqual(data.responses,[]);
  assert.deepEqual(data.events,[]);
  for(const key of ['responses','currentResponses','legacyResponses','visits','sessions','starts','completedStarts','untracked'])assert.equal(data.metrics[key],0,key);
  assert.equal(data.metrics.completion,null);

  const kept=[response('boundary',boundary),response('resumed','2026-09-29T10:00:00Z','old')];
  const legacy={...response('legacy','2026-09-29T10:01:00Z'),survey_version:'earlier-version'};
  for(const row of [...kept,legacy,kept[0]])await appendRow('Responses',row);
  const start=event('boundary-start',localBoundary,'start','boundary');
  for(const row of [event('boundary-visit',boundary,'visit','boundary'),start,start,event('later-start','2026-09-28T21:00:00.001Z','start','not-completed')])await appendRow('Visits',row);
  data=await load();
  assert.equal(data.reportingStart,'2026-09-29T00:00:00+03:00');
  assert.deepEqual(data.responses.map(row=>row.submission_id),['legacy','resumed','boundary']);
  assert.deepEqual(data.events.map(row=>row.event_id),['later-start','boundary-visit','boundary-start']);
  const {frequency,...metrics}=data.metrics;
  assert.deepEqual(metrics,{visits:1,sessions:1,starts:2,responses:3,currentResponses:2,legacyResponses:1,completedStarts:1,untracked:2,completion:50});
  assert.equal(frequency.daily,2);
  assert.equal(Object.values(frequency).reduce((sum,n)=>sum+n,0),2);
  assert.equal((await readRows('Responses')).length,7,'historical source responses remain intact');
  assert.equal((await readRows('Visits')).length,10,'historical source events remain intact');
 }finally{
  for(const [key,value] of Object.entries(previous))if(value===undefined)delete process.env[key];else process.env[key]=value;
 }
});
