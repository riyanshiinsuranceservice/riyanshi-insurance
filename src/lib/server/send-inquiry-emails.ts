import nodemailer from "nodemailer"

import {
  INQUIRY_EMAIL_NOT_CONFIGURED_CODE,
  type InquiryBody,
} from "@/lib/inquiry-schema"
import {
  getInquiryEmailCopy,
  interpolateInquiryTemplate,
} from "@/lib/server/inquiry-email-i18n"
import {
  getInquiryRecipientEmail,
  SITE_CONFIG,
} from "@/site-config/site-config.constants"

/** Thrown when `GMAIL_USER` / `GMAIL_APP_PASSWORD` are unset — handled in `/api/inquiry` with 503 + `code`. */
export class InquiryEmailNotConfiguredError extends Error {
  readonly code = INQUIRY_EMAIL_NOT_CONFIGURED_CODE

  constructor() {
    super("Gmail SMTP is not configured: set GMAIL_USER and GMAIL_APP_PASSWORD.")
    this.name = "InquiryEmailNotConfiguredError"
  }
}

/**
 * What: build a Nodemailer transport for Gmail SMTP (app password or delegated account).
 * Why: Gmail is a common production choice; credentials stay in env, not in code.
 * What for: reused for both the owner notification and the visitor confirmation in one request.
 */
function createGmailTransport() {
  const user = process.env.GMAIL_USER?.trim()
  const pass = process.env.GMAIL_APP_PASSWORD?.trim()

  if (!user || !pass) {
    throw new InquiryEmailNotConfiguredError()
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: { user, pass },
  })
}

function escapeHtml(text: string): string {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;")
}

/**
 * What: send owner alert + sender confirmation for a website inquiry.
 * Why: separates transport setup from the route handler; copy comes from `contact-page` locale JSON.
 * What for: called from `POST /api/inquiry` after Zod validation succeeds.
 */
export async function sendInquiryEmails(payload: InquiryBody): Promise<void> {
  const transport = createGmailTransport()

  const gmailUser = process.env.GMAIL_USER!.trim()
  const fromName = process.env.MAIL_FROM_NAME?.trim() || SITE_CONFIG.name
  const ownerInbox = getInquiryRecipientEmail()

  const from = `"${fromName}" <${gmailUser}>`

  const copy = getInquiryEmailCopy(payload.locale)
  const vars = { name: payload.name, fromName }

  const safeName = escapeHtml(payload.name)
  const safeEmail = escapeHtml(payload.email)
  const safePhone = escapeHtml(payload.phone)
  const safeMessage = escapeHtml(payload.message)
  const telHref = payload.phone.replace(/[^\d+]/g, "")

  const ownerSubject = interpolateInquiryTemplate(copy.ownerSubject, vars)
  const confirmSubject = interpolateInquiryTemplate(copy.confirmSubject, vars)

  const ownerText = [
    copy.ownerTextLead,
    "",
    `${copy.labelName}: ${payload.name}`,
    `${copy.labelEmail}: ${payload.email}`,
    `${copy.labelMobile}: ${payload.phone}`,
    "",
    `${copy.labelMessage}:`,
    payload.message,
  ].join("\n")

  const ownerHtml = `
    <p><strong>${escapeHtml(copy.ownerHtmlTitle)}</strong> ${escapeHtml(copy.ownerHtmlSubtitle)}</p>
    <p><strong>${escapeHtml(copy.labelName)}:</strong> ${safeName}<br/>
    <strong>${escapeHtml(copy.labelEmail)}:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a><br/>
    <strong>${escapeHtml(copy.labelMobile)}:</strong> ${telHref ? `<a href="tel:${telHref}">${safePhone}</a>` : safePhone}</p>
    <p><strong>${escapeHtml(copy.labelMessage)}:</strong></p>
    <p style="white-space:pre-wrap;">${safeMessage}</p>
  `.trim()

  await transport.sendMail({
    from,
    to: ownerInbox,
    replyTo: payload.email,
    subject: ownerSubject,
    text: ownerText,
    html: ownerHtml,
    headers: {
      "Content-Language": payload.locale,
    },
  })

  const confirmGreeting = interpolateInquiryTemplate(copy.confirmGreeting, vars)
  const signoff = interpolateInquiryTemplate(copy.signoff, vars)

  const confirmText = [
    confirmGreeting,
    "",
    copy.confirmThanks,
    "",
    `${copy.confirmMobileLabel} ${payload.phone}`,
    "",
    `${copy.confirmMessageLabel}`,
    payload.message,
    "",
    signoff,
  ].join("\n")

  const confirmHtml = `
    <p>${escapeHtml(confirmGreeting)}</p>
    <p>${escapeHtml(copy.confirmThanks)}</p>
    <p><strong>${escapeHtml(copy.confirmMobileLabel)}</strong> ${safePhone}</p>
    <p><strong>${escapeHtml(copy.confirmMessageLabel)}</strong></p>
    <p style="white-space:pre-wrap;">${safeMessage}</p>
    <p>${escapeHtml(signoff)}</p>
  `.trim()

  await transport.sendMail({
    from,
    to: payload.email,
    subject: confirmSubject,
    text: confirmText,
    html: confirmHtml,
    headers: {
      "Content-Language": payload.locale,
    },
  })
}
