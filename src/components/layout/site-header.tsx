"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/ui/app-link"

type NavItem = {
  label: string
  href: string
}

type SiteHeaderProps = {
  brand: string
  navItems: NavItem[]
  ctaLabel?: string
  ctaHref?: string
  className?: string
}

function SiteHeader({
  brand,
  navItems,
  ctaLabel = "Call Now",
  ctaHref = "#",
  className,
}: SiteHeaderProps) {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-[color:color-mix(in_srgb,var(--color-outline-variant)_20%,transparent)] bg-white/80 backdrop-blur-xl dark:bg-neutral-950/70",
        className
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
        <AppLink href="#" variant="navigation" className="font-semibold no-underline">
          <span className="font-[var(--font-display)] text-lg tracking-tight">
            {brand}
          </span>
        </AppLink>

        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {navItems.map((item) => (
            <AppLink key={item.href} href={item.href} variant="navigation" size="sm">
              {item.label}
            </AppLink>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button asChild variant="primary" size="sm">
            <a href={ctaHref}>{ctaLabel}</a>
          </Button>
        </div>

        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="mobile-navigation"
          aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        >
          {isOpen ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </Button>
      </div>

      {isOpen ? (
        <div
          id="mobile-navigation"
          className="border-t border-[color:color-mix(in_srgb,var(--color-outline-variant)_20%,transparent)] bg-[var(--color-surface-container-lowest)] px-4 py-4 md:hidden dark:bg-neutral-900"
        >
          <nav className="flex flex-col gap-3" aria-label="Mobile Primary">
            {navItems.map((item) => (
              <AppLink
                key={`mobile-${item.href}`}
                href={item.href}
                variant="navigation"
                className="rounded-md px-2 py-1.5 hover:bg-[var(--color-surface-container-low)] dark:hover:bg-white/10"
              >
                {item.label}
              </AppLink>
            ))}
            <Button asChild variant="primary" className="mt-2 w-full">
              <a href={ctaHref}>{ctaLabel}</a>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  )
}

export { SiteHeader }
