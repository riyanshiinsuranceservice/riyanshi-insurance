import { getT } from "next-i18next/server"

import { StatItem, StatsGrid } from "@/components/ui/stat-block"
import { cn } from "@/lib/utils"

/**
 * What: shared marketing stats band (clients, years, claims, support).
 * Why: one layout and one i18n source (`leadLanding`) for every route that shows this proof row.
 * What for: lead and about pages — avoids duplicate props and diverging numbers.
 */

type MarketingStatsSectionProps = {
  lng: string
  className?: string
}

async function MarketingStatsSection({ lng, className }: MarketingStatsSectionProps) {
  const { t } = await getT("leadLanding", { lng })

  const items = [
    { key: "clients", value: t("statsValues.clients"), label: t("stats.clients") },
    { key: "years", value: t("statsValues.years"), label: t("stats.years") },
    { key: "claims", value: t("statsValues.claims"), label: t("stats.claims") },
    { key: "support", value: t("statsValues.support"), label: t("stats.support") },
  ] as const

  return (
    <section className={cn("bg-surface-container-low px-6 py-16", className)}>
      <div className="mx-auto max-w-7xl">
        <StatsGrid columns="two">
          {items.map((s) => (
            <StatItem key={s.key} value={s.value} label={s.label} />
          ))}
        </StatsGrid>
      </div>
    </section>
  )
}

export { MarketingStatsSection, type MarketingStatsSectionProps }
