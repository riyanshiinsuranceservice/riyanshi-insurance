import { AppLink } from "@/components/ui/app-link"

type FooterLink = {
  label: string
  href: string
}

type FooterSection = {
  title: string
  links: FooterLink[]
}

type SiteFooterProps = {
  brand: string
  description: string
  sections: FooterSection[]
  copyright: string
}

function SiteFooter({ brand, description, sections, copyright }: SiteFooterProps) {
  return (
    <footer className="mt-16 w-full bg-[var(--color-surface-container-low)] text-[var(--color-on-surface)]">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <h2 className="mb-3 font-[var(--font-display)] text-lg font-bold">{brand}</h2>
          <p className="text-sm leading-6 text-neutral-700 dark:text-neutral-300">
            {description}
          </p>
        </div>

        {sections.map((section) => (
          <div key={section.title}>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-[0.05em] text-[var(--color-secondary)]">
              {section.title}
            </h3>
            <ul className="space-y-2">
              {section.links.map((link) => (
                <li key={link.href}>
                  <AppLink href={link.href} variant="navigation" size="sm">
                    {link.label}
                  </AppLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="border-t border-[color:color-mix(in_srgb,var(--color-outline-variant)_25%,transparent)] px-6 py-4 text-center text-xs text-neutral-600 dark:text-neutral-400">
        {copyright}
      </div>
    </footer>
  )
}

export { SiteFooter }
