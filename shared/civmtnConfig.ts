export const CIVMTN_PID = 3;

/** External VAS subscription landing page */
export const CIVMTN_LANDING_BASE =
  'http://168.144.122.72/prod/LP/landing?creatid=3&hash=CIVMTN';

/**
 * Landing page URL with return redirect to your site.
 * After subscribe, provider should redirect to: {returnOrigin}/?msisdn=225...
 */
export function getSubscribeUrl(returnOrigin?: string) {
  const origin =
    returnOrigin ??
    (typeof window !== 'undefined' ? window.location.origin : '');

  if (!origin) return CIVMTN_LANDING_BASE;

  return `${CIVMTN_LANDING_BASE}&cpurl=${encodeURIComponent(origin)}`;
}

/** Simulate landing redirect locally: http://localhost:8080/?msisdn=225XXXXXXXXX */
export function getLandingTestUrl(msisdn: string, origin?: string) {
  const base = origin ?? (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:8080');
  const normalized = msisdn.replace(/\D/g, '');
  const full = normalized.startsWith('225') ? normalized : `225${normalized}`;
  return `${base}/?msisdn=${full}`;
}
