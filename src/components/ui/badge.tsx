import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "group/badge inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-transparent font-medium whitespace-nowrap transition-all focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background [&>svg]:pointer-events-none [&>svg]:size-3!",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-br from-primary to-primary-container text-white",
        trust:
          "bg-secondary-fixed text-on-secondary-fixed-variant",
        status:
          "bg-surface-container-highest text-brand-secondary dark:bg-white/10 dark:text-secondary-fixed",
        category:
          "bg-primary-fixed text-primary-container dark:bg-primary-container dark:text-primary-fixed",
        secondary: "bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80",
        destructive: "bg-destructive/10 text-destructive dark:bg-destructive/20",
        outline:
          "border-outline-variant/35 text-on-surface dark:text-foreground",
      },
      size: {
        sm: "h-5 px-2 py-0.5 text-[0.7rem]",
        md: "h-6 px-2.5 py-1 text-xs",
        lg: "h-7 px-3 py-1.5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
)

function Badge({
  className,
  variant = "default",
  size = "md",
  asChild = false,
  ...props
}: React.ComponentProps<"span"> &
  VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "span"

  return (
    <Comp
      data-slot="badge"
      data-variant={variant}
      className={cn(badgeVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Badge, badgeVariants }
