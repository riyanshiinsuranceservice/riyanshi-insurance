import {
  getInquiryRecipientEmail,
  SITE_CONFIG,
} from "@/site-config/site-config.constants"

const { phoneWhatsappDigits, phoneDisplay, mapsUrl } = SITE_CONFIG.contact

/** `tel:` link for the main consultation line (from `SITE_CONFIG.contact.phoneWhatsappDigits`). */
export const SITE_CONSULT_TEL = `tel:+${phoneWhatsappDigits}`

/** WhatsApp chat deep link (same number as `SITE_CONSULT_TEL`). */
export const SITE_WHATSAPP_HREF = `https://wa.me/${phoneWhatsappDigits}`

/** Display + mailto target — uses `getInquiryRecipientEmail()` (env with fallback to default). */
export const SITE_INQUIRY_EMAIL = getInquiryRecipientEmail()

/** Human-readable phone for UI and form hints. */
export const SITE_PHONE_DISPLAY = phoneDisplay

/** External directions link for the office (Google Maps). */
export const SITE_MAPS_URL = mapsUrl

/** Office map / hero imagery — re-export for convenient imports alongside CTAs. */
export const SITE_MEDIA = SITE_CONFIG.media
