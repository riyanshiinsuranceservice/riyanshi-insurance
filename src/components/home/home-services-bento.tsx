import { Car, Stethoscope, TrendingUp, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { AppLink } from "@/components/ui/app-link"

type ServiceBlock = {
  title: string
  description: string
}

type HomeServicesBentoProps = {
  eyebrow: string
  title: string
  intro: string
  life: ServiceBlock & { cta: string; learnMoreHref: string }
  health: ServiceBlock
  investment: ServiceBlock
  vehicle: ServiceBlock & { cta: string; quoteHref: string }
  customLine: string
  viewAllLabel: string
  viewAllHref: string
}

/**
 * What: bento-style services grid (featured life tile, health, investment, vehicle strip).
 * Why: encodes the stitch “Services” layout with token-based surfaces.
 * What for: scannable overview before deeper service pages exist.
 */
function HomeServicesBento({
  eyebrow,
  title,
  intro,
  life,
  health,
  investment,
  vehicle,
  customLine,
  viewAllLabel,
  viewAllHref,
}: HomeServicesBentoProps) {
  return (
    <section id="services" className="bg-[var(--color-surface)] py-16 md:py-24">
      <div className="mx-auto w-full max-w-7xl px-6">
        <div className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <span className="label-md mb-3 block text-[var(--color-secondary)]">{eyebrow}</span>
            <h2 className="font-[var(--font-display)] text-3xl font-bold text-[var(--color-primary)] md:text-5xl">
              {title}
            </h2>
          </div>
          <p className="max-w-sm text-[var(--color-on-surface-variant)]">{intro}</p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="group relative flex min-h-[20rem] flex-col justify-end overflow-hidden rounded-2xl bg-[var(--color-primary-container)] p-8 md:col-span-2">
            <Users
              className="pointer-events-none absolute top-0 right-0 size-48 translate-x-12 -translate-y-12 text-white opacity-20 md:size-56"
              aria-hidden
            />
            <div className="relative z-10">
              <h3 className="text-2xl font-bold text-white">{life.title}</h3>
              <p className="mb-6 max-w-xs text-lg text-[color:color-mix(in_srgb,white_82%,transparent)]">
                {life.description}
              </p>
              <Button
                asChild
                variant="secondary"
                size="sm"
                className="rounded-full bg-white text-[var(--color-primary)] hover:bg-[var(--color-primary-fixed)]"
              >
                <a href={life.learnMoreHref}>{life.cta}</a>
              </Button>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-2xl border border-[color:color-mix(in_srgb,var(--color-outline-variant)_30%,transparent)] bg-[var(--color-surface-container-highest)] p-8">
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-[var(--color-secondary-fixed)] text-[var(--color-on-secondary-fixed-variant)]">
              <Stethoscope className="size-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--color-primary)]">{health.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">
                {health.description}
              </p>
            </div>
          </div>

          <div className="group flex flex-col justify-between rounded-2xl border border-[color:color-mix(in_srgb,var(--color-outline-variant)_30%,transparent)] bg-[var(--color-surface-container-highest)] p-8">
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-[var(--color-tertiary-fixed)] text-[var(--color-on-tertiary-fixed-variant)]">
              <TrendingUp className="size-6" aria-hidden />
            </div>
            <div>
              <h3 className="text-xl font-bold text-[var(--color-primary)]">{investment.title}</h3>
              <p className="mt-2 text-sm text-[var(--color-on-surface-variant)]">
                {investment.description}
              </p>
            </div>
          </div>

          <div className="group flex flex-col items-center gap-8 rounded-2xl bg-[var(--color-secondary-fixed)] p-8 md:col-span-2 md:flex-row">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-[var(--color-primary)]">{vehicle.title}</h3>
              <p className="mb-6 text-[var(--color-on-secondary-fixed-variant)]">
                {vehicle.description}
              </p>
              <Button
                asChild
                variant="primary"
                size="sm"
                className="rounded-full bg-[var(--color-on-secondary-fixed-variant)] text-white hover:brightness-110"
              >
                <a href={vehicle.quoteHref}>{vehicle.cta}</a>
              </Button>
            </div>
            <div className="hidden size-48 items-center justify-center opacity-40 md:flex">
              <Car className="size-28 text-[var(--color-primary)]" aria-hidden />
            </div>
          </div>

          <div className="flex items-center justify-center rounded-2xl border border-[color:color-mix(in_srgb,var(--color-outline-variant)_20%,transparent)] bg-[var(--color-surface-container-low)] p-8 md:col-span-2">
            <div className="text-center">
              <p className="mb-4 font-medium text-[var(--color-on-surface-variant)] italic">
                {customLine}
              </p>
              <AppLink href={viewAllHref} variant="inline" className="font-bold">
                {viewAllLabel}
              </AppLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeServicesBento }
