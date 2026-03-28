"use client"

/**
 * What: EN / GU links that keep the current route (and hash) when switching locale.
 * Why: must be a client component so `usePathname` reflects `/[lng]/…`; server-only links always pointed at locale roots.
 * What for: passed into `SiteHeader` from `[lng]` layout — toggling language stays on the same logical page.
 */

import * as React from "react"
import { usePathname } from "next/navigation"
import { useT } from "next-i18next/client"

import { AppLink } from "@/components/ui/app-link"
import { cn } from "@/lib/utils"
import { swapLocaleInPath } from "@/lib/swap-locale-in-path"

type LanguageToggleProps = {
  lng: string
  className?: string
}

function LanguageToggle({ lng, className }: LanguageToggleProps) {
  const { t } = useT("common")
  const pathname = usePathname()
  const currentLng = lng === "en" || lng === "gu" ? lng : "gu"

  /**
   * What: append `#fragment` after client mount and on hash changes.
   * Why: `usePathname()` omits the hash; preserving it keeps section anchors (e.g. home `#contact`) when switching language.
   */
  const [hashSuffix, setHashSuffix] = React.useState("")
  React.useEffect(() => {
    const sync = () => {
      setHashSuffix(typeof window !== "undefined" ? window.location.hash : "")
    }
    sync()
    window.addEventListener("hashchange", sync)
    return () => window.removeEventListener("hashchange", sync)
  }, [pathname])

  const hrefEn = `${swapLocaleInPath(pathname, "en")}${hashSuffix}`
  const hrefGu = `${swapLocaleInPath(pathname, "gu")}${hashSuffix}`

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <AppLink
        href={hrefEn}
        variant="navigation"
        size="sm"
        className={cn(
          "rounded-full px-3 py-1.5 no-underline transition-colors",
          currentLng === "en"
            ? "bg-surface-container-highest font-semibold text-primary"
            : "text-on-surface-variant hover:text-primary"
        )}
      >
        {t("language.english")}
      </AppLink>
      <AppLink
        href={hrefGu}
        variant="navigation"
        size="sm"
        className={cn(
          "rounded-full px-3 py-1.5 no-underline transition-colors",
          currentLng === "gu"
            ? "bg-surface-container-highest font-semibold text-primary"
            : "text-on-surface-variant hover:text-primary"
        )}
      >
        {t("language.gujarati")}
      </AppLink>
    </div>
  )
}

export default LanguageToggle
