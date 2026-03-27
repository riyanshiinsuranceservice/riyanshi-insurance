import * as React from "react"

import { cn } from "@/lib/utils"

const spaceYVariants = {
  comfortable: "space-y-12 md:space-y-16",
  editorial: "space-y-16 md:space-y-24",
} as const

type PageWrapperProps = {
  children: React.ReactNode
  className?: string
  /** Vertical rhythm between direct children (typically full-width sections). */
  spacing?: keyof typeof spaceYVariants
}

/**
 * What: stacks page sections with consistent `space-y` gaps.
 * Why: keeps section-to-section rhythm in one place instead of ad-hoc margins.
 * What for: home and other long-form marketing pages built from stacked sections.
 */
function PageWrapper({
  children,
  className,
  spacing = "editorial",
}: PageWrapperProps) {
  return (
    <div className={cn("flex w-full flex-col", spaceYVariants[spacing], className)}>
      {children}
    </div>
  )
}

export { PageWrapper, spaceYVariants }
