/**
 * Rate limiting utilities for Webflow API calls
 */

const RATE_LIMIT_DELAY = 100; // ms between requests

export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export async function withRateLimit<T>(fn: () => Promise<T>): Promise<T> {
  await delay(RATE_LIMIT_DELAY);
  return fn();
}
