import { ContactHeroSection } from "@/components/contact/contact-hero-section"
import { ContactLeadForm } from "@/components/contact/contact-lead-form"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { MarketingStatsSection } from "@/components/ui/marketing-stats-section"
import { OfficeLocationSection } from "@/components/ui/office-location-section"
import { ServicesBentoSection } from "@/components/ui/services-bento-section"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { generateSeoMetaData } from "@/site-config"
import { localizedContactHref } from "@/routes"
import { getT } from "next-i18next/server"
import type { Metadata } from "next"

/**
 * What: unified contact route — Stitch-style hero + bento, trust stats, shared office block, final CTA.
 * Why: one URL for lead capture and visit/call intent; keeps the existing mailto `ContactLeadForm` instead of the Stitch form.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>
}): Promise<Metadata> {
  const { lng } = await params
  const { t } = await getT("contactPage", { lng })
  const { t: tc } = await getT("common", { lng })
  return generateSeoMetaData({
    title: `${t("meta.title")} | ${tc("brand")}`,
    description: t("meta.description"),
    canonicalPath: localizedContactHref(lng),
    lng,
  })
}

export default async function ContactPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t } = await getT("contactPage", { lng })
  const { t: th } = await getT("home", { lng })

  return (
    <main className="w-full pb-20">
      <PageWrapper className="pt-10 md:pt-12" spacing="comfortable">
        <ContactHeroSection
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
          formTitle={t("form.title")}
          formSlot={<ContactLeadForm />}
        />

        <MarketingStatsSection lng={lng} />

        <ServicesBentoSection lng={lng} />

        <OfficeLocationSection lng={lng} />

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
