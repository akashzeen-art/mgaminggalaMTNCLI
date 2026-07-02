import { RequestHandler } from 'express';

const BASE = 'http://168.144.122.72/prod';

export const handleCivMtnLogin: RequestHandler = async (req, res) => {
  const { pid, msisdn } = req.query;
  try {
    const response = await fetch(`${BASE}/CPLogin/CIVMTN?pid=${pid}&msisdn=${msisdn}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Upstream request failed' });
  }
};

export const handleCivMtnUnsub: RequestHandler = async (req, res) => {
  const { pid, msisdn } = req.query;
  try {
    const response = await fetch(`${BASE}/CIVMTN/unsub?cp=1&pid=${pid}&msisdn=${msisdn}`);
    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(502).json({ error: 'Upstream request failed' });
  }
};
