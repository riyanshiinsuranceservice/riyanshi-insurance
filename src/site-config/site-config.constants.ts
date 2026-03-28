/**
 * What: central marketing and SEO defaults for the whole site (name, URLs, keywords, social handles).
 * Why: one place to edit production base URL, default copy, and Open Graph / Twitter baselines instead of scattering literals in layouts.
 * What for: consumed by `generateSeoMetaData` and the root `app/layout.tsx` `metadataBase` / fallbacks.
 */

/** Public site origin without trailing slash. Prefer `NEXT_PUBLIC_SITE_URL` in `.env` for canonical and OG URLs. */
export function getSiteBaseUrl(): string {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim()
  if (raw) {
    return raw.replace(/\/$/, "")
  }
  return "http://localhost:3000"
}

/**
 * What: structured defaults for non-secret site identity and SEO.
 * Why: `generateSeoMetaData` merges these with per-page overrides; keep handles and keywords aligned with real accounts when you launch.
 * What for: import `SITE_CONFIG` only for reading static defaults — use `getSiteBaseUrl()` for the resolved origin.
 */
export const SITE_CONFIG = {
  /** Display / legal style name (English); localized titles still come from i18n on each page. */
  name: "Riyanshi Insurance & Investment",

  seo: {
    /** Used when a page does not pass `description` into `generateSeoMetaData`. */
    defaultTitle: "Riyanshi Insurance & Investment",
    defaultDescription:
      "Trusted life, health, and investment insurance guidance in Gujarat. IRDAI-aligned advisor — clear plans, claim support, and long-term protection.",
    /**
     * Baseline search phrases; pages may append or replace via `generateSeoMetaData` `keywords` / `keywordsReplace`.
     */
    defaultKeywords: [
      "insurance",
      "life insurance",
      "health insurance",
      "investment",
      "Gujarat",
      "Ahmedabad",
      "IRDAI",
      "Riyanshi Insurance",
    ] as const,
    /**
     * What: Next.js `title.template` when a nested route passes only a short `title` segment.
     * Why: keeps `| Brand` consistent; current pages still pass a full `title` string, which overrides the template for that route.
     */
    titleTemplate: "%s | Riyanshi Insurance & Investment",
    /**
     * What: shared Open Graph fields that rarely change.
     * What for: merged under page-level `openGraph` overrides in `generateSeoMetaData`.
     */
    openGraphDefaults: {
      type: "website" as const,
    },
    /**
     * What: shared Twitter / X card defaults.
     * Why: set real `@handles` when accounts exist; placeholders avoid invalid URLs.
     * What for: merged under page `twitter` overrides.
     */
    twitterDefaults: {
      card: "summary_large_image" as const,
    },
  },

  /**
   * What: global social handles for `twitter` metadata (site + creator).
   * Why: separate from `seo` so you can swap handles without touching keyword lists.
   */
  social: {
    /** X/Twitter @username for the organization (no @ in value is OK; Next normalizes usage). */
    twitterSite: "@riyanshiinsurance",
    twitterCreator: "@riyanshiinsurance",
  },

  /**
   * What: optional default OG/Twitter image (absolute URL recommended).
   * Why: unset until you add a real `/public/og.png` or CDN asset; pages can still pass `openGraph.images` per route.
   */
  defaultOgImageUrl: null as string | null,
} as const
