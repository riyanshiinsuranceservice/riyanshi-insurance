import { z } from "zod"

/**
 * What: length caps for inquiry fields — shared by the contact form and `/api/inquiry`.
 * Why: one source of truth so client and server validation never diverge silently.
 * What for: imported by `ContactLeadForm` (Zod + RHF) and the API route (re-parse body).
 */
export const INQUIRY_FIELD_LIMITS = {
  nameMax: 200,
  messageMax: 5000,
} as const

/**
 * What: stable API error `code` when Gmail env vars are missing.
 * Why: lets the contact form show i18n copy instead of a generic failure message.
 * What for: returned by `POST /api/inquiry` with HTTP 503; compare on the client to `t("form.errors.emailNotConfigured")`.
 */
export const INQUIRY_EMAIL_NOT_CONFIGURED_CODE = "EMAIL_NOT_CONFIGURED" as const

/** Matches site `[lng]` routes — drives inquiry email language (en vs gu). */
export const INQUIRY_LOCALES = ["en", "gu"] as const
export type InquiryLocale = (typeof INQUIRY_LOCALES)[number]

/** JSON body for POST `/api/inquiry` (also the shape the contact form submits). */
export const inquiryBodySchema = z.object({
  locale: z.enum(INQUIRY_LOCALES),
  name: z.string().trim().min(2).max(INQUIRY_FIELD_LIMITS.nameMax),
  email: z.string().trim().email().max(320),
  /** Digits plus `+ ( )` space and hyphen; 10–24 chars — typical India / intl. mobile input. */
  phone: z
    .string()
    .trim()
    .min(1, "phoneRequired")
    .regex(/^[\d+()\s-]{10,24}$/u, "phoneInvalid"),
  message: z.string().trim().min(1).max(INQUIRY_FIELD_LIMITS.messageMax),
})

export type InquiryBody = z.infer<typeof inquiryBodySchema>
