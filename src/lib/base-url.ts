// Avoid relying on `import.meta` so the Webflow bundler (CommonJS) can parse this file.
const runtimeBaseUrl =
  typeof window !== "undefined"
    ? window.location.origin
    : typeof process !== "undefined" && process.env.BASE_URL
      ? process.env.BASE_URL
      : "";

export const baseUrl = runtimeBaseUrl.replace(/\/$/, "");
