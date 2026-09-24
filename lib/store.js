import { createSign } from 'node:crypto';
import { survey, participantFields } from '../public/survey-config.js';
import { survey as v2 } from '../public/survey-v2.js';
import { survey as v1 } from '../public/survey-v1.js';
import { survey as legacy } from '../public/survey-legacy.js';
export const legacyHeaders = ['submission_id','submitted_at','survey_version','branch','session_id','duration_seconds', ...legacy.core.map(q => q.id), ...Object.values(legacy.branches).flatMap(b => b.questions.map(q => q.id)), ...legacy.closing.map(q => q.id), 'answers_json'];
export const responseHeaders = [...new Set([...legacyHeaders,...v1.questions.map(q=>q.id),'response_language',...participantFields.map(f=>f.id),...v2.questions.map(q=>q.id),...survey.questions.map(q=>q.id)])];
export const visitHeaders = ['event_id','recorded_at','session_id','event','path'];
const demo = { Responses: [], Visits: [] };
let cachedToken;
export const demoMode = () => process.env.DATA_MODE === 'demo' && !process.env.VERCEL && process.env.NODE_ENV !== 'production';
export const configured = () => demoMode() || Boolean(process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL && process.env.GOOGLE_PRIVATE_KEY);
export const live = () => process.env.SURVEY_LIVE === 'true' && !survey.draft && configured();
export async function googleRequest(path, options = {}) {
  if (!configured()) throw new Error('Google Sheets is not configured');
  if (!cachedToken || cachedToken.expires < Date.now()) {
    const now = Math.floor(Date.now() / 1000);
    const encode = value => Buffer.from(JSON.stringify(value)).toString('base64url');
    const unsigned = `${encode({ alg: 'RS256', typ: 'JWT' })}.${encode({ iss: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL, scope: 'https://www.googleapis.com/auth/spreadsheets', aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600 })}`;
    const signature = createSign('RSA-SHA256').update(unsigned).sign(process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), 'base64url');
    const result = await fetch('https://oauth2.googleapis.com/token', { method: 'POST', body: new URLSearchParams({ grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer', assertion: `${unsigned}.${signature}` }), signal: AbortSignal.timeout(15000) });
    if (!result.ok) throw new Error(`Google authentication failed (${result.status})`);
    const token = await result.json();
    cachedToken = { value: token.access_token, expires: Date.now() + (token.expires_in - 120) * 1000 };
  }
  const id = process.env.GOOGLE_SHEET_ID || '1TIoviEAiScYKCHEU5OBkuNFiinIg5sFvztJ2Yd-5FDw';
  const response = await fetch(`https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(id)}${path}`, { ...options, headers: { Authorization: `Bearer ${cachedToken.value}`, 'Content-Type': 'application/json' }, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`Google Sheets request failed (${response.status})`);
  return response.json();
}
function columnName(n) { let out = ''; while (n) { n--; out = String.fromCharCode(65 + n % 26) + out; n = Math.floor(n / 26); } return out; }
export function validateHeaders(headers, tab, writing=false) {
  const required = tab==='Visits' ? visitHeaders : ['submission_id','submitted_at','survey_version','session_id','duration_seconds','answers_json', ...(writing ? [...survey.questions.map(q=>q.id),'response_language',...participantFields.map(f=>f.id)] : [])];
  if(!Array.isArray(headers)||new Set(headers).size!==headers.length||headers.some(h=>typeof h!=='string'||!h)||required.some(h=>!headers.includes(h)))throw new Error(`Unexpected ${tab} schema; update the sheet headers before collecting responses`);
  return headers;
}
async function sheetHeaders(tab,writing=false) {
  if(!['Responses','Visits'].includes(tab))throw new Error('Invalid tab');
  const result=await googleRequest(`/values/${encodeURIComponent(`${tab}!1:1`)}`);
  return validateHeaders(result.values?.[0],tab,writing);
}
export async function readRows(tab) {
  if (!['Responses','Visits'].includes(tab)) throw new Error('Invalid tab');
  if (demoMode()) return demo[tab].map(row=>structuredClone(row));
  const headers=await sheetHeaders(tab);
  const result=await googleRequest(`/values/${encodeURIComponent(`${tab}!A2:${columnName(headers.length)}`)}`);
  return (result.values||[]).filter(row=>row[headers.indexOf(tab==='Responses'?'submission_id':'event_id')]).map(row=>Object.fromEntries(headers.map((h,i)=>[h,row[i]??''])));
}
export async function appendRow(tab, record) {
  if (!['Responses','Visits'].includes(tab)) throw new Error('Invalid tab');
  if (demoMode()) { demo[tab].push(structuredClone(record)); return; }
  const headers=await sheetHeaders(tab,true);
  await googleRequest(`/values/${encodeURIComponent(`${tab}!A:${columnName(headers.length)}`)}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`, { method: 'POST', body: JSON.stringify({ values: [headers.map(h => record[h] ?? '')] }) });
}
export function uniqueRows(rows, field) { return [...new Map(rows.map(row => [row[field], row])).values()]; }
