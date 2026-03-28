import { AboutHeroSection } from "@/components/about/about-hero-section"
import { AboutOfficeSection } from "@/components/about/about-office-section"
import { MarketingStatsSection } from "@/components/ui/marketing-stats-section"
import { AboutValuesSection } from "@/components/about/about-values-section"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { getT } from "next-i18next/server"
import type { Metadata } from "next"

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDg63YwPtL16oL1HGX81pufV4l0-YLQN2gfzwrsVl7JY0Ceq0pLk9480jNTxhdhid-4mY0OQNZdroQ7EzbVJ6H4PxJHA_-qEuL-alGeT0fXiIq13jXuKIGS5Sv71OQhy0ouVqqIeDt1UQ0cOdYQ6m2OPb7ea6eWOI4owyJdGPkUwLvikWZDEm7suQzjymPEa7JhPVyLRU5Yy-KV1PIv971vuFAm7GwmsgE_UzimavmqjUv6aW2dCdGorYLns172rPtEgIzUvqTvVdY"

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCm2l9_Gr8RwuEGpr9JtfsWaS4YA0UwNhlFyfSVDPkIeUjt3_lijSBwkKnaj5wrTnbpa-M2GSXGSUlaN5ce_ZFx7dCs0En2fto1Ewa4Cc3wmk2BimA7TGFe0V_MsgMJOieOTRv3330qURSndiLa0pyfPjczeqUTVdLtl4FkFNf5lleOBWBka6C_e6rtKWMY21FctIHkOrm-ghmXadR7WweaBYYRTT061XJgGICo4MXgu0zvrMYI4X63nSe4m7o9M_swLtXik3UUDKg"

/**
 * What: localized `/about` marketing page from Stitch `about_us`.
 * Why: route file only composes sections; UI and copy live in `@/components/about/*` and `aboutPage` i18n.
 */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>
}): Promise<Metadata> {
  const { lng } = await params
  const { t } = await getT("aboutPage", { lng })
  const { t: tc } = await getT("common", { lng })
  return {
    title: `${tc("nav.about")} | ${tc("brand")}`,
    description: t("hero.intro"),
  }
}

export default async function AboutPage({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t } = await getT("aboutPage", { lng })
  const { t: th } = await getT("home", { lng })
  const isGujarati = lng === "gu"
  const emailRaw = t("office.emailDisplay")
  const emailHref = `mailto:${emailRaw.replace(/\s/g, "")}`

  return (
    <main className="w-full pb-20">
      <PageWrapper className="pt-10 md:pt-12">
        <AboutHeroSection
          badge={t("hero.badge")}
          titleLine1={t("hero.titleLine1")}
          titleEmphasis={t("hero.titleEmphasis")}
          titleLine2Suffix={t("hero.titleLine2Suffix")}
          intro={t("hero.intro")}
          chip1={t("hero.chip1")}
          chip2={t("hero.chip2")}
          imageSrc={HERO_IMAGE}
          imageAlt={t("hero.imageAlt")}
          cardLabel={t("hero.cardLabel")}
          cardName={t("hero.cardName")}
          isGujarati={isGujarati}
        />

        <AboutValuesSection
          title={t("values.title")}
          intro={t("values.intro")}
          isGujarati={isGujarati}
          values={[
            {
              title: t("values.v1.title"),
              body: t("values.v1.body"),
              variant: "default",
              icon: "eye",
            },
            {
              title: t("values.v2.title"),
              body: t("values.v2.body"),
              variant: "featured",
              icon: "handshake",
            },
            {
              title: t("values.v3.title"),
              body: t("values.v3.body"),
              variant: "default",
              icon: "support",
            },
          ]}
        />

        <MarketingStatsSection lng={lng} />

        <AboutOfficeSection
          title={t("office.title")}
          addressLabel={t("office.addressLabel")}
          phoneLabel={t("office.phoneLabel")}
          emailLabel={t("office.emailLabel")}
          address={t("office.address")}
          phoneDisplay={t("office.phoneDisplay")}
          phoneHref={SITE_CONSULT_TEL}
          emailDisplay={t("office.emailDisplay")}
          emailHref={emailHref}
          directionsLabel={t("office.directionsCta")}
          mapsUrl={t("office.mapsUrl")}
          mapImageSrc={MAP_IMAGE}
          mapImageAlt={t("office.mapAlt")}
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
