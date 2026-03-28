import { Building2, MapPin } from "lucide-react"
import Image from "next/image"

import { FeatureIcon } from "@/components/ui/feature-icon"
import { LinkWithArrow } from "@/components/ui/link-with-arrow"
import { cn } from "@/lib/utils"

const MAP_PREVIEW_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuDyta-v-_pA7fauW31YU3tgcwXBLcAJkkrPy_q47EPJDNeCcGN-6atpeaUGil_xitnc59UhRZv0V-8WuqBFdCpbEJzUfjBVuT9dSWynTisptMDfr4APAnvUAyp-51rqntz1IfQXBSpItVoVp-hLMirmwhwDnqn4FOGW0Qw_lDdcPFGqYNG-cE-Dd_wGdQOK5U3LXR8myfbpALMGK_gmE33iST5Z0EhqnhEhKk6m9G54ju1gSeqbuAFN7b2tFMVYiLXv1tMCRfust4A"

const AHMEDABAD_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=402+Business+Hub+SG+Highway+Thaltej+Ahmedabad+380054"
const SURAT_MAP_URL =
  "https://www.google.com/maps/search/?api=1&query=105+Diamond+World+Varachha+Road+Surat+395006"

type OfficeCopy = {
  title: string
  addressLine1: string
  addressLine2: string
  mapCta: string
}

type ContactLocationsSectionProps = {
  title: string
  subtitle: string
  ahmedabad: OfficeCopy
  surat: OfficeCopy
  mapImageAlt: string
  mapOverlay: string
  mapLinkAria: string
}

/**
 * What: office cards + map preview band (Stitch `contact_location` mid-page).
 * Why: surfaces physical trust; external map links avoid embedding heavy iframes.
 * What for: localized contact page between hero and shared `SiteFinalCta`.
 */
function ContactLocationsSection({
  title,
  subtitle,
  ahmedabad,
  surat,
  mapImageAlt,
  mapOverlay,
  mapLinkAria,
}: ContactLocationsSectionProps) {
  return (
    <section className="surface-low py-16 md:py-20">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mb-10 flex flex-col items-start justify-between gap-6 md:mb-12 md:flex-row md:items-end">
          <div>
            <h2 className="font-display text-3xl font-bold text-primary">{title}</h2>
            <p className="mt-2 max-w-xl text-on-surface-variant">{subtitle}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-8 elevation-ambient dark:bg-white/5">
            <div>
              <FeatureIcon
                tone="secondary"
                shape="circle"
                className="mb-6 bg-brand-secondary/10 text-brand-secondary dark:bg-secondary-fixed/15"
              >
                <MapPin className="size-6" aria-hidden />
              </FeatureIcon>
              <h3 className="font-display text-xl font-bold text-primary">{ahmedabad.title}</h3>
              <p className="mt-4 leading-relaxed text-on-surface-variant">
                {ahmedabad.addressLine1}
                <br />
                {ahmedabad.addressLine2}
              </p>
            </div>
            <LinkWithArrow href={AHMEDABAD_MAP_URL} external variant="external" className="mt-6 w-fit">
              {ahmedabad.mapCta}
            </LinkWithArrow>
          </article>

          <article className="flex flex-col justify-between rounded-xl bg-surface-container-lowest p-8 elevation-ambient dark:bg-white/5">
            <div>
              <FeatureIcon
                tone="secondary"
                shape="circle"
                className="mb-6 bg-brand-secondary/10 text-brand-secondary dark:bg-secondary-fixed/15"
              >
                <Building2 className="size-6" aria-hidden />
              </FeatureIcon>
              <h3 className="font-display text-xl font-bold text-primary">{surat.title}</h3>
              <p className="mt-4 leading-relaxed text-on-surface-variant">
                {surat.addressLine1}
                <br />
                {surat.addressLine2}
              </p>
            </div>
            <LinkWithArrow href={SURAT_MAP_URL} external variant="external" className="mt-6 w-fit">
              {surat.mapCta}
            </LinkWithArrow>
          </article>

          <a
            href={AHMEDABAD_MAP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={mapLinkAria}
            className={cn(
              "relative flex min-h-[300px] overflow-hidden rounded-xl shadow-sm lg:min-h-0",
              "ring-1 ring-outline-variant/15 transition-opacity hover:opacity-95 focus-visible:ring-2 focus-visible:ring-ring"
            )}
          >
            <Image
              src={MAP_PREVIEW_IMAGE}
              alt={mapImageAlt}
              fill
              className="object-cover grayscale contrast-125"
              sizes="(min-width: 1024px) 33vw, 100vw"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-primary/10 backdrop-blur-[2px]">
              <span className="flex items-center gap-3 rounded-lg bg-white/90 px-4 py-3 text-sm font-bold text-primary shadow-xl dark:bg-neutral-900/90 dark:text-primary-fixed">
                <MapPin className="size-5 text-destructive motion-safe:animate-bounce" aria-hidden />
                {mapOverlay}
              </span>
            </span>
          </a>
        </div>
      </div>
    </section>
  )
}

export { ContactLocationsSection }
