import { ROUTE } from "@/routes/route"

type LocaleKey = Exclude<keyof typeof ROUTE, "hash">

function localeKeyFromLng(lng: string): LocaleKey {
  return lng === "en" || lng === "gu" ? lng : "gu"
}

/**
 * What: home URL for a locale segment, optionally with a known in-page hash.
 * Why: `[lng]` is dynamic; this maps runtime `lng` to the correct `ROUTE.*.path` + fragment.
 * What for: `/${lng}`, `/${lng}#contact`, etc., from a single definition set.
 */
export function localizedHref(lng: string, fragment?: keyof typeof ROUTE.hash): string {
  const localeKey = localeKeyFromLng(lng)
  const base = ROUTE[localeKey].path
  return fragment ? `${base}${ROUTE.hash[fragment]}` : base
}

/**
 * What: resolved `/[lng]/services` path for the dedicated services page.
 * Why: services live on a first-class route (Stitch `our_services`) instead of only `#services`.
 * What for: nav, footer, and CTAs without duplicating segment strings.
 */
export function localizedServicesHref(lng: string): string {
  const localeKey = localeKeyFromLng(lng)
  return ROUTE[localeKey].services.path
}
