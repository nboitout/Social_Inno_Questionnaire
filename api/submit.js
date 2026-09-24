import { route, method, sameOrigin, body, uuid, HttpError } from '../lib/http.js';
import { live, appendRow, readRows } from '../lib/store.js';
import { survey, getQuestions, answerError } from '../public/survey-config.js';
import { text } from '../public/i18n.js';
function fail(message,code='validation',questionId){const error=new HttpError(400,message);error.code=code;error.questionId=questionId;throw error;}
export function validateSubmission(data) {
 const language=data.language==='ro'?'ro':'en';
 if(data.version!==survey.version)fail(text('versionError',language),'version');
 if(!uuid(data.submissionId)||!uuid(data.sessionId)||data.consent!==true||!['en','ro'].includes(data.language))fail(text('invalid',language));
 if(!data.answers||Array.isArray(data.answers)||typeof data.answers!=='object')fail(text('invalid',language));
 const questions=getQuestions(data.answers,language);
 if(Object.keys(data.answers).some(id=>!questions.some(q=>q.id===id)))fail(text('invalid',language));
 for(const q of questions){const error=answerError(q,data.answers[q.id],data.answers,language);if(error)fail(error,'validation',q.id);}
 if(!Number.isFinite(data.durationSeconds)||data.durationSeconds<0||data.durationSeconds>604800)fail(text('invalid',language));
 const answers=Object.fromEntries(questions.map(q=>[q.id,data.answers[q.id]??null]));
 return {submission_id:data.submissionId,submitted_at:new Date().toISOString(),survey_version:survey.version,branch:'',session_id:data.sessionId,duration_seconds:Math.round(data.durationSeconds),response_language:language,...Object.fromEntries(questions.map(q=>[q.id,q.type==='multi'?JSON.stringify(answers[q.id]):answers[q.id]??''])),answers_json:JSON.stringify(answers)};
}
export default route(async(req,res)=>{
 method(req,'POST');sameOrigin(req);
 if(!live()){const error=new HttpError(409,'Response collection is not currently open.');error.code='closed';throw error;}
 const record=validateSubmission(body(req));
 // Sheets has no atomic uniqueness constraint; deduplicate normal retries by ID.
 const existing=(await readRows('Responses')).find(r=>r.submission_id===record.submission_id);
 if(!existing)await appendRow('Responses',record);
 res.json({ok:true,submissionId:record.submission_id});
},'The response could not be saved. Please try again.');
