import { NextResponse } from "next/server"

import { inquiryBodySchema } from "@/lib/inquiry-schema"
import {
  InquiryEmailNotConfiguredError,
  sendInquiryEmails,
} from "@/lib/server/send-inquiry-emails"

/** Nodemailer + Gmail SMTP require the Node.js runtime (not Edge). */
export const runtime = "nodejs"

/**
 * What: accept contact inquiries as JSON, validate, and send two Gmail messages (owner + auto-reply).
 * Why: App Router route handlers keep HTTP concerns here; Nodemailer lives in `send-inquiry-emails`.
 * What for: `POST /api/inquiry` from the public contact form — no database, idempotent from user perspective.
 */

export async function POST(request: Request) {
  let json: unknown
  try {
    json = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 })
  }

  const parsed = inquiryBodySchema.safeParse(json)
  if (!parsed.success) {
    const flat = parsed.error.flatten()
    return NextResponse.json(
      {
        error: "Validation failed.",
        fieldErrors: flat.fieldErrors,
      },
      { status: 400 }
    )
  }

  try {
    await sendInquiryEmails(parsed.data)
  } catch (err) {
    if (err instanceof InquiryEmailNotConfiguredError) {
      console.error("inquiry route: Gmail env missing — set GMAIL_USER and GMAIL_APP_PASSWORD")
      return NextResponse.json(
        {
          error:
            "The contact form cannot send email right now. Please reach us by phone or WhatsApp.",
          code: err.code,
        },
        { status: 503 }
      )
    }

    console.error("inquiry route: failed to send email", {
      message: err instanceof Error ? err.message : String(err),
    })
    return NextResponse.json(
      { error: "We could not send your message. Please try again later." },
      { status: 500 }
    )
  }

  return NextResponse.json({ ok: true }, { status: 200 })
}
