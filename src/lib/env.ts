import { z } from 'zod';
import 'dotenv/config';

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  SANITY_PROJECT_ID: z.string().min(1),
  SANITY_DATASET: z.string().default('production'),
  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),
});

const processEnv = {
  DATABASE_URL: import.meta.env.DATABASE_URL,
  SANITY_PROJECT_ID: import.meta.env.SANITY_PROJECT_ID,
  SANITY_DATASET: import.meta.env.SANITY_DATASET,
  SPOTIFY_CLIENT_ID: import.meta.env.SPOTIFY_CLIENT_ID,
  SPOTIFY_CLIENT_SECRET: import.meta.env.SPOTIFY_CLIENT_SECRET,
  SPOTIFY_REFRESH_TOKEN: import.meta.env.SPOTIFY_REFRESH_TOKEN,
};

const parsed = envSchema.safeParse(processEnv);

if (!parsed.success) {
  console.error(
    '❌ Invalid environment variables:',
    parsed.error.flatten().fieldErrors
  );
  throw new Error('Invalid environment variables');
}

// 3. Export the typed, validated config
export const env = parsed.data;
