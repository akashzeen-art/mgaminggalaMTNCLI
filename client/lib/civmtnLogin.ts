import { normalizeMsisdn, type CivMtnLoginResult } from '@shared/civmtn';

export type { CivMtnLoginResult };
export { normalizeMsisdn };

import { CIVMTN_PID } from '@shared/civmtnConfig';

/** Read msisdn from landing-page redirect query params. */
export function getLandingMsisdn(search = window.location.search): string | null {
  const params = new URLSearchParams(search);
  return params.get('msisdn') || params.get('MSISDN') || params.get('mobile');
}

export function clearLandingMsisdnFromUrl() {
  const url = new URL(window.location.href);
  ['msisdn', 'MSISDN', 'mobile'].forEach((key) => url.searchParams.delete(key));
  window.history.replaceState({}, '', url.toString());
}

export async function checkCivMtnLogin(rawMsisdn: string): Promise<{
  ok: boolean;
  data: CivMtnLoginResult;
}> {
  const msisdn = normalizeMsisdn(rawMsisdn);

  if (!msisdn || msisdn.length < 12) {
    return { ok: false, data: { response: 'INVALID', error: 'Invalid mobile number' } };
  }

  const res = await fetch(
    `/api/civmtn/login?pid=${CIVMTN_PID}&msisdn=${encodeURIComponent(msisdn)}`,
  );

  let data: CivMtnLoginResult;
  try {
    data = await res.json();
  } catch {
    return {
      ok: false,
      data: {
        response: 'ERROR',
        error: 'API unavailable — ensure /api routes are proxied to the Node server on production',
      },
    };
  }

  if (!res.ok || data.response === 'ERROR') {
    return { ok: false, data };
  }

  const status = String(data.response ?? '').toUpperCase();
  return { ok: true, data: { ...data, response: status } };
}
