import * as React from "react"
import Link from "next/link"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const appLinkVariants = cva(
  "inline-flex items-center gap-1.5 transition-[color,text-decoration-color,text-decoration-thickness] duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  {
    variants: {
      variant: {
        inline:
          "text-primary underline decoration-[1.5px] underline-offset-2 hover:text-primary-container dark:text-primary-fixed",
        navigation:
          "text-on-surface underline-offset-[0.35rem] decoration-primary no-underline hover:text-primary hover:underline hover:decoration-2 dark:text-foreground dark:decoration-primary-fixed dark:hover:text-primary-fixed",
        external:
          "text-primary underline decoration-[1.5px] underline-offset-2 hover:text-brand-secondary dark:text-primary-fixed dark:hover:text-secondary-fixed",
      },
      size: {
        sm: "text-sm",
        md: "text-base",
        lg: "text-lg",
      },
    },
    defaultVariants: {
      variant: "inline",
      size: "md",
    },
  }
)

type AppLinkProps = {
  href: string
  external?: boolean
  children: React.ReactNode
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "children"> &
  VariantProps<typeof appLinkVariants>

function AppLink({
  href,
  external = false,
  variant,
  size,
  className,
  children,
  ...props
}: AppLinkProps) {
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          appLinkVariants({ variant: variant ?? "external", size }),
          className
        )}
        {...props}
      >
        {children}
      </a>
    )
  }

  return (
    <Link
      href={href}
      className={cn(appLinkVariants({ variant, size }), className)}
      {...props}
    >
      {children}
    </Link>
  )
}

export { AppLink, appLinkVariants }
