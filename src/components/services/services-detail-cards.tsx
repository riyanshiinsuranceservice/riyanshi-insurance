import type { ComponentProps } from "react"
import { ArrowRight, Car, Stethoscope, TrendingUp, Users } from "lucide-react"
import type { LucideIcon } from "lucide-react"

import { AppLink } from "@/components/ui/app-link"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

type ServiceCardCopy = {
  badge: string
  title: string
  tagline: string
  description: string
  learnMore: string
}

type ServicesDetailCardsProps = {
  life: ServiceCardCopy
  health: ServiceCardCopy
  investment: ServiceCardCopy
  vehicle: ServiceCardCopy
  learnMoreHref: string
}

type CardConfig = {
  key: string
  copy: ServiceCardCopy
  icon: LucideIcon
  borderClass: string
  iconWrapClass: string
  badgeVariant: ComponentProps<typeof Badge>["variant"]
  badgeClassName?: string
}

/**
 * What: 2×2 grid of service cards with left accent borders and icon orbs.
 * Why: mirrors Stitch card hierarchy while using Lucide + existing `Badge` / `AppLink`.
 * What for: detailed offerings on the services page (deeper than the home bento).
 */
function ServicesDetailCards({
  life,
  health,
  investment,
  vehicle,
  learnMoreHref,
}: ServicesDetailCardsProps) {
  const cards: CardConfig[] = [
    {
      key: "life",
      copy: life,
      icon: Users,
      borderClass: "border-l-4 border-primary",
      iconWrapClass: "bg-primary-fixed text-primary",
      badgeVariant: "trust",
    },
    {
      key: "health",
      copy: health,
      icon: Stethoscope,
      borderClass: "border-l-4 border-brand-secondary",
      iconWrapClass: "bg-brand-secondary/80 text-secondary",
      badgeVariant: "category",
    },
    {
      key: "investment",
      copy: investment,
      icon: TrendingUp,
      borderClass: "border-l-4 border-tertiary-fixed-dim",
      iconWrapClass: "bg-tertiary-fixed text-tertiary",
      badgeVariant: "outline",
      badgeClassName:
        "border-0 bg-surface-container-highest text-on-surface font-bold tracking-wider",
    },
    {
      key: "vehicle",
      copy: vehicle,
      icon: Car,
      borderClass: "border-l-4 border-primary-container/60",
      iconWrapClass: "bg-primary-fixed-dim text-primary-container",
      badgeVariant: "trust",
    },
  ]

  return (
    <section className="mx-auto w-full max-w-7xl px-6">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {cards.map(
          ({
            key,
            copy,
            icon: Icon,
            borderClass,
            iconWrapClass,
            badgeVariant,
            badgeClassName,
          }) => (
            <div
              key={key}
              className={cn(
                "group rounded-xl bg-surface-container-lowest p-8 shadow-[0_8px_24px_rgba(25,28,30,0.06)] transition-shadow duration-300 hover:shadow-[0_12px_28px_rgba(25,28,30,0.08)]",
                borderClass
              )}
            >
              <div className="mb-6 flex items-start justify-between">
                <div
                  className={cn(
                    "flex size-16 items-center justify-center rounded-full",
                    iconWrapClass
                  )}
                >
                  <Icon className="size-8" aria-hidden />
                </div>
                <Badge
                  variant={badgeVariant}
                  className={cn(
                    "px-4 py-1.5 text-xs font-bold uppercase tracking-wider",
                    badgeClassName
                  )}
                >
                  {copy.badge}
                </Badge>
              </div>
              <h2 className="mb-3 font-display text-2xl font-bold text-primary">
                {copy.title}
              </h2>
              <p className="mb-4 text-xl leading-snug font-bold text-on-surface">
                {copy.tagline}
              </p>
              <p className="mb-8 line-clamp-3 leading-relaxed text-on-surface-variant">
                {copy.description}
              </p>
            </div>
          )
        )}
      </div>
    </section>
  )
}

export { ServicesDetailCards }
