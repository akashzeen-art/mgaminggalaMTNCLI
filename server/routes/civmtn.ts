import { RequestHandler } from 'express';
import { normalizeMsisdn } from '@shared/civmtn';

const BASE = process.env.CIVMTN_API_BASE ?? 'http://168.144.122.72/prod';
const DEFAULT_PID = process.env.CIVMTN_PID ?? '3';
const UPSTREAM_TIMEOUT_MS = 15_000;

async function parseUpstreamJson(response: Response) {
  const text = await response.text();
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    console.error('[civmtn] Non-JSON upstream response:', text.slice(0, 300));
    return null;
  }
}

export const handleCivMtnLogin: RequestHandler = async (req, res) => {
  const pid = String(req.query.pid ?? DEFAULT_PID);
  const msisdn = normalizeMsisdn(String(req.query.msisdn ?? ''));

  if (!msisdn || msisdn.length < 12) {
    return res.status(400).json({
      response: 'INVALID',
      error: 'Invalid mobile number',
    });
  }

  const url = `${BASE}/CPLogin/CIVMTN?pid=${encodeURIComponent(pid)}&msisdn=${encodeURIComponent(msisdn)}`;

  try {
    console.log('[civmtn login] request:', { pid, msisdn, url });

    const response = await fetch(url, {
      signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS),
      headers: {
        Accept: 'application/json',
      },
    });

    const data = await parseUpstreamJson(response);

    if (!data) {
      return res.status(502).json({
        response: 'ERROR',
        error: 'Invalid response from subscription service',
      });
    }

    const status = typeof data.response === 'string' ? data.response.toUpperCase() : '';
    console.log('[civmtn login] upstream:', { msisdn, status, ok: response.ok });

    res.json({
      ...data,
      response: status || data.response,
    });
  } catch (err) {
    console.error('[civmtn login] upstream failed:', err);
    res.status(502).json({
      response: 'ERROR',
      error: 'Upstream request failed',
    });
  }
};

export const handleCivMtnUnsub: RequestHandler = async (req, res) => {
  const pid = String(req.query.pid ?? DEFAULT_PID);
  const msisdn = normalizeMsisdn(String(req.query.msisdn ?? ''));

  if (!msisdn) {
    return res.status(400).json({ response: 'INVALID', error: 'Invalid mobile number' });
  }

  const url = `${BASE}/CIVMTN/unsub?cp=1&pid=${encodeURIComponent(pid)}&msisdn=${encodeURIComponent(msisdn)}`;

  try {
    const response = await fetch(url, { signal: AbortSignal.timeout(UPSTREAM_TIMEOUT_MS) });
    const data = await parseUpstreamJson(response);

    if (!data) {
      return res.status(502).json({ response: 'ERROR', error: 'Invalid upstream response' });
    }

    res.json(data);
  } catch (err) {
    console.error('[civmtn unsub] upstream failed:', err);
    res.status(502).json({ response: 'ERROR', error: 'Upstream request failed' });
  }
};
