import crypto from 'node:crypto';

export const createSHA256 = (stringToEncrypt: string, salt: string): string =>
  crypto.createHmac('sha256', salt).update(stringToEncrypt).digest('hex');
