import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button"
import { SITE_WHATSAPP_HREF } from "@/lib/site-contact"
import { getT } from "next-i18next/server"

type SiteFloatingWhatsAppProps = {
  lng: string
}

/**
 * What: global WhatsApp FAB with label from `common` (no prop drilling).
 * Why: server component — uses `getT` on the server; child control is a plain anchor.
 * What for: same on every localized page; copy lives in locale files only.
 */
async function SiteFloatingWhatsApp({ lng }: SiteFloatingWhatsAppProps) {
  const { t } = await getT("common", { lng })
  return (
    <FloatingWhatsAppButton
      href={SITE_WHATSAPP_HREF}
      aria-label={t("a11y.whatsappContact")}
    />
  )
}

export { SiteFloatingWhatsApp }
