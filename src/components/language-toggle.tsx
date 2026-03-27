"use client"

import { useParams } from "next/navigation"
import { useT } from "next-i18next/client"

import { AppLink } from "@/components/ui/app-link"
import { cn } from "@/lib/utils"
import { ROUTE } from "@/routes"

type LanguageToggleProps = {
  className?: string
}

/**
 * What: EN / GU links with labels from `common`.
 * Why: used in the site header everywhere; reads locale from the `[lng]` segment.
 */
export default function LanguageToggle({ className }: LanguageToggleProps) {
  const { t } = useT("common")
  const params = useParams()
  const currentLng = typeof params?.lng === "string" ? params.lng : "gu"

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
