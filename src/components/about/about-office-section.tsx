import type { ReactNode } from "react"
import Image from "next/image"
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * What: office location — contact tiles, directions CTA, and map — tuned for small screens first.
 * Why: side-by-side at `md` squeezed copy beside a tall map; we stack until `lg` and use `min-w-0` + word breaking so nothing clips.
 * What for: about page; matches primary/secondary tokens and card elevation used elsewhere.
 */

type AboutOfficeSectionProps = {
  title: string
  addressLabel: string
  phoneLabel: string
  emailLabel: string
  /** Multi-line address; newlines render as breaks via `whitespace-pre-line`. */
  address: string
  phoneDisplay: string
  phoneHref: string
  emailDisplay: string
  emailHref: string
  directionsLabel: string
  mapsUrl: string
  mapImageSrc: string
  mapImageAlt: string
}

type ContactRowProps = {
  icon: ReactNode
  label: string
  children: ReactNode
}

function ContactRow({ icon, label, children }: ContactRowProps) {
  return (
    <div className="flex gap-3 sm:gap-4">
      <span
        className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-secondary-fixed/35 text-brand-secondary dark:bg-secondary-fixed/20 dark:text-secondary-fixed"
        aria-hidden
      >
        {icon}
      </span>
      <div className="min-w-0 flex-1 pt-0.5">
        <p className="label-md mb-1 text-on-surface/65">{label}</p>
        <div className="wrap-break-word text-base font-medium leading-relaxed text-on-surface">
          {children}
        </div>
      </div>
    </div>
  )
}

function AboutOfficeSection({
  title,
  addressLabel,
  phoneLabel,
  emailLabel,
  address,
  phoneDisplay,
  phoneHref,
  emailDisplay,
  emailHref,
  directionsLabel,
  mapsUrl,
  mapImageSrc,
  mapImageAlt,
}: AboutOfficeSectionProps) {
  return (
    <section className="surface-low px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-lowest shadow-[0_8px_24px_rgba(25,28,30,0.06)]",
            "flex flex-col lg:flex-row lg:items-stretch"
          )}
        >
          {/* Copy first on all breakpoints — full width until lg prevents cramped columns on tablets */}
          <div className="order-1 flex w-full min-w-0 flex-col p-6 sm:p-8 lg:order-0 lg:max-w-104 lg:shrink-0 xl:max-w-md lg:p-10 xl:p-12">
            <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-primary sm:mb-8 sm:text-3xl">
              {title}
            </h2>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 sm:p-5">
                <ContactRow icon={<MapPin className="size-5" strokeWidth={2} />} label={addressLabel}>
                  <p className="whitespace-pre-line">{address}</p>
                </ContactRow>
              </div>
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 sm:p-5">
                <ContactRow icon={<Phone className="size-5" strokeWidth={2} />} label={phoneLabel}>
                  <a
                    href={phoneHref}
                    className="text-primary underline-offset-2 transition-colors hover:text-primary-container hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {phoneDisplay}
                  </a>
                </ContactRow>
              </div>
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 sm:p-5">
                <ContactRow icon={<Mail className="size-5" strokeWidth={2} />} label={emailLabel}>
                  <a
                    href={emailHref}
                    className="break-all text-primary underline-offset-2 transition-colors hover:text-primary-container hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {emailDisplay}
                  </a>
                </ContactRow>
              </div>
            </div>

            <Button
              asChild
              variant="primary"
              size="lg"
              className="mt-8 w-full gap-2 rounded-xl px-6 py-6 text-base font-bold sm:w-auto sm:self-start"
            >
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                {directionsLabel}
                <ExternalLink className="size-4 opacity-90" aria-hidden />
              </a>
            </Button>
          </div>

          {/* Map: predictable height on small screens; grows in the row on large screens */}
          <div className="relative order-2 aspect-5/4 w-full min-h-0 sm:aspect-16/10 lg:order-0 lg:min-h-[min(24rem,50vh)] lg:flex-1 lg:aspect-auto">
            <Image
              src={mapImageSrc}
              alt={mapImageAlt}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 55vw, 100vw"
              priority={false}
            />
            <div
              className="pointer-events-none absolute inset-0 bg-linear-to-t from-primary/20 to-transparent lg:bg-linear-to-l"
              aria-hidden
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export { AboutOfficeSection, type AboutOfficeSectionProps }
