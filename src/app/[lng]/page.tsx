import LanguageToggle from "@/components/language-toggle"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/ui/app-link"
import {
  CtaBanner,
  CtaBannerActions,
  CtaBannerDescription,
  CtaBannerTitle,
} from "@/components/ui/cta-banner"
import { ContactInfoTile } from "@/components/ui/contact-info-tile"
import { FeatureIcon } from "@/components/ui/feature-icon"
import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button"
import { HighlightTile } from "@/components/ui/highlight-tile"
import { LinkWithArrow } from "@/components/ui/link-with-arrow"
import { SectionEyebrow } from "@/components/ui/section-eyebrow"
import {
  ServiceCard,
  ServiceCardDescription,
  ServiceCardFooter,
  ServiceCardHeader,
  ServiceCardTagline,
  ServiceCardTitle,
} from "@/components/ui/service-card"
import { StatItem, StatsGrid } from "@/components/ui/stat-block"
import { Phone, ShieldCheck, TrendingUp, Users } from "lucide-react"
import { getT } from "next-i18next/server"

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t } = await getT("common", { lng })
  const navItems = [
    { label: "Home", href: `/${lng}` },
    { label: "Services", href: "#services" },
    { label: "Contact", href: "#contact" },
  ]

  return (
    <div className="min-h-screen bg-[var(--color-surface)] text-[var(--color-on-surface)]">
      <SiteHeader
        brand="Riyanshi Insurance & Investment"
        navItems={navItems}
        ctaLabel="Get Consultation"
      />

      <main className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-6 py-10">
        <section className="space-y-4">
          <Badge variant="trust" size="md">
            Verified Advisors
          </Badge>
          <h1 className="display-lg max-w-4xl text-[var(--color-on-surface)]">
            {t("welcome")}
          </h1>
          <p className="body-lg text-[color:color-mix(in_srgb,var(--color-on-surface)_85%,white)]">
            {t("hello")}
          </p>
          <LanguageToggle currentLng={lng} />
        </section>

        <section
          id="components-from-stitch"
          className="space-y-8 rounded-[var(--radius-default)] bg-[var(--color-surface-container)] p-6"
        >
          <div className="space-y-2">
            <SectionEyebrow>Stitch-derived patterns</SectionEyebrow>
            <h2 className="headline-md text-[var(--color-primary)]">
              Reusable blocks from your HTML mocks
            </h2>
            <p className="body-lg max-w-2xl text-[color:color-mix(in_srgb,var(--color-on-surface)_82%,white)]">
              Eyebrow labels, highlight tiles, contact tiles, service cards, stats, CTA
              banners, and WhatsApp FAB—composed with tokens from the design system.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <HighlightTile icon={<ShieldCheck />}>
              100% transparent guidance
            </HighlightTile>
            <HighlightTile icon={<ShieldCheck />} padding="comfortable">
              5000+ families served
            </HighlightTile>
          </div>

          <div className="flex flex-wrap gap-4">
            <ContactInfoTile icon={<Phone />} label="Phone" value="+91 98765 43210" />
            <ContactInfoTile
              elevated
              icon={<Phone />}
              label="Email"
              value="info@riyanshi.com"
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <ServiceCard accent="primary">
              <ServiceCardHeader>
                <FeatureIcon tone="primary" size="lg" shape="circle">
                  <Users className="size-8" />
                </FeatureIcon>
                <Badge variant="trust" size="sm">
                  SECURE
                </Badge>
              </ServiceCardHeader>
              <ServiceCardTitle>Life Insurance</ServiceCardTitle>
              <ServiceCardTagline>
                “Secure your family’s future with the right term plan.”
              </ServiceCardTagline>
              <ServiceCardDescription>
                Term and endowment options explained in plain language so you can choose
                coverage with confidence.
              </ServiceCardDescription>
              <ServiceCardFooter>
                <LinkWithArrow href="#services">Learn more</LinkWithArrow>
              </ServiceCardFooter>
            </ServiceCard>

            <ServiceCard accent="tertiary">
              <ServiceCardHeader>
                <FeatureIcon tone="tertiary" size="lg" shape="circle">
                  <TrendingUp className="size-8" />
                </FeatureIcon>
                <Badge variant="category" size="sm">
                  WEALTH
                </Badge>
              </ServiceCardHeader>
              <ServiceCardTitle>Investment plans</ServiceCardTitle>
              <ServiceCardTagline>
                “Balanced growth aligned to your goals.”
              </ServiceCardTagline>
              <ServiceCardDescription>
                Mutual funds, SIPs, and goal-based portfolios matched to your risk
                appetite and timeline.
              </ServiceCardDescription>
              <ServiceCardFooter>
                <LinkWithArrow href="#services">View products</LinkWithArrow>
              </ServiceCardFooter>
            </ServiceCard>
          </div>

          <div className="rounded-[var(--radius-default)] bg-[var(--color-surface-container-low)] p-6">
            <StatsGrid>
              <StatItem value="5000+" label="Happy clients" tone="primary" />
              <StatItem value="15+" label="Years experience" tone="primary" />
              <StatItem value="99%" label="Claim support" tone="secondary" />
              <StatItem value="24/7" label="Assistance" tone="secondary" />
            </StatsGrid>
          </div>

          <CtaBanner align="center" size="default">
            <CtaBannerTitle className="max-w-3xl mx-auto">
              Ready for a free, no-obligation review?
            </CtaBannerTitle>
            <CtaBannerDescription className="mx-auto text-center">
              Our advisors help you pick the right mix of insurance and investments for
              your family’s goals.
            </CtaBannerDescription>
            <CtaBannerActions>
              <Button
                variant="secondary"
                className="min-w-[10rem] bg-white text-[var(--color-primary)] hover:bg-[var(--color-surface-container-low)]"
              >
                Book a call
              </Button>
              <Button
                variant="outline"
                className="min-w-[10rem] border-white/40 bg-white/10 text-white hover:bg-white/20"
              >
                View services
              </Button>
            </CtaBannerActions>
          </CtaBanner>
        </section>

        <section
          id="services"
          className="grid gap-6 rounded-[var(--radius-default)] bg-[var(--color-surface-container-low)] p-6 md:grid-cols-2"
        >
          <div className="space-y-4">
            <h2 className="headline-md">Button variants</h2>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="destructive">Destructive</Button>
              <Button loading loadingText="Submitting" aria-label="Submitting form">
                Submit
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="headline-md">Badge and link variants</h2>
            <div className="flex flex-wrap items-center gap-3">
              <Badge variant="status">Active Policy</Badge>
              <Badge variant="category">Investment</Badge>
              <Badge variant="outline">Low Risk</Badge>
            </div>
            <div className="flex flex-col gap-2">
              <AppLink href="#contact" variant="inline">
                Talk to an advisor
              </AppLink>
              <AppLink href={`/${lng}`} variant="navigation">
                Explore services
              </AppLink>
              <AppLink href="https://www.irdai.gov.in" variant="external" external>
                Regulatory information
              </AppLink>
            </div>
          </div>
        </section>
      </main>

      <div id="contact">
        <SiteFooter
          brand="Riyanshi Insurance & Investment"
          description="Trusted insurance and investment guidance built with an editorial, multilingual-first design system."
          sections={[
            {
              title: "Quick Links",
              links: [
                { label: "Home", href: `/${lng}` },
                { label: "Contact", href: "#contact" },
              ],
            },
            {
              title: "Services",
              links: [
                { label: "Life Insurance", href: "#" },
                { label: "Health Insurance", href: "#" },
              ],
            },
            {
              title: "Legal",
              links: [
                { label: "Privacy Policy", href: "#" },
                { label: "Terms of Service", href: "#" },
              ],
            },
          ]}
          copyright="© 2026 Riyanshi Insurance & Investment. All rights reserved."
        />
      </div>

      <FloatingWhatsAppButton
        href="https://wa.me/919876543210"
        aria-label="Contact us on WhatsApp"
      />
    </div>
  )
}
