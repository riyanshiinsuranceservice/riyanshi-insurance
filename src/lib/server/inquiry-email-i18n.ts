import enContactPage from "@/app/i18n/locales/en/contact-page.json"
import guContactPage from "@/app/i18n/locales/gu/contact-page.json"

import type { InquiryLocale } from "@/lib/inquiry-schema"

type InquiryEmailCopy = (typeof enContactPage)["inquiryEmail"]

const byLocale: Record<InquiryLocale, InquiryEmailCopy> = {
  en: enContactPage.inquiryEmail,
  gu: guContactPage.inquiryEmail,
}

/**
 * What: transactional email strings for the contact flow, keyed by UI locale.
 * Why: keeps Gujarati/English copy next to the rest of `contactPage` for translators.
 * What for: `send-inquiry-emails` builds owner + confirmation bodies from these templates.
 */
export function getInquiryEmailCopy(locale: InquiryLocale): InquiryEmailCopy {
  return byLocale[locale]
}

/** Replace `{{name}}`, `{{fromName}}`, etc. in JSON templates (no HTML — escape before use in HTML). */
export function interpolateInquiryTemplate(
  template: string,
  vars: Record<string, string>
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => vars[key] ?? "")
}
