import { getT } from "next-i18next/server"

import { AppLink } from "@/components/ui/app-link"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/routes"

type LanguageToggleProps = {
  lng: string
  className?: string
}

/**
 * What: EN / GU links with labels from `common`.
 * Why: server component — locale comes from layout `[lng]`; no client hooks.
 * What for: passed into `SiteHeader` as a slot from the localized layout.
 */
export default async function LanguageToggle({ lng, className }: LanguageToggleProps) {
  const { t } = await getT("common", { lng })
  const currentLng = lng === "en" || lng === "gu" ? lng : "gu"

  return (
    <div className={cn("flex items-center gap-2 text-sm", className)}>
      <AppLink
        href={ROUTE.en.path}
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
        href={ROUTE.gu.path}
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
