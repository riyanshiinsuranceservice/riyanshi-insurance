import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { HomeHero } from "@/components/home/home-hero"
import { ServicesBentoSection } from "@/components/ui/services-bento-section"
import { HomeTrustHighlights } from "@/components/home/home-trust-highlights"
import { HomeWhyChoose } from "@/components/home/home-why-choose"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { generateSeoMetaData } from "@/site-config"
import { localizedContactHref, localizedHref } from "@/routes"
import { getT } from "next-i18next/server"
import type { Metadata } from "next"

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lng: string }>
}): Promise<Metadata> {
  const { lng } = await params
  const { t: tc } = await getT("common", { lng })
  const { t: th } = await getT("home", { lng })
  return generateSeoMetaData({
    title: `${tc("nav.home")} | ${tc("brand")}`,
    description: th("hero.subtitle"),
    canonicalPath: localizedHref(lng),
    lng,
  })
}

export default async function Page({ params }: { params: Promise<{ lng: string }> }) {
  const { lng } = await params
  const { t: th } = await getT("home", { lng })

  return (
    <main className="w-full">
      <PageWrapper>
        <HomeHero
          badge={th("hero.badge")}
          title={th("hero.title")}
          subtitle={th("hero.subtitle")}
          ctaPrimary={th("hero.ctaPrimary")}
          ctaSecondary={th("hero.ctaSecondary")}
          consultationHref={localizedContactHref(lng)}
          contactHref={SITE_CONSULT_TEL}
          cardLabel={th("hero.cardLabel")}
          cardValue={th("hero.cardValue")}
          cardSub={th("hero.cardSub")}
        />

        <HomeTrustHighlights
          items={[
            {
              title: th("trust.item1.title"),
              description: th("trust.item1.description"),
            },
            {
              title: th("trust.item2.title"),
              description: th("trust.item2.description"),
            },
            {
              title: th("trust.item3.title"),
              description: th("trust.item3.description"),
            },
          ]}
        />

        <ServicesBentoSection lng={lng} homeServicesAnchor />

        <HomeWhyChoose
          quote={th("why.quote")}
          eyebrow={th("why.eyebrow")}
          title={th("why.title")}
          points={[
            {
              title: th("why.point1.title"),
              description: th("why.point1.description"),
            },
            {
              title: th("why.point2.title"),
              description: th("why.point2.description"),
            },
            {
              title: th("why.point3.title"),
              description: th("why.point3.description"),
            },
            {
              title: th("why.point4.title"),
              description: th("why.point4.description"),
            },
          ]}
        />

        <div id="contact" className="flex flex-col scroll-mt-24">
          <SiteFinalCta
            title={th("finalCta.title")}
            description={th("finalCta.description")}
            primaryCta={th("finalCta.primary")}
            secondaryCta={th("finalCta.secondary")}
            primaryHref={SITE_WHATSAPP_HREF}
            secondaryHref={SITE_CONSULT_TEL}
          />
        </div>
      </PageWrapper>
    </main>
  )
}
