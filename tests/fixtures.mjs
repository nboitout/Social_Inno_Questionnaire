import {randomUUID} from 'node:crypto';
import {survey,getQuestions} from '../public/survey-config.js';
export function fixture(language='en',nonuser=false){
 const answers={};
 for(const q of getQuestions())answers[q.id]=q.type==='text'?'Prepare a weekly sales report and learn a practical workflow.':q.type==='single'?q.options[0].value:q.structured?{selected:[q.options[0].value],...(q.access?{access:{[q.options[0].value]:'paid_personally'}}:{})}:[q.options[0].value];
 if(nonuser){answers.ai_tools={selected:['none'],access:{}};answers.ai_usage_frequency='none';answers.desktop_ai_apps={selected:['no_computer_ai']};answers.ai_working_mode=null;answers.ai_tasks_last_3_months=['none'];}
 else answers.ai_usage_frequency='daily';
 return {submissionId:randomUUID(),sessionId:randomUUID(),version:survey.version,language,consent:true,durationSeconds:360,participant:{first_name:"Ana",family_name:"Popescu",company_name:"Exemplu SRL"},answers};
}
