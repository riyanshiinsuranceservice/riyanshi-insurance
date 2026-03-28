import Image from "next/image"
import { Check } from "lucide-react"

type WhyPoint = {
  title: string
  description: string
}

type HomeWhyChooseProps = {
  quote: string
  eyebrow: string
  title: string
  points: WhyPoint[]
  /** From `SITE_CONFIG.media.homeWhyChoose`. */
  consultationImageSrc: string
}

/**
 * What: split layout with consultation imagery, pull-quote, and checklist values.
 * Why: mirrors stitch “Why Choose Us” with editorial overlap and hover rows.
 * What for: differentiators before the closing CTA.
 */
function HomeWhyChoose({
  quote,
  eyebrow,
  title,
  points,
  consultationImageSrc,
}: HomeWhyChooseProps) {
  return (
    <section className="bg-surface-container-lowest py-16 md:py-24">
      <div className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:grid-cols-2">
        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl">
            <Image
              src={consultationImageSrc}
              alt=""
              width={1200}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(min-width: 768px) 50vw, 100vw"
            />
          </div>
          <div className="absolute -right-8 -bottom-8 max-w-xs rounded-3xl bg-secondary-fixed p-8 shadow-xl">
            <p className="font-display text-xl leading-tight font-bold text-on-secondary-fixed-variant italic">
              {quote}
            </p>
          </div>
        </div>

        <div>
          <span className="label-md mb-3 block text-brand-secondary">{eyebrow}</span>
          <h2 className="font-display mb-8 text-3xl leading-tight font-bold text-primary md:text-4xl">
            {title}
          </h2>
          <ul className="flex flex-col gap-2">
            {points.map((point) => (
              <li
                key={point.title}
                className="flex gap-4 rounded-xl p-4 transition-colors hover:bg-surface-container-low"
              >
                <span
                  className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-[#436650]"
                  aria-hidden
                >
                  <Check
                    className="size-3.5 text-white"
                    strokeWidth={3}
                    strokeLinecap="square"
                    aria-hidden
                  />
                </span>
                <div>
                  <h4 className="font-bold text-primary">{point.title}</h4>
                  <p className="text-sm text-on-surface-variant">
                    {point.description}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export { HomeWhyChoose }
