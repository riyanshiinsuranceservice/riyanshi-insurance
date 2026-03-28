import { Fragment, type ReactNode } from "react"
import { Mail, MapPin, MessageCircle, Navigation, Phone } from "lucide-react"

import { SiteLogo } from "@/components/layout/site-logo"
import { AppLink, appLinkVariants } from "@/components/ui/app-link"
import {
  SITE_CONSULT_TEL,
  SITE_INQUIRY_EMAIL,
  SITE_PHONE_DISPLAY,
  SITE_WHATSAPP_HREF,
} from "@/lib/site-contact"
import { cn } from "@/lib/utils"
import {
  localizedAboutHref,
  localizedContactHref,
  localizedHref,
  localizedServicesHref,
} from "@/routes"
import { getT } from "next-i18next/server"

type SiteFooterProps = {
  lng: string
}

type InlineNavItem = { label: string; href: string }

/** Dense inline nav: wraps on small screens; dot separators save vertical space vs stacked lists. */
function FooterInlineLinkRow({ items }: { items: InlineNavItem[] }) {
  const linkClass = cn(
    appLinkVariants({ variant: "navigation", size: "sm" }),
    "font-medium text-on-surface underline decoration-transparent decoration-1 underline-offset-2",
    "transition-[text-decoration-color,color] hover:text-primary hover:decoration-primary/70 dark:hover:text-primary-fixed dark:hover:decoration-primary-fixed/70 text-sm"
  )

  return (
    <p className="flex flex-wrap items-baseline gap-x-0 gap-y-1 text-sm leading-snug">
      {items.map((item, index) => (
        <Fragment key={`${item.href}-${item.label}`}>
          {index > 0 ? (
            <span
              className="mx-1.5 text-on-surface-variant/35 select-none sm:mx-2"
              aria-hidden
            >
              ·
            </span>
          ) : null}
          <AppLink href={item.href} className={linkClass}>
            {item.label}
          </AppLink>
        </Fragment>
      ))}
    </p>
  )
}

type ContactChipProps = {
  href: string
  icon: ReactNode
  children: ReactNode
  external?: boolean
  className?: string
  /** Two-line body (e.g. title + phone); aligns icon to top and avoids single-line truncation. */
  stacked?: boolean
  "aria-label"?: string
}

/** Small bordered chip: fits several contacts per row on tablet/desktop. */
function ContactChip({
  href,
  icon,
  children,
  external,
  className,
  stacked,
  "aria-label": ariaLabel,
}: ContactChipProps) {
  const chipClass = cn(
    "inline-flex min-h-9 max-w-full gap-1.5 rounded-md border border-outline-variant/25 bg-surface-container-lowest px-2.5 py-1.5 text-left text-xs font-medium text-on-surface",
    stacked ? "items-start py-2" : "items-center",
    "transition-[border-color,background-color,box-shadow] hover:border-primary/25 hover:bg-surface-container-highest/80",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/35 focus-visible:ring-offset-1 focus-visible:ring-offset-surface-container-low",
    className
  )

  const bodyClass = stacked ? "min-w-0 flex-1 leading-snug" : "min-w-0 flex-1 truncate"

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(chipClass, "no-underline!")}
        aria-label={ariaLabel}
      >
        <span className={cn("shrink-0", stacked && "pt-0.5")} aria-hidden>
          {icon}
        </span>
        <span className={bodyClass}>{children}</span>
      </a>
    )
  }

  return (
    <a
      href={href}
      className={cn(chipClass, connectChipNoUnderline)}
      aria-label={ariaLabel}
    >
      <span className={cn("shrink-0", stacked && "pt-0.5")} aria-hidden>
        {icon}
      </span>
      <span className={bodyClass}>{children}</span>
    </a>
  )
}

const connectChipNoUnderline = cn(
  appLinkVariants({ variant: "navigation", size: "sm" }),
  "no-underline!"
)

type FooterContactChipConfig = {
  key: string
  href: string
  icon: ReactNode
  content: ReactNode
  stacked?: boolean
  className?: string
  external?: boolean
  ariaLabel?: string
}

/**
 * What: compact global footer — brand, copy, and nav share one column; contact is a tight chip grid.
 * Why: previous card + stacked rows used a lot of vertical space with little information density.
 * What for: maximum routes and contact methods visible with minimal scroll on mobile and desktop.
 */
