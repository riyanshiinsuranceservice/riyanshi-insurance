import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const highlightTileVariants = cva(
  "flex items-center gap-3 rounded-lg bg-surface-container-lowest shadow-ambient dark:bg-white/5",
  {
    variants: {
      padding: {
        default: "px-5 py-3",
        comfortable: "px-6 py-4",
      },
    },
    defaultVariants: {
      padding: "default",
    },
  }
)

type HighlightTileProps = React.ComponentProps<"div"> &
  VariantProps<typeof highlightTileVariants> & {
    icon: React.ReactNode
    children: React.ReactNode
  }

/**
 * What: compact trust or stat strip with an icon and bold caption.
 * Why: repeats in About and Lead hero areas (“100% secure”, product highlights).
 * What for: hero supporting facts without building one-off flex rows.
 */
function HighlightTile({
  className,
  padding,
  icon,
  children,
  ...props
}: HighlightTileProps) {
  return (
    <div
      data-slot="highlight-tile"
      className={cn(highlightTileVariants({ padding }), className)}
      {...props}
    >
      <span
        className="flex text-brand-secondary dark:text-secondary-fixed [&_svg]:size-6"
        aria-hidden
      >
        {icon}
      </span>
      <span className="font-bold text-primary dark:text-primary-fixed">
        {children}
      </span>
    </div>
  )
}

export { HighlightTile, highlightTileVariants }
