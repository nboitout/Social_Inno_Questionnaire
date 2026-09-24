import { cp, mkdir, rm } from 'node:fs/promises';
import { survey, getQuestions } from '../public/survey-config.js';
import { copy } from '../public/i18n.js';
for(const lang of ['en','ro']){
 const qs=getQuestions({},lang);
 if(qs.length!==8||new Set(qs.map(q=>q.id)).size!==8)throw new Error('v1 requires exactly eight unique questions');
 for(const q of survey.questions)if(!q.label[lang]||q.helper&&!q.helper[lang]||q.options?.some(o=>!o.label[lang]||o.description&&!o.description[lang]))throw new Error(`Missing ${lang} question translation`);
 for(const [key,value] of Object.entries(copy))if(!value[lang])throw new Error(`Missing ${lang} UI translation: ${key}`);
}
await mkdir('dist',{recursive:true});await rm('dist/survey-en.js',{force:true});await cp('public','dist',{recursive:true});
console.log('Built bilingual v1 questionnaire: 8 questions, 3 sections, English administration.');
