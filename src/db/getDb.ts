import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

// For dynamic routes
export const getDb = (locals: App.Locals) => {
  const env = locals?.runtime?.env;
  
  if (!env?.DB) {
    throw new Error("Database binding not available. Make sure the Cloudflare adapter platformProxy is enabled and wrangler.toml is configured.");
  }
  
  return drizzle(env.DB, { schema });
};

// For static routes
export const getDbAsync = async (locals: App.Locals) => {
  const env = locals?.runtime?.env;
  
  if (!env?.DB) {
    throw new Error("Database binding not available. Make sure the Cloudflare adapter platformProxy is enabled and wrangler.toml is configured.");
  }
  
  return drizzle(env.DB, { schema });
};
