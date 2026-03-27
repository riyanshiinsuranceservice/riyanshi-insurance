import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-[var(--radius-default)] border border-transparent text-sm font-semibold whitespace-nowrap transition-all outline-none select-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-container))] text-white shadow-[0_8px_24px_rgba(0,32,69,0.18)] hover:brightness-110",
        primary:
          "bg-[linear-gradient(135deg,var(--color-primary),var(--color-primary-container))] text-white shadow-[0_8px_24px_rgba(0,32,69,0.18)] hover:brightness-110",
        secondary:
          "bg-slate-200 text-slate-900 hover:bg-slate-300 dark:bg-white/10 dark:text-[var(--color-secondary-fixed)] dark:hover:bg-white/15",
        ghost:
          "bg-transparent text-[var(--color-primary)] hover:bg-[var(--color-surface-container-low)] dark:text-[var(--color-primary-fixed)] dark:hover:bg-white/10",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90 dark:bg-destructive dark:text-white",
        outline:
          "border border-[color:color-mix(in_srgb,var(--color-outline-variant)_35%,transparent)] bg-transparent text-[var(--color-on-surface)] hover:bg-[var(--color-surface-container-low)] dark:text-foreground dark:hover:bg-white/10",
        mintSolid:
          "border-0 bg-[var(--color-secondary-fixed)] text-slate-950 shadow-[0_4px_18px_rgba(0,32,69,0.22)] hover:bg-[var(--color-secondary-fixed)] hover:brightness-[0.97] hover:shadow-[0_6px_22px_rgba(0,32,69,0.28)]",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 gap-2 px-4",
        sm: "h-8 gap-1.5 px-3 text-xs",
        lg: "h-12 gap-2.5 px-6 text-base",
        icon: "size-10",
        "icon-sm": "size-8 gap-0 p-0 [&_svg]:size-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading = false,
  loadingText = "Loading...",
  children,
  disabled,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
    loading?: boolean
    loadingText?: string
  }) {
  const Comp = asChild ? Slot.Root : "button"
  const isDisabled = disabled || loading

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      aria-busy={loading || undefined}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    >
      {loading ? (
        <>
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
          <span>{loadingText}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  )
}

export { Button, buttonVariants }
