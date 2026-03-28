/**
 * What: barrel for site-wide marketing config and SEO metadata helpers.
 * Why: import from `@/site-config` in layouts and `generateMetadata` without deep paths.
 * What for: `SITE_CONFIG`, `getSiteBaseUrl`, and `generateSeoMetaData`.
 */

export { SITE_CONFIG, getSiteBaseUrl } from "./site-config.constants"
export { generateSeoMetaData, type GenerateSeoMetaDataInput } from "./generate-seo-metadata"
