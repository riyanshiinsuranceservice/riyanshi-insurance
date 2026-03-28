import { SiteLogo } from "@/components/layout/site-logo"
import { AppLink } from "@/components/ui/app-link"
import { localizedContactHref, localizedServicesHref } from "@/routes"
import { getT } from "next-i18next/server"

type SiteFooterProps = {
  lng: string
}

/**
 * What: global footer columns from `common` (server `getT`).
 * Why: no translation props from each page; only the active locale segment is passed.
 */
async function SiteFooter({ lng }: SiteFooterProps) {
  const { t } = await getT("common", { lng })

  const sections = [
    {
      title: t("footer.quickLinks"),
      links: [
        { label: t("footer.privacy"), href: "#" },
        { label: t("footer.terms"), href: "#" },
        { label: t("footer.officeAhmedabad"), href: localizedContactHref(lng) },
        { label: t("footer.officeSurat"), href: localizedContactHref(lng) },
      ],
    },
    {
      title: t("footer.servicesTitle"),
      links: [
        { label: t("footer.svcLife"), href: localizedServicesHref(lng) },
        { label: t("footer.svcHealth"), href: localizedServicesHref(lng) },
        { label: t("footer.svcSip"), href: localizedServicesHref(lng) },
        { label: t("footer.svcTax"), href: localizedServicesHref(lng) },
      ],
    },
    {
      title: t("footer.connect"),
      links: [{ label: t("footer.address"), href: localizedContactHref(lng) }],
    },
  ]

  return (
    <footer className="mt-16 w-full bg-surface-container-low text-on-surface">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <h2 className="mb-3">
            <SiteLogo label={t("brand")} size="lg" />
          </h2>
          <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
            {t("footer.description")}
          </p>
        </div>

        {sections.map((section, sectionIndex) => (
          <div key={`footer-section-${sectionIndex}-${section.title}`}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em]">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link, linkIndex) => (
                <li key={`footer-link-${sectionIndex}-${linkIndex}-${link.label}`}>
                  <AppLink href={link.href} variant="navigation" size="sm">
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-outline-variant/25 border-t px-6 py-4 text-center text-xs text-neutral-600 dark:text-neutral-400">
        {t("footer.copyright")}
      </div>
    </footer>
  )
}

export { SiteFooter }
