import { SiteFinalCta } from "@/components/layout/site-final-cta"
import { HomeHero } from "@/components/home/home-hero"
import { HomeServicesBento } from "@/components/home/home-services-bento"
import { HomeTrustHighlights } from "@/components/home/home-trust-highlights"
import { HomeWhyChoose } from "@/components/home/home-why-choose"
import { PageWrapper } from "@/components/layout/page-wrapper"
import { SITE_CONSULT_TEL, SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { localizedContactHref, localizedServicesHref } from "@/routes"
import { getT } from "next-i18next/server"

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

        <HomeServicesBento
          eyebrow={th("services.eyebrow")}
          title={th("services.title")}
          intro={th("services.intro")}
          life={{
            title: th("services.life.title"),
            description: th("services.life.description"),
            cta: th("services.life.cta"),
            learnMoreHref: localizedServicesHref(lng),
          }}
          health={{
            title: th("services.health.title"),
            description: th("services.health.description"),
          }}
          investment={{
            title: th("services.investment.title"),
            description: th("services.investment.description"),
          }}
          vehicle={{
            title: th("services.vehicle.title"),
            description: th("services.vehicle.description"),
            cta: th("services.vehicle.cta"),
            quoteHref: localizedContactHref(lng),
          }}
          customLine={th("services.customLine")}
          viewAllLabel={th("services.viewAll")}
          viewAllHref={localizedServicesHref(lng)}
        />

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
