/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

type Runtime = import('@astrojs/cloudflare').Runtime<Env>;

declare namespace App {
  interface Locals extends Runtime {
    otherLocals: {
      test: string;
    };
  }
}

type D1Database = import('@cloudflare/workers-types').D1Database;
type R2Bucket = import('@cloudflare/workers-types').R2Bucket;
type KVNamespace = import('@cloudflare/workers-types').KVNamespace;

interface Env {
  DB: D1Database;
  MEDIA_BUCKET: R2Bucket;
  SESSION: KVNamespace;
  WEBFLOW_CMS_SITE_API_TOKEN?: string;
  WEBFLOW_API_HOST?: string;
}

interface ImportMetaEnv {
  readonly DB: D1Database;
  readonly MEDIA_BUCKET: R2Bucket;
  readonly SESSION: KVNamespace;
  readonly WEBFLOW_CMS_SITE_API_TOKEN?: string;
  readonly WEBFLOW_API_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
