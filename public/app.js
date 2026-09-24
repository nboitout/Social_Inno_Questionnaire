import { survey, getQuestions, localized, accessTypes, selectedValues, toggleSelection, requiredQuestion, answerError, formatAnswer, participantFields, participantError } from './survey-config.js';
import { text } from './i18n.js';
const main=document.querySelector('main');
const KEY=`social-inno-${survey.version}`;
const esc=value=>String(value??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const storage={get(key){try{return localStorage.getItem(key);}catch{return null;}},set(key,value){try{localStorage.setItem(key,value);}catch{}},remove(key){try{localStorage.removeItem(key);}catch{}}};
let language=storage.get('social-inno-language')==='ro'?'ro':'en';
const t=key=>text(key,language);
let draft;try{draft=JSON.parse(storage.get(KEY));}catch{}
if(!draft||draft.version!==survey.version||!Number.isFinite(draft.savedAt)||Date.now()-draft.savedAt>7*86400000){draft=null;storage.remove(KEY);}
let answers=draft?.answers&&typeof draft.answers==='object'&&!Array.isArray(draft.answers)?draft.answers:{};
let participant=draft?.participant||{},editingParticipant=false;
let position=Number.isInteger(draft?.position)?Math.max(0,Math.min(7,draft.position)):0;
let startedAt=draft?.startedAt||Date.now(),submissionId=draft?.submissionId||crypto.randomUUID();
let sessionId;try{sessionId=sessionStorage.getItem('social-inno-session')||crypto.randomUUID();sessionStorage.setItem('social-inno-session',sessionId);}catch{sessionId=crypto.randomUUID();}
let page='home',config={live:false},busy=false,consent=false;
function save(){storage.set(KEY,JSON.stringify({version:survey.version,answers,participant,position,startedAt,submissionId,savedAt:Date.now()}));}
function reset(){answers={};participant={};editingParticipant=false;position=0;startedAt=Date.now();submissionId=crypto.randomUUID();consent=false;storage.remove(KEY);}
function focusTitle(){main.querySelector('h1,h2')?.focus();window.scrollTo({top:0,behavior:'instant'});}
async function request(path,payload){
 const r=await fetch(path,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload),signal:AbortSignal.timeout(25000)});
 const data=await r.json();if(!r.ok){const e=new Error(data.error);e.code=data.code;e.questionId=data.questionId;throw e;}return data;
}
function track(event){if(!config.live)return;try{if(event==='start'&&sessionStorage.getItem(`social-inno-start-${survey.version}`))return;}catch{}
 request('/api/visit',{eventId:crypto.randomUUID(),sessionId,event}).then(()=>{if(event==='start')try{sessionStorage.setItem(`social-inno-start-${survey.version}`,'1');}catch{}}).catch(()=>{});
}
function home(){
 main.innerHTML=`<section class="hero homepage-hero"><div class="hero-copy"><h1 tabindex="-1">${t('hero')}<br><span>${t('heroAccent')}</span></h1><p class="hero-lead"><strong>${t('intro')}</strong></p><p class="hero-purpose">${t('purposeBefore')} <strong>${t('purposeFocus')}</strong> ${t('purposeAfter')}</p><p class="hero-practical"><span>${t('time')}</span><span aria-hidden="true"> · </span><span>${t('noTechnical')}</span></p><div class="hero-actions"><button class="primary" id="start">${Object.keys(answers).length?t('resume'):t('start')} <span>→</span></button></div><p class="hero-reassurance">${t('noRight')}</p></div><div class="journey-art" aria-label="${t('journey')}"><div class="art-top"><span>${t('artTitle').replace('\n','<br>')}</span><span class="art-asterisk">✳</span></div>${survey.sections.map((s,i)=>`${i?'<div class="join-line"></div>':''}<div class="journey-node ${i===2?'final-node':''}"><span class="node-number">0${i+1}</span><div><small>${localized(s.description,language)}</small><strong>${localized(s.title,language)}</strong></div><span>↗</span></div>`).join('')}<div class="art-bottom"><span>${t('artNote')}</span><span>01 — 03</span></div></div></section><details class="privacy"><summary>${t('privacy')}</summary><p>${t('privacyBody')}</p><button class="text-button" id="clear-draft">${t('clear')}</button></details>`;
 document.querySelector('#start').onclick=()=>{editingParticipant=false;page='participant';track('start');save();render();focusTitle();};
 document.querySelector('#clear-draft').onclick=()=>{reset();home();};
}
function shell(content,index=position){
 document.body.dataset.page=page;
 const section=survey.questions[index].section;
 const active=survey.sections.findIndex(s=>s.id===section);
 main.innerHTML=`<div class="survey-layout"><aside class="survey-sidebar"><div class="eyebrow">${t('journey')}</div><h2>${t('sidebarTitle').replace('\n','<br>')}</h2><ol class="steps">${survey.sections.map((s,i)=>`<li class="${i===active?'current':i<active?'done':''}" ${i===active?'aria-current="step"':''}><span>${i<active?'✓':`0${i+1}`}</span><div><strong>${localized(s.title,language)}</strong><small>${localized(s.description,language)}</small></div></li>`).join('')}</ol><div class="sidebar-note">↳<p>${t('saved')}</p></div><button id="home" class="text-button">← ${t('home')}</button></aside><section class="question-panel" data-question="${page==='question'?survey.questions[index].id:page}">${content}</section></div>`;
 document.querySelector('#home').onclick=()=>{page='home';render();focusTitle();};
}
function participantPage(){
 shell(`<span class="eyebrow">${t('participantHeading')}</span><h1 tabindex="-1">${t('participantTitle')}</h1><p class="muted">${t('participantIntro')}</p><form id="participant-form" novalidate><div class="participant-fields">${participantFields.map(f=>`<label for="${f.id}">${localized(f.label,language)}<input id="${f.id}" name="${f.id}" type="text" autocomplete="${f.autocomplete}" maxlength="${f.maxLength}" required value="${esc(participant[f.id]||'')}"></label>`).join('')}</div><details class="privacy"><summary>${t('privacy')}</summary><p>${t('privacyBody')}</p></details><p id="error" class="error" role="alert"></p><div class="question-actions"><button type="button" class="secondary" id="participant-back">← ${t('back')}</button><button type="submit" class="primary">${editingParticipant?t('participantSave'):t('participantContinue')} →</button></div></form>`,0);
 const form=document.querySelector('#participant-form');
 form.oninput=e=>{if(participantFields.some(f=>f.id===e.target.name)){participant[e.target.name]=e.target.value;save();document.querySelector('#error').textContent='';}};
 form.onsubmit=e=>{e.preventDefault();participant=Object.fromEntries(participantFields.map(f=>[f.id,form.elements[f.id].value.trim()]));const error=participantError(participant,language);if(error){document.querySelector('#error').textContent=error;return;}save();page=editingParticipant?'review':'question';editingParticipant=false;render();focusTitle();};
 document.querySelector('#participant-back').onclick=()=>{page=editingParticipant?'review':'home';editingParticipant=false;render();focusTitle();};
}
function renderFields(q){
 const value=answers[q.id];
 if(q.type==='text')return `<textarea id="answer" name="answer" maxlength="${q.maxLength}" rows="7" aria-label="${esc(q.label)}" aria-describedby="question-help" aria-required="true" placeholder="${t('placeholder')}">${esc(value||'')}</textarea><p class="field-hint">${t('textHint')}</p>`;
 const values=q.type==='multi'?selectedValues(q,value):[value];
 return `<div class="options ${q.id==='ai_tasks_last_3_months'?'compact-options':''}">${q.options.map(o=>{
  const checked=values.includes(o.value);
  return `<div class="field-option"><label class="option ${checked?'selected':''}"><input id="choice-${o.value}" type="${q.type==='multi'?'checkbox':'radio'}" name="answer" value="${o.value}" ${checked?'checked':''}><span class="option-copy"><span class="option-name">${esc(o.label)}</span>${o.description?`<span class="option-description">${esc(o.description)}</span>`:''}</span></label>${q.structured&&checked&&!o.exclusive?`<div class="option-details">${q.other&&o.value==='other'?`<label for="other-name">${t('other')}</label><input id="other-name" type="text" maxlength="120" value="${esc(value?.other||'')}" autocomplete="off">`:''}${q.access?`<label for="access-${o.value}">${t('access')} ${esc(o.value==='other'?o.label:o.label)}?</label><select id="access-${o.value}" data-access="${o.value}"><option value="">${t('choose')}</option>${accessTypes.map(a=>`<option value="${a.value}" ${value?.access?.[o.value]===a.value?'selected':''}>${localized(a.label,language)}</option>`).join('')}</select>`:''}</div>`:''}</div>`;
 }).join('')}</div>`;
}
function question(){
 const q=getQuestions(answers,language)[position];
 const optional=!requiredQuestion(q,answers);
 shell(`<div class="progress-head"><span>${t('question')} ${position+1} / 8</span><span>${Math.round(position/8*100)}%</span></div><progress max="8" value="${position}" aria-label="${t('progress')}"></progress><div class="question-heading"><span class="eyebrow">${localized(survey.sections.find(s=>s.id===q.section).title,language)}</span><h1 tabindex="-1" id="question-title">${esc(q.label)}</h1><p id="question-help">${esc(q.helper||(q.type==='multi'?t('many'):q.type==='single'?t('one'):''))}</p></div>${optional?`<div class="branch-notice">${t('nonuser')}</div>`:''}<form id="question-form" novalidate><fieldset aria-labelledby="question-title" aria-describedby="question-help">${renderFields(q)}</fieldset><p class="error" id="error" role="alert"></p><div class="question-actions"><button type="button" class="secondary" id="back">← ${t('back')}</button><span class="optional-label">${optional?t('optional'):t('required')}</span><button class="primary" type="submit">${position===7?t('review'):t('next')} →</button></div>${optional?`<button type="button" id="skip-question" class="text-button">${t('skip')}</button>`:''}</form>`);
 const form=document.querySelector('#question-form');
 form.onchange=e=>{
  if(e.target.name==='answer' && q.type!=='text'){
   answers[q.id]=q.type==='multi'?toggleSelection(q,answers[q.id],e.target.value,e.target.checked):e.target.value;
   save();const focus=e.target.id;question();document.getElementById(focus)?.focus({preventScroll:true});
  }else if(e.target.dataset.access){answers[q.id].access[e.target.dataset.access]=e.target.value;save();document.querySelector('#error').textContent='';}
 };
 form.oninput=e=>{if(q.type==='text')answers[q.id]=e.target.value;else if(e.target.id==='other-name')answers[q.id].other=e.target.value;else return;save();document.querySelector('#error').textContent='';};
 function next(){if(position===7)page='review';else position++;save();render();focusTitle();}
 form.onsubmit=e=>{e.preventDefault();const error=answerError(q,answers[q.id],answers,language);if(error){document.querySelector('#error').textContent=error;return;}next();};
 document.querySelector('#back').onclick=()=>{if(position)position--;else page='participant';save();render();focusTitle();};
 if(optional)document.querySelector('#skip-question').onclick=()=>{answers[q.id]=null;next();};
}
function review(){
 if(participantError(participant,language)){editingParticipant=true;page='participant';return participantPage();}
 const qs=getQuestions(answers,language),invalid=qs.findIndex(q=>answerError(q,answers[q.id],answers,language));
 if(invalid>=0){position=invalid;page='question';return question();}
 shell(`<span class="eyebrow">${t('finalStep')}</span><h1 tabindex="-1">${t('reviewTitle')}</h1><p class="muted">${t('reviewIntro')}</p><div class="review-list"><div class="review-row"><div><small>${t('participantReview')}</small><p>${participantFields.map(f=>`${esc(localized(f.label,language))}: ${esc(participant[f.id])}`).join('\n')}</p></div><button id="edit-participant" class="text-button">${t('edit')}</button></div>${qs.map((q,i)=>`<div class="review-row"><div><small>${i+1}. ${esc(q.label)}</small><p>${esc(formatAnswer(q,answers[q.id],language))}</p></div><button data-edit="${i}" class="text-button" aria-label="${t('edit')} ${i+1}">${t('edit')}</button></div>`).join('')}</div>${config.live?`<details class="privacy"><summary>${t('privacy')}</summary><p>${t('privacyBody')}</p></details><label class="consent"><input type="checkbox" id="consent" ${consent?'checked':''}><span>${t('consent')}</span></label>`:`<div class="branch-notice">${t('previewReview')}</div>`}<p id="error" class="error" role="alert"></p><div class="question-actions"><button class="secondary" id="back">← ${t('back')}</button><button class="primary" id="submit">${config.live?t('submit'):t('finishPreview')} ↗</button></div>`,7);
 document.querySelector('#edit-participant').onclick=()=>{editingParticipant=true;page='participant';render();focusTitle();};
 document.querySelectorAll('[data-edit]').forEach(b=>b.onclick=()=>{position=Number(b.dataset.edit);page='question';render();focusTitle();});
 document.querySelector('#back').onclick=()=>{position=7;page='question';render();focusTitle();};
 if(config.live)document.querySelector('#consent').onchange=e=>{consent=e.target.checked;};
 document.querySelector('#submit').onclick=async()=>{
  if(busy)return;if(config.live&&!consent){document.querySelector('#error').textContent=t('consentError');return;}
  busy=true;document.querySelectorAll('button,input,select,textarea').forEach(el=>el.disabled=true);
  try{
   if(config.live){document.querySelector('#submit').textContent=t('saving');await request('/api/submit',{submissionId,sessionId,version:survey.version,language,answers,participant,consent,durationSeconds:Math.min(604800,Math.max(0,Math.round((Date.now()-startedAt)/1000)))});storage.remove(KEY);}
   page='success';render();focusTitle();
  }catch(error){document.querySelector('#error').textContent=t(error.code==='version'?'versionError':error.code==='closed'?'closed':error.code==='validation'?'invalid':'unavailable');document.querySelector('#submit').textContent=t('retry');}
  finally{busy=false;document.querySelectorAll('button,input,select,textarea').forEach(el=>el.disabled=false);}
 };
}
function success(){main.innerHTML=`<section class="success"><div class="success-icon">${config.live?'✓':'↗'}</div><span class="eyebrow">${config.live?t('received'):t('previewComplete')}</span><h1 tabindex="-1">${config.live?t('savedTitle'):t('previewTitle')}</h1><p>${config.live?t('savedBody'):t('previewBody')}</p><button id="return" class="primary">${t('again')} ↗</button></section>`;document.querySelector('#return').onclick=()=>{reset();page='home';render();focusTitle();};}
function updateLanguage(){
 document.documentElement.lang=language;document.title=language==='en'?'AI & SMEs · Social Innovation Solutions':'AI & IMM-uri · Social Innovation Solutions';
 document.querySelector('meta[name="description"]').content=[t('intro'),t('purposeBefore'),t('purposeFocus'),t('purposeAfter')].join(' ');document.querySelector('.skip').textContent=t('skipContent');document.querySelector('.brand').setAttribute('aria-label',`Social Innovation Solutions · ${t('home')}`);document.querySelector('.brand-caption').textContent=t('caption');document.querySelector('.footer-topic').textContent=language==='en'?'AI & SMEs':'AI & IMM-uri';document.querySelector('.footer-identity').hidden=page==='home';document.querySelector('.footer-tagline').textContent=t('tagline');document.querySelector('.footer-tagline').hidden=page==='home';document.querySelector('.site-footer a').textContent=`${t('admin')} ↗`;
 document.querySelectorAll('[data-language]').forEach(b=>{b.setAttribute('aria-pressed',String(b.dataset.language===language));b.disabled=busy;});
}
function render(){document.body.dataset.page=page;updateLanguage();({home,participant:participantPage,question,review,success})[page]();}
for(const button of document.querySelectorAll('[data-language]'))button.onclick=()=>{if(busy)return;language=button.dataset.language;storage.set('social-inno-language',language);render();};
try{const r=await fetch('/api/config',{signal:AbortSignal.timeout(10000)});if(r.ok)config=await r.json();}catch{}
render();track('visit');
