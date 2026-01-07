import { env } from '../lib/env';

export const emailConfig = {
  from: env.EMAIL_FROM,
  to: env.EMAIL_TO,
} as const;
