import type { DrizzleD1Database } from 'drizzle-orm/d1';
import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';

// For use in API routes (has access to runtime env)
export function getDb(d1: D1Database): DrizzleD1Database<typeof schema> {
  return drizzle(d1, { schema });
}

// For use in static/prerendered pages (requires import.meta.env)
export function getStaticDb(): DrizzleD1Database<typeof schema> {
  const d1 = (import.meta.env.DB as unknown) as D1Database;
  if (!d1) {
    throw new Error('DB binding not found in import.meta.env');
  }
  return drizzle(d1, { schema });
}
