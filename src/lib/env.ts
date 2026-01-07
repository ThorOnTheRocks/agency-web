import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  EMAIL_FROM: z.string().optional().default('Portfolio Contact <onboarding@resend.dev>'),
  EMAIL_TO: z.string().email(),
});

const processEnv = {
  DATABASE_URL: import.meta.env.DATABASE_URL,
  RESEND_API_KEY: import.meta.env.RESEND_API_KEY,
  EMAIL_FROM: import.meta.env.EMAIL_FROM,
  EMAIL_TO: import.meta.env.EMAIL_TO,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables');
}

export const env = parsed.data;
