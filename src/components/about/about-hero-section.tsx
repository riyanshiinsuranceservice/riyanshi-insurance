import Image from "next/image"
import { Shield, Users } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * What: two-column Stitch hero — trust badge, bilingual-style headline, proof chips, portrait with gradient caption.
 * Why: mirrors `stitch_design/about_us` first fold using design tokens (`trust-badge`, `gradient-trust`) and `next/image`.
 * What for: top of `/[lng]/about` before values and stats sections.
 */
type AboutHeroSectionProps = {
  badge: string
  titleLine1: string
  titleEmphasis: string
  titleLine2Suffix: string
  intro: string
  chip1: string
  chip2: string
  imageSrc: string
  imageAlt: string
  cardLabel: string
  cardName: string
  /** When true, slightly larger body line-height for Gujarati copy (DESIGN.md). */
  isGujarati?: boolean
}

function AboutHeroSection({
  badge,
  titleLine1,
  titleEmphasis,
  titleLine2Suffix,
  intro,
  chip1,
  chip2,
  imageSrc,
  imageAlt,
  cardLabel,
  cardName,
  isGujarati = false,
}: AboutHeroSectionProps) {
  return (
    <section className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 p-6 lg:grid-cols-2">
      <div className="order-2 lg:order-1">
        <span className="trust-badge mb-6 inline-block font-bold tracking-widest uppercase">
          {badge}
        </span>
        <h1
          className={cn(
            "mb-8 font-display text-4xl leading-tight font-extrabold tracking-tight text-primary lg:text-5xl",
            isGujarati && "leading-[1.35] lg:leading-[1.3]"
          )}
        >
          {titleLine1}
          <br />
          <span className="text-brand-secondary">{titleEmphasis}</span>
          {titleLine2Suffix}
        </h1>
        <p
          className={cn(
            "mb-8 max-w-xl text-lg leading-relaxed text-on-surface-variant",
            isGujarati && "leading-relaxed"
          )}
        >
          {intro}
        </p>
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-6 py-4 shadow-[0_8px_24px_rgba(25,28,30,0.06)]">
            <Shield className="size-6 shrink-0 text-brand-secondary" aria-hidden />
            <span className="font-bold text-primary">{chip1}</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest px-6 py-4 shadow-[0_8px_24px_rgba(25,28,30,0.06)]">
            <Users className="size-6 shrink-0 text-brand-secondary" aria-hidden />
            <span className="font-bold text-primary">{chip2}</span>
          </div>
        </div>
      </div>

      <div className="relative order-1 lg:order-2">
        <div
          className="absolute -top-6 -left-6 size-32 rounded-full bg-brand-secondary/10 blur-3xl"
          aria-hidden
        />
        <div className="relative aspect-4/5 overflow-hidden max-w-md mx-auto rounded-2xl shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover"
            sizes="(min-width: 1024px) 42vw, 100vw"
            priority
          />
          <div className="absolute inset-x-0 bottom-0 gradient-trust p-8 text-white">
            <p className="label-md mb-1 opacity-80">{cardLabel}</p>
            <p className="font-display text-2xl font-bold">{cardName}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { AboutHeroSection, type AboutHeroSectionProps }
