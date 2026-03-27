"use client"

import { useT } from "next-i18next/client"

import { FloatingWhatsAppButton } from "@/components/ui/floating-whatsapp-button"
import { SITE_WHATSAPP_HREF } from "@/lib/site-contact"

/**
 * What: global WhatsApp FAB with label from `common` (no prop drilling).
 * Why: same on every localized page; copy lives in locale files only.
 */
function SiteFloatingWhatsApp() {
  const { t } = useT("common")
  return (
    <FloatingWhatsAppButton
      href={SITE_WHATSAPP_HREF}
      aria-label={t("a11y.whatsappContact")}
    />
  )
}

export { SiteFloatingWhatsApp }
