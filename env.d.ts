/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly DATABASE_URL: string;
  readonly RESEND_API_KEY: string;
  readonly EMAIL_FROM: string;
  readonly EMAIL_TO: string;
  readonly SANITY_PROJECT_ID: string;
  readonly SANITY_DATASET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
