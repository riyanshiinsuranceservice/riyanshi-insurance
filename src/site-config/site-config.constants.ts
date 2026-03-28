/**
 * What: central marketing and SEO defaults for the whole site (name, URLs, keywords, social handles).
 * Why: one place to edit production base URL, default copy, and Open Graph / Twitter baselines instead of scattering literals in layouts.
 * What for: consumed by `generateSeoMetaData` and the root `app/layout.tsx` `metadataBase` / fallbacks.
 */

/** Fallback origin when `NEXT_PUBLIC_SITE_URL` / `SITE_URL` are unset (local dev). */
export const DEFAULT_SITE_BASE_URL = "http://localhost:3000"

/**
 * Fallback inbox when no inquiry recipient env vars are set (mailto links + owner notification).
 * Why: single default for `.env.example` and code; override per environment without editing source.
 */
export const DEFAULT_INQUIRY_RECIPIENT_EMAIL = "riyanshiinsuranceservice@gmail.com"

/**
 * What: resolved public site origin without trailing slash.
 * Why: `NEXT_PUBLIC_SITE_URL` is available on client and server; `SITE_URL` is optional server-only alias.
 * What for: canonical URLs, `metadataBase`, and absolute OG URLs in `generateSeoMetaData`.
 */
export function getSiteBaseUrl(): string {
  const raw =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim()
  if (raw) {
    return raw.replace(/\/$/, "")
  }
  return DEFAULT_SITE_BASE_URL
}

/**
 * What: inbox that receives contact inquiries and appears in public mailto links.
 * Why: one public address — `NEXT_PUBLIC_INQUIRY_RECIPIENT_EMAIL` so server (SMTP) and client (mailto) stay aligned.
 * What for: footer / office UI (`SITE_INQUIRY_EMAIL`) and `sendInquiryEmails` owner `to` address.
 */
export function getInquiryRecipientEmail(): string {
  return (
    process.env.NEXT_PUBLIC_INQUIRY_RECIPIENT_EMAIL?.trim() ||
    DEFAULT_INQUIRY_RECIPIENT_EMAIL
  )
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

  /**
   * What: phones, maps, and inbox defaults — public marketing data (not secrets).
   * Why: one source for CTAs, footers, office block, and WhatsApp; change numbers/URLs here only.
   * What for: `@/lib/site-contact` derives `tel:` / `wa.me` from `phoneWhatsappDigits`; use `getInquiryRecipientEmail()` for the live inbox.
   */
  contact: {
    inquiryRecipientEmail: DEFAULT_INQUIRY_RECIPIENT_EMAIL,
    /** Country + number, no spaces, no `+` (e.g. 919876543210) — used for `tel:` and `https://wa.me/{digits}`. */
    phoneWhatsappDigits: "919876543210",
    /** Human-readable phone for labels and form placeholders. */
    phoneDisplay: "+91 98765 43210",
    /** Google Maps (or other) directions link for the office. */
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=Sanidhya+Complex+Ashram+Road+Ahmedabad+380009",
  },

  /**
   * What: remote hero / section imagery (absolute URLs for `next/image` remotePatterns).
   * Why: swap assets without hunting through pages and sections.
   * What for: home, services, about, and office map photo.
   */
  media: {
    homeHero:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD73up3w9fM2qUSW-xiczkB_AhLgenkYBapF0MPEEfwxJFfppw2nd9YWGkYg1_SvSaIiTYzSlpc5IIFHN7QTeL3_zPEpz3QvICuJH6U1uNW-SG1AsKK-HUqp85HTgCm_q5pReJh7Z5Y5nruHml4QfDiq2oMUjshCJv41vPUaKTc9eD7WTYlLYVYxI9mODEdk_ZIMVUeDx991fGQF3hwDQqgHbOodRGLP3jiDZzwJPSnGHhjVaDpxapZvltq26oYPYYM6n-XaH71MYA",
    homeWhyChoose:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBNkxKYmC09ap7XsFs9D97Wd4fh-U6HcYB5Kw30eHplNgKs0r0Oxt2hNDHEDSkJV2MLhT8QtnqQyzEgAqhdQR5rd1tt0HyRG6LwuudcMJ3AYsJZtsI31KX_dVygWw0GwhZCMFGJD1slAtRXmDvYZdRTaPJzTSy2Nn0oGsPnqGqBw8gcUuR0PaQyFuQ2TgXf7Edz6-mlu1V10xY6T9R-AXy9sycFy4zF4byUykLT8cga3hvhqvpUjwgkRo457-eGUCDxEsuxUu21f6Y",
    officeMap:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCm2l9_Gr8RwuEGpr9JtfsWaS4YA0UwNhlFyfSVDPkIeUjt3_lijSBwkKnaj5wrTnbpa-M2GSXGSUlaN5ce_ZFx7dCs0En2fto1Ewa4Cc3wmk2BimA7TGFe0V_MsgMJOieOTRv3330qURSndiLa0pyfPjczeqUTVdLtl4FkFNf5lleOBWBka6C_e6rtKWMY21FctIHkOrm-ghmXadR7WweaBYYRTT061XJgGICo4MXgu0zvrMYI4X63nSe4m7o9M_swLtXik3UUDKg",
    servicesHero:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAVpVdiAkdBZV2SvXwyqwAS0Nm5YFmZwXSfU8NO7uBFq81K8gdssK1_4qolbIVlUp5yJVMAsEOKb6Q0Ftb27C0bhI4CMIenWXFGmlWXyQDfUCgHQiEP_jTx4_vNYJzcVN4YOXrhtzV_0UrOEmHCrKbox_FCf2_UceeSgYwYu7hki6FflvGnjAMTNukLX-I6fnPwVJ_ZASFZZehhSZobujkXQFaOojuMK9_v9x67iqbNTgQgSfP1Oue8MDuRrwLyrtkXOCFugpMFHrg",
    aboutHero:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDg63YwPtL16oL1HGX81pufV4l0-YLQN2gfzwrsVl7JY0Ceq0pLk9480jNTxhdhid-4mY0OQNZdroQ7EzbVJ6H4PxJHA_-qEuL-alGeT0fXiIq13jXuKIGS5Sv71OQhy0ouVqqIeDt1UQ0cOdYQ6m2OPb7ea6eWOI4owyJdGPkUwLvikWZDEm7suQzjymPEa7JhPVyLRU5Yy-KV1PIv971vuFAm7GwmsgE_UzimavmqjUv6aW2dCdGorYLns172rPtEgIzUvqTvVdY",
  },
} as const
