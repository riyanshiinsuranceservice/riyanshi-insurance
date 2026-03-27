import Image from "next/image"

/**
 * What: editorial hero for the dedicated services route (Stitch `our_services`).
 * Why: two-column headline + supporting copy + optional imagery matches the reference layout.
 * What for: first fold on `/[lng]/services` before the service cards grid.
 */
type ServicesHeroSectionProps = {
  eyebrow: string
  titleBefore: string
  titleEmphasis: string
  titleAfter: string
  intro: string
  imageSrc: string
  imageAlt: string
}

function ServicesHeroSection({
  eyebrow,
  titleBefore,
  titleEmphasis,
  titleAfter,
  intro,
  imageSrc,
  imageAlt,
}: ServicesHeroSectionProps) {
  return (
    <section className="mx-auto mb-16 w-full max-w-7xl px-6">
      <div className="grid grid-cols-1 items-end gap-12 md:grid-cols-2">
        <div>
          <span className="label-md mb-4 block font-semibold text-brand-secondary">{eyebrow}</span>
          <h1 className="mb-6 font-display text-4xl leading-tight font-extrabold tracking-tight text-primary md:text-6xl">
            {titleBefore}
            <span className="text-brand-secondary italic">{titleEmphasis}</span>
            {titleAfter}
          </h1>
          <p className="max-w-lg text-lg leading-relaxed text-on-surface-variant">
            {intro}
          </p>
        </div>
        <div className="hidden md:block">
          <div className="relative h-64 w-full overflow-hidden rounded-xl bg-surface-container-low">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 768px) 40vw, 100vw"
              priority
            />
            <div
              className="pointer-events-none absolute inset-0 bg-primary/10"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { ServicesHeroSection }
