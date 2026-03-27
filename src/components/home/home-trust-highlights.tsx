import { Brain, ShieldCheck, Zap } from "lucide-react"

type TrustItem = {
  title: string
  description: string
}

type HomeTrustHighlightsProps = {
  items: [TrustItem, TrustItem, TrustItem]
}

const icons = [ShieldCheck, Zap, Brain] as const

/**
 * What: three trust pillars with icon discs on a low surface.
 * Why: matches stitch “Trust Elements” without duplicating card markup three times.
 * What for: credibility strip below the hero.
 */
function HomeTrustHighlights({ items }: HomeTrustHighlightsProps) {
  return (
    <section
      id="about"
      className="bg-surface-container-low py-14 md:py-16"
    >
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 md:grid-cols-3">
        {items.map((item, index) => {
          const Icon = icons[index]
          const tone =
            index === 0
              ? "bg-primary-fixed text-primary"
              : index === 1
                ? "bg-secondary-fixed text-on-secondary-fixed-variant"
                : "bg-tertiary-fixed text-on-tertiary-fixed-variant"
          return (
            <div
              key={item.title}
              className="surface-card elevation-ambient flex items-center gap-6 rounded-2xl border border-outline-variant/15 p-8 shadow-sm"
            >
              <div
                className={`flex size-14 shrink-0 items-center justify-center rounded-full ${tone}`}
              >
                <Icon className="size-8" aria-hidden />
              </div>
              <div>
                <h3 className="font-display text-xl font-bold text-primary">
                  {item.title}
                </h3>
                <p className="mt-1 text-sm text-on-surface-variant">
                  {item.description}
                </p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export { HomeTrustHighlights }
