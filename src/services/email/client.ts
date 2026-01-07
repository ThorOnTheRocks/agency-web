import { Resend } from 'resend';
import { emailConfig } from '../../config/email';
import { env } from '../../lib/env';

export const resendClient = new Resend(env.RESEND_API_KEY);

export const EMAIL_CONFIG = emailConfig;
