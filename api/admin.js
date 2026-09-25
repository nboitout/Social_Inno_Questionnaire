import { route, method, HttpError } from '../lib/http.js';
import { requireAdmin } from '../lib/auth.js';
import { readRows, uniqueRows, configured, live, demoMode } from '../lib/store.js';
import { survey } from '../public/survey-config.js';
export function summarize(responses,events){
 responses=uniqueRows(responses,'submission_id');events=uniqueRows(events,'event_id');
 const visits=events.filter(e=>e.event==='visit'),sessions=new Set(visits.map(e=>e.session_id)),starts=new Set(events.filter(e=>e.event==='start').map(e=>e.session_id));
 const completed=new Set(responses.map(r=>r.session_id).filter(id=>starts.has(id))),untracked=responses.filter(r=>!starts.has(r.session_id)).length;
 const current=responses.filter(r=>r.survey_version===survey.version);
 const frequency=Object.fromEntries(survey.questions.find(q=>q.id==='ai_usage_frequency').options.map(o=>[o.value,current.filter(r=>r.ai_usage_frequency===o.value).length]));
 return {visits:visits.length,sessions:sessions.size,starts:starts.size,responses:responses.length,currentResponses:current.length,legacyResponses:responses.length-current.length,completedStarts:completed.size,untracked,completion:starts.size?Math.round(completed.size/starts.size*100):null,frequency};
}
export default route(async(req,res)=>{
 method(req,'GET');requireAdmin(req);
 let responses=[],events=[];
 // Signed-in admins see the storage failure category (never credentials) instead of a generic outage.
 if(configured())try{[responses,events]=await Promise.all([readRows('Responses'),readRows('Visits')]);}catch(error){console.error('API failure:',error.message);throw new HttpError(503,`Signed in, but Google Sheets could not be read: ${error.message}.`);}
 res.json({configured:configured(),live:live(),demo:demoMode(),metrics:summarize(responses,events),responses:uniqueRows(responses,'submission_id').reverse(),events:uniqueRows(events,'event_id').reverse().slice(0,100)});
},'The admin service is temporarily unavailable. Please try again.');
