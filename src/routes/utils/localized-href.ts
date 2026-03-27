import { ROUTE } from "@/routes/route"

type LocaleKey = Exclude<keyof typeof ROUTE, "hash">

/**
 * What: home URL for a locale segment, optionally with a known in-page hash.
 * Why: `[lng]` is dynamic; this maps runtime `lng` to the correct `ROUTE.*.path` + fragment.
 * What for: `/${lng}`, `/${lng}#contact`, etc., from a single definition set.
 */
export function localizedHref(lng: string, fragment?: keyof typeof ROUTE.hash): string {
  const localeKey: LocaleKey = lng === "en" || lng === "gu" ? lng : "gu"
  const base = ROUTE[localeKey].path
  return fragment ? `${base}${ROUTE.hash[fragment]}` : base
}
