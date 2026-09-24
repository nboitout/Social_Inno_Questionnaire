import { cp, mkdir, rm } from 'node:fs/promises';
import { survey, getQuestions, mainQuestionCount } from '../public/survey-config.js';
import { copy } from '../public/i18n.js';
for(const lang of ['en','ro']){
 const qs=getQuestions({},lang);
 if(mainQuestionCount!==10||new Set(survey.questions.map(q=>q.id)).size!==survey.questions.length)throw new Error('v4 requires ten main questions and unique follow-up IDs');
 for(const q of survey.questions)if(!q.label[lang]||q.helper&&!q.helper[lang]||q.options?.some(o=>!o.label[lang]||o.description&&!o.description[lang]))throw new Error(`Missing ${lang} question translation`);
 for(const [key,value] of Object.entries(copy))if(!value[lang])throw new Error(`Missing ${lang} UI translation: ${key}`);
}
await mkdir('dist',{recursive:true});await rm('dist/survey-en.js',{force:true});await cp('public','dist',{recursive:true});
console.log('Built bilingual v4 questionnaire: 10 questions with conditional follow-ups, 4 sections, English administration.');
