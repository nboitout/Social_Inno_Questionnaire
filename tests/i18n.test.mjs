import test from 'node:test';
import assert from 'node:assert/strict';
import { survey } from '../public/survey-config.js';
import { translateSurvey } from '../public/survey-en.js';
import { t, html, setLanguage } from '../public/i18n.js';
test('all English branches preserve Romanian question IDs, option values and routing', () => {
  const en = translateSurvey(survey);
  for (const branch of Object.keys(survey.branches)) {
    const roQuestions = [...survey.core, ...survey.branches[branch].questions, ...survey.closing];
    const enQuestions = [...en.core, ...en.branches[branch].questions, ...en.closing];
    assert.equal(enQuestions.length, 17);
    enQuestions.forEach((q,i) => { assert.equal(q.id, roQuestions[i].id); assert.notEqual(q.label, roQuestions[i].label); assert.deepEqual(q.options?.map(o=>o.value),roQuestions[i].options?.map(o=>o.value)); });
  }
  assert.equal(translateSurvey(survey,'ro'),survey);
});
test('English is the translation default, Romanian can be selected, and respondent text is unchanged', () => {
  setLanguage('en'); assert.equal(t('Continuă'),'Continue');
  const respondentText='Compania ta <script>alert(1)</script>';
  assert.equal(html`<p>Compania ta: ${respondentText}</p>`, `<p>Your company: ${respondentText}</p>`);
  assert.equal(t('Verifică răspunsurile înainte de '),'Review your answers before ');
  setLanguage('ro'); assert.equal(t('Continuă'),'Continuă');
  setLanguage('en');
});
