import { survey as sourceSurvey } from './survey-config.js';
import { translateSurvey } from './survey-en.js';
const survey = translateSurvey(sourceSurvey, 'en');
const getQuestions = answers => [...survey.core, ...(survey.branches[answers.ai_adoption]?.questions || []), ...survey.closing];
const root = document.querySelector('#admin');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('en-GB'); };
let data, filter = '', search = '';
async function api(path, body) {
  const response = await fetch(`/api/${path}`, body === undefined ? {} : { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body) });
  const result = await response.json(); if (!response.ok) { const error = new Error(result.error); error.status = response.status; throw error; } return result;
}
function login(message = '') {
  root.innerHTML = `<section class="login-panel"><span class="eyebrow">RESTRICTED ACCESS</span><h1>Welcome back.</h1><p class="muted">Visits and responses to the Social Inno survey.</p><form><label for="password">Admin password</label><input id="password" type="password" autocomplete="current-password" required><p id="login-error" class="error" role="alert">${esc(message)}</p><button class="primary">Sign in →</button></form></section>`;
  root.querySelector('form').onsubmit = async event => { event.preventDefault(); const button = root.querySelector('button'); button.disabled = true; try { await api('login',{password:document.querySelector('#password').value}); await load(); } catch(error) { document.querySelector('#login-error').textContent = error.message; button.disabled = false; } };
}
async function load() { try { data = await api('admin'); dashboard(); } catch(error) { if (error.status === 401 || !data) login(error.status === 401 ? '' : error.message); else document.querySelector('#dashboard-error').textContent = error.message; } }
function filtered() { return data.responses.filter(r => (!filter || r.branch === filter) && (!search || `${r.submission_id} ${r.sector} ${label('sector',r.sector)} ${r.size} ${label('size',r.size)} ${r.submitted_at}`.toLowerCase().includes(search))); }
function dashboard() {
  const m = data.metrics;
  root.innerHTML = `<div class="admin-content"><div class="admin-heading"><div><span class="eyebrow">SOCIAL INNO · OVERVIEW</span><h1>From responses to insights.</h1><p>Updated at ${esc(new Date().toLocaleTimeString('en-GB'))} · All collected data</p></div><div class="admin-tools"><button id="refresh" class="secondary">↻ Refresh</button><button id="logout" class="text-button">Sign out</button></div></div>${!data.configured ? '<div class="notice">Google Sheets is not connected. Configure the service account to view your data.</div>' : ''}${!data.live ? `<div class="notice">${data.demo ? 'Local demo mode · temporary data.' : 'Preview mode · visits and responses are not being collected.'}</div>` : ''}<p id="dashboard-error" class="error" role="alert"></p><div class="metrics">${[['Recorded visits',m.visits,'Survey page views'],['Browser sessions',m.sessions,'Distinct session IDs, not people'],['Completed responses',m.responses,`${m.starts} sessions started the survey`],['Completion rate',m.completion == null ? '—' : `${m.completion}%`,'Completed sessions / started sessions']].map(([label,value,note]) => `<div class="metric"><span class="metric-label">${label}</span><strong>${value}</strong><small>${note}</small></div>`).join('')}</div><div class="dashboard-grid"><section class="admin-card"><h2>AI adoption stages</h2>${Object.entries(survey.branches).map(([id,b]) => `<div class="distribution"><div class="distribution-label"><span>${esc(b.title)}</span><strong>${m.branches[id]}</strong></div><progress max="${Math.max(1,m.responses)}" value="${m.branches[id]}" aria-label="${esc(b.title)}"></progress></div>`).join('')}</section><section class="admin-card"><h2>Recent activity</h2>${data.events.length ? `<div class="table-wrap"><table><tbody>${data.events.slice(0,5).map(e => `<tr><td>${esc(date(e.recorded_at))}</td><td>${e.event === 'visit' ? 'Visit' : 'Survey started'}</td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Visits will appear here once collection begins.</p>'}<p class="muted">These records do not include IP addresses.</p></section></div><section class="admin-card"><div class="admin-heading"><h2>Survey responses</h2><button class="secondary" id="export">Download CSV ↓</button></div><div class="toolbar"><input id="search" type="search" aria-label="Search responses" placeholder="Search by ID, sector, company size or date…" value="${esc(search)}"><select id="filter" aria-label="Filter by path"><option value="">All paths</option>${Object.entries(survey.branches).map(([id,b]) => `<option value="${id}" ${filter === id ? 'selected' : ''}>${esc(b.title)}</option>`).join('')}</select></div><div id="response-table"></div></section><section id="detail" class="detail hidden"></section></div>`;
  table();
  document.querySelector('#refresh').onclick = load;
  document.querySelector('#logout').onclick = async () => { try { await api('logout',{}); data = null; login(); } catch(error) { document.querySelector('#dashboard-error').textContent = error.message; } };
  document.querySelector('#filter').onchange = e => { filter = e.target.value; table(); };
  document.querySelector('#search').oninput = e => { search = e.target.value.toLowerCase(); table(); };
  document.querySelector('#export').onclick = exportCsv;
}
function label(id, value) { const q = survey.core.find(q => q.id === id); return q?.options.find(o => o.value === value)?.label || value; }
function table() {
  const rows = filtered(); document.querySelector('#response-table').innerHTML = rows.length ? `<div class="table-wrap"><table><thead><tr><th>Received at</th><th>Sector</th><th>Company size</th><th>Path</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(date(r.submitted_at))}</td><td>${esc(label('sector',r.sector))}</td><td>${esc(label('size',r.size))}</td><td><span class="badge">${esc(survey.branches[r.branch]?.title || r.branch)}</span></td><td><button class="text-button" data-id="${esc(r.submission_id)}">View response →</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">No responses to display. Responses will appear after the first confirmed submission.</p>';
  document.querySelectorAll('[data-id]').forEach(button => button.onclick = () => detail(button.dataset.id));
}
function detail(id) {
  const r = data.responses.find(row => row.submission_id === id); if (!r) return;
  let answers = {}; try { answers = JSON.parse(r.answers_json); } catch {}
  const target = document.querySelector('#detail'); target.classList.remove('hidden');
  target.innerHTML = `<div class="details-header"><h2>Individual response</h2><button class="text-button" id="close-detail">Close</button></div><dl><div><dt>ID</dt><dd>${esc(r.submission_id)}</dd></div><div><dt>Version</dt><dd>${esc(r.survey_version)}</dd></div><div><dt>Received at</dt><dd>${esc(date(r.submitted_at))}</dd></div><div><dt>Duration</dt><dd>${esc(r.duration_seconds)} seconds</dd></div></dl>${getQuestions({ai_adoption:r.branch}).map(q => { const value = answers[q.id]; const display = q.type === 'text' ? value : q.options.filter(o => Array.isArray(value) ? value.includes(o.value) : value === o.value).map(o => o.label).join(', '); return `<div class="detail-answer"><small class="muted">${esc(q.label)}</small><p>${esc(display || '—')}</p></div>`; }).join('')}`;
  document.querySelector('#close-detail').onclick = () => target.classList.add('hidden'); target.scrollIntoView({behavior:'smooth'});
}
function exportCsv() {
  const rows = filtered(); if (!rows.length) return;
  const columns = Object.keys(rows[0]);
  // Spreadsheet formula injection protection, including leading whitespace.
  const cell = value => { let str = String(value ?? ''); if (/^\s*[=+@-]/.test(str)) str = `'${str}`; return `"${str.replaceAll('"','""')}"`; };
  const csv = '\uFEFF' + [columns,...rows.map(r => columns.map(c => r[c]))].map(row => row.map(cell).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'})); const a = document.createElement('a'); a.href = url; a.download = 'social-inno-responses.csv'; a.click(); setTimeout(() => URL.revokeObjectURL(url),1000);
}
load();
