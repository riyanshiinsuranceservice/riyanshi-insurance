import type { ReactNode } from "react"
import { Mail, PencilLine, Phone } from "lucide-react"

import { ContactInfoTile } from "@/components/ui/contact-info-tile"
import { SITE_CONSULT_TEL, SITE_INQUIRY_EMAIL, SITE_PHONE_DISPLAY } from "@/lib/site-contact"

type ContactHeroSectionProps = {
  eyebrow: string
  titleBefore: string
  titleEmphasis: string
  titleAfter: string
  intro: string
  phoneLabel: string
  emailLabel: string
  formTitle: string
  formSlot: ReactNode
}

/**
 * What: two-column Stitch hero — value prop, phone/email tiles, and lead form slot.
 * Why: keeps copy server-translated while the form stays a client island.
 * What for: `/[lng]/contact` above-the-fold layout.
 */
function ContactHeroSection({
  eyebrow,
  titleBefore,
  titleEmphasis,
  titleAfter,
  intro,
  phoneLabel,
  emailLabel,
  formTitle,
  formSlot,
}: ContactHeroSectionProps) {
  return (
    <section className="px-6 py-12 md:py-16">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        <div>
          <span className="label-md mb-4 block font-bold tracking-widest text-brand-secondary">
            {eyebrow}
          </span>
          <h1 className="font-display text-4xl leading-tight font-extrabold tracking-tight text-primary md:text-5xl lg:text-6xl">
            {titleBefore}
            <span className="text-brand-secondary">{titleEmphasis}</span>
            {titleAfter ? ` ${titleAfter}` : null}
          </h1>
          <p className="body-lg mt-6 max-w-xl text-on-surface-variant">{intro}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <ContactInfoTile
              icon={<Phone className="size-7" aria-hidden />}
              label={phoneLabel}
              value={
                <a href={SITE_CONSULT_TEL} className="underline-offset-2 hover:underline">
                  {SITE_PHONE_DISPLAY}
                </a>
              }
            />
            <ContactInfoTile
              icon={<Mail className="size-7" aria-hidden />}
              label={emailLabel}
              value={
                <a href={`mailto:${SITE_INQUIRY_EMAIL}`} className="underline-offset-2 hover:underline">
                  {SITE_INQUIRY_EMAIL}
                </a>
              }
            />
          </div>
        </div>

        <div className="relative overflow-hidden rounded-xl bg-surface-container-lowest p-8 elevation-ambient shadow-primary/5 md:p-10 dark:bg-white/5">
          <div
            className="gradient-trust pointer-events-none absolute -top-16 -right-16 size-32 rounded-full opacity-[0.07]"
            aria-hidden
          />
          <h2 className="mb-8 flex items-center gap-2 font-display text-2xl font-bold text-primary">
            <PencilLine className="size-7 shrink-0 text-brand-secondary" aria-hidden />
            {formTitle}
          </h2>
          {formSlot}
        </div>
      </div>
    </section>
  )
}

export { ContactHeroSection }
