import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const contactInfoTileVariants = cva(
  "flex items-center gap-3 rounded-[var(--radius-default)] bg-[var(--color-surface-container-low)] p-4 dark:bg-white/10",
  {
    variants: {
      elevated: {
        false: "shadow-none",
        true: "bg-[var(--color-surface-container-lowest)] shadow-sm dark:bg-white/5",
      },
    },
    defaultVariants: {
      elevated: false,
    },
  }
)

type ContactInfoTileProps = React.ComponentProps<"div"> &
  VariantProps<typeof contactInfoTileVariants> & {
    icon: React.ReactNode
    label: string
    value: React.ReactNode
  }

/**
 * What: labeled contact block (phone, email, address teaser).
 * Why: Contact and Lead pages share the same icon + meta + primary line layout.
 * What for: consistent lead-gen and location sections.
 */
function ContactInfoTile({
  className,
  elevated,
  icon,
  label,
  value,
  ...props
}: ContactInfoTileProps) {
  return (
    <div
      data-slot="contact-info-tile"
      className={cn(contactInfoTileVariants({ elevated }), className)}
      {...props}
    >
      <span
        className="flex shrink-0 text-[var(--color-secondary)] dark:text-[var(--color-secondary-fixed)] [&_svg]:size-7"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0">
        <p className="label-md text-[color:color-mix(in_srgb,var(--color-on-surface)_65%,transparent)]">
          {label}
        </p>
        <div className="truncate font-bold text-[var(--color-primary)] dark:text-[var(--color-primary-fixed)]">
          {value}
        </div>
      </div>
    </div>
  )
}

export { ContactInfoTile, contactInfoTileVariants }
