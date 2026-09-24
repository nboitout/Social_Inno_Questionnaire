import { survey, getQuestions } from './survey-config.js';
const root = document.querySelector('#admin');
const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const date = value => { const d = new Date(value); return Number.isNaN(d.getTime()) ? '—' : d.toLocaleString('ro-RO'); };
let data, filter = '', search = '';
async function api(path, body) {
  const response = await fetch(`/api/${path}`, body === undefined ? {} : { method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body) });
  const result = await response.json(); if (!response.ok) { const error = new Error(result.error); error.status = response.status; throw error; } return result;
}
function login(message = '') {
  root.innerHTML = `<section class="login-panel"><span class="eyebrow">ACCES RESTRICȚIONAT</span><h1>Bine ai revenit.</h1><p class="muted">Vizite și răspunsuri la chestionarul Social Inno.</p><form><label for="password">Parola de administrare</label><input id="password" type="password" autocomplete="current-password" required><p id="login-error" class="error" role="alert">${esc(message)}</p><button class="primary">Autentificare →</button></form></section>`;
  root.querySelector('form').onsubmit = async event => { event.preventDefault(); const button = root.querySelector('button'); button.disabled = true; try { await api('login',{password:document.querySelector('#password').value}); await load(); } catch(error) { document.querySelector('#login-error').textContent = error.message; button.disabled = false; } };
}
async function load() { try { data = await api('admin'); dashboard(); } catch(error) { if (error.status === 401 || !data) login(error.status === 401 ? '' : error.message); else document.querySelector('#dashboard-error').textContent = error.message; } }
function filtered() { return data.responses.filter(r => (!filter || r.branch === filter) && (!search || `${r.submission_id} ${r.sector} ${r.size} ${r.submitted_at}`.toLowerCase().includes(search))); }
function dashboard() {
  const m = data.metrics;
  root.innerHTML = `<div class="admin-content"><div class="admin-heading"><div><span class="eyebrow">SOCIAL INNO · PRIVIRE DE ANSAMBLU</span><h1>Din răspunsuri, perspective.</h1><p>Actualizat la ${esc(new Date().toLocaleTimeString('ro-RO'))} · Toate datele colectate</p></div><div class="admin-tools"><button id="refresh" class="secondary">↻ Actualizează</button><button id="logout" class="text-button">Deconectare</button></div></div>${!data.configured ? '<div class="notice">Google Sheets nu este conectat la aplicație. Configurează contul de serviciu pentru a vedea datele.</div>' : ''}${!data.live ? `<div class="notice">${data.demo ? 'Mod demo local · date temporare.' : 'Previzualizare · colectarea vizitelor și a răspunsurilor este oprită.'}</div>` : ''}<p id="dashboard-error" class="error" role="alert"></p><div class="metrics">${[['Vizite înregistrate',m.visits,'Încărcări ale paginii chestionarului'],['Sesiuni de browser',m.sessions,'Identificatori distincți, nu persoane'],['Răspunsuri complete',m.responses,`${m.starts} sesiuni au început chestionarul`],['Rată de completare',m.completion == null ? '—' : `${m.completion}%`,'Sesiuni finalizate / sesiuni începute']].map(([label,value,note]) => `<div class="metric"><span class="metric-label">${label}</span><strong>${value}</strong><small>${note}</small></div>`).join('')}</div><div class="dashboard-grid"><section class="admin-card"><h2>Etapele de adoptare AI</h2>${Object.entries(survey.branches).map(([id,b]) => `<div class="distribution"><div class="distribution-label"><span>${esc(b.title)}</span><strong>${m.branches[id]}</strong></div><progress max="${Math.max(1,m.responses)}" value="${m.branches[id]}" aria-label="${esc(b.title)}"></progress></div>`).join('')}</section><section class="admin-card"><h2>Activitate recentă</h2>${data.events.length ? `<div class="table-wrap"><table><tbody>${data.events.slice(0,5).map(e => `<tr><td>${esc(date(e.recorded_at))}</td><td>${e.event === 'visit' ? 'Vizită' : 'Chestionar început'}</td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Vizitele vor apărea aici după lansarea colectării.</p>'}<p class="muted">Nu colectăm adrese IP în aceste înregistrări.</p></section></div><section class="admin-card"><div class="admin-heading"><h2>Răspunsurile chestionarului</h2><button class="secondary" id="export">Descarcă CSV ↓</button></div><div class="toolbar"><input id="search" type="search" aria-label="Caută răspunsuri" placeholder="Caută după ID, domeniu, dimensiune sau dată…" value="${esc(search)}"><select id="filter" aria-label="Filtrează după traseu"><option value="">Toate traseele</option>${Object.entries(survey.branches).map(([id,b]) => `<option value="${id}" ${filter === id ? 'selected' : ''}>${esc(b.title)}</option>`).join('')}</select></div><div id="response-table"></div></section><section id="detail" class="detail hidden"></section></div>`;
  table();
  document.querySelector('#refresh').onclick = load;
  document.querySelector('#logout').onclick = async () => { try { await api('logout',{}); data = null; login(); } catch(error) { document.querySelector('#dashboard-error').textContent = error.message; } };
  document.querySelector('#filter').onchange = e => { filter = e.target.value; table(); };
  document.querySelector('#search').oninput = e => { search = e.target.value.toLowerCase(); table(); };
  document.querySelector('#export').onclick = exportCsv;
}
function label(id, value) { const q = survey.core.find(q => q.id === id); return q?.options.find(o => o.value === value)?.label || value; }
function table() {
  const rows = filtered(); document.querySelector('#response-table').innerHTML = rows.length ? `<div class="table-wrap"><table><thead><tr><th>Primit la</th><th>Domeniu</th><th>Dimensiune</th><th>Traseu</th><th></th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(date(r.submitted_at))}</td><td>${esc(label('sector',r.sector))}</td><td>${esc(label('size',r.size))}</td><td><span class="badge">${esc(survey.branches[r.branch]?.title || r.branch)}</span></td><td><button class="text-button" data-id="${esc(r.submission_id)}">Vezi răspunsul →</button></td></tr>`).join('')}</tbody></table></div>` : '<p class="empty">Niciun răspuns de afișat. Răspunsurile vor apărea după prima trimitere confirmată.</p>';
  document.querySelectorAll('[data-id]').forEach(button => button.onclick = () => detail(button.dataset.id));
}
function detail(id) {
  const r = data.responses.find(row => row.submission_id === id); if (!r) return;
  let answers = {}; try { answers = JSON.parse(r.answers_json); } catch {}
  const target = document.querySelector('#detail'); target.classList.remove('hidden');
  target.innerHTML = `<div class="details-header"><h2>Răspuns individual</h2><button class="text-button" id="close-detail">Închide</button></div><dl><div><dt>ID</dt><dd>${esc(r.submission_id)}</dd></div><div><dt>Versiune</dt><dd>${esc(r.survey_version)}</dd></div><div><dt>Primit la</dt><dd>${esc(date(r.submitted_at))}</dd></div><div><dt>Durată</dt><dd>${esc(r.duration_seconds)} secunde</dd></div></dl>${getQuestions({ai_adoption:r.branch}).map(q => { const value = answers[q.id]; const display = q.type === 'text' ? value : q.options.filter(o => Array.isArray(value) ? value.includes(o.value) : value === o.value).map(o => o.label).join(', '); return `<div class="detail-answer"><small class="muted">${esc(q.label)}</small><p>${esc(display || '—')}</p></div>`; }).join('')}`;
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
