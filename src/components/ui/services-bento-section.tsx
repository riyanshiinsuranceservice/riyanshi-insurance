import Link from "next/link"
import { Car, Stethoscope, TrendingUp, Users } from "lucide-react"

import { AppLink } from "@/components/ui/app-link"
import { Button } from "@/components/ui/button"
import { localizedContactHref, localizedServicesHref } from "@/routes"
import { getT } from "next-i18next/server"

type ServicesBentoSectionProps = {
  lng: string
  /**
   * What: when true, sets `id="services"` so `/${lng}#services` scroll targets this block on the home page.
   * Why: contact reuses the same grid without stealing the home hash target.
   */
  homeServicesAnchor?: boolean
}

/**
 * What: shared bento services grid (life feature, health, investment, vehicle, view-all).
 * Why: one layout and one copy source (`common.servicesBento`) for home, contact, and future pages.
 * What for: marketing surfaces that need a scannable product overview before deeper routes.
 */
async function ServicesBentoSection({ lng, homeServicesAnchor }: ServicesBentoSectionProps) {
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
          <div className="group relative flex min-h-80 flex-col justify-end overflow-hidden rounded-2xl bg-primary-container p-8 md:col-span-2">
            <Users
              className="pointer-events-none absolute top-0 right-0 size-48 translate-x-12 -translate-y-12 text-white opacity-20 md:size-56"
              aria-hidden
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white">{t("servicesBento.life.title")}</h3>
              <p className="mb-6 max-w-xs text-lg text-white/80">{t("servicesBento.life.description")}</p>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="rounded-full bg-white text-primary hover:bg-primary-fixed"
              >
                <Link href={servicesHref}>{t("servicesBento.life.cta")}</Link>
              </Button>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-2xl border border-outline-variant/30 bg-surface-container-highest p-8">
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant">
              <Stethoscope className="size-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">{t("servicesBento.health.title")}</h3>
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
              <h3 className="text-xl font-bold text-primary">{t("servicesBento.investment.title")}</h3>
              <p className="mt-2 text-sm text-on-surface-variant">
                {t("servicesBento.investment.description")}
              </p>
            </div>
          </div>

          <div className="group flex flex-col items-center gap-8 rounded-2xl bg-secondary-fixed p-8 md:col-span-2 md:flex-row">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-primary">{t("servicesBento.vehicle.title")}</h3>
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
