// Base URL for the application
// In production (Webflow Cloud), this will be the mount path (e.g., /memory-journal)
// In development, this will be empty string
export const baseUrl = import.meta.env.BASE_URL?.replace(/\/$/, '') || '';
