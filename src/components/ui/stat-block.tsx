import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const statItemValueVariants = cva(
  "mb-2 font-[var(--font-display)] text-4xl font-extrabold lg:text-5xl",
  {
    variants: {
      tone: {
        primary: "text-[var(--color-primary)] dark:text-[var(--color-primary-fixed)]",
        secondary:
          "text-[var(--color-secondary)] dark:text-[var(--color-secondary-fixed)]",
      },
    },
    defaultVariants: {
      tone: "primary",
    },
  }
)

type StatItemProps = React.ComponentProps<"div"> & {
  value: React.ReactNode
  label: string
} & VariantProps<typeof statItemValueVariants>

/**
 * What: single stat cell (number + uppercase label).
 * Why: duplicated in Lead landing, About, and Home trust rows.
 * What for: marketing proof blocks inside a `StatsGrid` or custom layouts.
 */
function StatItem({ className, value, label, tone, ...props }: StatItemProps) {
  return (
    <div
      data-slot="stat-item"
      className={cn("space-y-2 text-center", className)}
      {...props}
    >
      <p className={cn(statItemValueVariants({ tone }))}>{value}</p>
      <p className="label-md text-[color:color-mix(in_srgb,var(--color-on-surface)_68%,transparent)] dark:text-neutral-400">
        {label}
      </p>
    </div>
  )
}

const statsGridVariants = cva("grid text-center", {
  variants: {
    columns: {
      two: "grid-cols-2 gap-8 md:grid-cols-4",
      four: "grid-cols-2 gap-8 md:grid-cols-4 lg:gap-12",
    },
    container: {
      false: "",
      true: "relative overflow-hidden rounded-3xl bg-[var(--color-surface-container-high)] p-10 dark:bg-white/10",
    },
  },
  defaultVariants: {
    columns: "four",
    container: false,
  },
})

type StatsGridProps = React.ComponentProps<"div"> & VariantProps<typeof statsGridVariants>

function StatsGrid({ className, columns, container, ...props }: StatsGridProps) {
  return (
    <div
      data-slot="stats-grid"
      className={cn(statsGridVariants({ columns, container }), className)}
      {...props}
    />
  )
}

export { StatItem, StatsGrid, statItemValueVariants, statsGridVariants }
