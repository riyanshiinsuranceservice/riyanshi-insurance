import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const featureIconVariants = cva(
  "flex shrink-0 items-center justify-center rounded-[var(--radius-default)] [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      size: {
        sm: "size-10 [&_svg:not([class*='size-'])]:size-5",
        md: "size-12 [&_svg:not([class*='size-'])]:size-6",
        lg: "size-16 [&_svg:not([class*='size-'])]:size-8",
      },
      tone: {
        primary:
          "bg-[var(--color-primary-fixed)] text-[var(--color-primary)] dark:bg-[var(--color-primary-container)] dark:text-[var(--color-primary-fixed)]",
        secondary:
          "bg-[var(--color-secondary-fixed)] text-[var(--color-secondary)] dark:text-[var(--color-on-secondary-fixed-variant)]",
        muted:
          "bg-[var(--color-primary-fixed-dim)] text-[var(--color-primary-container)] dark:bg-white/15 dark:text-[var(--color-primary-fixed)]",
        tertiary:
          "bg-[var(--color-tertiary-fixed)] text-[var(--color-tertiary)] dark:bg-[var(--color-on-tertiary-fixed-variant)] dark:text-[var(--color-tertiary-fixed)]",
        neutral:
          "bg-[var(--color-surface-container-highest)] text-[var(--color-on-surface)] dark:bg-white/10 dark:text-foreground",
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
