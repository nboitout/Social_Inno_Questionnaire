import { createHmac, createHash, timingSafeEqual } from 'node:crypto';
import { HttpError } from './http.js';
const hash = s => createHash('sha256').update(String(s)).digest();
export function authConfigured() { return (process.env.ADMIN_PASSWORD?.length || 0) >= 12 && (process.env.SESSION_SECRET?.length || 0) >= 32; }
export function passwordMatches(value) { return authConfigured() && typeof value === 'string' && timingSafeEqual(hash(value), hash(process.env.ADMIN_PASSWORD)); }
function sign(value) { return createHmac('sha256', process.env.SESSION_SECRET).update(value).digest('base64url'); }
export function makeSession() { const payload = Buffer.from(JSON.stringify({ exp: Date.now() + 8 * 60 * 60 * 1000, passwordVersion: hash(process.env.ADMIN_PASSWORD).toString('hex') })).toString('base64url'); return `${payload}.${sign(payload)}`; }
export function requireAdmin(req) {
  if (!authConfigured()) throw new HttpError(503, 'Administration is not configured.');
  const token = (req.headers.cookie || '').split('; ').find(c => c.startsWith('social_inno_admin='))?.split('=')[1];
  try {
    const [payload, signature] = token.split('.');
    if (!signature || !timingSafeEqual(hash(signature), hash(sign(payload)))) throw new Error();
    const data = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (data.exp < Date.now() || data.passwordVersion !== hash(process.env.ADMIN_PASSWORD).toString('hex')) throw new Error();
  } catch { throw new HttpError(401, 'Sign-in required.'); }
}
export function sessionCookie(token, logout = false) { return `social_inno_admin=${token}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=${logout ? 0 : 28800}${process.env.VERCEL || process.env.NODE_ENV === 'production' ? '; Secure' : ''}`; }
