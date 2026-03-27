import * as React from "react"
import { ArrowRight } from "lucide-react"

import { AppLink } from "@/components/ui/app-link"
import { cn } from "@/lib/utils"

type LinkWithArrowProps = React.ComponentProps<typeof AppLink>

/**
 * What: “Learn more” affordance with spacing animation on hover (Services grid).
 * Why: repeated as button-styled anchors across stitch HTML.
 * What for: wraps `AppLink` so the arrow is a sibling inside one link (avoids Radix
 * `Slot` + `Children.only` when merging props onto a single child).
 */
function LinkWithArrow({
  className,
  variant = "navigation",
  children,
  ...props
}: LinkWithArrowProps) {
  return (
    <AppLink
      data-slot="link-with-arrow"
      variant={variant}
      className={cn(
        "group/arrow gap-2 font-bold text-primary transition-all hover:gap-3 dark:text-primary-fixed",
        className
      )}
      {...props}
    >
      {children}
      <ArrowRight
        className="size-4 shrink-0 transition-transform group-hover/arrow:translate-x-0.5"
        aria-hidden
      />
    </AppLink>
  )
}

export { LinkWithArrow }
