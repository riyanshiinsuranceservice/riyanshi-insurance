import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const serviceCardVariants = cva(
  "group flex flex-col rounded-lg bg-surface-container-lowest p-8 shadow-sm transition-all duration-300 hover:shadow-md dark:bg-white/5",
  {
    variants: {
      accent: {
        primary: "border-l-4 border-primary",
        secondary: "border-l-4 border-brand-secondary",
        container: "border-l-4 border-primary-container",
        tertiary: "border-l-4 border-tertiary-fixed-dim",
        muted: "border-l-4 border-outline-variant/50",
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
        "font-display mb-3 text-2xl font-bold text-primary dark:text-primary-fixed",
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
        "mb-4 text-xl leading-snug font-bold text-on-surface",
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
        "mb-8 line-clamp-3 text-on-surface/80 leading-relaxed dark:text-neutral-300",
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
