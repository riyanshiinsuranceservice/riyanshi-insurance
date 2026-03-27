import Image from "next/image"
import { ArrowRight, ShieldCheck } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

const HERO_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuD73up3w9fM2qUSW-xiczkB_AhLgenkYBapF0MPEEfwxJFfppw2nd9YWGkYg1_SvSaIiTYzSlpc5IIFHN7QTeL3_zPEpz3QvICuJH6U1uNW-SG1AsKK-HUqp85HTgCm_q5pReJh7Z5Y5nruHml4QfDiq2oMUjshCJv41vPUaKTc9eD7WTYlLYVYxI9mODEdk_ZIMVUeDx991fGQF3hwDQqgHbOodRGLP3jiDZzwJPSnGHhjVaDpxapZvltq26oYPYYM6n-XaH71MYA"

type HomeHeroProps = {
  badge: string
  title: string
  subtitle: string
  ctaPrimary: string
  ctaSecondary: string
  consultationHref: string
  contactHref: string
  cardLabel: string
  cardValue: string
  cardSub: string
}

/**
 * What: bilingual hero with gradient CTAs, imagery, and floating claims stat.
 * Why: mirrors `home_page_bilingual` stitch hero while using design tokens.
 * What for: primary entry point on the localized home route.
 */
function HomeHero({
  badge,
  title,
  subtitle,
  ctaPrimary,
  ctaSecondary,
  consultationHref,
  contactHref,
  cardLabel,
  cardValue,
  cardSub,
}: HomeHeroProps) {
  return (
    <section className="relative flex min-h-[min(52rem,90svh)] items-center overflow-hidden bg-surface">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-12 px-6 py-12 md:grid-cols-2 md:py-16">
        <div className="z-10 order-2 md:order-1">
          <Badge
            variant="trust"
            size="md"
            className="mb-6 inline-flex items-center gap-2 rounded-full px-3 py-1"
          >
            <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
            {badge}
          </Badge>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-6xl lg:text-7xl">
            {title}
          </h1>
          <p className="body-lg mt-6 max-w-xl text-on-surface-variant">
            {subtitle}
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="gap-2 text-base">
              <a href={consultationHref}>
                {ctaPrimary}
                <ArrowRight className="size-5" aria-hidden />
              </a>
            </Button>
            <Button asChild variant="secondary" size="lg" className="text-base">
              <a href={contactHref}>{ctaSecondary}</a>
            </Button>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <div
            className="absolute -top-12 -right-12 size-64 rounded-full bg-primary-fixed opacity-30 blur-3xl"
            aria-hidden
          />
          <div className="relative max-md:w-4/5 max-md:mx-auto aspect-square rotate-2 overflow-hidden rounded-2xl shadow-2xl transition-transform duration-500 hover:rotate-0">
            <Image
              src={HERO_IMAGE}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
              priority
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { HomeHero }
