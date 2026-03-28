import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { ServicesDetailCards } from "@/components/services/services-detail-cards"
import { ServicesHeroSection } from "@/components/services/services-hero-section"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { generateSeoMetaData } from "@/site-config"
import { localizedContactHref, localizedServicesHref } from "@/routes"
import { getT } from "next-i18next/server"
import type { Metadata } from "next"

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAVpVdiAkdBZV2SvXwyqwAS0Nm5YFmZwXSfU8NO7uBFq81K8gdssK1_4qolbIVlUp5yJVMAsEOKb6Q0Ftb27C0bhI4CMIenWXFGmlWXyQDfUCgHQiEP_jTx4_vNYJzcVN4YOXrhtzV_0UrOEmHCrKbox_FCf2_UceeSgYwYu7hki6FflvGnjAMTNukLX-I6fnPwVJ_ZASFZZehhSZobujkXQFaOojuMK9_v9x67iqbNTgQgSfP1Oue8MDuRrwLyrtkXOCFugpMFHrg"

/**
 * What: localized `/services` marketing page from Stitch `our_services`.
 * Why: composition-only route; sections live under `@/components/services/*`.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>
}): Promise<Metadata> {
  const { lng } = await params
  const { t } = await getT("servicesPage", { lng })
  const { t: tc } = await getT("common", { lng })
  return generateSeoMetaData({
    title: `${tc("nav.services")} | ${tc("brand")}`,
    description: t("hero.intro"),
    canonicalPath: localizedServicesHref(lng),
    lng,
  })
}

export default async function ServicesPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t } = await getT("servicesPage", { lng })
  const { t: th } = await getT("home", { lng })

  return (
    <main className="w-full pb-20">
      <PageWrapper className="pt-10 md:pt-12">
        <ServicesHeroSection
          eyebrow={t("hero.eyebrow")}
          titleBefore={t("hero.titleBefore")}
          titleEmphasis={t("hero.titleEmphasis")}
          titleAfter={t("hero.titleAfter")}
          intro={t("hero.intro")}
          imageSrc={HERO_IMAGE}
          imageAlt={t("hero.imageAlt")}
        />
        <ServicesDetailCards
          life={{
            badge: t("cards.life.badge"),
            title: t("cards.life.title"),
            tagline: t("cards.life.tagline"),
            description: t("cards.life.description"),
            learnMore: t("cards.life.learnMore"),
          }}
          health={{
            badge: t("cards.health.badge"),
            title: t("cards.health.title"),
            tagline: t("cards.health.tagline"),
            description: t("cards.health.description"),
            learnMore: t("cards.health.learnMore"),
          }}
          investment={{
            badge: t("cards.investment.badge"),
            title: t("cards.investment.title"),
            tagline: t("cards.investment.tagline"),
            description: t("cards.investment.description"),
            learnMore: t("cards.investment.learnMore"),
          }}
          vehicle={{
            badge: t("cards.vehicle.badge"),
            title: t("cards.vehicle.title"),
            tagline: t("cards.vehicle.tagline"),
            description: t("cards.vehicle.description"),
            learnMore: t("cards.vehicle.learnMore"),
          }}
          learnMoreHref={localizedContactHref(lng)}
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
