import Link from "next/link"
import { Car, ChevronRight, Stethoscope, TrendingUp, Users } from "lucide-react"

import { AppLink } from "@/components/ui/app-link"
import { Button } from "@/components/ui/button"
import { localizedContactHref, localizedServicesHref } from "@/routes"
import { getT } from "next-i18next/server"

type ServicesBentoSectionProps = {
  lng: string
  homeServicesAnchor?: boolean
}

/**
 * What: shared bento services grid (life feature, health, investment, vehicle, view-all).
 * Why: one layout and one copy source (`common.servicesBento`) for home, contact, and future pages.
 * What for: marketing surfaces that need a scannable product overview before deeper routes.
 */
async function ServicesBentoSection({
  lng,
  homeServicesAnchor,
}: ServicesBentoSectionProps) {
  const { t } = await getT("common", { lng })
  const servicesHref = localizedServicesHref(lng)
  const contactHref = localizedContactHref(lng)

  return (
    <section
      {...(homeServicesAnchor ? { id: "services" } : {})}
      className="bg-surface py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="label-md mb-3 block text-brand-secondary">
              {t("servicesBento.eyebrow")}
            </span>
            <h2 className="font-display text-3xl font-bold text-primary md:text-5xl">
              {t("servicesBento.title")}
            </h2>
          </div>
          <p className="max-w-sm text-on-surface-variant">{t("servicesBento.intro")}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="group relative flex min-h-60 flex-col overflow-hidden rounded-2xl bg-linear-to-br from-primary from-0% via-primary-container via-45% to-primary to-100% p-8 shadow-[0_24px_56px_rgba(0,32,69,0.28)] ring-1 ring-inset ring-white/10 transition-[box-shadow,transform] duration-300 ease-out hover:shadow-[0_32px_72px_rgba(0,32,69,0.36)] md:col-span-2 md:p-10">
            {/* What: soft light pools on the hero card. Why: breaks a flat fill and guides the eye toward the icon column. What for: bento “featured” affordance without extra copy. */}
            <div
              className="pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]"
              aria-hidden
            >
              <div className="absolute -top-24 right-0 size-72 rounded-full bg-primary-fixed/20 blur-3xl md:-right-8 md:size-96" />
              <div className="absolute -bottom-20 left-0 size-56 rounded-full bg-white/6 blur-2xl md:left-12" />
            </div>

            <div className="relative z-10 flex min-h-0 w-full flex-1 flex-col justify-between gap-8 md:flex-row md:items-center md:justify-between md:gap-10">
              <div className="flex max-w-xl flex-col md:max-w-md md:shrink-0">
                <h3 className="font-display text-2xl font-bold tracking-tight text-white md:text-3xl">
                  {t("servicesBento.life.title")}
                </h3>
                <p className="mb-7 mt-3 max-w-prose text-base leading-relaxed text-white/88 md:mb-8 md:text-lg">
                  {t("servicesBento.life.description")}
                </p>
                <Button
                  asChild
                  variant="secondary"
                  size="sm"
                  className="w-fit rounded-full border-0 bg-white px-5 font-semibold text-primary shadow-[0_4px_16px_rgba(0,0,0,0.12)] transition-[transform,box-shadow,background-color] duration-200 hover:bg-primary-fixed hover:text-primary hover:shadow-[0_8px_24px_rgba(0,0,0,0.16)] focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
                >
                  <Link href={servicesHref} className="inline-flex items-center gap-1.5">
                    {t("servicesBento.life.cta")}
                    <ChevronRight
                      className="size-3.5 shrink-0 transition-transform duration-200 group-hover:translate-x-0.5"
                      aria-hidden
                    />
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-8">
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant">
              <Stethoscope className="size-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">
                {t("servicesBento.health.title")}
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                {t("servicesBento.health.description")}
              </p>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-8">
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-tertiary-fixed text-on-tertiary-fixed-variant">
              <TrendingUp className="size-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">
                {t("servicesBento.investment.title")}
              </h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                {t("servicesBento.investment.description")}
              </p>
            </div>
          </div>

          <div className="group flex flex-col items-center gap-8 rounded-2xl bg-secondary-fixed p-8 md:col-span-2 md:flex-row">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary">
                {t("servicesBento.vehicle.title")}
              </h3>
              <p className="mb-6 text-on-secondary-fixed-variant">
                {t("servicesBento.vehicle.description")}
              </p>
              <Button
                asChild
                variant="primary"
                size="sm"
                className="rounded-full bg-on-secondary-fixed-variant text-white hover:brightness-110"
              >
                <Link href={contactHref}>{t("servicesBento.vehicle.cta")}</Link>
              </Button>
            </div>
            <div className="hidden size-48 items-center justify-center opacity-40 md:flex">
              <Car className="size-28 text-primary" aria-hidden />
            </div>
          </div>

          <div className="flex items-center justify-center rounded-2xl border border-outline-variant/20 bg-surface-container-low p-8 md:col-span-2">
            <div className="text-center">
              <p className="mb-4 font-medium text-on-surface-variant italic">
                {t("servicesBento.customLine")}
              </p>
              <AppLink href={servicesHref} variant="inline" className="font-bold">
                {t("servicesBento.viewAll")}
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { ServicesBentoSection, type ServicesBentoSectionProps }
