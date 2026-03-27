import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const serviceCardVariants = cva(
  "group flex flex-col rounded-[var(--radius-default)] bg-[var(--color-surface-container-lowest)] p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-white/5",
  {
    variants: {
      accent: {
        primary: "border-l-4 border-[var(--color-primary)]",
        secondary: "border-l-4 border-[var(--color-secondary)]",
        container: "border-l-4 border-[var(--color-primary-container)]",
        tertiary: "border-l-4 border-[var(--color-tertiary-fixed-dim)]",
        muted:
          "border-l-4 border-[color:color-mix(in_srgb,var(--color-outline-variant)_50%,transparent)]",
      },
    },
    defaultVariants: {
      accent: "primary",
    },
  }
)

type ServiceCardProps = React.ComponentProps<"div"> &
  VariantProps<typeof serviceCardVariants>

/**
 * What: editorial service / product tile with left accent (Services stitch grid).
 * Why: repeats across Services page with the same shell; only content changes.
 * What for: composition—place FeatureIcon, Badge, headings, and AppLink inside.
 */
function ServiceCard({ className, accent, ...props }: ServiceCardProps) {
  return (
    <div
      data-slot="service-card"
      className={cn(serviceCardVariants({ accent }), className)}
      {...props}
    />
  )
}

const serviceCardHeaderVariants = cva("mb-6 flex items-start justify-between gap-4")

function ServiceCardHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="service-card-header"
      className={cn(serviceCardHeaderVariants(), className)}
      {...props}
    />
  )
}

function ServiceCardTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="service-card-title"
      className={cn(
        "mb-3 font-[var(--font-display)] text-2xl font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-fixed)]",
        className
      )}
      {...props}
    />
  )
}

function ServiceCardTagline({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="service-card-tagline"
      className={cn(
        "mb-4 text-xl font-bold leading-snug text-[var(--color-on-surface)]",
        className
      )}
      {...props}
    />
  )
}

function ServiceCardDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="service-card-description"
      className={cn(
        "mb-8 line-clamp-3 text-[color:color-mix(in_srgb,var(--color-on-surface)_78%,white)] leading-relaxed dark:text-neutral-300",
        className
      )}
      {...props}
    />
  )
}

function ServiceCardFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="service-card-footer"
      className={cn("mt-auto flex items-center", className)}
      {...props}
    />
  )
}

export {
  ServiceCard,
  ServiceCardHeader,
  ServiceCardTitle,
  ServiceCardTagline,
  ServiceCardDescription,
  ServiceCardFooter,
  serviceCardVariants,
}
