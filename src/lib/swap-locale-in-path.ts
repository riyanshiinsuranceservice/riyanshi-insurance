/**
 * What: builds the same route under another locale by swapping the first segment when it is `en` or `gu`.
 * Why: language toggle must not always send users to the locale home; it should mirror the active page.
 * What for: `LanguageToggle` hrefs (and any other locale switcher).
 */
export function swapLocaleInPath(pathname: string, targetLng: "en" | "gu"): string {
  const segments = pathname.split("/").filter(Boolean)
  if (segments.length === 0) {
    return `/${targetLng}`
  }
  const [first, ...rest] = segments
  if (first === "en" || first === "gu") {
    return `/${targetLng}${rest.length > 0 ? `/${rest.join("/")}` : ""}`
  }
  return `/${targetLng}`
}
