import { cn } from "@/lib/utils"

const siteLogoSize = {
  sm: "text-base font-semibold",
  md: "text-lg font-semibold",
  lg: "text-lg font-bold",
} as const

type SiteLogoSize = keyof typeof siteLogoSize

type SiteLogoProps = {
  /** Localized company name from `common.brand`. */
  label: string
  size?: SiteLogoSize
  className?: string
}

/**
 * What: typographic wordmark for Riyanshi (display font + weight) in one place.
 * Why: header, mobile sidebar, and footer must stay visually consistent when the name or styling changes.
 */
function SiteLogo({ label, size = "md", className }: SiteLogoProps) {
  return (
    <span
      className={cn(
        "font-display tracking-tight text-inherit",
        siteLogoSize[size],
        className
      )}
    >
      {label}
    </span>
  )
}

export { SiteLogo, type SiteLogoProps, type SiteLogoSize }
