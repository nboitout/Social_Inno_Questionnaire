const cookieName = 'social_inno_activity_excluded';

export function activityPreference(req) {
  const value = (req.headers.cookie || '').split(';').map(c => c.trim()).find(c => c.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1);
  return value === '1' ? true : value === '0' ? false : null;
}

// This preference grants no admin access and survives signing out.
export function activityCookie(excluded) {
  return `${cookieName}=${excluded ? '1' : '0'}; HttpOnly; SameSite=Strict; Path=/api; Max-Age=31536000${process.env.VERCEL || process.env.NODE_ENV === 'production' ? '; Secure' : ''}`;
}
