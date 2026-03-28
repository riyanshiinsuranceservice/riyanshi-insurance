"use client"

import * as React from "react"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { useT } from "next-i18next/client"

import { Button } from "@/components/ui/button"
import { AppLink, appLinkVariants } from "@/components/ui/app-link"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  useSidebar,
} from "@/components/ui/sidebar"
import { SiteLogo } from "@/components/layout/site-logo"
import { isActiveNavHref } from "@/lib/nav-active"
import { cn } from "@/lib/utils"
import { SITE_CONSULT_TEL } from "@/lib/site-contact"
import {
  localizedAboutHref,
  localizedContactHref,
  localizedHref,
  localizedLeadHref,
  localizedServicesHref,
} from "@/routes"

/** Pixels scrolled before the bar pins — keeps the hero unobstructed, then locks nav for long pages. */
const HEADER_PIN_SCROLL_PX = 48

/** Stitch-style active primary nav: brand color + weighted underline. */
const HEADER_NAV_ACTIVE_CLASSNAME =
  "font-medium text-primary underline decoration-2 decoration-primary underline-offset-[0.35rem] hover:text-primary dark:text-primary-fixed dark:decoration-primary-fixed dark:hover:text-primary-fixed"

type SiteHeaderProps = {
  className?: string
  languageToggle: React.ReactNode
}

type NavItem = { key: string; label: string; href: string }

/**
 * What: primary nav + language switch + call CTA for all pages under `[lng]`.
 * Why: copy comes from `common` via `useT`; `languageToggle` is server-rendered and passed from layout.
 * Mobile nav uses shadcn `Sidebar` (sheet) + `ScrollArea` so long link lists stay usable.
 */
function MobileMenuTrigger({ openMobile }: { openMobile: boolean }) {
  const { toggleSidebar } = useSidebar()

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="md:hidden"
      onClick={toggleSidebar}
      aria-expanded={openMobile}
      aria-controls="site-mobile-sidebar"
      aria-label={openMobile ? "Close navigation menu" : "Open navigation menu"}
    >
      {openMobile ? (
        <X className="size-5" aria-hidden="true" />
      ) : (
        <Menu className="size-5" aria-hidden="true" />
      )}
    </Button>
  )
}

function MobileSidebarNavMenu({
  items,
  pathname,
  currentHash,
}: {
  items: NavItem[]
  pathname: string
  currentHash: string
}) {
  const { setOpenMobile } = useSidebar()

  return (
    <SidebarMenu className="gap-1">
      {items.map((item) => {
        const active = isActiveNavHref(pathname, currentHash, item.href)
        return (
          <SidebarMenuItem key={item.key}>
            <SidebarMenuButton asChild size="lg" className="h-11">
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  appLinkVariants({ variant: "navigation", size: "md" }),
                  "font-medium",
                  active && HEADER_NAV_ACTIVE_CLASSNAME
                )}
                onClick={() => setOpenMobile(false)}
              >
                {item.label}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )
      })}
    </SidebarMenu>
  )
}

