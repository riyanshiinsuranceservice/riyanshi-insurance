import { Button } from "@/components/ui/button"
import {
  CtaBanner,
  CtaBannerActions,
  CtaBannerDescription,
  CtaBannerTitle,
} from "@/components/ui/cta-banner"
import { cn } from "@/lib/utils"

type HomeFinalCtaProps = {
  title: string
  description: string
  primaryCta: string
  secondaryCta: string
  primaryHref: string
  secondaryHref: string
}

/**
 * What: closing trust-gradient band with dual actions.
 * Why: reuses `CtaBanner` tokens instead of duplicating gradient markup.
 * What for: final conversion push on the home page.
 */
function HomeFinalCta({
  title,
  description,
  primaryCta,
  secondaryCta,
  primaryHref,
  secondaryHref,
}: HomeFinalCtaProps) {
  const primaryIsExternal = primaryHref.startsWith("http")
  const secondaryIsExternal = secondaryHref.startsWith("http")

  return (
    <div className="px-6 pb-16 md:pb-24">
      <CtaBanner
        className="mx-auto max-w-5xl rounded-[2.5rem] px-8 py-14 md:px-16 md:py-20"
        align="center"
      >
        <CtaBannerTitle className="mx-auto max-w-4xl text-balance text-3xl md:text-5xl">
          {title}
        </CtaBannerTitle>
        <CtaBannerDescription className="mx-auto text-center text-base md:text-xl">
          {description}
        </CtaBannerDescription>
        <CtaBannerActions className="mt-10 gap-4 sm:gap-6">
          {/*
           * Stitch: solid mint fill + near-black label; outline sibling with crisp light border + white type on navy.
           */}
          <Button
            asChild
            variant="mintSolid"
            size="lg"
            className={cn(
              "min-w-[12rem] rounded-xl px-10 py-6 text-base font-bold",
              "focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
            )}
          >
            <a
              href={primaryHref}
              {...(primaryIsExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
            >
              {primaryCta}
            </a>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className={cn(
              "min-w-[12rem] rounded-xl border-2 border-white/45 bg-transparent px-10 py-6 text-base font-semibold text-white shadow-none",
              "hover:border-white/65 hover:bg-white/10 hover:text-white",
              "focus-visible:ring-white/45 focus-visible:ring-offset-2 focus-visible:ring-offset-primary-container"
            )}
          >
            <a
              href={secondaryHref}
              {...(secondaryIsExternal
                ? { target: "_blank", rel: "noopener noreferrer" }
                : undefined)}
            >
              {secondaryCta}
            </a>
          </Button>
        </CtaBannerActions>
      </CtaBanner>
    </div>
  )
}

export { HomeFinalCta }
