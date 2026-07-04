/** Normalize Côte d'Ivoire MSISDN to 225XXXXXXXXXX (digits only, single country prefix). */
export function normalizeMsisdn(raw: string): string {
  const digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  if (digits.startsWith('225')) return digits;
  return `225${digits}`;
}

export type CivMtnLoginResponse =
  | 'ACTIVE'
  | 'INACTIVE'
  | 'INSUFFICIENT'
  | 'INVALID'
  | 'ERROR'
  | string;

export interface CivMtnLoginResult {
  response?: CivMtnLoginResponse;
  actDate?: string;
  renewDate?: string;
  pricePoint?: string;
  validity?: string;
  unsubUrl?: string;
  error?: string;
  errorMessage?: string;
}
