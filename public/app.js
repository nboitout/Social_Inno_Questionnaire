import { survey as baseSurvey, answerError as rawAnswerError } from './survey-config.js';
import { translateSurvey } from './survey-en.js';
import { t, html, setLanguage } from './i18n.js';
let language = 'en';
try { language = localStorage.getItem('social-inno-language') === 'ro' ? 'ro' : 'en'; } catch {}
setLanguage(language);
let survey = translateSurvey(baseSurvey, language);
function getQuestions(answers = {}) { return [...survey.core, ...(survey.branches[answers.ai_adoption]?.questions || []), ...survey.closing]; }
function answerError(q, value) { return t(rawAnswerError(q, value)); }

const main = document.querySelector('main');
const KEY = 'social-inno-draft-v1';
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage = { get(key) { try { return localStorage.getItem(key); } catch { return null; } }, set(key, value) { try { localStorage.setItem(key, value); } catch {} }, remove(key) { try { localStorage.removeItem(key); } catch {} } };
let draft;
try { draft = JSON.parse(storage.get(KEY)); } catch {}
if (!draft || draft.version !== survey.version || Date.now() - draft.savedAt > 7 * 86400000) draft = null;
let answers = draft?.answers && typeof draft.answers === 'object' && !Array.isArray(draft.answers) ? draft.answers : {};
let position = Number.isInteger(draft?.position) ? Math.max(0, Math.min(draft.position, getQuestions(answers).length - 1)) : 0;
let sessionId;
try { sessionId = sessionStorage.getItem('social-inno-session') || crypto.randomUUID(); sessionStorage.setItem('social-inno-session', sessionId); } catch { sessionId = crypto.randomUUID(); }
let submissionId = draft?.submissionId || crypto.randomUUID();
let startedAt = draft?.startedAt || Date.now();
let page = 'home', config = { live: false }, busy = false, consent = false;
function save() { storage.set(KEY, JSON.stringify({ version: survey.version, answers, position, submissionId, startedAt, savedAt: Date.now() })); }
function reset() { answers = {}; position = 0; submissionId = crypto.randomUUID(); startedAt = Date.now(); consent = false; storage.remove(KEY); }
function focusTitle() { main.querySelector('h1,h2')?.focus(); window.scrollTo({ top: 0, behavior: 'instant' }); }
async function request(path, payload) {
  const response = await fetch(path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload), signal: AbortSignal.timeout(25000) });
  const data = await response.json(); if (!response.ok) throw new Error(data.error || t('Nu am putut salva răspunsul. Încearcă din nou.')); return data;
}
function track(event) {
  if (!config.live) return;
  try { if (event === 'start' && sessionStorage.getItem('social-inno-start')) return; } catch {}
  request('/api/visit', { eventId: crypto.randomUUID(), sessionId, event }).then(() => { if (event === 'start') try { sessionStorage.setItem('social-inno-start', '1'); } catch {} }).catch(() => {});
}
const previewBanner = () => !config.live ? t('<div class="preview-banner"><span class="status-dot"></span> PREVIZUALIZARE <span>Întrebări de lucru · răspunsurile nu sunt trimise</span></div>') : '';
function home() {
  main.innerHTML = html`${previewBanner()}<section class="hero"><div class="hero-copy"><div class="eyebrow"><span class="line"></span> STUDIU · IMM-URI DIN ROMÂNIA</div><h1 tabindex="-1">AI în afacerea ta.<br><span>Unde suntem.<br>Ce urmează.</span></h1><p class="hero-lead">De la primele încercări la decizii strategice.<br>Ajută-ne să înțelegem cum folosesc companiile din România inteligența artificială.</p><div class="hero-actions"><button class="primary" id="start">${Object.keys(answers).length ? t('Continuă chestionarul') : t('Începe chestionarul')} <span>↗</span></button><span class="time"><span>◷</span> Aproximativ 6–8 minute</span></div><div class="hero-facts"><span><b>${totalCount()}</b> întrebări pe parcurs</span><span><b>${Object.keys(survey.branches).length}</b> trasee adaptate</span><span>Fără nume sau email</span></div></div><div class="journey-art" aria-label="Parcurs: compania ta, etapa de adoptare AI, perspective și strategie"><div class="art-top"><span>FIECARE COMPANIE ARE<br>PROPRIUL PARCURS.</span><span class="art-asterisk">✳</span></div><div class="journey-node"><span class="node-number">01</span><div><small>PUNCTUL DE PLECARE</small><strong>Compania ta</strong></div><span>↘</span></div><div class="branch-lines"><span></span><span></span><span></span></div><div class="branch-cards"><div><span>↗</span><strong>Folosim</strong><small>AI zi de zi</small></div><div><span>◎</span><strong>Explorăm</strong><small>Idei și proiecte</small></div><div><span>✧</span><strong>Descoperim</strong><small>Primii pași</small></div></div><div class="join-line"></div><div class="journey-node final-node"><span class="node-number">03</span><div><small>PRIVIM ÎNAINTE</small><strong>Perspective & strategie</strong></div><span>↗</span></div><div class="art-bottom"><span>O EXPERIENȚĂ RELEVANTĂ PENTRU TINE</span><span>01 — 03</span></div></div></section><section class="intro-grid"><div><span class="eyebrow">DE CE ACEST STUDIU</span><h2>Experiența ta contează.<br>Indiferent de unde pornești.</h2></div><p>Folosiți deja AI, testați câteva idei sau încă vă întrebați de unde să începeți? Fiecare perspectivă ne ajută să înțelegem oportunitățile, provocările și sprijinul de care au nevoie IMM-urile.</p><div class="intro-note"><span>↳</span><p>Întrebările se adaptează la etapa companiei tale. Nu sunt necesare cunoștințe tehnice.</p></div></section><details class="privacy"><summary>Despre răspunsuri și confidențialitate</summary><p>Nu cerem numele, emailul sau denumirea companiei. Răspunsurile sunt păstrate în Google Sheets, iar accesul la rezultate este protejat. Folosim un identificator aleatoriu de sesiune pentru a număra vizitele și completările, fără a salva adresa IP în chestionar. Progresul rămâne în acest browser până la trimitere sau cel mult 7 zile. Evită să incluzi date personale în comentarii.</p>${!config.live ? t('<p><strong>Versiune de lucru:</strong> înainte de lansare vor fi completate informațiile despre organizator, contactul pentru date și perioada de păstrare.</p>') : ''}<button class="text-button" id="clear-draft">Șterge progresul din acest browser</button></details>`;
  document.querySelector('#start').onclick = () => { page = 'question'; track('start'); save(); render(); focusTitle(); };
  document.querySelector('#clear-draft').onclick = () => { reset(); home(); };
}
function branchCount() { return (survey.branches[answers.ai_adoption] || Object.values(survey.branches)[0]).questions.length; }
function totalCount() { return survey.core.length + branchCount() + survey.closing.length; }
function sectionFor(index) { return index < survey.core.length ? 0 : index < survey.core.length + branchCount() ? 1 : 2; }
function shell(content, index = position) {
  const section = sectionFor(index), branch = survey.branches[answers.ai_adoption];
  main.innerHTML = html`${previewBanner()}<div class="survey-layout"><aside class="survey-sidebar"><div class="eyebrow">PARCURSUL TĂU</div><h2>O imagine mai clară<br>despre AI.</h2><ol class="steps">${[[t('Compania ta'),t('Contextul în care lucrați')],[t('Experiența cu AI'),branch?.title || t('Un traseu adaptat')],[t('Ce urmează'),t('Perspective și strategie')]].map(([label, sub], i) => html`<li class="${i === section ? 'current' : i < section ? 'done' : ''}" ${i === section ? 'aria-current="step"' : ''}><span>${i < section ? '✓' : html`0${i+1}`}</span><div><strong>${label}</strong><small>${esc(sub)}</small></div></li>`).join('')}</ol><div class="sidebar-note">↳<p>Progresul se păstrează în acest browser. Poți reveni la întrebările anterioare oricând.</p></div><button id="home" class="text-button">← Înapoi la prezentare</button></aside><section class="question-panel">${content}</section></div>`;
  document.querySelector('#home').onclick = () => { page = 'home'; render(); focusTitle(); };
}
function question() {
  const qs = getQuestions(answers), q = qs[position];
  if (!q) { page = 'review'; return review(); }
  const total = totalCount();
  shell(html`<div class="progress-head"><span>ÎNTREBAREA ${String(position+1).padStart(2,'0')} / ${total}</span><span>${Math.round(position/total*100)}%</span></div><progress max="${total}" value="${position}" aria-label="Progres"></progress>${position === survey.core.length ? html`<div class="branch-notice">↳ Traseul tău: <strong>${esc(survey.branches[answers.ai_adoption]?.title)}</strong></div>` : ''}<div class="question-heading"><span class="eyebrow">${[t('COMPANIA TA'),t('EXPERIENȚA CU AI'),t('PERSPECTIVE ȘI STRATEGIE')][sectionFor(position)]}</span><h1 tabindex="-1" id="question-title">${esc(q.label)}</h1><p>${q.type === 'multi' ? t('Poți selecta mai multe variante.') : q.type === 'text' ? t('Opțional · maximum 1.500 de caractere. Nu include date personale.') : t('Selectează o singură variantă.')}</p></div><form id="question-form"><fieldset aria-labelledby="question-title">${q.type === 'text' ? html`<textarea id="answer" name="answer" maxlength="1500" rows="6" aria-label="${esc(q.label)}" placeholder="Perspectiva ta…">${esc(answers[q.id] || '')}</textarea>` : html`<div class="options">${q.options.map((o, i) => { const checked = q.type === 'multi' ? answers[q.id]?.includes(o.value) : answers[q.id] === o.value; return html`<label class="option ${checked ? 'selected' : ''}"><input id="option-${i}" type="${q.type === 'multi' ? 'checkbox' : 'radio'}" name="answer" value="${esc(o.value)}" ${checked ? 'checked' : ''}><span>${esc(o.label)}</span><span class="option-letter">${String.fromCharCode(65+i)}</span></label>`; }).join('')}</div>`}</fieldset><p class="error" id="error" role="alert"></p><div class="question-actions"><button type="button" class="secondary" id="back">← Înapoi</button><span class="optional-label">${q.required ? t('Răspuns necesar') : t('Răspuns opțional')}</span><button class="primary" type="submit">${position === qs.length-1 ? t('Verifică răspunsurile') : t('Continuă')} →</button></div></form>`);
  const form = document.querySelector('form');
  form.oninput = () => {
    const oldBranch = answers.ai_adoption;
    answers[q.id] = q.type === 'multi' ? [...form.querySelectorAll('input:checked')].map(x => x.value) : q.type === 'text' ? form.querySelector('textarea').value : form.querySelector('input:checked')?.value;
    if (q.id === survey.branchQuestionId && oldBranch !== answers.ai_adoption) {
      for (const b of Object.values(survey.branches)) for (const item of b.questions) delete answers[item.id];
    }
    form.querySelectorAll('.option').forEach(label => label.classList.toggle('selected', label.querySelector('input').checked));
    document.querySelector('#error').textContent = ''; save();
  };
  form.onsubmit = event => { event.preventDefault(); const error = answerError(q, answers[q.id]); if (error) { document.querySelector('#error').textContent = error; return; } if (position === qs.length-1) page = 'review'; else position++; save(); render(); focusTitle(); };
  document.querySelector('#back').onclick = () => { if (position) position--; else page = 'home'; save(); render(); focusTitle(); };
}
function review() {
  const qs = getQuestions(answers);
  const invalid = qs.findIndex(q => answerError(q, answers[q.id]));
  if (invalid >= 0 || !Object.hasOwn(survey.branches, answers.ai_adoption)) { position = invalid < 0 ? 5 : invalid; page = 'question'; return question(); }
  shell(html`<span class="eyebrow">ULTIMUL PAS</span><h1 tabindex="-1">Totul arată bine?</h1><p class="muted">Verifică răspunsurile înainte de ${config.live ? t('trimitere') : t('a încheia previzualizarea')}.</p><div class="review-list">${qs.map((q,i) => html`<div class="review-row"><div><small>${i+1}. ${esc(q.label)}</small><p>${esc(q.type === 'text' ? answers[q.id] || t('Fără comentariu') : q.options.filter(o => Array.isArray(answers[q.id]) ? answers[q.id].includes(o.value) : answers[q.id] === o.value).map(o => o.label).join(', '))}</p></div><button data-edit="${i}" class="text-button" aria-label="Modifică întrebarea ${i+1}">Modifică</button></div>`).join('')}</div>${config.live ? html`<label class="consent"><input type="checkbox" id="consent" ${consent ? 'checked' : ''}><span>Am citit informațiile despre răspunsuri și confidențialitate și sunt de acord să particip la acest studiu.</span></label>` : t('<div class="branch-notice">Aceasta este o previzualizare. Niciun răspuns nu va fi salvat în Google Sheets.</div>')}<p id="error" class="error" role="alert"></p><div class="question-actions"><button class="secondary" id="back">← Înapoi</button><button class="primary" id="submit">${config.live ? t('Trimite răspunsurile') : t('Încheie previzualizarea')} ↗</button></div>`, qs.length - 1);
  document.querySelectorAll('[data-edit]').forEach(button => button.onclick = () => { position = Number(button.dataset.edit); page = 'question'; render(); focusTitle(); });
  document.querySelector('#back').onclick = () => { position = qs.length-1; page = 'question'; render(); focusTitle(); };
  if (config.live) document.querySelector('#consent').onchange = event => { consent = event.target.checked; };
  document.querySelector('#submit').onclick = async () => {
    if (busy) return;
    if (config.live && !consent) { document.querySelector('#error').textContent = t('Confirmă acordul de participare înainte de trimitere.'); return; }
    busy = true; const button = document.querySelector('#submit'); button.disabled = true;
    try {
      if (config.live) {
        button.textContent = t('Se salvează…');
        await request('/api/submit', { submissionId, sessionId, version: survey.version, answers, consent, durationSeconds: Math.min(604800, Math.max(0, Math.round((Date.now()-startedAt)/1000))) });
        storage.remove(KEY);
      }
      page = 'success'; render(); focusTitle();
    } catch (error) { document.querySelector('#error').textContent = t(error.message); button.disabled = false; button.textContent = t('Încearcă din nou ↗'); }
    finally { busy = false; }
  };
}
function success() {
  main.innerHTML = html`${previewBanner()}<section class="success"><div class="success-icon">${config.live ? '✓' : '↗'}</div><span class="eyebrow">${config.live ? t('RĂSPUNS ÎNREGISTRAT') : t('PREVIZUALIZARE ÎNCHEIATĂ')}</span><h1 tabindex="-1">${config.live ? t('Mulțumim pentru perspectiva ta.') : t('Parcursul este pregătit.')}</h1><p>${config.live ? t('Răspunsurile tale au fost salvate. Ne ajuți să înțelegem mai bine cum poate AI susține companiile din România.') : t('Ai parcurs trunchiul comun, întrebările adaptate și secțiunea de strategie. Răspunsurile de test nu au fost trimise.')}</p><button class="primary" id="return">${config.live ? t('Înapoi la prezentare') : t('Explorează alt traseu')} ↗</button></section>`;
  document.querySelector('#return').onclick = () => { reset(); page = 'home'; render(); focusTitle(); };
}
function render() { updatePageLanguage(); ({ home, question, review, success })[page](); }
function updatePageLanguage() {
  const en = language === 'en';
  document.documentElement.lang = language;
  document.title = en ? 'Social Innovation Solutions · AI in Romanian SMEs' : 'Social Innovation Solutions · AI în IMM-urile din România';
  document.querySelector('meta[name="description"]').content = en ? 'A study of how Romanian SMEs use artificial intelligence in everyday work and business strategy.' : 'Un studiu despre utilizarea inteligenței artificiale în activitatea și strategia IMM-urilor din România.';
  document.querySelector('.skip').textContent = en ? 'Skip to content' : 'Mergi la conținut';
  document.querySelector('.brand').setAttribute('aria-label', en ? 'Social Innovation Solutions, home' : 'Social Innovation Solutions, prima pagină');
  document.querySelector('.brand-caption').textContent = en ? 'RAIFFEISEN · AI STUDY' : 'RAIFFEISEN · STUDIU AI';
  document.querySelector('.edition').textContent = en ? 'PERSPECTIVES FROM ROMANIA' : 'PERSPECTIVE DIN ROMÂNIA';
  document.querySelector('.site-footer .footer-topic').textContent = en ? 'AI & SMEs' : 'AI & IMM-uri';
  document.querySelector('.footer-tagline').textContent = en ? 'A clearer perspective. A step forward.' : 'O perspectivă mai clară. Un pas înainte.';
  document.querySelector('.site-footer a').textContent = en ? 'Administration ↗' : 'Administrare ↗';
  document.querySelectorAll('[data-language]').forEach(button => { button.setAttribute('aria-pressed', String(button.dataset.language === language)); button.disabled = busy; });
}
document.querySelectorAll('[data-language]').forEach(button => button.onclick = () => {
  if (busy) return;
  language = button.dataset.language;
  setLanguage(language); survey = translateSurvey(baseSurvey, language);
  storage.set('social-inno-language', language);
  render();
});
try { const response = await fetch('/api/config'); if (!response.ok) throw new Error(); config = await response.json(); } catch { config = { live: false }; }
render(); track('visit');

