import type { Metadata } from "next"

import { SITE_CONFIG, getSiteBaseUrl } from "./site-config.constants"

/**
 * What: inputs for building a page’s `Metadata` on top of `SITE_CONFIG` defaults.
 * Why: routes only pass what differs (title, description, path, locale); canonical and social tags stay consistent.
 * What for: every `generateMetadata` in localized `app/[lng]/…/page.tsx` routes should call `generateSeoMetaData` with these fields.
 */
export type GenerateSeoMetaDataInput = {
  /**
   * What: full HTML `<title>` text (e.g. `${t("nav.about")} | ${t("brand")}`).
   * Why: app is bilingual and titles are translated; passing the final string avoids duplicating template logic in this helper.
   */
  title: string
  /**
   * What: meta description; omit to use `SITE_CONFIG.seo.defaultDescription`.
   * Why: keeps a sensible fallback for thin routes while allowing page-specific copy.
   */
  description?: string
  /**
   * What: pathname for this document, starting with `/`, e.g. `/en/about` or `/gu/contact`.
   * Why: must match the public URL so `alternates.canonical` and `openGraph.url` are correct.
   * What for: pass values from `@/routes` helpers (`localizedHref`, `localizedAboutHref`, etc.).
   */
  canonicalPath: string
  /**
   * What: active locale segment from `[lng]` (`en` | `gu`).
   * Why: drives `openGraph.locale` (`en_IN` / `gu_IN`) for crawlers.
   */
  lng: string
  /**
   * What: extra keywords merged after `SITE_CONFIG.seo.defaultKeywords` unless `keywordsReplace` is true.
   * Why: pages can add long-tail terms without losing global terms.
   */
  keywords?: string[]
  /**
   * What: when true, `keywords` becomes the full list (defaults are not prepended).
   * Why: rare pages (e.g. legal) may need a tightly controlled vocabulary.
   */
  keywordsReplace?: boolean
  /** What: shallow merge over computed `openGraph` (e.g. per-page `images`). */
  openGraph?: Metadata["openGraph"]
  /** What: shallow merge over computed `twitter` card fields. */
  twitter?: Metadata["twitter"]
  /** What: crawl directives; defaults to index + follow. */
  robots?: Metadata["robots"]
  /**
   * What: any other `Metadata` keys applied last (e.g. `category`, `icons`).
   * Why: escape hatch without expanding this type for every Next metadata field.
   */
  extra?: Metadata
}

/**
 * What: resolves the absolute canonical URL for metadata consumers.
 * Why: `canonicalPath` is always relative to the configured site origin.
 */
function toAbsoluteCanonicalUrl(canonicalPath: string): string {
  const base = getSiteBaseUrl()
  const path = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`
  return `${base}${path}`
}

/**
 * What: maps `[lng]` to BCP 47–style Open Graph locale strings.
 * Why: Facebook / LinkedIn use these hints for language targeting.
 */
function openGraphLocaleFromLng(lng: string): string {
  return lng === "gu" ? "gu_IN" : "en_IN"
}

/**
 * What: builds Next.js `Metadata` with site-wide defaults, then applies page overrides.
 * Why: one function ensures canonical URL, OG, Twitter, and keywords stay aligned across routes.
 * What for: call from every `export async function generateMetadata` and spread/return the result.
 *
 * @example
 * ```ts
 * export async function generateMetadata({ params }) {
 *   const { lng } = await params
 *   const { t } = await getT("aboutPage", { lng })
 *   const { t: tc } = await getT("common", { lng })
 *   return generateSeoMetaData({
 *     title: `${tc("nav.about")} | ${tc("brand")}`,
 *     description: t("hero.intro"),
 *     canonicalPath: localizedAboutHref(lng),
 *     lng,
 *   })
 * }
 * ```
 */
export function generateSeoMetaData(input: GenerateSeoMetaDataInput): Metadata {
  const {
    title,
    description = SITE_CONFIG.seo.defaultDescription,
    canonicalPath,
    lng,
    keywords: pageKeywords,
    keywordsReplace,
    openGraph: openGraphOverride,
    twitter: twitterOverride,
    robots,
    extra,
  } = input

  const canonical = toAbsoluteCanonicalUrl(canonicalPath)
  const keywordList = keywordsReplace
    ? [...(pageKeywords ?? [])]
    : [...SITE_CONFIG.seo.defaultKeywords, ...(pageKeywords ?? [])]

  const defaultImages =
    SITE_CONFIG.defaultOgImageUrl != null && SITE_CONFIG.defaultOgImageUrl !== ""
      ? [{ url: SITE_CONFIG.defaultOgImageUrl }]
      : undefined

  const openGraph: Metadata["openGraph"] = {
    ...SITE_CONFIG.seo.openGraphDefaults,
    url: canonical,
    siteName: SITE_CONFIG.name,
    locale: openGraphLocaleFromLng(lng),
    title,
    description,
    ...(defaultImages ? { images: defaultImages } : {}),
    ...openGraphOverride,
  }

  const twitter: Metadata["twitter"] = {
    ...SITE_CONFIG.seo.twitterDefaults,
    site: SITE_CONFIG.social.twitterSite,
    creator: SITE_CONFIG.social.twitterCreator,
    title,
    description,
    ...(defaultImages ? { images: defaultImages } : {}),
    ...twitterOverride,
  }

  return {
    title,
    description,
    keywords: keywordList,
    alternates: {
      canonical,
    },
    openGraph,
    twitter,
    robots: robots ?? { index: true, follow: true },
    ...extra,
  }
}
