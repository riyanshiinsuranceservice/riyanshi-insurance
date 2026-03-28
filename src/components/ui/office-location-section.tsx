import type { ReactNode } from "react"
import Image from "next/image"
import { ExternalLink, Mail, MapPin, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SITE_CONSULT_TEL, SITE_INQUIRY_EMAIL, SITE_PHONE_DISPLAY } from "@/lib/site-contact"
import { cn } from "@/lib/utils"
import { getT } from "next-i18next/server"

const MAP_IMAGE =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuCm2l9_Gr8RwuEGpr9JtfsWaS4YA0UwNhlFyfSVDPkIeUjt3_lijSBwkKnaj5wrTnbpa-M2GSXGSUlaN5ce_ZFx7dCs0En2fto1Ewa4Cc3wmk2BimA7TGFe0V_MsgMJOieOTRv3330qURSndiLa0pyfPjczeqUTVdLtl4FkFNf5lleOBWBka6C_e6rtKWMY21FctIHkOrm-ghmXadR7WweaBYYRTT061XJgGICo4MXgu0zvrMYI4X63nSe4m7o9M_swLtXik3UUDKg"

type OfficeLocationSectionProps = {
  lng: string
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

/**
 * What: primary office block — address, phone, email, directions, and map — shared by about and contact.
 * Why: one layout and `common.office` copy; phone/email values come from `@/lib/site-contact` so CTAs stay consistent.
 * What for: physical trust on marketing pages without duplicating props from each route.
 */
async function OfficeLocationSection({ lng }: OfficeLocationSectionProps) {
  const { t } = await getT("common", { lng })
  const emailHref = `mailto:${SITE_INQUIRY_EMAIL}`

  return (
    <section className="surface-low px-4 py-14 sm:px-6 md:py-20">
      <div className="mx-auto max-w-7xl">
        <div
          className={cn(
            "overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-lowest shadow-[0_8px_24px_rgba(25,28,30,0.06)]",
            "flex flex-col lg:flex-row lg:items-stretch"
          )}
        >
          <div className="order-1 flex w-full min-w-0 flex-col p-6 sm:p-8 lg:order-0 lg:max-w-104 lg:shrink-0 xl:max-w-md lg:p-10 xl:p-12">
            <h2 className="mb-6 font-display text-2xl font-bold tracking-tight text-primary sm:mb-8 sm:text-3xl">
              {t("office.title")}
            </h2>

            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 sm:p-5">
                <ContactRow icon={<MapPin className="size-5" strokeWidth={2} />} label={t("office.addressLabel")}>
                  <p className="whitespace-pre-line">{t("office.address")}</p>
                </ContactRow>
              </div>
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 sm:p-5">
                <ContactRow icon={<Phone className="size-5" strokeWidth={2} />} label={t("office.phoneLabel")}>
                  <a
                    href={SITE_CONSULT_TEL}
                    className="text-primary underline-offset-2 transition-colors hover:text-primary-container hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {SITE_PHONE_DISPLAY}
                  </a>
                </ContactRow>
              </div>
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container-low p-4 sm:p-5">
                <ContactRow icon={<Mail className="size-5" strokeWidth={2} />} label={t("office.emailLabel")}>
                  <a
                    href={emailHref}
                    className="break-all text-primary underline-offset-2 transition-colors hover:text-primary-container hover:underline focus-visible:rounded-sm focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                  >
                    {SITE_INQUIRY_EMAIL}
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
              <a href={t("office.mapsUrl")} target="_blank" rel="noopener noreferrer">
                {t("office.directionsCta")}
                <ExternalLink className="size-4 opacity-90" aria-hidden />
              </a>
            </Button>
          </div>

          <div className="relative order-2 aspect-5/4 w-full min-h-0 sm:aspect-16/10 lg:order-0 lg:min-h-[min(24rem,50vh)] lg:flex-1 lg:aspect-auto">
            <Image
              src={MAP_IMAGE}
              alt={t("office.mapAlt")}
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

export { OfficeLocationSection, type OfficeLocationSectionProps }
