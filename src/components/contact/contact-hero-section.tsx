import type { ReactNode } from "react"
import { PencilLine, ShieldCheck, Stethoscope, UsersRound } from "lucide-react"

import { Badge } from "@/components/ui/badge"

type ContactHeroSectionProps = {
  badge: string
  titleStart: string
  titleMedical: string
  titleMiddle: string
  titleLife: string
  titleEnd: string
  subtitle: string
  chipMedicalLabel: string
  chipMedicalSub: string
  chipLifeLabel: string
  chipLifeSub: string
  formTitle: string
  formSlot: ReactNode
}

/**
 * What: Stitch `stitch_our_services` hero — trust badge, headline, feature chips, and the existing contact form slot.
 * Why: one above-the-fold layout for lead capture + contact without swapping the mailto-based `ContactLeadForm`.
 * What for: `/[lng]/contact` top section.
 */
function ContactHeroSection({
  badge,
  titleStart,
  titleMedical,
  titleMiddle,
  titleLife,
  titleEnd,
  subtitle,
  chipMedicalLabel,
  chipMedicalSub,
  chipLifeLabel,
  chipLifeSub,
  formTitle,
  formSlot,
}: ContactHeroSectionProps) {
  return (
    <section className="relative overflow-hidden px-6 py-10 lg:px-12">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-12">
        <div className="space-y-8 lg:col-span-7">
          <Badge
            variant="trust"
            size="md"
            className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold tracking-widest uppercase"
          >
            <ShieldCheck className="size-3.5 shrink-0" aria-hidden />
            {badge}
          </Badge>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-primary md:text-6xl md:leading-tight">
            {titleStart}
            <span className="text-brand-secondary">{titleMedical}</span>
            {titleMiddle}
            <span className="text-brand-secondary">{titleLife}</span>
            {titleEnd}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-on-surface-variant md:text-xl">
            {subtitle}
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
              <Stethoscope className="size-9 shrink-0 text-brand-secondary" aria-hidden />
              <div>
                <p className="label-md font-bold text-outline">{chipMedicalLabel}</p>
                <p className="font-bold text-primary">{chipMedicalSub}</p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-surface-container-lowest p-4 shadow-sm">
              <UsersRound className="size-9 shrink-0 text-brand-secondary" aria-hidden />
              <div>
                <p className="label-md font-bold text-outline">{chipLifeLabel}</p>
                <p className="font-bold text-primary">{chipLifeSub}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="relative z-10 rounded-2xl border border-outline-variant/10 bg-surface-container-lowest p-8 shadow-[0_20px_40px_rgba(25,28,30,0.06)]">
            <h2 className="mb-6 flex items-center gap-2 font-display text-2xl font-bold text-primary">
              <PencilLine className="size-7 shrink-0 text-brand-secondary" aria-hidden />
              {formTitle}
            </h2>
            {formSlot}
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute top-0 right-0 -z-10 h-full w-1/2 rounded-l-[100px] bg-surface-container-low opacity-50"
        aria-hidden
      />
    </section>
  )
}

export { ContactHeroSection }
