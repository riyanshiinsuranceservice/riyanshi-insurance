import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const ctaBannerVariants = cva(
  "relative overflow-hidden text-white shadow-[var(--shadow-ambient)] gradient-trust",
  {
    variants: {
      size: {
        default: "rounded-3xl px-8 py-10 md:px-12 md:py-14",
        compact: "rounded-2xl px-6 py-8 md:px-10 md:py-10",
      },
      align: {
        start: "text-left",
        center: "text-center",
      },
    },
    defaultVariants: {
      size: "default",
      align: "center",
    },
  }
)

type CtaBannerProps = React.ComponentProps<"section"> &
  VariantProps<typeof ctaBannerVariants>

/**
 * What: full-width trust-gradient panel for closing CTAs (Home, Contact, Lead).
 * Why: repeated “trust-gradient rounded…” blocks with the same motion and type color.
 * What for: slot headings, copy, and actions via `children` for maximum flexibility.
 */
function CtaBanner({ className, size, align, children, ...props }: CtaBannerProps) {
  return (
    <section
      data-slot="cta-banner"
      className={cn(ctaBannerVariants({ size, align }), className)}
      {...props}
    >
      {children}
    </section>
  )
}

function CtaBannerTitle({ className, ...props }: React.ComponentProps<"h2">) {
  return (
    <h2
      data-slot="cta-banner-title"
      className={cn(
        "font-[var(--font-display)] text-3xl font-bold tracking-tight md:text-4xl",
        className
      )}
      {...props}
    />
  )
}

function CtaBannerDescription({ className, ...props }: React.ComponentProps<"p">) {
  return (
    <p
      data-slot="cta-banner-description"
      className={cn(
        "mt-4 max-w-2xl text-lg text-[color:color-mix(in_srgb,white_88%,transparent)]",
        className
      )}
      {...props}
    />
  )
}

function CtaBannerActions({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="cta-banner-actions"
      className={cn(
        "mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row",
        className
      )}
      {...props}
    />
  )
}

export {
  CtaBanner,
  CtaBannerTitle,
  CtaBannerDescription,
  CtaBannerActions,
  ctaBannerVariants,
}
