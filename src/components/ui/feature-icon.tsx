import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const featureIconVariants = cva(
  "flex shrink-0 items-center justify-center rounded-lg [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "size-10 [&_svg:not([class*='size-'])]:size-5",
        md: "size-12 [&_svg:not([class*='size-'])]:size-6",
        lg: "size-16 [&_svg:not([class*='size-'])]:size-8",
      },
      tone: {
        primary:
          "bg-primary-fixed text-primary dark:bg-primary-container dark:text-primary-fixed",
        secondary:
          "bg-secondary-fixed text-brand-secondary dark:text-on-secondary-fixed-variant",
        muted:
          "bg-primary-fixed-dim text-primary-container dark:bg-white/15 dark:text-primary-fixed",
        tertiary:
          "bg-tertiary-fixed text-tertiary dark:bg-on-tertiary-fixed-variant dark:text-tertiary-fixed",
        neutral:
          "bg-surface-container-highest text-on-surface dark:bg-white/10 dark:text-foreground",
        inverse: "bg-white/20 text-white",
      },
      shape: {
        rounded: "",
        circle: "rounded-full",
      },
    },
    defaultVariants: {
      size: "md",
      tone: "primary",
      shape: "rounded",
    },
  }
)

type FeatureIconProps = React.ComponentProps<"div"> &
  VariantProps<typeof featureIconVariants> & {
    children: React.ReactNode
  }

/**
 * What: wraps decorative or semantic icons in a consistent surface “tile”.
 * Why: stitch screens repeat the same icon + soft fill pattern in cards and grids.
 * What for: feature lists, service headers, and value props without duplicating layout classes.
 */
function FeatureIcon({
  className,
  size,
  tone,
  shape,
  children,
  ...props
}: FeatureIconProps) {
  return (
    <div
      data-slot="feature-icon"
      className={cn(featureIconVariants({ size, tone, shape }), className)}
      {...props}
    >
      {children}
    </div>
  )
}

export { FeatureIcon, featureIconVariants }