async function SiteFooter({ lng }: SiteFooterProps) {
  const { t } = await getT("common", { lng })
  const homeHref = localizedHref(lng)

  const quickLinkItems: InlineNavItem[] = [
    { label: t("nav.home"), href: homeHref },
    { label: t("nav.about"), href: localizedAboutHref(lng) },
    { label: t("nav.services"), href: localizedServicesHref(lng) },
    { label: t("nav.contact"), href: localizedContactHref(lng) },
  ]

  const serviceLinkItems: InlineNavItem[] = [
    { label: t("footer.servicesPageCta"), href: localizedServicesHref(lng) },
    { label: t("footer.homeServicesAnchor"), href: localizedHref(lng, "services") },
  ]

  const iconClass = "size-4 shrink-0 text-brand-secondary dark:text-secondary-fixed"

  return (
    <footer className="relative mt-8 w-full overflow-hidden border-t border-outline-variant/20 bg-surface-container-low text-on-surface sm:mt-10">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-primary/20 to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto w-full max-w-7xl px-4 py-5 sm:px-6 sm:py-6 lg:px-8 lg:py-7">
        <div className="grid grid-cols-1 gap-6 sm:gap-7 lg:grid-cols-12 lg:items-start lg:gap-8">
          {/* Brand + description + all internal links — one column */}
          <div className="min-w-0 lg:col-span-7 xl:col-span-8">
            <div className="flex flex-col gap-2">
              <h2 className="leading-tight">
                <AppLink
                  href={homeHref}
                  variant="navigation"
                  size="lg"
                  className="inline-flex rounded-md transition-opacity hover:opacity-85"
                  aria-label={t("nav.home")}
                >
                  <SiteLogo label={t("brand")} size="lg" />
                </AppLink>
              </h2>
              <p className="max-w-xl text-xs leading-snug text-on-surface-variant sm:text-sm">
                {t("footer.description")}
              </p>
            </div>

            <div className="mt-4 space-y-3 border-t border-outline-variant/20 pt-4 sm:mt-5 sm:space-y-3.5 sm:pt-5">
              {[
                {
                  label: t("footer.quickLinks"),
                  items: quickLinkItems,
                },
                {
                  label: t("footer.servicesTitle"),
                  items: serviceLinkItems,
                },
              ].map(({ label, items }, idx) => (
                <div key={idx}>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
                    {label}
                  </p>
                  <FooterInlineLinkRow items={items} />
                </div>
              ))}
            </div>
          </div>

          {/* Contact — address + chip grid */}
          <div className="min-w-0 border-t border-outline-variant/15 pt-6 lg:col-span-5 lg:border-t-0 lg:border-l lg:pl-8 lg:pt-0 xl:col-span-4">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.14em] text-on-surface-variant">
              {t("footer.connect")}
            </p>
            <div className="mb-3 flex gap-2 rounded-lg border border-outline-variant/15 bg-surface-container-lowest/80 p-2.5 dark:bg-surface-container-lowest/50">
              <MapPin
                className={cn(iconClass, "shrink-0 mt-0.5")}
                strokeWidth={2}
                aria-hidden
              />
              <div className="min-w-0 text-xs leading-snug">
                <span className="font-medium text-on-surface">
                  {t("office.addressLabel")}
                </span>
                <span className="mt-0.5 block whitespace-pre-line text-on-surface-variant">
                  {t("office.address")}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(
                [
                  {
                    key: "phone",
                    href: SITE_CONSULT_TEL,
                    stacked: true,
                    className: "w-full sm:col-span-2",
                    icon: <Phone className={iconClass} strokeWidth={2} />,
                    ariaLabel: `${t("nav.contact")}, ${t("footer.callUs")}, ${SITE_PHONE_DISPLAY}`,
                    content: (
                      <>
                        <span className="block font-semibold text-on-surface">
                          {t("nav.contact")}
                        </span>
                        <span className="mt-0.5 block text-[11px] font-normal text-on-surface-variant tabular-nums">
                          {SITE_PHONE_DISPLAY}
                        </span>
                      </>
                    ),
                  },
                  {
                    key: "email",
                    href: `mailto:${SITE_INQUIRY_EMAIL}`,
                    icon: <Mail className={iconClass} strokeWidth={2} aria-hidden />,
                    content: SITE_INQUIRY_EMAIL,
                  },
                  {
                    key: "whatsapp",
                    href: SITE_WHATSAPP_HREF,
                    external: true,
                    icon: (
                      <MessageCircle className={iconClass} strokeWidth={2} aria-hidden />
                    ),
                    content: t("footer.whatsapp"),
                  },
                  {
                    key: "map",
                    href: t("office.mapsUrl"),
                    external: true,
                    icon: (
                      <Navigation className={iconClass} strokeWidth={2} aria-hidden />
                    ),
                    className: "w-full sm:col-span-2",
                    content: t("office.directionsCta"),
                  },
                ] satisfies FooterContactChipConfig[]
              ).map(
                ({
                  key,
                  href,
                  stacked,
                  className,
                  icon,
                  ariaLabel,
                  external,
                  content,
                }) => (
                  <ContactChip
                    key={key}
                    href={href}
                    icon={icon}
                    stacked={stacked}
                    className={className}
                    external={external}
                    aria-label={ariaLabel}
                  >
                    {content}
                  </ContactChip>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-outline-variant/20 bg-primary/4 dark:bg-primary/10">
        <div className="mx-auto text-center flex w-full max-w-7xl flex-col gap-2 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4 sm:px-6 sm:py-3 lg:px-8">
          <p className="text-pretty text-[11px] leading-snug text-on-surface-variant sm:flex-1 sm:text-xs">
            {t("footer.copyright")}
          </p>
        </div>
      </div>
    </footer>
  )
}

export { SiteFooter }
