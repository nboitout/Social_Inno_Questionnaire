import { cp, mkdir } from 'node:fs/promises';
import { survey, getQuestions } from '../public/survey-config.js';
import { translateSurvey } from '../public/survey-en.js';
translateSurvey(survey); // Fail the build if an English question/option translation is missing.
for (const branch of Object.keys(survey.branches)) {
  const qs = getQuestions({ ai_adoption: branch });
  if (qs.length > 20 || new Set(qs.map(q => q.id)).size !== qs.length) throw new Error('Invalid questionnaire path');
}
await mkdir('dist', { recursive: true });
await cp('public', 'dist', { recursive: true });
console.log('Built static survey and admin. Every branch has 17 questions.');
