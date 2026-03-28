/**
 * What: localized lead-generation landing route (Stitch `lead_landing_page`).
 * Why: composition-only page — sections live under `@/components/lead-landing/*`; closing CTA reuses `SiteFinalCta`.
 * What for: campaign and ad landing URLs at `/[lng]/lead`.
 */

import { LeadLandingHeroSection } from "@/components/lead-landing/lead-landing-hero-section"
import { LeadLandingServicesBento } from "@/components/lead-landing/lead-landing-services-bento"
import { MarketingStatsSection } from "@/components/ui/marketing-stats-section"
import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { getT } from "next-i18next/server"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>
}): Promise<Metadata> {
  const { lng } = await params
  const { t } = await getT("leadLanding", { lng })
  const { t: tc } = await getT("common", { lng })
  return {
    title: `${t("meta.title")} | ${tc("brand")}`,
    description: t("meta.description"),
  }
}

export default async function LeadLandingPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t } = await getT("leadLanding", { lng })
  const { t: th } = await getT("home", { lng })

  const formCopy = {
    title: t("form.title"),
    nameLabel: t("form.nameLabel"),
    namePlaceholder: t("form.namePlaceholder"),
    phoneLabel: t("form.phoneLabel"),
    phonePlaceholder: t("form.phonePlaceholder"),
    needLabel: t("form.needLabel"),
    submit: t("form.submit"),
    whatsappCta: t("form.whatsappCta"),
    success: t("form.success"),
    submitError: t("form.submitError"),
    errors: {
      name: t("form.errors.name"),
      phoneMin: t("form.errors.phoneMin"),
      phoneFormat: t("form.errors.phoneFormat"),
    },
    options: [
      { value: "medical" as const, label: t("form.options.medical") },
      { value: "life" as const, label: t("form.options.life") },
      { value: "investment" as const, label: t("form.options.investment") },
    ],
    whatsappPrefillTemplate: t("form.whatsappPrefill"),
  }

  return (
    <main className="w-full pb-20">
      <PageWrapper className="pt-10 md:pt-12" spacing="comfortable">
        <LeadLandingHeroSection
          badge={t("hero.badge")}
          titleStart={t("hero.titleStart")}
          titleMedical={t("hero.titleMedical")}
          titleMiddle={t("hero.titleMiddle")}
          titleLife={t("hero.titleLife")}
          titleEnd={t("hero.titleEnd")}
          subtitle={t("hero.subtitle")}
          chipMedicalLabel={t("hero.chipMedicalLabel")}
          chipMedicalSub={t("hero.chipMedicalSub")}
          chipLifeLabel={t("hero.chipLifeLabel")}
          chipLifeSub={t("hero.chipLifeSub")}
          formCopy={formCopy}
        />

        <MarketingStatsSection lng={lng} />

        <LeadLandingServicesBento
          title={t("services.title")}
          featuredBadge={t("services.featuredBadge")}
          featuredTitle={t("services.featuredTitle")}
          featuredDescription={t("services.featuredDescription")}
          featuredImageAlt={t("services.featuredImageAlt")}
          featuredBullet1={t("services.featuredBullet1")}
          featuredBullet2={t("services.featuredBullet2")}
          termTitle={t("services.termTitle")}
          termDescription={t("services.termDescription")}
          investTitle={t("services.investTitle")}
          investDescription={t("services.investDescription")}
        />

        <SiteFinalCta
          title={th("finalCta.title")}
          description={th("finalCta.description")}
          primaryCta={th("finalCta.primary")}
          secondaryCta={th("finalCta.secondary")}
          primaryHref={SITE_WHATSAPP_HREF}
          secondaryHref={SITE_CONSULT_TEL}
        />
      </PageWrapper>
    </main>
  )
}
