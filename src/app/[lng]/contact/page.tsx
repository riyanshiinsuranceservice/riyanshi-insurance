import { ContactHeroSection } from "@/components/contact/contact-hero-section"
import { ContactLeadForm } from "@/components/contact/contact-lead-form"
import { ContactLocationsSection } from "@/components/contact/contact-locations-section"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { getT } from "next-i18next/server"
import type { Metadata } from "next"

/**
 * What: localized contact + locations page from Stitch `contact_location`.
 * Why: route composes sections only; UI and copy live in `@/components/contact/*` and `contactPage` i18n.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>
}): Promise<Metadata> {
  const { lng } = await params
  const { t } = await getT("contactPage", { lng })
  const { t: tc } = await getT("common", { lng })
  return {
    title: `${tc("nav.contact")} | ${tc("brand")}`,
    description: t("meta.description"),
  }
}

export default async function ContactPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t } = await getT("contactPage", { lng })
  const { t: th } = await getT("home", { lng })

  return (
    <main className="w-full pb-20">
      <PageWrapper className="pt-10 md:pt-12">
        <ContactHeroSection
          eyebrow={t("hero.eyebrow")}
          titleBefore={t("hero.titleBefore")}
          titleEmphasis={t("hero.titleEmphasis")}
          titleAfter={t("hero.titleAfter")}
          intro={t("hero.intro")}
          phoneLabel={t("hero.phoneLabel")}
          emailLabel={t("hero.emailLabel")}
          formTitle={t("form.title")}
          formSlot={<ContactLeadForm />}
        />
        <ContactLocationsSection
          title={t("locations.title")}
          subtitle={t("locations.subtitle")}
          ahmedabad={{
            title: t("locations.ahmedabad.title"),
            addressLine1: t("locations.ahmedabad.addressLine1"),
            addressLine2: t("locations.ahmedabad.addressLine2"),
            mapCta: t("locations.ahmedabad.mapCta"),
          }}
          surat={{
            title: t("locations.surat.title"),
            addressLine1: t("locations.surat.addressLine1"),
            addressLine2: t("locations.surat.addressLine2"),
            mapCta: t("locations.surat.mapCta"),
          }}
          mapImageAlt={t("locations.mapImageAlt")}
          mapOverlay={t("locations.mapOverlay")}
          mapLinkAria={t("locations.mapLinkAria")}
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
