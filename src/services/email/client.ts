import { Resend } from 'resend';
import { emailConfig } from '../../config/email';

export const resendClient = new Resend(import.meta.env.RESEND_API_KEY);

// Re-export email configuration for backwards compatibility
export const EMAIL_CONFIG = emailConfig;
