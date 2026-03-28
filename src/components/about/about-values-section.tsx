import { Eye, Handshake, Headphones } from "lucide-react"

import { cn } from "@/lib/utils"

type ValueBlock = {
  title: string
  body: string
  /** Featured card uses trust gradient and light text (Stitch middle column). */
  variant: "default" | "featured"
  icon: "eye" | "handshake" | "support"
}

/**
 * What: three-column values grid with one “featured” gradient card.
 * Why: matches Stitch bento-style values without ad-hoc markup in the route file.
 * What for: trust narrative on the about page after the hero.
 */
type AboutValuesSectionProps = {
  title: string
  intro: string
  values: ValueBlock[]
  isGujarati?: boolean
}

const iconMap = {
  eye: Eye,
  handshake: Handshake,
  support: Headphones,
} as const

function AboutValuesSection({ title, intro, values, isGujarati = false }: AboutValuesSectionProps) {
  return (
    <section className="surface-low section-spacing">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-16 text-center">
          <h2
            className={cn(
              "mb-4 font-display text-3xl font-bold text-primary lg:text-4xl",
              isGujarati && "headline-md-gujarati lg:text-[2.25rem]"
            )}
          >
            {title}
          </h2>
          <p className="mx-auto max-w-2xl text-on-surface-variant">{intro}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((v) => {
            const Icon = iconMap[v.icon]
            const featured = v.variant === "featured"
            return (
              <div
                key={v.title}
                className={cn(
                  "flex flex-col items-start rounded-xl p-8 transition-shadow",
                  featured
                    ? "gradient-trust text-white shadow-[0_20px_40px_rgba(25,28,30,0.12)]"
                    : "bg-surface-container-lowest elevation-ambient hover:shadow-[0_20px_40px_rgba(25,28,30,0.08)]"
                )}
              >
                <div
                  className={cn(
                    "mb-6 flex size-12 items-center justify-center rounded-lg",
                    featured ? "bg-white/20" : "bg-primary-fixed"
                  )}
                >
                  <Icon
                    className={cn("size-6", featured ? "text-white" : "text-primary")}
                    aria-hidden
                    strokeWidth={featured ? 2.25 : 2}
                  />
                </div>
                <h3
                  className={cn(
                    "mb-4 font-display text-xl font-bold",
                    featured ? "text-white" : "text-primary",
                    isGujarati && "leading-snug"
                  )}
                >
                  {v.title}
                </h3>
                <p
                  className={cn(
                    "leading-relaxed",
                    featured ? "text-blue-100/90" : "text-on-surface-variant"
                  )}
                >
                  {v.body}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export { AboutValuesSection, type AboutValuesSectionProps, type ValueBlock }
