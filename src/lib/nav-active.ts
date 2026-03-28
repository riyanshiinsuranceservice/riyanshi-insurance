import { getSiteBaseUrl } from "@/site-config/site-config.constants"

/**
 * What: compares the current document path + hash to a nav `href` (locale paths and/or `#fragment`).
 * Why: this app uses hash targets on the home route; `usePathname()` alone cannot detect those.
 * What for: header / footer active states without duplicating parsing in each component.
 */
export function isActiveNavHref(
  pathname: string,
  currentHash: string,
  itemHref: string
): boolean {
  try {
    const origin =
      typeof window !== "undefined" ? window.location.origin : getSiteBaseUrl()
    const resolved = new URL(itemHref, origin)
    const itemPath =
      resolved.pathname.replace(/\/$/, "") === "" ? "/" : resolved.pathname.replace(/\/$/, "")
    const normPath =
      pathname.replace(/\/$/, "") === "" ? "/" : pathname.replace(/\/$/, "")

    const itemHash = resolved.hash

    if (!itemHash) {
      if (normPath !== itemPath) {
        return false
      }
      return !currentHash || currentHash === "#"
    }

    if (normPath !== itemPath && !normPath.startsWith(`${itemPath}/`)) {
      return false
    }

    return currentHash === itemHash
  } catch {
    return false
  }
}
