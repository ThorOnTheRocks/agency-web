import { drizzle } from 'drizzle-orm/neon-serverless';
import { Pool, neonConfig } from '@neondatabase/serverless';
import { env } from '../../lib/env';

neonConfig.webSocketConstructor = WebSocket;

export const db = drizzle(new Pool({ connectionString: env.DATABASE_URL }));