function SiteHeaderShell({
  className,
  navItems,
  lng,
  t,
  languageToggle,
}: {
  className?: string
  navItems: NavItem[]
  lng: string
  t: (key: string) => string
  languageToggle: React.ReactNode
}) {
  const pathname = usePathname()
  const { openMobile } = useSidebar()
  const [isPinned, setIsPinned] = React.useState(false)
  const [currentHash, setCurrentHash] = React.useState("")

  /**
   * What: keep `currentHash` in sync with the URL (hash-only sections on `[lng]`).
   * Why: Next.js `usePathname()` omits the fragment; nav uses `/lng#section` for some items.
   * What for: correct `aria-current` + underline on About/Services/Contact when the hash matches.
   */
  React.useEffect(() => {
    const syncHash = () =>
      setCurrentHash(typeof window !== "undefined" ? window.location.hash : "")
    syncHash()
    window.addEventListener("hashchange", syncHash)
    window.addEventListener("popstate", syncHash)
    return () => {
      window.removeEventListener("hashchange", syncHash)
      window.removeEventListener("popstate", syncHash)
    }
  }, [pathname])

  /**
   * What: switch from in-flow header to fixed after a short scroll.
   * Why: sticky-at-zero keeps the bar always visible; product wants breathing room first, then persistence.
   * What for: marketing layout where the first screen is hero-led without a persistent chrome strip.
   */
  React.useEffect(() => {
    const onScroll = () => {
      setIsPinned(window.scrollY > HEADER_PIN_SCROLL_PX)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <>
      <Sidebar id="site-mobile-sidebar" mobileOnly collapsible="offcanvas" side="left">
        <SidebarHeader className="gap-3 border-b border-sidebar-border p-4">
          <div className="flex items-center justify-between max-sm:flex-col gap-2">
            <SiteLogo label={t("brand")} size="sm" className="text-sidebar-foreground" />
            {languageToggle}
          </div>
        </SidebarHeader>
        <SidebarContent className="min-h-0 flex-1 overflow-hidden px-2 py-3">
          {/*
           * What: ScrollArea wraps nav links so overflow scrolls inside the sheet instead of clipping.
           * Why: fixed sheet height + future menu growth need a predictable scroll region.
           */}
          <ScrollArea className="h-[min(28rem,calc(100dvh-12rem))]">
            <MobileSidebarNavMenu
              items={navItems}
              pathname={pathname}
              currentHash={currentHash}
            />
          </ScrollArea>
        </SidebarContent>
        <SidebarFooter className="border-t border-sidebar-border p-4">
          <Button asChild variant="primary" className="w-full">
            <a href={SITE_CONSULT_TEL}>{t("header.cta")}</a>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <div className="w-full">
        {isPinned ? <div className="h-16 w-full shrink-0" aria-hidden="true" /> : null}
        <header
          className={cn(
            "z-50 w-full border-b border-outline-variant/20 bg-white/80 backdrop-blur-xl transition-shadow duration-200 dark:bg-neutral-950/70",
            isPinned
              ? "fixed top-0 right-0 left-0 shadow-[0_8px_24px_rgba(25,28,30,0.06)]"
              : "relative",
            className
          )}
        >
          <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 md:px-6">
            <AppLink
              href={localizedHref(lng)}
              variant="navigation"
              className="font-semibold no-underline"
            >
              <SiteLogo label={t("brand")} size="md" />
            </AppLink>

            <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
              {navItems.map((item) => {
                const active = isActiveNavHref(pathname, currentHash, item.href)
                return (
                  <AppLink
                    key={item.key}
                    href={item.href}
                    variant="navigation"
                    size="sm"
                    aria-current={active ? "page" : undefined}
                    className={cn(active && HEADER_NAV_ACTIVE_CLASSNAME)}
                  >
                    {item.label}
                  </AppLink>
                )
              })}
            </nav>

            <div className="hidden items-center gap-3 md:flex">
              {languageToggle}
              <Button asChild variant="primary" size="sm">
                <a href={SITE_CONSULT_TEL}>{t("header.cta")}</a>
              </Button>
            </div>

            <MobileMenuTrigger openMobile={openMobile} />
          </div>
        </header>
      </div>
    </>
  )
}

function SiteHeader({ className, languageToggle }: SiteHeaderProps) {
  const { t } = useT("common")
  const params = useParams()
  const lng = typeof params?.lng === "string" ? params.lng : "gu"

  const navItems: NavItem[] = [
    { key: "home", label: t("nav.home"), href: localizedHref(lng) },
    { key: "about", label: t("nav.about"), href: localizedAboutHref(lng) },
    { key: "services", label: t("nav.services"), href: localizedServicesHref(lng) },
    { key: "lead", label: t("nav.lead"), href: localizedLeadHref(lng) },
    { key: "contact", label: t("nav.contact"), href: localizedContactHref(lng) },
  ]

  return (
    <SidebarProvider defaultOpen={false} className="flex min-h-0 w-full min-w-0 flex-col">
      <SiteHeaderShell
        className={className}
        navItems={navItems}
        lng={lng}
        t={t}
        languageToggle={languageToggle}
      />
    </SidebarProvider>
  )
}

export { SiteHeader }
