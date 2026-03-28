/**
 * What: bento services block — featured family health tile plus term and investment stacks.
 * Why: implements Stitch `lead_landing_page` services grid with `next/image` and token-based surfaces.
 * What for: mid-page education before the shared `SiteFinalCta`.
 */

import Image from "next/image"
import { CheckCircle2, HeartHandshake, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"

const FEATURED_IMAGE_SRC =
  "https://lh3.googleusercontent.com/aida-public/AB6AXuAPyw4Uub9epfFQeKHtjOwaYbn_qEJ4tHAgPw1HZDEFqXPgoHbeTlkANKBB3M9jj0_Bg8r2jNkhQWiOS2MoV8sHK-_z77mA1rXRCVT_dEvtr4ZWgttS_P_wZbxfiyPS_5E5f_SJrh13qah2fUPveXdkE67b1wQ1A6jhE6-C9dhd1F-sanczK297PNIUPgyscMRcN-EazKIoRPAgxbL9B0u8JqtH15qYXRjAGJXCBjh-rIA5lM2p1W-C3a1B0k-xdw_JZ2UvN6_ucYQ"

type LeadLandingServicesBentoProps = {
  title: string
  featuredBadge: string
  featuredTitle: string
  featuredDescription: string
  featuredImageAlt: string
  featuredBullet1: string
  featuredBullet2: string
  termTitle: string
  termDescription: string
  investTitle: string
  investDescription: string
}

function LeadLandingServicesBento({
  title,
  featuredBadge,
  featuredTitle,
  featuredDescription,
  featuredImageAlt,
  featuredBullet1,
  featuredBullet2,
  termTitle,
  termDescription,
  investTitle,
  investDescription,
}: LeadLandingServicesBentoProps) {
  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <h2 className="mb-12 text-center font-display text-3xl font-bold text-primary md:text-left">
        {title}
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="group overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface-container-lowest shadow-sm transition-shadow hover:shadow-xl md:col-span-2">
          <div className="relative h-64 overflow-hidden">
            <Image
              src={FEATURED_IMAGE_SRC}
              alt={featuredImageAlt}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
              sizes="(min-width: 768px) 66vw, 100vw"
              priority={false}
            />
            <div className="absolute inset-0 bg-linear-to-t from-primary/80 to-transparent" />
            <div className="absolute bottom-6 left-8">
              <Badge variant="secondary" size="sm" className="mb-2 font-bold">
                {featuredBadge}
              </Badge>
              <h3 className="font-display text-3xl font-bold text-white">{featuredTitle}</h3>
            </div>
          </div>
          <div className="p-8">
            <p className="mb-6 leading-relaxed text-on-surface-variant">{featuredDescription}</p>
            <ul className="mb-8 space-y-3">
              <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                <CheckCircle2 className="size-5 shrink-0 text-brand-secondary" aria-hidden />
                {featuredBullet1}
              </li>
              <li className="flex items-center gap-3 text-sm font-medium text-on-surface">
                <CheckCircle2 className="size-5 shrink-0 text-brand-secondary" aria-hidden />
                {featuredBullet2}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <div className="group flex flex-1 flex-col rounded-2xl bg-secondary-container p-8 transition-shadow hover:shadow-lg">
            <HeartHandshake
              className="mb-4 size-10 text-on-secondary-container"
              aria-hidden
            />
            <h3 className="mb-3 font-display text-xl font-bold text-on-secondary-container">
              {termTitle}
            </h3>
            <p className="text-sm leading-relaxed text-on-secondary-container/80">
              {termDescription}
            </p>
          </div>
          <div className="group flex flex-1 flex-col rounded-2xl bg-primary-container p-8 transition-shadow hover:shadow-lg">
            <TrendingUp className="mb-4 size-10 text-on-primary-container" aria-hidden />
            <h3 className="mb-3 font-display text-xl font-bold text-white">{investTitle}</h3>
            <p className="text-sm leading-relaxed text-on-primary-container">
              {investDescription}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export { LeadLandingServicesBento }
